import { NextResponse } from 'next/server'
import { CosmosClient, Container } from "@azure/cosmos";
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

let client: CosmosClient | undefined = undefined;
let container: Container | undefined = undefined;

const getCosmosClient = (connectionString: string): CosmosClient => {
    if (!client) {
      client = new CosmosClient(connectionString);
    }
    return client;
  };

  const getContainer = (connectionString: string, dbName: string, containerName: string): Container => {
    if (!container) {
        const client = getCosmosClient(connectionString);
        container = client.database(dbName).container(containerName);
    }
    return container;
};

export async function GET() {
    const credential = new DefaultAzureCredential();
    const url = process.env.AZURE_KEYVAULT_URL as string;
    const client = new SecretClient(url, credential);
    const ConnectionString = await client.getSecret("ConnectionString");
    const CosmosDB = await client.getSecret("CosmosDB");
    const CosmosDBContainer = await client.getSecret("CosmosDBContainer");

    const container = getContainer(ConnectionString.value, CosmosDB.value, CosmosDBContainer.value);

    const resources = await container.items
        .query({
            query: "SELECT TOP 50 * FROM c"
        })
        .fetchAll();

    return NextResponse.json(resources);
}

export async function POST(request: Request) {
    const body = await request.json();
    const credential = new DefaultAzureCredential();
    const url = process.env.AZURE_KEYVAULT_URL as string;
    const client = new SecretClient(url, credential);
    const ConnectionString = await client.getSecret("ConnectionString");
    const CosmosDB = await client.getSecret("CosmosDB");
    const CosmosDBContainer = await client.getSecret("CosmosDBContainer");

    const container = getContainer(ConnectionString.value, CosmosDB.value, CosmosDBContainer.value);

    const resources = await container.items
        .query({
            query: `SELECT * FROM c WHERE c.id = @id`,
            parameters: [{ name: '@id', value: body.id }]
        })
        .fetchAll();

    return NextResponse.json(resources);
}