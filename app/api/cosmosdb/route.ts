import { NextResponse } from 'next/server'
import { CosmosClient } from "@azure/cosmos";


import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

export async function GET() {
    const credential = new DefaultAzureCredential();
    const url = process.env.AZURE_KEYVAULT_URL as string;
    const client = new SecretClient(url, credential);
    const CosmosDBHost = await client.getSecret("CosmosDBHost");
    const CosmosDBMasterKey = await client.getSecret("CosmosDBMasterKey");

    const cosmosClient = new CosmosClient({
        endpoint: CosmosDBHost.value,
        key: CosmosDBMasterKey.value,
    });

    const { resources } = await cosmosClient.databases.readAll().fetchAll();

    return NextResponse.json(resources);
}