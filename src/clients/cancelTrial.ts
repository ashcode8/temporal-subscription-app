export {};
import { wfClient } from './signup';
import { clientIDs } from './constants';
import { cancelTrial } from '../server/workflows';
import { PlanStatus } from '../server/workflows';

async function trialCancellation() {
  try {
    const wfHandle = await wfClient.workflow.getHandle(clientIDs.john);
    await wfHandle.signal(cancelTrial);
    console.log('trial cancelled');
  } catch (error) {
    console.error(error);
    console.log('could not cancel trial');
  }
}

await trialCancellation();
