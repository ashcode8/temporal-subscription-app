// clientSingleton.js
import { Client, Connection } from '@temporalio/client';

let clientInstance: Client;

export const getClientInstance = async () => {
  if (!clientInstance) {
    const connection = await Connection.connect();
    clientInstance = new Client({ connection });
  }
  return clientInstance;
};
