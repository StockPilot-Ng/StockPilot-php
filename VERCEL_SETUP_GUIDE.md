# Vercel & Neon Setup Guide for StockPilot

This guide explains how to deploy StockPilot to Vercel using a Neon PostgreSQL database.

## 1. Prerequisites
- A Vercel account connected to your Git repository.
- A Neon project and database.

## 2. Configuration Files
The following files have been added to your project to support Vercel:
- `vercel.json`: Configures the PHP runtime and URL rewrites.
- `api/index.php`: The entry point for Vercel functions.

## 3. Vercel Deployment Steps

### Step 1: Create a New Project
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **New Project** and import your Git repository.

### Step 2: Configure Environment Variables
In the **Environment Variables** section of your Vercel project, add all the values from [RENDER_ENV_TEMPLATE.md](./RENDER_ENV_TEMPLATE.md).

**Crucial Vercel-specific changes:**
- `APP_ENV`: `production`
- `APP_URL`: Your Vercel deployment URL (e.g., `https://stockpilot.vercel.app`).
- `DB_CONNECTION`: `pgsql` (for Neon).

### Step 3: Deploy
Click **Deploy**. Vercel will automatically build and deploy your application.

## 4. Limitations & Considerations on Vercel

### Read-Only Filesystem
Vercel's serverless functions have a read-only filesystem (except for `/tmp`).
- **Storage:** Laravel's default `local` disk will not work for persistent uploads. You must configure an external storage provider like **AWS S3** or **Google Cloud Storage** in `.env`.
- **Caching:** Ensure `CACHE_DRIVER`, `SESSION_DRIVER`, and `QUEUE_CONNECTION` are set to `database`, `redis`, or another external provider, as the local file drivers will reset on every execution.

### Background Jobs
Serverless functions have execution time limits. Long-running tasks (like large PDF generation or complex imports) may timeout. We recommend using a dedicated queue worker (like on Render or AWS) for heavy background processing.

## 5. Troubleshooting
If you encounter a 500 error:
1. Check the **Logs** tab in your Vercel project.
2. Ensure `APP_KEY` is set correctly.
3. Verify that your Neon database is accessible from Vercel (check Neon's IP allowlist/Project settings).
