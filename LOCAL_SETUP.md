# Local Development Setup Guide

## Prerequisites
- **Node.js** (v16 or higher) - Download from https://nodejs.org/
- **npm** - Comes with Node.js
- **MongoDB Atlas account** (free tier available) - https://www.mongodb.com/cloud/atlas
- **Git** - https://git-scm.com/

## Step 1: Verify Node.js Installation

Open PowerShell and verify installations:

```bash
node --version
npm --version
```

You should see version numbers (e.g., v18.17.0 and 9.6.7).

## Step 2: Clone/Download Project

```bash
# If using Git
git clone https://github.com/murtazamahmoodaptech/luxe-detail-booker.git
cd luxe-detail-booker

# Or extract your downloaded ZIP and open in PowerShell
cd "path\to\luxe-detail-booker"
```

## Step 3: Install Frontend Dependencies

```bash
# Install all packages from package.json
npm install

# Wait for completion (may take 2-5 minutes first time)
```

## Step 4: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example
copy .env.example .env.local

# OR create manually and add:
VITE_API_BASE_URL=http://localhost:3000/api
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key_here
STACKMAIL_HOST=smtp.stackmail.com
STACKMAIL_PORT=587
STACKMAIL_USER=your_email@vornoxlab.com
STACKMAIL_PASS=your_password
```

## Step 5: Get MongoDB Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier)
3. Create a new project
4. Create a cluster (free tier available)
5. Click "Connect" → "Drivers" → Copy connection string
6. Replace `<password>` and database name in your `.env.local`

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/luxe-detail-booker
```

## Step 6: Run Frontend Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.4.19  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

**Open in browser:** http://localhost:5173/

## Step 7: Run Backend Server (Optional - For Local Testing)

In a NEW PowerShell window:

```bash
# Navigate to project directory
cd "path\to\luxe-detail-booker"

# Install backend dependencies (if not already done)
npm install

# For Vercel deployment, backend is handled by serverless functions
# But to test locally, you can use the server.ts file:
npm run dev  # This will start Vite, which includes backend routes in dev mode
```

## Step 8: Testing the System

### Test Contact Form
1. Go to http://localhost:5173/contact
2. Fill in the form
3. Click "Send Message"
4. Check your terminal for any errors
5. Email should be sent to your inbox (from info@vornoxlab.com)

### Test Booking System
1. Go to http://localhost:5173/book
2. Add services from the Services page first
3. Fill booking form
4. Submit
5. Check MongoDB for the new appointment
6. Admin should receive email notification

### Test Admin Login
1. Create a user in MongoDB first:
   ```bash
   # Via MongoDB Atlas UI or Compass
   # Add to "users" collection:
   {
     "email": "admin@test.com",
     "password": "hashedPasswordHere",  // Use bcrypt to hash
     "fullName": "Admin User",
     "role": "admin"
   }
   ```
2. Go to http://localhost:5173/admin/login
3. Login with your credentials
4. View real appointments in dashboard

## Troubleshooting

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### MongoDB connection error
- Check connection string in `.env.local`
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for dev)
- Ensure network is connected

### Email not sending
- Check STACKMAIL credentials are correct
- Verify STACKMAIL_PORT is 587 (for TLS) or 25 (for regular)
- Check email service isn't rate limiting

### Build fails
```bash
# Clear node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
npm run build
```

## Git Commands (If Using GitHub)

```bash
# Check branch
git branch -a

# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Create new branch for testing
git checkout -b test-backend

# Push changes
git add .
git commit -m "Testing backend integration"
git push origin test-backend
```

## Deployment to Vercel

When ready to deploy:

```bash
# Push to GitHub
git push origin main

# Go to https://vercel.com
# Import your GitHub repository
# Add environment variables in Vercel dashboard
# Deploy!
```

## File Structure

```
luxe-detail-booker/
├── api/                      # Vercel serverless functions
│   ├── auth.ts              # Authentication endpoints
│   ├── appointments.ts       # Booking endpoints
│   └── contact.ts           # Contact form endpoint
├── backend/                  # Backend utilities
│   ├── config/
│   │   ├── database.ts      # MongoDB connection
│   │   └── cors.ts          # CORS settings
│   ├── models/              # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Appointment.ts
│   │   └── Contact.ts
│   ├── services/
│   │   └── emailService.ts  # Nodemailer setup
│   └── utils/
│       └── jwt.ts           # JWT token handling
├── src/
│   ├── pages/               # Frontend pages
│   ├── components/          # React components
│   └── contexts/            # Auth context
├── .env.local               # Your environment variables
├── package.json             # Dependencies
└── vite.config.ts           # Vite configuration
```

## Next Steps

1. **Test locally** - Run dev server and test all forms
2. **Deploy to Vercel** - Push to GitHub, import in Vercel
3. **Deploy to Hostinger** - Build and upload frontend
4. **Test in production** - Verify everything works live

Good luck! 🚀
