export {};
import { Connection, Client } from '@temporalio/client';
import { signupClient } from '../server/workflows';
import { clientIDs } from './constants';

const serverConn = await Connection.connect(); //connect to temporal server
export const wfClient = new Client({
  connection: serverConn,
});

async function signup(): Promise<void> {
  try {
    const wfHandle = await wfClient.workflow.start(signupClient, {
      taskQueue: 'signup',
      workflowId: clientIDs.john,
      args: [
        {
          email: 'john@wick.com',
          maxBillingPeriod: 10,
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

await signup();
