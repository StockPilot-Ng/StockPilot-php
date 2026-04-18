# Hosting and Setup Guide for Stockifly

This guide provides step-by-step instructions to host, publish, and start using the Stockifly platform.

## 1. Technical Requirements

Ensure your server meets the following requirements:

- **PHP Version:** 8.1 or higher
- **Database:** MySQL 5.7+ or MariaDB 10.3+
- **Required PHP Extensions:**
  - `openssl`
  - `pdo`
  - `mbstring`
  - `tokenizer`
  - `fileinfo`
  - `curl`
  - `zip`
  - `gd`
  - `bcmath`
  - `ctype`
  - `json`
  - `xml`
- **Web Server:** Apache (with `mod_rewrite` enabled) or Nginx
- **Node.js & NPM:** (For building frontend assets)

---

## 2. Deployment Steps

### Step 1: Upload Files
Upload all project files to your server's web root directory (e.g., `public_html` or `/var/www/html`).

### Step 2: Set File Permissions
Laravel requires certain directories to be writable by the web server. Run the following commands:
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```
Ensure the web server user (e.g., `www-data`) owns these directories.

### Step 3: Install Dependencies
Run the following commands in the root directory:
```bash
# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Install Node dependencies and build assets
npm install
npm run build
```

### Step 4: Environment Configuration
1. Copy `.env.example` to `.env`.
2. Generate the application key:
   ```bash
   php artisan key:generate
   ```
3. Configure your database details in the `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   ```
4. Set the `APP_URL` to your domain (e.g., `https://yourdomain.com`).
5. Set `APP_TYPE` to `saas` or `non-saas` depending on your needs.

---

## 3. Application Initialization

### Web-based Installer
The application includes an automated installer.
1. Navigate to your domain in a web browser.
2. If the application is not yet installed (i.e., `storage/installed` does not exist), you will be redirected to `/install`.
3. Follow the on-screen instructions to set up your database and admin account.

### Manual Migration (Optional)
If you prefer to run migrations manually:
```bash
php artisan migrate --seed
```
*Note: Seeding will create default data and admin accounts.*

---

## 4. Default Credentials

After installation/seeding, you can log in using the following default accounts (if not changed during installation):

### Admin (Non-SaaS / Standard)
- **Email:** `admin@example.com`
- **Password:** `12345678`

### Super Admin (SaaS Mode)
- **Email:** `superadmin@example.com`
- **Password:** `12345678`

*Note: For security, change these passwords immediately after your first login.*

---

## 5. Starting to Use the Platform

1. **Login:** Access the login page via your domain.
2. **Dashboard:** Once logged in, you will be directed to the dashboard.
3. **Setup:**
   - Go to **Settings** to configure your company details, currency, and warehouse.
   - Add **Staff Members** and assign roles.
   - Start adding **Brands**, **Categories**, and **Products**.
   - Manage your **Customers** and **Suppliers**.
4. **Operations:**
   - Use the **POS** or **Sales** module to create invoices.
   - Use the **Purchases** module to record incoming stock.
   - Monitor your business growth through the **Reports** section.
