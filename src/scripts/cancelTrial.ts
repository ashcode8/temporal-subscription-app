import { getClientInstance } from './client';
import { clientIDs } from './constants';
import { cancelTrial } from '../workflows';

async function trialCancellation() {
  const wfClient = await getClientInstance();
  const wfHandle = await wfClient.workflow.getHandle(clientIDs.john);
  await wfHandle.signal(cancelTrial);
  console.log('trial cancelled');
}

trialCancellation().catch((error) => {
  console.log('trial cancelled');
  console.log(error);
});
