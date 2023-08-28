import { EmailType } from './workflows';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendEmail = async (purpose: string): Promise<void> => {
  switch (purpose) {
    case EmailType.WELCOME:
      console.log('Sending welcome email....');
      await delay(3000);
      console.log('done');
      break;
    case EmailType.SUBSCRIPTION_STARTED:
      console.log('Sending subscription started email....');
      await delay(3000);
      console.log('done');
      break;
    case EmailType.TRIAL_CANCEL:
      console.log('Sending trial cancelled email....');
      await delay(3000);
      console.log('done');
      break;
    case EmailType.SUBSCRIPTION_CANCEL:
      console.log('Sending subscription cancelled email....');
      await delay(3000);
      console.log('done');
      break;
    case EmailType.SUBSCRIPTION_OVER:
      console.log('Sending subscription over email....');
      await delay(3000);
      console.log('done');
      break;
    default:
      console.log('Incorrect purpose');
  }
};

export const deductBalance = async (amount: number): Promise<boolean> => {
  console.log('Deducting balance....');
  await delay(3000);
  console.log('done');
  return true;
};
