---
description: Comprehensive guide to deploy the GearGuard frontend to Vercel
---

# Deploying GearGuard Frontend to Vercel

This workflow outlines the steps to deploy the Next.js frontend to Vercel.

## Prerequisites

- [ ] A Vercel account (https://vercel.com).
- [ ] A GitHub/GitLab/Bitbucket account connected to Vercel.
- [ ] The backend deploy URL (e.g., from Render).

## Step 1: Push Code to Git

Ensure your latest code is committed and pushed to your remote repository.

```bash
git add .
git commit -m "Ready for frontend deployment"
git push origin master
```

## Step 2: Import Project in Vercel

1.  Log in to your Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your git provider (e.g., GitHub) and import the **GearGuard** repository.

## Step 3: Configure Project Settings

This is the most critical step because your project is in a subdirectory (`frontend`).

1.  **Framework Preset**: Ensure "Next.js" is selected.
2.  **Root Directory**: Click "Edit" and select `frontend`.
    *   Vercel needs to know the Next.js app is inside the `frontend` folder, not the root.
3.  **Build and Output Settings**:
    *   **Build Command**: `next build` (Default is fine, no need to override unless necessary).
    *   **Install Command**: `npm install` (Make sure there are NO backticks or quotes around it if you override it).

## Step 4: Environment Variables

You need to connect your frontend to your backend.

1.  Expand the **"Environment Variables"** section.
2.  Add the following variable:
    *   **Key**: `NEXT_PUBLIC_API_URL`
    *   **Value**: Your production backend URL.
        *   Example: `https://gearguard-api.onrender.com/api/v1`
3.  (Optional) If you have other variables in `.env.local` (like analytics keys), add them here too.

## Step 5: Verify Connection (Optional)

You can verify that your frontend connects to the production backend locally before deploying.

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file pointing to PRODUCTION
# Replace the URL below with your actual backend URL if different
echo "NEXT_PUBLIC_API_URL=https://gearguard-api.onrender.com/api/v1" > .env.local

# Start development server
npm run dev
```

## Step 6: Deploy

1.  Click **"Deploy"**.
2.  Wait for the build to complete. Vercel will install dependencies, build the Next.js app, and deploy it.
3.  Once finished, you will get a production URL (e.g., `gearguard-frontend.vercel.app`).

## Step 7: Verify Service

1.  Visit your new Vercel URL.
2.  Check the "Network" tab in Developer Tools (F12) to ensure requests are going to your production backend (not `localhost`).
3.  Try logging in to verify end-to-end connectivity.

## Troubleshooting

-   **Install Command Failed**: Check if you accidentally pasted backticks (`` ` ``) into the command field in Vercel settings. It should be just `npm install`.
-   **404 on API Calls**: Check that `NEXT_PUBLIC_API_URL` is correct and includes the api prefix if needed.
-   **CORS Errors**: Ensure your Backend (Render) is configured to allow requests from your new Vercel domain.
