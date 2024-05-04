import { NextResponse } from 'next/server'
import { CosmosClient } from "@azure/cosmos";

import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

let client: CosmosClient | undefined = undefined;

const getCosmosClient = (connectionString: string): CosmosClient => {
    if (!client) {
      client = new CosmosClient(connectionString);
    }
    return client;
  };

export async function GET() {
    const credential = new DefaultAzureCredential();
    const url = process.env.AZURE_KEYVAULT_URL as string;
    const client = new SecretClient(url, credential);
    const ConnectionString = await client.getSecret("ConnectionString");
    const CosmosDB = await client.getSecret("CosmosDB");
    const CosmosDBContainer = await client.getSecret("CosmosDBContainer");

    const container = getCosmosClient(ConnectionString.value).database(CosmosDB.value).container(CosmosDBContainer.value);

    const resources = await container.items
        .query({
            query: "SELECT * FROM c"
        })
        .fetchAll();

    return NextResponse.json(resources);
}