# 🍦 FrostyPipeline — Full Stack DevOps Project

## 📌 About The Project
 
**FrostyPipeline** is a fully automated, full stack web application that demonstrates real-world **DevOps practices** using AWS cloud services and GitHub Actions CI/CD pipeline.
 
The project includes **two static websites** built with pure HTML & CSS:
- 🖥️ A **DevOps-themed landing page** explaining the pipeline
- 🍦 A **Scoops & Dreams Ice Cream website** with a live order form connected to a serverless backend
 
Every time code is pushed to the `main` branch, GitHub Actions automatically deploys both the **frontend to AWS S3** and the **backend Lambda function** — no manual steps required.
 
---
 
## 🌐 Live Demo
 
> 🔗 [Visit Live Website](http://icecream-site-frostypipeline.s3-website.ap-south-1.amazonaws.com)
 
---
 
## 🏗️ Architecture Overview
 
```
Developer (git push)
        │
        ▼
┌───────────────────┐
│   GitHub Actions  │  ← CI/CD Pipeline triggers automatically
│   deploy.yml      │
└───────┬───────────┘
        │
        ├──────────────────────────────────┐
        ▼                                  ▼
┌───────────────┐                ┌─────────────────────┐
│   AWS S3      │                │   AWS Lambda        │
│   (Frontend)  │                │   (Backend)         │
│               │                │   Node.js ES Module │
│ index.html    │                │   icecream-order-   │
│ style.css     │                │   handler           │
│ icecream.html │                └──────────┬──────────┘
│ icecream.css  │                           │
└───────────────┘                           ▼
        │                       ┌─────────────────────┐
        │                       │   AWS API Gateway   │
        │ User visits website   │   POST /order       │
        └──────────────────────▶│   (HTTP API)        │
                                └──────────┬──────────┘
                                           │
                                           ▼
                                ┌─────────────────────┐
                                │   AWS DynamoDB      │
                                │   icecream-orders   │
                                │   (NoSQL Database)  │
                                └─────────────────────┘
```
 
---
 
## 🔄 CI/CD Pipeline Workflow
 
```
Step 1 → git push origin main
Step 2 → GitHub Actions workflow triggers (deploy.yml)
Step 3 → AWS credentials configured via GitHub Secrets
Step 4 → Frontend HTML/CSS synced to S3 bucket
Step 5 → Lambda function zipped and deployed to AWS
Step 6 → Full stack live and updated in ~30 seconds
```
 
---
 
## 🛠️ Tech Stack
 
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5 + CSS3 | Two static websites |
| **Hosting** | AWS S3 | Static website hosting |
| **CI/CD** | GitHub Actions | Auto deployment pipeline |
| **Backend** | AWS Lambda (Node.js) | Serverless order handler |
| **API** | AWS API Gateway | REST API endpoint |
| **Database** | AWS DynamoDB | NoSQL order storage |
| **Security** | AWS IAM + GitHub Secrets | Secure credential management |
 
---
 
## 📁 Project Structure
 
```
frosty-pipeline/
│
├── 🍦 icecream.html           → Ice cream website + order form
├── 🎨 icecream.css            → Ice cream website styles
│
├── 📂 backend/
│   ├── index.js               → Lambda function (Node.js ES Module)
│   └── package.json           → ES module config
│
└── 📂 .github/
    └── 📂 workflows/
        └── deploy.yml         → GitHub Actions CI/CD pipeline
```
 
---
 
## ⚙️ How It Works — Step by Step
 
### 1️⃣ Frontend (AWS S3)
- Two HTML/CSS websites are hosted as **static websites on AWS S3**
- S3 bucket is configured with **public access** and a bucket policy for `s3:GetObject`
- Accessible via the S3 static website endpoint URL from **any device, anywhere**
 
### 2️⃣ CI/CD Pipeline (GitHub Actions)
- Every `git push` to the `main` branch triggers `deploy.yml` automatically
- The workflow uses **GitHub Secrets** to securely authenticate with AWS
- Frontend files are synced to S3 using `aws s3 sync`
- Backend Lambda code is zipped and deployed using `aws lambda update-function-code`
 
### 3️⃣ Backend (AWS Lambda)
- A **serverless Node.js function** handles incoming order requests
- Written as an **ES Module** (`import/export` syntax)
- Validates form data, generates a unique `orderId`, and saves to DynamoDB
- Returns a JSON response back to the website
 
### 4️⃣ API (AWS API Gateway)
- An **HTTP API** exposes the Lambda function as a REST endpoint
- Route: `POST /order`
- **CORS** is enabled so the S3 website can call the API from the browser
- Stage: `$default` (no prefix needed in URL)
 
### 5️⃣ Database (AWS DynamoDB)
- A **NoSQL table** `icecream-orders` stores every order placed
- Each record contains: `orderId`, `name`, `phone`, `flavor`, `quantity`, `createdAt`
- Partition key: `orderId` (UUID, auto-generated)
 
### 6️⃣ Security (AWS IAM + GitHub Secrets)
- A dedicated **IAM user** with minimum required permissions
- Credentials stored as **GitHub Secrets** (never hardcoded)
- Policies attached: `AmazonS3FullAccess`, `AWSLambdaFullAccess`, `AmazonDynamoDBFullAccess`
 
---
