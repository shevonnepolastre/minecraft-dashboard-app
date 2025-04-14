# minecraft-dashboard-app
Minecraft Admin Dashboard using Azure App Service, Containerized Backend, and Notion Integration. Built to explore core AZ-104 concepts like App Services, VNet integration, and deployment automation

## 🔗 Notion API Setup

To connect this project to your Notion workspace, you'll need to create a Notion API integration:

1. Go to [developers.notion.com](https://developers.notion.com/) and log in.  You can also check our their [SDK repository](https://github.com/makenotion/notion-sdk-js).


https://github.com/makenotion/notion-sdk-js/tree/main/examples/web-form-with-express

2. Click **"My integrations"** and create a new integration.
3. Give it a name (e.g., _Minecraft Dashboard Bot_) and choose your workspace.
4. Under **Capabilities**, enable the required permissions (e.g., read and write access).
5. After saving, you'll receive a **Secret Integration Token** — copy this securely. It will be used to authenticate API calls.
6. In your Notion workspace, open the database you want to connect to and click **"Share"**.
7. Add your integration as a collaborator by selecting its name — this gives it access to read/write to that database.
8. Retrieve the **Database ID** from the URL or by using the Notion API.

With the token and database ID, you're ready to connect your Azure-hosted app or script to Notion!

> 💡 Store your secret token and database ID in environment variables (like `.env`) and never commit them to GitHub.
