import { condition, defineQuery, defineSignal, proxyActivities, setHandler, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

interface SignupArgs {
  email: string;
  maxBillingPeriod: number;
  maxBillingAmount: number;
}

export enum PlanStatus {
  TRIAL = 'TRIAL_BASED',
  TRIAL_CANCEL = 'TRIAL_CANCELLED',
  SUBCRIPTION = 'SUBSCRIPTION_BASED',
  SUBSCRIPTION_CANCEL = 'SUBSCRIPTION_CANCELLED',
  SUBCRIPTION_EX = 'SUBSCRIPTION_EXPIRED',
}

export enum EmailType {
  WELCOME = 'WELCOME',
  TRIAL_CANCEL = 'TRIAL_CANCELLED',
  SUBSCRIPTION_STARTED = 'SUBSCRIPTION_STARTED',
  SUBSCRIPTION_CANCEL = 'SUBSCRIPTION_CANCELLED',
  SUBSCRIPTION_OVER = 'SUBCRIPTION_OVER',
}

const { sendEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10s',
});

const { deductBalance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '3m',
});

const trialPeriod = '15s';
const billingPeriod = '1m';

export const cancelTrial = defineSignal('cancelTrial');
export const cancelSubscription = defineSignal('cancelSubscription');
export const fetchBillingInfo = defineQuery('fetchCurrentBillingPeriod');

export const signupClient = async (data: SignupArgs) => {
  let currentPlan = PlanStatus.TRIAL;
  let maxBillingPeriod = data.maxBillingPeriod;
  const maxBilligAmount = data.maxBillingAmount;

  setHandler(cancelTrial, () => {
    currentPlan = PlanStatus.TRIAL_CANCEL;
  });
  setHandler(cancelSubscription, () => {
    currentPlan = PlanStatus.SUBSCRIPTION_CANCEL;
  });
  setHandler(fetchBillingInfo, () => {
    return {
      currentPlan,
      maxBillingPeriod,
      maxBilligAmount,
    };
  });

  await sendEmail(EmailType.WELCOME);
  if (await condition(() => currentPlan === PlanStatus.TRIAL_CANCEL, trialPeriod)) {
    await sendEmail(EmailType.TRIAL_CANCEL);
    return PlanStatus.TRIAL_CANCEL; //returns to wf start and not signal
  }

  currentPlan = PlanStatus.SUBCRIPTION;
  await sendEmail(EmailType.SUBSCRIPTION_STARTED);

  while (maxBillingPeriod) {
    const ack = await deductBalance(maxBilligAmount);
    if (ack === true) {
      console.log(`charged for billing period no ${maxBillingPeriod}`);
    }
    --maxBillingPeriod;
    if (await condition(() => currentPlan === PlanStatus.SUBSCRIPTION_CANCEL, billingPeriod)) {
      await sendEmail(EmailType.SUBSCRIPTION_CANCEL);
      return PlanStatus.SUBSCRIPTION_CANCEL; //is it better to break ?
    }
  }
  currentPlan = PlanStatus.SUBCRIPTION_EX;
  await sendEmail(EmailType.SUBSCRIPTION_OVER);

  return currentPlan;
};
