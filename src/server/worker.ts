export {};
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function runWorker(): Promise<string> {
  const worker: Worker = await Worker.create({
    workflowsPath: require.resolve('./workflows.ts'),
    activities,
    taskQueue: 'signup',
  });
  try {
    await worker.run();
    return 'success';
  } catch (error) {
    console.error(error);
    return 'failure';
  }
}

const ack = await runWorker();
console.log(`Worker status: ` + ack);
if (ack !== 'success') {
  process.exit(1);
}
