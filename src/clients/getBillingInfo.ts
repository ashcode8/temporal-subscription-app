export {};
import { wfClient } from './signup';
import { clientIDs } from './constants';
import { fetchBillingInfo } from '../server/workflows';

async function fetchBilling() {
  try {
    const wfHandle = await wfClient.workflow.getHandle(clientIDs.john);
    const billingInfo = await wfHandle.query(fetchBillingInfo);
    console.log('billing info', billingInfo);
  } catch (error) {
    console.error(error);
    console.log('could not fetch billing info');
  }
}

await fetchBilling();
