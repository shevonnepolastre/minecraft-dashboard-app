# Web Form to Notion to Azure App Service 
Minecraft Admin Dashboard using Azure App Service, Containerized Backend, and Notion Integration. Built to explore core AZ-104 concepts like App Services, VNet integration, and deployment automation

## Features

- Full-stack Node.js app with Express.js backend from [Notion](https://developers.notion.com/docs/getting-started)
- Integration with Notion API for data management using their [sample full-stack app to get started](https://developers.notion.com/docs/getting-started)
- Automated deployment using GitHub Actions using what I learned during the [Minecraft Server build](https://github.com/shevonnepolastre/minecraft-dashboard-app_
- Infrastructure as code using [Azure Bicep](https://learn.microsoft.com/en-us/azure/app-service/provision-resource-bicep?pivots=app-service-bicep-linux)
- Hosted on Azure App Service (Linux, 64-bit configuration)

## Resources Used 

https://developers.notion.com/docs/getting-started

https://github.com/makenotion/notion-sdk-js/tree/main/examples/web-form-with-expresshttps://learn.microsoft.com/en-us/azure/app-service/deploy-github-actions?tabs=userlevel%2Cnodejs

https://docs.github.com/en/actions/use-cases-and-examples/deploying/deploying-nodejs-to-azure-app-service

https://devblogs.microsoft.com/premier-developer/configure-azure-app-service-for-64-bit-platform-and-node-js/

https://learn.microsoft.com/en-us/azure/app-service/provision-resource-bicep?pivots=app-service-bicep-linux


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shevonnepolastre/minecraft-dashboard-app.git
cd minecraft-dashboard-app
npm install
```

### 2. Configure your variables 
Go to Notion to create an API.  There are two: 1. Internal if it's just for you 2. Public if you plan to have others use it.  Right now I am using Internal but when I build out the web form, I plan to change it to public 

You will also need the Notion page ID you will be using and add those to a file called ".env":

NOTION_KEY=your-notion-api-key
NOTION_PAGE_ID=your-notion-page-id

WARNING: DO NOT forget to add the .env file to your .gitignore 

You also want to add from Azure:

1. Client ID
2. Client Secret
3. Tenant ID
4. Subscription ID

I used a json so I wouldn't have a secret for each one.  

### 3. Use Bicep to Create App Service 

Use [bicep](https://github.com/shevonnepolastre/minecraft-dashboard-app/tree/main/infrastructure) to create app service. Do not forget to declare what App Service tier and language you will be using.  Also, make sure that you choose the proper OS for it.  There are apps that do not run on Linux, and others that do not run on Windows.  Make sure to check that.

### 4. Create your YAML file 
Make sure the [YAML file](https://github.com/shevonnepolastre/minecraft-dashboard-app/blob/main/.github/workflows/appservice.yml) is in .github/workflows 

### 5. Add self-hosted runner 
You can follow the Github [guide on self-hosted runners ](****https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners)

### 6. Test it out

Enter "node server.js" and then type in your browser "localhost:[number shown after typing node server.js]" and test that the form works and is connecting to Notion.  

### 7. Use bicep and yaml to create web app and App Service plan 

I created the bicep in the Infrastructure folder and the yaml is in .github/workflows 

### 8.  Deploy web app

You can connect to your repository, use VS Code, or do it manually 

### 9. Add variables in .env file into Environment Variables in Azure

Make sure to add the variables in the Environment Variables section in Azure and add this to your sever.js:

```

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

```

### 10. Use Debug Console and Log Stream to Workout Issues

If you have issues, use Debug Console and Log Stream to look at the errors you are receiving 


## Lessson Learned 

1. Linux is much easier to setup than Windows.  Not saying you shouldn't learn Windows but just an observation of which one is easier to work with
2. Add your .env to .gitignore BUT make sure you add those variables in Azure
3. You cannot use 64-bit on the free App Service plan
4. If you want to check out Deployment Slots, you need to go Standard or higher.  Basic doesn't have it
5. Do not be afraid to use other people's stuff and make it your own 
