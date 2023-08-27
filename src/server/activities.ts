const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendEmail = async (purpose: string): Promise<boolean> => {
  switch (purpose) {
    case 'welcome':
      console.log('Sending welcome email....');
      await delay(3000);
      console.log('done');
      break;
    case 'cancel-trial':
      console.log('Sending cancel trial email....');
      await delay(3000);
      console.log('done');
      break;
    case 'cancel-subscription':
      console.log('Sending cancel subscription email....');
      await delay(3000);
      console.log('done');
      break;
      break;
    default:
      console.log('Incorrect piurpose');
  }
  return true;
};

export const deductBalance = async (amount: number): Promise<boolean> => {
  console.log('Deducting balance....');
  await delay(3000);
  console.log('done');
  return true;
};
