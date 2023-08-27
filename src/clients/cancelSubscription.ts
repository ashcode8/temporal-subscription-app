export {};
import { wfClient } from './signup';
import { clientIDs } from './constants';
import { cancelSubscription } from '../server/workflows';

async function subscriptionCancellation() {
  try {
    const wfHandle = await wfClient.workflow.getHandle(clientIDs.john);
    await wfHandle.signal(cancelSubscription);
    console.log('Subscription cancelled');
  } catch (error) {
    console.error(error);
    console.log('could not cancel trial');
  }
}

await subscriptionCancellation();
