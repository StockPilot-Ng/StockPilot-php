# Hosting and Setup Guide for StockPilot

This guide provides step-by-step instructions to host, publish, and start using the StockPilot platform.

---

## 1. Hosting Options

### Option A: Render (Recommended for full functionality)
Render provides a managed environment for PHP/Laravel with persistent storage and a standard build pipeline.
- **Guide:** Follow the instructions in the "Setup on Render" section below.
- **Best for:** Applications that need file storage, background queues, and long-running tasks.

### Option B: Vercel (Alternative for quick deployments)
Vercel is a high-performance serverless platform. Note that it has a read-only filesystem and execution time limits.
- **Guide:** [VERCEL_SETUP_GUIDE.md](./VERCEL_SETUP_GUIDE.md)
- **Best for:** Speed and simplicity, if you use external storage (like S3) for uploads.

---

## 2. Recommended Hosting: Render

### Setup on Render:
1. **New Web Service:** In your Render dashboard, create a new Web Service and connect your Git repository.
2. **Environment:** Select **PHP** as the runtime.
3. **Build Command:**
   ```bash
   composer install --optimize-autoloader --no-dev && npm install && npm run build
   ```
4. **Start Command:**
   ```bash
   php artisan serve --host 0.0.0.0 --port $PORT
   ```
5. **Environment Variables:**
   - Go to the **Environment** tab in Render.
   - Use the values from [RENDER_ENV_TEMPLATE.md](./RENDER_ENV_TEMPLATE.md) as a guide.

### Troubleshooting Render Build (Exit Status 127)
If your build fails with "Exited with status 127":
- Ensure you selected the **PHP** runtime.
- Check that `composer` and `npm` are available in the logs.
- Large `npm install` may require more memory than available on the free tier.

---

## 3. Recommended Database: Neon (Postgres)

You can use **Neon** for a serverless, scalable PostgreSQL database.

### Setup on Neon:
1. **Create Project:** Create a new project in the Neon console.
2. **Connection String:** Copy the connection details from your Neon dashboard.
3. **Laravel Configuration:** Use the `pgsql` driver and update your environment variables.

### PostgreSQL Compatibility Note:
The application was primarily tested with MySQL. While Laravel's Eloquent ORM is database-agnostic, some manual migrations (using `DB::statement`) might contain MySQL-specific syntax (like backticks \` or `CHANGE COLUMN`). If you encounter errors during migration, update these specific migration files to use standard SQL or Postgres-compatible syntax.

---

## 4. Application Initialization

### Web-based Installer
1. Navigate to your domain.
2. If the application is not yet installed (i.e., `storage/installed` does not exist), you will be redirected to `/install`.
3. Follow the on-screen instructions.

### Default Credentials
- **Admin (Non-SaaS):** `admin@example.com` / `12345678`
- **Super Admin (SaaS):** `superadmin@example.com` / `12345678`

---

## 5. Starting to Use the Platform

1. **Setup:** Go to **Settings** to configure company details.
2. **Inventory:** Add **Brands**, **Categories**, and **Products**.
3. **Users:** Add **Staff Members**, **Customers**, and **Suppliers**.
4. **Operations:** Use the **POS** or **Sales** module for invoices, and **Purchases** to record stock.
