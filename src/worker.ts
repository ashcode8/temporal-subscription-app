export {};
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function runWorker(): Promise<void> {
  const worker: Worker = await Worker.create({
    workflowsPath: require.resolve('./workflows.ts'),
    activities,
    taskQueue: 'signup',
  });
  await worker.run();
}

runWorker().catch((error) => {
  console.log(error);
  process.exit(1);
});
console.log(`Worker status: `);
