import { NextResponse } from 'next/server'
import fetch from 'node-fetch';

import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

export async function GET() {

    const credential = new DefaultAzureCredential();

    //const url = process.env.AZURE_KEYVAULT_URL as string;
    const url = "https://nextazurekeyvault.vault.azure.net";

    const client = new SecretClient(url, credential);

    const Secret = await client.getSecret("LogicAppString");

    const response = await fetch(Secret.value, {
        method: 'GET'
    });

    const data = await response.text();
    return NextResponse.json(data);
}