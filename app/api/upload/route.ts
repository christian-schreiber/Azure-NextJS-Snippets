import { NextRequest, NextResponse } from 'next/server'
import { BlobServiceClient } from '@azure/storage-blob';

import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

export async function PUT(request: NextRequest) {

  const credential = new DefaultAzureCredential();
  const url = process.env.AZURE_KEYVAULT_URL as string;
  const client = new SecretClient(url, credential);

  let StorageAccount = await client.getSecret("StorageAccount");
  let sasTOKEN = await client.getSecret("sasTOKEN");

  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const blobService = new BlobServiceClient(
    `https://${StorageAccount.value}.blob.core.windows.net/?${sasTOKEN.value}`
  );

  const containerClient = blobService.getContainerClient("upload");

  const blobClient = containerClient.getBlockBlobClient(file.name);

  const options = {
    blobHTTPHeaders: {
      blobContentType: file.type,
    },
  };

  const res = await blobClient.uploadData(buffer, options);

  const fileString = `https://${StorageAccount.value}.blob.core.windows.net/upload/${file.name}`;
    
  return NextResponse.json({ success: !!res, fileUrl: res ? fileString : undefined });
}