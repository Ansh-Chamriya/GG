---
description: Complete guide to deploy GearGuard backend API on Vercel
---

# 🚀 GearGuard Backend Deployment to Vercel

## Overview
This guide walks you through deploying the FastAPI backend to Vercel's serverless platform.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure these files are correctly configured:

### 1. `vercel.json` (in project root)
```json
{
    "version": 2,
    "builds": [
        {
            "src": "backend/app/main.py",
            "use": "@vercel/python",
            "config": {
                "maxLambdaSize": "50mb"
            }
        }
    ],
    "routes": [
        { "src": "/api/(.*)", "dest": "backend/app/main.py" },
        { "src": "/docs", "dest": "backend/app/main.py" },
        { "src": "/redoc", "dest": "backend/app/main.py" },
        { "src": "/openapi.json", "dest": "backend/app/main.py" },
        { "src": "/health", "dest": "backend/app/main.py" },
        { "src": "/ready", "dest": "backend/app/main.py" },
        { "src": "^/$", "dest": "backend/app/main.py" }
    ]
}
```

### 2. `requirements.txt` (in project root)
Must include:
- `fastapi==0.109.0`
- `mangum==0.17.0` (serverless adapter - **CRITICAL**)
- `libsql-client` (HTTP client for Turso - **NOT libsql**)
- All other dependencies

### 3. `backend/app/main.py`
Must have the Mangum handler at the bottom:
```python
try:
    from mangum import Mangum
    handler = Mangum(app, lifespan="off")
except ImportError:
    handler = None
```

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Turso Database URL

Your Turso URL needs to be in **HTTPS format** for the HTTP client:

| Original Format | Required Format |
|-----------------|-----------------|
| `libsql://your-db.turso.io` | `https://your-db.turso.io` |
| `wss://your-db.turso.io` | `https://your-db.turso.io` |

**Note**: The code automatically converts `wss://` to `https://`, but using `https://` directly is recommended.

---

### Step 2: Go to Vercel Dashboard

1. Open [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sign in with GitHub (recommended for auto-deployment)

---

### Step 3: Create New Project

1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. Find and select the **`Ansh-Chamriya/GG`** repository
4. Click **"Import"**

---

### Step 4: Configure Build Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework Preset** | `Other` | Not Next.js or any preset |
| **Root Directory** | `.` (leave empty) | Uses project root where vercel.json is |
| **Build Command** | (leave empty) | Vercel auto-detects from vercel.json |
| **Output Directory** | (leave empty) | Not needed for Python |
| **Install Command** | (leave empty) | Vercel uses requirements.txt |

---

### Step 5: Configure Environment Variables

Click **"Environment Variables"** section and add each of the following:

#### Required Variables

| Key | Example Value | Description |
|-----|---------------|-------------|
| `TURSO_DATABASE_URL` | `https://gearguard-db.turso.io` | Your Turso database URL (**use https://**) |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQS...` | Your Turso auth token |
| `JWT_SECRET_KEY` | `your-super-secret-key-minimum-32-characters` | JWT signing key (min 32 chars) |
| `APP_ENV` | `production` | Environment mode |
| `DEBUG` | `false` | Disable debug mode |

#### Optional but Recommended

| Key | Example Value | Description |
|-----|---------------|-------------|
| `RUN_MIGRATIONS` | `true` | Set to `true` for first deploy, then `false` |
| `SUPER_ADMIN_EMAIL` | `admin@yourcompany.com` | Super admin email |
| `SUPER_ADMIN_PASSWORD` | `SecurePassword123!` | Super admin password |
| `LOG_LEVEL` | `INFO` | Logging level |

#### Email Configuration (Optional)

| Key | Example Value |
|-----|---------------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASSWORD` | `your-app-password` |
| `SMTP_FROM_NAME` | `GearGuard` |
| `SMTP_FROM_EMAIL` | `noreply@gearguard.com` |

---

### Step 6: Deploy

1. Click the **"Deploy"** button
2. Wait for the build to complete (usually 1-3 minutes)
3. Watch the build logs for any errors

---

### Step 7: Verify Deployment

After successful deployment, test these endpoints:

| Endpoint | Expected Response |
|----------|-------------------|
| `https://your-app.vercel.app/` | API info JSON |
| `https://your-app.vercel.app/health` | Health status |
| `https://your-app.vercel.app/docs` | Swagger UI |
| `https://your-app.vercel.app/redoc` | ReDoc documentation |
| `https://your-app.vercel.app/api/v1/auth/register` | Registration endpoint |

---

### Step 8: Post-Deployment Configuration

After the first successful deployment:

1. Go to **Project Settings** → **Environment Variables**
2. Change `RUN_MIGRATIONS` from `true` to `false`
3. This prevents migrations from running on every cold start

---

## 🔧 Troubleshooting

### Issue: "Module not found" errors
**Solution**: Ensure `requirements.txt` is in the **project root** (not just in backend/)

### Issue: "Handler not found"
**Solution**: Verify `backend/app/main.py` has the `handler = Mangum(app)` line

### Issue: Database connection errors
**Solution**: 
- Verify `TURSO_DATABASE_URL` uses `https://` prefix
- Verify `TURSO_AUTH_TOKEN` is correct

### Issue: 500 errors on API calls
**Solution**: Check Vercel function logs in the dashboard under **Deployments** → **Functions**

### Issue: CORS errors from frontend
**Solution**: The backend already has `allow_origins=["*"]` configured

---

## 🔗 Connecting Frontend

After backend deployment, update your frontend environment:

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

---

## 📊 Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Platform                       │
├─────────────────────────────────────────────────────────┤
│  vercel.json (routes all requests to main.py)           │
│       ↓                                                  │
│  @vercel/python (builds Python lambda)                  │
│       ↓                                                  │
│  Mangum (adapts ASGI to AWS Lambda format)              │
│       ↓                                                  │
│  FastAPI (your application)                             │
│       ↓                                                  │
│  libsql-client (HTTP) → Turso Database (cloud)          │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Quick Reference Commands

```bash
# Check git status
git status

# Add all changes
git add -A

# Commit changes
git commit -m "deploy: Update backend configuration"

# Push to trigger Vercel deployment
git push origin main
```

---

## 📝 Environment Variables Template

Copy this and fill in your values:

```
TURSO_DATABASE_URL=https://YOUR-DB-NAME.turso.io
TURSO_AUTH_TOKEN=YOUR_AUTH_TOKEN
JWT_SECRET_KEY=YOUR_SECRET_KEY_MINIMUM_32_CHARACTERS
APP_ENV=production
DEBUG=false
RUN_MIGRATIONS=true
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=YourSecurePassword123!
LOG_LEVEL=INFO
```

---

**Good luck with your deployment! 🎉**
