# Hosting and Setup Guide for StockPilot

This guide provides step-by-step instructions to host, publish, and start using the StockPilot platform.

---

## 1. Recommended Hosting: Render

For the easiest deployment experience, we recommend using **Render**. It provides a managed environment for PHP/Laravel with an integrated build pipeline.

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
   - Use the values from [RENDER_ENV_TEMPLATE.md](./RENDER_ENV_TEMPLATE.md) as a guide to set up your variables.

### Troubleshooting Render Build (Exit Status 127)
If your build fails with "Exited with status 127", it usually means a command in your Build Command string (e.g., `npm` or `composer`) is not found or there is a permission issue.
- **Check Runtime:** Ensure you selected the **PHP** runtime.
- **Dependency Availability:** Render's PHP environment includes `composer` and `npm` by default. If the error persists, try running them as separate steps or checking the full logs for which specific command failed.
- **Memory Limits:** Sometimes large `npm install` operations can hit memory limits. Ensure you are using a plan with sufficient resources.

---

## 2. Recommended Database: Neon (Postgres)

You can use **Neon** for a serverless, scalable PostgreSQL database.

### Setup on Neon:
1. **Create Project:** Create a new project in the Neon console.
2. **Connection String:** Copy the connection details from your Neon dashboard.
3. **Laravel Configuration:** Use the `pgsql` driver and update your environment variables accordingly.

### PostgreSQL Compatibility Note:
The application was primarily tested with MySQL. While Laravel's Eloquent ORM is database-agnostic, some manual migrations (using `DB::statement`) might contain MySQL-specific syntax (like backticks \` or `CHANGE COLUMN`). If you encounter errors during migration, you may need to update these specific migration files to use standard SQL or Postgres-compatible syntax.

---

## 3. Technical Requirements (Own Server)

- **PHP Version:** 8.1 or higher
- **Required PHP Extensions:** `openssl`, `pdo`, `mbstring`, `tokenizer`, `fileinfo`, `curl`, `zip`, `gd`, `bcmath`, `ctype`, `json`, `xml`.
- **Node.js & NPM:** For building frontend assets.

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
