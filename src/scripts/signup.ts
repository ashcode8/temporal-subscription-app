export {};
import { getClientInstance } from './client';
import { signupClient } from '../workflows';
import { clientIDs } from './constants';

async function signup(): Promise<void> {
  const wfClient = await getClientInstance();
  try {
    const wfHandle = await wfClient.workflow.start(signupClient, {
      taskQueue: 'signup',
      workflowId: clientIDs.john,
      args: [
        {
          email: 'john@wick.com',
          maxBillingPeriod: 4,
          maxBillingAmount: 1000,
        },
      ],
    });
    console.log(`Started workflow with ID=${wfHandle.workflowId}`);
    const planStatus = await wfHandle.result();
    console.log(`wf execution result= ${planStatus}`);
  } catch (error) {
    console.error(error);
  }
}

signup().catch((error) => {
  console.log(error);
});
