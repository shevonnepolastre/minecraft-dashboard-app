# Minecraft Dashboard – Azure App Service + Notion Integration

This project is a hands-on learning solution that brings together Azure App Services, Containers, and Virtual Network integration—all wrapped in a Minecraft-themed use case.

I created this to better understand key Azure Administrator (AZ-104) concepts by building something practical and fun.

## 🌐 What It Does

- Hosts a front-end web form using Azure App Service
- Connects to a Python/Node.js backend container to process form data
- Writes submitted data to a Notion dashboard using the Notion API
- Optionally stores Minecraft server data in Azure storage or a VNet-connected database
- Demonstrates infrastructure-as-code (IaC) using Bicep templates
- Uses GitHub Actions for CI/CD automation

## 📚 Why This Project?

I wanted to reinforce the following Azure skills while working on something I’d actually use:
- App Service deployment (code and containers)
- Container Registry and Docker basics
- VNet integration for web apps and APIs
- Private DNS, NSG, and service endpoints (optional for VNet extensions)
- Notion API integration (just for fun and productivity)

## 🚀 Technologies

- Azure App Service
- Azure Container Registry
- Azure Virtual Network
- Notion API
- GitHub Actions (CI/CD)
- Docker + Flask or Node.js
- Bicep (Infrastructure as Code)

## 📁 Repo Structure

```plaintext
├── app/               # Frontend + Backend code
├── infra/             # Bicep templates and scripts
├── notion-integration/
├── quests/            # Learning notes and AZ-104 study docs
├── .github/workflows/ # GitHub Actions workflows
└── README.md
