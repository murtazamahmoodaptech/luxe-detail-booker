# Complete Deployment Guide - Luxe Detail Booker

## Overview

Your system is now fully integrated with:
- **Backend**: Node.js/Express serverless functions on Vercel
- **Database**: MongoDB Atlas (cloud-hosted)
- **Email**: Stackmail SMTP for automated emails
- **Authentication**: JWT-based admin portal
- **Frontend**: React + Vite (to be hosted on Hostinger)

## Prerequisites

Before starting deployment, you need:

1. **MongoDB Atlas Account** - For database hosting
2. **Vercel Account** - For backend deployment
3. **Hostinger Account** - For frontend hosting  
4. **Stackmail Credentials** - SMTP details for sending emails

## Step 1: Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project called "Luxe Detail Booker"

### Create a Cluster
1. Click "Create a Cluster"
2. Choose the free tier (M0)
3. Select your preferred region (closest to your users)
4. Name the cluster "luxe-detail-cluster"
5. Wait for cluster to deploy (5-10 minutes)

### Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your database password
6. Save this string for Vercel setup

### Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and strong password
5. Give "Read and write to any database" permissions
6. Save these credentials

### Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Or add specific IPs for production
5. Click "Confirm"

## Step 2: Stackmail Email Setup

### Get SMTP Credentials
1. Log into your Stackmail account
2. Go to Settings → SMTP Configuration
3. Get these details:
   - **Host**: (e.g., smtp.stackmail.com)
   - **Port**: (usually 587 or 465)
   - **Username**: Your email address
   - **Password**: Your Stackmail password

### Test SMTP Connection
You can test with this curl command:
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>"
  }'
```

## Step 3: Deploy Backend to Vercel

### Connect Vercel to GitHub (Optional but Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import your GitHub repository
4. Or create new project from existing repo

### Add Environment Variables

1. Go to Vercel Project Settings
2. Click "Environment Variables"
3. Add these variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/luxe-detail-booker?retryWrites=true&w=majority
JWT_SECRET = your-very-long-random-secret-at-least-32-characters
STACKMAIL_HOST = smtp.stackmail.com (or your Stackmail host)
STACKMAIL_PORT = 587
STACKMAIL_SECURE = false
STACKMAIL_USER = info@vornoxlab.com
STACKMAIL_PASS = your-stackmail-password
ADMIN_EMAIL = info@vornoxlab.com
FRONTEND_URL = https://your-frontend-domain.com (update after hosting frontend)
```

### Deploy
1. Vercel should auto-deploy on git push
2. Or click "Deploy" in Vercel dashboard
3. Wait for build to complete
4. You'll get a URL like: `https://luxe-detail-booker.vercel.app`

### Test Backend
```bash
# Test health endpoint
curl https://luxe-detail-booker.vercel.app/api/health

# Should return: { "status": "ok" }
```

## Step 4: Create Admin User

### Option A: Using MongoDB Atlas UI (Easiest)
1. Go to MongoDB Atlas
2. Click "Collections" on your cluster
3. Create a new collection: `users`
4. Insert a document with proper structure (see below)

### Option B: Using API
```bash
curl -X POST https://your-vercel-url.vercel.app/api/auth?action=register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vornoxlab.com",
    "password": "YourStrongPassword123!",
    "fullName": "Admin User"
  }'
```

### Change User to Admin (MongoDB)
1. In MongoDB Atlas, find the user you just created
2. Edit the document
3. Change `"role": "user"` to `"role": "admin"`
4. Save

## Step 5: Deploy Frontend to Hostinger

### Build Frontend
```bash
npm run build
```

This creates an optimized `dist` folder.

### Upload to Hostinger
1. Log into Hostinger control panel
2. Go to File Manager
3. Navigate to `public_html` folder
4. Delete existing files
5. Upload all files from the `dist` folder
6. Wait for upload to complete

### Configure Environment Variables
1. In Hostinger, create `.env` file in root
2. Add:
```
VITE_API_BASE_URL=https://your-vercel-backend-url.vercel.app/api
```

Or, update the API URL in your build configuration before building:
```bash
# In your vite.config.ts or package.json
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api npm run build
```

### Enable HTTPS
1. In Hostinger, go to SSL Certificate
2. Click "Install" to add free Let's Encrypt SSL
3. Make sure it's auto-renewal is enabled

## Step 6: Update CORS Settings

Go back to Vercel and update `FRONTEND_URL`:

1. In Vercel Environment Variables
2. Update `FRONTEND_URL` to your Hostinger domain (e.g., `https://luxedetail.com`)
3. Redeploy to apply changes

## Step 7: Test Everything

### Test Contact Form
1. Go to `https://your-hostinger-domain.com/contact`
2. Fill out the form
3. Submit
4. Check:
   - Email arrives at info@vornoxlab.com
   - Contact appears in MongoDB `contacts` collection

### Test Booking Form
1. Go to Services page, add items to cart
2. Go to Book page
3. Fill form and submit
4. Check:
   - Email arrives at customer email
   - Email arrives at admin email
   - Appointment appears in MongoDB `appointments` collection

### Test Admin Portal
1. Go to `https://your-hostinger-domain.com/admin/login`
2. Login with admin credentials
3. Should see all bookings and contacts
4. Try editing/deleting an appointment

## Monitoring & Maintenance

### View Logs
**Vercel Logs:**
- Go to Vercel Dashboard → Deployments → Click deployment → Logs

**MongoDB Logs:**
- Go to MongoDB Atlas → Monitoring → see query patterns

### Monitor Emails
- Check Stackmail dashboard for delivery status
- Test emails monthly to ensure SMTP is working

### Update Promo Codes
- Done through admin dashboard
- Stored in MongoDB (can be added later)

### Backup Database
1. In MongoDB Atlas, set up backup:
   - Click "Backup" tab
   - Enable daily backups (free tier)
   - Set retention to 7 days

## Troubleshooting

### Backend Not Working
1. Check Vercel logs for errors
2. Verify all environment variables are set
3. Test MongoDB connection string
4. Check Stackmail credentials

### Emails Not Sending
1. Verify STACKMAIL credentials in Vercel
2. Check spam folder
3. Look at Stackmail delivery logs
4. Test with simple curl request

### Frontend Can't Reach API
1. Check `VITE_API_BASE_URL` is correct
2. Verify CORS is enabled in Vercel
3. Check frontend domain is in CORS whitelist
4. Look at browser Network tab for 403/CORS errors

### Login Not Working
1. Verify user exists in MongoDB
2. Check password is correct
3. Verify JWT_SECRET is set in Vercel
4. Look at console for error messages

### Database Connection Fails
1. Check IP is whitelisted in MongoDB Network Access
2. Verify connection string is correct
3. Check username/password in connection string
4. Ensure password is URL-encoded

## File Structure

```
luxe-detail-booker/
├── api/                          # Vercel serverless functions
│   ├── auth.ts                   # Login/register endpoint
│   ├── appointments.ts           # CRUD appointments
│   └── contact.ts                # Contact form submission
├── backend/
│   ├── config/
│   │   ├── database.ts           # MongoDB connection
│   │   └── cors.ts               # CORS configuration
│   ├── models/
│   │   ├── User.ts               # User schema
│   │   ├── Appointment.ts        # Appointment schema
│   │   └── Contact.ts            # Contact schema
│   ├── services/
│   │   └── emailService.ts       # Nodemailer setup
│   ├── middleware/
│   │   └── auth.ts               # JWT authentication
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── src/                          # Frontend React code
│   ├── pages/
│   │   ├── Contact.tsx           # Contact form (updated)
│   │   ├── Book.tsx              # Booking form (updated)
│   │   └── AdminDashboard.tsx    # Admin portal (updated)
│   ├── contexts/
│   │   └── AdminAuthContext.tsx  # Auth context (updated)
│   └── ...
├── .env.example                  # Example env variables
├── BACKEND_SETUP.md              # Detailed backend guide
├── DEPLOYMENT_GUIDE.md           # This file
└── vercel.json                   # Vercel configuration
```

## Quick Reference

### API Base URLs
- **Local**: `http://localhost:3000/api`
- **Vercel**: `https://your-project.vercel.app/api`

### API Endpoints
- `POST /api/auth?action=login` - Admin login
- `POST /api/auth?action=register` - Create user
- `GET/POST/PUT/DELETE /api/appointments` - Manage bookings
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

### Default Admin Credentials
- Email: `admin@vornoxlab.com`
- Password: Set during user creation

## Next Steps

1. [ ] Create MongoDB Atlas account and cluster
2. [ ] Get Stackmail SMTP credentials
3. [ ] Deploy backend to Vercel
4. [ ] Create admin user in MongoDB
5. [ ] Upload frontend to Hostinger
6. [ ] Test all forms and email delivery
7. [ ] Enable HTTPS on Hostinger
8. [ ] Set up daily MongoDB backups
9. [ ] Monitor logs and performance
10. [ ] Share admin portal link with team

## Support

If you encounter issues:

1. Check BACKEND_SETUP.md for detailed configuration
2. Review Vercel logs for backend errors
3. Check MongoDB Atlas for data issues
4. Test Stackmail SMTP connection
5. Use browser DevTools Network tab to debug API calls

## Success Indicators

You'll know everything is working when:

- [ ] Admin can login to portal
- [ ] Contact form sends emails
- [ ] Booking form creates appointments in database
- [ ] Admin sees real data in dashboard
- [ ] Promo codes are applied correctly
- [ ] All emails arrive without errors
