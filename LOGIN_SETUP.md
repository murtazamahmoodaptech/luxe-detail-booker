# Admin Login Setup & Troubleshooting Guide

## What Was Fixed

The login functionality had an async/await mismatch issue:
- **Frontend**: The `AdminLogin.tsx` component was calling `login()` as a synchronous function
- **Backend**: The updated `AdminAuthContext.tsx` made `login()` an async function
- **Solution**: Updated the login handler to properly await the async function

## Prerequisites for Login to Work

Before testing login, you need:

1. **MongoDB Atlas Database Connected**
   - MongoDB URI in `.env.local` properly set
   - Database is accessible and running

2. **Backend API Running**
   - For local testing: `http://localhost:3000/api`
   - For production: Your Vercel deployment URL

3. **Valid Admin User Created**
   - Need to create at least one admin user first

## Step 1: Setup Environment Variables

Create or update `.env.local` in your project root:

```env
# MongoDB Connection - REQUIRED
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxe-detail?retryWrites=true&w=majority

# JWT Secret - REQUIRED (change this!)
JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567a890bcd

# Stackmail Configuration
STACKMAIL_HOST=smtp.stackmail.com
STACKMAIL_PORT=587
STACKMAIL_USER=info@vornoxlab.com
STACKMAIL_PASS=your-password

# API URL for Frontend
VITE_API_BASE_URL=http://localhost:3000/api
```

## Step 2: Create Your First Admin User

### Option A: Using Node.js Script
Create a file `create-admin.js` in your project root:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = new User({
      email: 'admin@vornoxlab.com',
      password: 'Admin@123456',
      fullName: 'Admin User',
      role: 'admin',
      isActive: true,
    });
    
    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@vornoxlab.com');
    console.log('Password: Admin@123456');
    console.log('⚠️ Change this password immediately!');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
}

createAdmin();
```

Then run:
```bash
node create-admin.js
```

### Option B: Using MongoDB Compass or Atlas UI
1. Go to MongoDB Atlas → Collections
2. Create document in `users` collection:
```json
{
  "email": "admin@vornoxlab.com",
  "password": "hashed-password-from-bcryptjs",
  "fullName": "Admin User",
  "role": "admin",
  "isActive": true
}
```

Note: Password must be bcrypt-hashed (use the script above)

## Step 3: Run the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on http://localhost:5173/

## Step 4: Test the Login

1. Navigate to http://localhost:5173/admin/login
2. Enter credentials:
   - Email: `admin@vornoxlab.com`
   - Password: `Admin@123456` (or whatever you set)
3. Click "Sign In"

## Expected Flow

1. **Form Submission** → Button shows "Signing in..."
2. **API Call** → Frontend sends POST to `/api/auth?action=login`
3. **Verification** → Backend verifies email and password
4. **Token Generation** → JWT token created
5. **Success** → User redirected to `/admin/dashboard`
6. **Data Loaded** → Dashboard fetches real appointments from database

## Troubleshooting

### Error: "Network error. Please try again."
- Check if backend is running on `http://localhost:3000`
- Verify `VITE_API_BASE_URL` is set correctly
- Check browser console for exact error

### Error: "Invalid email or password"
- Verify admin user exists in MongoDB
- Check email is exactly correct (lowercase)
- Verify password is correct

### Error: "User account is inactive"
- In MongoDB, set `isActive: true` for the user

### Error: "MONGODB_URI not found"
- Check `.env.local` file exists
- Verify `MONGODB_URI` variable is present
- Restart dev server after adding env variables

### Login button keeps saying "Signing in..."
- Check network tab in DevTools (F12)
- Look for failed requests to `/api/auth`
- Check backend error logs

## JWT Token Management

After successful login:
- Token is saved in `localStorage` as `auth_token`
- User info saved as `auth_user`
- Token automatically included in protected API requests
- Token used to fetch real appointment data on dashboard

## Next Steps After Login Works

1. **View Dashboard** - See real appointments from database
2. **Edit Appointments** - Change appointment status
3. **Delete Appointments** - Remove from database
4. **Receive Emails** - Booking confirmations via Stackmail

## Security Notes

⚠️ **Before Production:**
- Change default admin password
- Update `JWT_SECRET` to a secure random value
- Never commit `.env.local` to git
- Use HTTPS in production
- Set `VITE_API_BASE_URL` to your production API URL

## Still Having Issues?

1. Check backend logs for errors
2. Verify MongoDB connection works
3. Ensure all environment variables are set
4. Clear browser localStorage (DevTools → Application → Storage)
5. Check network requests in DevTools Network tab
