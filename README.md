## Variables

```bash
$SubscriptionID = "Your Tenant ID"
$Location = "germanywestcentral"
$ResourceGroup = "Azure-NextJS-Snippets"
$WebAppName = "Azure-NextJS-Snippets-App"
$B1ServicePlan = "AzureNextJSSnippetsBasicPlan"
```

Pricing [App Service – „Basic“-Plan]([https://pages.github.com/](https://azure.microsoft.com/de-de/pricing/details/app-service/windows/))

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

