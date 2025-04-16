@description('Web app name.')
@minLength(2)
param webAppName string = 'minecraftwebapp'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Describes plan\'s pricing tier and instance size.')
@allowed([
  'F1'
  'D1'
  'B1'
  'B2'
  'B3'
  'S1'
  'S2'
  'S3'
  'P1'
  'P2'
  'P3'
  'P4'
])
param sku string = 'B1'

@description('The language stack of the app.')
@allowed([
  '.net'
  'php'
  'node'
  'html'
  'java'
])
param language string = 'node'

@description('Optional Git Repo URL. If empty, a sample will be used.')
param repoUrl string = 'https://github.com/shevonnepolastre/minecraft-dashboard-app'

@description('Git branch to deploy from.')
param branch string = 'main'

var appServicePlanName = 'AppServicePlan-${webAppName}'

var gitRepoReference = {
  '.net': 'https://github.com/Azure-Samples/app-service-web-dotnet-get-started'
  node: 'https://github.com/Azure-Samples/nodejs-docs-hello-world'
  php: 'https://github.com/Azure-Samples/php-docs-hello-world'
  html: 'https://github.com/Azure-Samples/html-docs-hello-world'
}

var gitRepoUrl = empty(repoUrl) ? gitRepoReference[language] : repoUrl

var configReference = {
  '.net': {
    comments: '.NET app'
  }
  html: {
    comments: 'HTML app'
  }
  php: {
    phpVersion: '7.4'
  }
  node: {
    appSettings: [
      {
        name: 'WEBSITE_NODE_DEFAULT_VERSION'
        value: '~18'
      }
    ]
  }
  java: {
    javaVersion: '11'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: sku
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    siteConfig: union(configReference[language], {
      linuxFxVersion: 'NODE|18-lts'
      minTlsVersion: '1.2'
      scmMinTlsVersion: '1.2'
      ftpsState: 'FtpsOnly'
    })
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}

resource gitsource 'Microsoft.Web/sites/sourcecontrols@2022-03-01' = {
  parent: webApp
  name: 'web'
  properties: {
    repoUrl: gitRepoUrl
    branch: branch
    isManualIntegration: true
  }
}
