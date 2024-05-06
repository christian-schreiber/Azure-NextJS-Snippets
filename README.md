## Variables

```bash
$SubscriptionID = "Your Tenant ID"
$Location = "germanywestcentral"
$ResourceGroup = "Azure-NextJS-Snippets"
$WebAppName = "Azure-NextJS-Snippets-App"
$B1ServicePlan = "AzureNextJSSnippetsBasicPlan"
```

Pricing [App Service – „Basic“-Plan](https://azure.microsoft.com/de-de/pricing/details/app-service/windows/)

## Login to Azure CLI

```bash
az login
az account set --subscription $SubscriptionID
```

## Create Ressource Group

```bash
az group create --name $ResourceGroup --location $Location --subscription $SubscriptionID
```

## Create Service Plan for your Web App

```bash
az appservice plan create --name $B1ServicePlan --resource-group $ResourceGroup --location $Location --sku B1 --subscription $SubscriptionID
```

## Create Web App

```bash
az webapp create --name $WebAppName --resource-group $ResourceGroup --plan $B1ServicePlan --runtime "NODE:20LTS" --https-only true --public-network-access Enabled --subscription $SubscriptionID
```

# Set NODE.JS default version

```bash
az webapp config appsettings set --resource-group $ResourceGroup --name $WebAppName --settings WEBSITE_NODE_DEFAULT_VERSION=~20
```

# GitHub Workflow

```bash
name: Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: windows-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"

      - name: Install packages and build
        run: |
          npm install
          npm run build

        env:
          AZURE_KEYVAULT_URL: ${{ secrets.AZURE_KEYVAULT_URL }}
          AZURE_AD_CLIENT_ID: ${{ secrets.AZURE_AD_CLIENT_ID }}
          AZURE_AD_CLIENT_SECRET: ${{ secrets.AZURE_AD_CLIENT_SECRET }}
          AZURE_AD_TENANT_ID: ${{ secrets.AZURE_AD_TENANT_ID }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}

      - name: Frontend Zip Release
        uses: TheDoctor0/zip-release@0.7.6
        with:
          filename: Release.zip
          path: .

      - name: Frontend Upload release artifact for deployment
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: Release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: "Production"
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: 'Deploy to Azure Web App'
        uses: azure/webapps-deploy@v2
        id: deploy-to-webapp
        with:
          app-name: 'Azure-NextJS-Snippets-App'
          slot-name: 'Production'
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_Your_Profile_ }}
          package: Release.zip

```

