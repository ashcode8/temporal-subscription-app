export {};
import { getClientInstance } from './client';
import { clientIDs } from './constants';
import { cancelSubscription } from '../workflows';

async function subscriptionCancellation() {
  const wfClient = await getClientInstance();
  const wfHandle = await wfClient.workflow.getHandle(clientIDs.john);
  await wfHandle.signal(cancelSubscription);
  console.log('Subscription cancelled');
}

subscriptionCancellation().catch((error) => {
  console.error(error);
  process.exit(1);
});
