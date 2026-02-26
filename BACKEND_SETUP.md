# Backend Setup Guide - Luxe Detail Booker

This guide walks you through setting up the backend system with MongoDB and email integration.

## Architecture Overview

- **Frontend**: React + Vite (Hostinger)
- **Backend**: Node.js/Express (Vercel Serverless)
- **Database**: MongoDB Atlas (Cloud)
- **Email**: Stackmail SMTP (info@vornoxlab.com)
- **Authentication**: JWT-based admin login

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/database-name`
5. Add IP address to network access (or 0.0.0.0 for development)
6. Update `MONGODB_URI` in `.env`

## Step 2: Environment Variables Setup

### Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in all variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/luxe-detail-booker

# JWT
JWT_SECRET=your-very-long-random-secret-key-at-least-32-characters

# Stackmail SMTP Configuration
STACKMAIL_HOST=your-stackmail-host
STACKMAIL_PORT=587
STACKMAIL_SECURE=false
STACKMAIL_USER=info@vornoxlab.com
STACKMAIL_PASS=your-stackmail-password

ADMIN_EMAIL=info@vornoxlab.com
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000/api
```

### Vercel Production

1. Go to your Vercel project settings
2. Add these environment variables in the "Environment Variables" section:
   - `MONGODB_URI`
   - `JWT_SECRET` (use a strong, unique value)
   - `STACKMAIL_HOST`
   - `STACKMAIL_PORT`
   - `STACKMAIL_SECURE`
   - `STACKMAIL_USER`
   - `STACKMAIL_PASS`
   - `ADMIN_EMAIL`

## Step 3: API Endpoints

### Authentication

**POST** `/api/auth?action=login`
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**POST** `/api/auth?action=register`
```json
{
  "email": "admin@example.com",
  "password": "password123",
  "fullName": "Admin Name"
}
```

### Appointments

**GET** `/api/appointments` - Get all appointments
**POST** `/api/appointments` - Create new appointment
**PUT** `/api/appointments/:id` - Update appointment status
**DELETE** `/api/appointments/:id` - Delete appointment

**POST** request body:
```json
{
  "fullName": "John Doe",
  "phone": "(555) 123-4567",
  "email": "john@example.com",
  "address": "123 Main St",
  "vehicleName": "Tesla Model 3",
  "make": "Tesla",
  "model": "Model 3",
  "year": "2024",
  "serviceType": "Super Wax Detail",
  "vehicleCategory": "Car",
  "date": "2026-03-15",
  "timeSlot": "10:00 AM",
  "promoCode": "FIRST10",
  "discountApplied": true,
  "totalPrice": 215.99,
  "status": "Pending"
}
```

### Contact Form

**POST** `/api/contact` - Submit contact form
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "subject": "Service Inquiry",
  "message": "I would like to inquire about..."
}
```

**GET** `/api/contact` - Get all contact submissions (admin only)

## Step 4: Admin User Setup

1. The backend is ready for user registration
2. Use the `/api/auth?action=register` endpoint to create the first admin user
3. You can use tools like Postman or create a simple script to register:

```bash
curl -X POST http://localhost:3000/api/auth?action=register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vornoxlab.com",
    "password": "StrongPassword123!",
    "fullName": "Admin User"
  }'
```

Then change their role to `admin` in MongoDB directly:
- Connect to MongoDB Atlas
- Find the user document in the `users` collection
- Update the `role` field from `"user"` to `"admin"`

## Step 5: Email Configuration

### With Stackmail:

1. Get your Stackmail SMTP credentials
2. Add to environment variables:
   - `STACKMAIL_HOST`
   - `STACKMAIL_PORT`
   - `STACKMAIL_USER` (your email)
   - `STACKMAIL_PASS`

The system will automatically:
- Send booking confirmations to customers
- Send admin notifications for new bookings
- Send contact form acknowledgments

## Step 6: Frontend Configuration

Update `VITE_API_BASE_URL` in frontend environment:

### Local Development
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Production (Hostinger)
```
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
```

## Step 7: Testing Locally

1. Start the backend server (if running locally):
```bash
npm install
npm run dev
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

3. Test the contact form at `http://localhost:5173/contact`
4. Test the booking at `http://localhost:5173/book`
5. Test admin login at `http://localhost:5173/admin/login`

## Deployment Checklist

### MongoDB Atlas
- [ ] Cluster created and running
- [ ] Network access configured
- [ ] Connection string copied

### Vercel (Backend)
- [ ] Project created
- [ ] Environment variables set
- [ ] API routes deployed
- [ ] CORS configured for frontend URL

### Hostinger (Frontend)
- [ ] Frontend built (`npm run build`)
- [ ] Built files uploaded
- [ ] API base URL configured
- [ ] HTTPS enabled

### Stackmail
- [ ] SMTP credentials verified
- [ ] Sender email configured

## Troubleshooting

### Connection refused errors
- Check if MongoDB connection string is correct
- Verify IP is whitelisted in MongoDB Atlas
- Check environment variables are set

### Email not sending
- Verify Stackmail credentials
- Check spam folder
- Review Stackmail logs for errors
- Ensure sender email matches STACKMAIL_USER

### API not found
- Check API routes are deployed to Vercel
- Verify `VITE_API_BASE_URL` in frontend
- Check CORS settings for your frontend domain

### Login not working
- Verify user exists in MongoDB `users` collection
- Check password hashing (bcryptjs)
- Ensure JWT_SECRET is set

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  fullName: String,
  role: String ("admin" | "user"),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointments Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  phone: String,
  email: String,
  address: String,
  vehicleName: String,
  make: String,
  model: String,
  year: String,
  serviceType: String,
  vehicleCategory: String,
  date: String,
  timeSlot: String,
  promoCode: String,
  discountApplied: Boolean,
  totalPrice: Number,
  status: String ("Pending" | "Confirmed" | "Completed" | "Cancelled"),
  createdAt: Date,
  updatedAt: Date
}
```

### Contacts Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String ("New" | "Reviewed" | "Responded" | "Resolved"),
  createdAt: Date,
  updatedAt: Date
}
```

## Support

For issues or questions:
1. Check the logs in Vercel console
2. Check MongoDB Atlas logs
3. Verify all environment variables are set
4. Test endpoints with Postman or curl
