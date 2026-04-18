# Hosting and Setup Guide for Stockifly

This guide provides step-by-step instructions to host, publish, and start using the Stockifly platform.

---

## 1. Recommended Hosting: Render

For the easiest deployment experience, we recommend using **Render**. It provides a managed environment for PHP/Laravel with an integrated build pipeline.

### Why Render?
- **Automated Builds:** Automatically runs `composer install` and `npm run build` on every push to your Git repository.
- **Managed PHP:** Handles the server configuration, so you don't have to manage Apache or Nginx manually.
- **Scalability:** Easily scale your application as your user base grows.

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
   *Note: For production, you may want to use a web server like Nginx; Render provides documentation for this.*
5. **Environment Variables:** Add your `.env` variables in the "Environment" tab of your Render service.

---

## 2. Recommended Database: Neon (Postgres)

You can use **Neon** for a serverless, scalable PostgreSQL database.

### Setup on Neon:
1. **Create Project:** Create a new project in the Neon console.
2. **Connection String:** Copy the connection string provided.
3. **Laravel Configuration:** Update your `.env` file to use the `pgsql` driver:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=your-neon-hostname.neon.tech
   DB_PORT=5432
   DB_DATABASE=neondb
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   ```
   *Note: Ensure your database password does not contain special characters that require URL encoding, or use the full connection string URL if supported.*

### PostgreSQL Compatibility Note:
The application was primarily tested with MySQL. While Laravel's Eloquent ORM is database-agnostic, some manual migrations (using `DB::statement`) might contain MySQL-specific syntax (like backticks \` or `CHANGE COLUMN`). If you encounter errors during migration, you may need to update these specific migration files to use standard SQL or Postgres-compatible syntax.

---

## 3. Technical Requirements

If you choose to host on your own server, ensure it meets these requirements:

- **PHP Version:** 8.1 or higher
- **Required PHP Extensions:** `openssl`, `pdo`, `mbstring`, `tokenizer`, `fileinfo`, `curl`, `zip`, `gd`, `bcmath`, `ctype`, `json`, `xml`.
- **Node.js & NPM:** For building frontend assets.

---

## 4. Deployment Steps (Standard Server)

### Step 1: Set File Permissions
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Step 2: Install Dependencies
```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

---

## 5. Application Initialization

### Web-based Installer
1. Navigate to your domain.
2. If the application is not yet installed (i.e., `storage/installed` does not exist), you will be redirected to `/install`.
3. Follow the on-screen instructions.

### Default Credentials
- **Admin (Non-SaaS):** `admin@example.com` / `12345678`
- **Super Admin (SaaS):** `superadmin@example.com` / `12345678`

---

## 6. Starting to Use the Platform

1. **Setup:** Go to **Settings** to configure company details.
2. **Inventory:** Add **Brands**, **Categories**, and **Products**.
3. **Users:** Add **Staff Members**, **Customers**, and **Suppliers**.
4. **Operations:** Use the **POS** or **Sales** module for invoices, and **Purchases** to record stock.
