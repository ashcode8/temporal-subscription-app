import { condition, defineQuery, defineSignal, proxyActivities, setHandler, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

interface SignupArgs {
  email: string;
  maxBillingPeriod: number;
  maxBillingAmount: number;
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
  let currentPlan = 'trial';
  let maxBillingPeriod = data.maxBillingPeriod;
  const maxBilligAmount = data.maxBillingAmount;

  setHandler(cancelTrial, () => {
    currentPlan = 'trial-expired';
  });

  setHandler(cancelSubscription, () => {
    currentPlan = 'subscription-expired';
  });

  setHandler(fetchBillingInfo, () => {
    return {
      currentPlan,
      maxBillingPeriod,
      maxBilligAmount,
    };
  });

  if (await condition(() => currentPlan === 'trial-expired', trialPeriod)) {
    await sendEmail('cancel-trial');
    return 'Trial expired'; //returns to wf start and not signal
  }

  if (await condition(() => currentPlan === 'subscription-expired', billingPeriod)) {
    await sendEmail('cancel-subscription');
    return 'Subscription expired';
  }

  setHandler(fetchBillingInfo, () => maxBillingPeriod);

  await sendEmail('welcome'); //send welcome email
  await sleep(trialPeriod); // start trial period

  while (maxBillingPeriod) {
    await deductBalance(maxBilligAmount);
    --maxBillingPeriod;
    await sleep(billingPeriod);
  }
  return currentPlan;
  //if (maxBillingPeriod === 0) return 'Subscription expired';
};
