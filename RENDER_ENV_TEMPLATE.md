# Render & Neon .env Template

Copy and paste these values into the **Environment Variables** section of your Render Web Service.

```env
# Application Configuration
APP_NAME=StockPilot
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com

# Database Configuration (Neon Postgres)
DB_CONNECTION=pgsql
DB_HOST=your-neon-hostname.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=your-username
DB_PASSWORD=your-password

# Generate this locally using 'php artisan key:generate --show'
APP_KEY=base64:q0vaYh6aZGFgS0SymgLC+9NcNUm7R+87pxCU8CSZuG8=

# Security
# Generate a new random string for JWT_SECRET
JWT_SECRET=IzCfOXLrKi5Hq9ZhW7vROlUn8NFlKSaF4vlgvJnFuqnQcyJrYe7JaecXOb0iqc5B
JWT_TTL=365

# Drivers
LOG_CHANNEL=errorlog
BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Stripe (Optional)
STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=

# Mail (Optional - Configure for notifications)
MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="${APP_NAME}"
```

### Important Notes for Render:
1. **APP_KEY:** Never share this key. Generate a unique one for your production site.
2. **Database:** Ensure you use the `pgsql` connection details from your Neon dashboard.
3. **Sensitive Data:** On Render, it is safer to enter these individually in the **Environment** tab of your service rather than uploading a `.env` file to your repository.
