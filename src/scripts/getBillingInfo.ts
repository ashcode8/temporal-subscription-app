export {};
import { clientIDs } from './constants';
import { fetchBillingInfo } from '../workflows';
import { getClientInstance } from './client';

async function fetchBilling() {
  const wfClient = await getClientInstance();
  const wfHandle = await wfClient.workflow.getHandle(clientIDs.john);
  const billingInfo = await wfHandle.query(fetchBillingInfo);
  console.log('billing info', billingInfo);
}

fetchBilling().catch((error) => {
  console.log(error);
});
