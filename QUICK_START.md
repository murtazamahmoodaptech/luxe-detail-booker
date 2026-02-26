# Quick Start - Backend Integration Complete

Your Luxe Detail Booker now has a complete backend system integrated. Here's what was added:

## What's New

### Backend Infrastructure
- **MongoDB Schema**: User, Appointment, and Contact models with full validation
- **API Endpoints**: Auth (login/register), Appointments CRUD, Contact submissions
- **Email Service**: Automated emails via Stackmail for bookings, contacts, and admin notifications
- **Authentication**: JWT-based admin portal login system

### Frontend Updates
- **Contact Form**: Now sends data to API with email notifications
- **Booking Form**: Creates real appointments in MongoDB, sends confirmation emails
- **Admin Dashboard**: Fetches real data from API, edit/delete appointments
- **Admin Auth**: Updated to use real API authentication

### Configuration Files
- `.env.example` - Environment variable template
- `vercel.json` - Vercel deployment configuration
- `BACKEND_SETUP.md` - Detailed backend setup guide
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions

## 3-Step Setup

### Step 1: Set Up MongoDB (5 minutes)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string
5. Copy to `MONGODB_URI` environment variable

### Step 2: Get Stackmail Credentials (2 minutes)
Get from your Stackmail account:
- STACKMAIL_HOST
- STACKMAIL_PORT  
- STACKMAIL_USER
- STACKMAIL_PASS

### Step 3: Deploy to Vercel (5 minutes)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy!

## Environment Variables Needed

```env
# Database
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your-long-random-secret

# Email
STACKMAIL_HOST=smtp.stackmail.com
STACKMAIL_PORT=587
STACKMAIL_USER=info@vornoxlab.com
STACKMAIL_PASS=your-password

# Config
ADMIN_EMAIL=info@vornoxlab.com
FRONTEND_URL=https://your-frontend-domain.com

# Frontend
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

## File Structure

New directories created:
```
/api                      # Vercel serverless functions
  ├── auth.ts            # Login/register
  ├── appointments.ts    # Booking management
  └── contact.ts         # Contact form
  
/backend                  # Backend utilities
  ├── config/            # Database & CORS config
  ├── models/            # MongoDB schemas
  ├── services/          # Email service
  ├── middleware/        # Auth middleware
  ├── app.ts             # Express app
  └── server.ts          # Server entry
```

## Testing Locally

```bash
# Install dependencies
npm install

# Create .env.local with your values
cp .env.example .env.local

# Start frontend dev server
npm run dev

# In another terminal, test APIs
curl http://localhost:3000/api/health
```

## Key Features Implemented

### Contact Form
- Validates all fields
- Sends email to customer and admin
- Stores in MongoDB
- Shows success/error toast

### Booking Form
- Creates appointment in MongoDB
- Sends confirmation email to customer
- Sends notification to admin
- Displays real prices with discounts
- Shows loading state during submission

### Admin Dashboard
- Real-time data from database
- Edit appointment status
- Delete appointments
- Export to CSV
- Promo code management
- JWT token-based authentication

### Email System
- Automated confirmation emails
- Admin notifications for new bookings
- Contact form acknowledgments
- Configurable via Stackmail SMTP

## API Endpoints

All endpoints are available at `/api/`:

```
POST /auth?action=login          # Admin login
POST /auth?action=register       # Create user
GET  /appointments               # List appointments
POST /appointments               # Create appointment
PUT  /appointments/:id           # Update status
DELETE /appointments/:id         # Delete appointment
POST /contact                    # Submit contact form
GET  /contact                    # Get all contacts
```

## Next Steps

1. **Read DEPLOYMENT_GUIDE.md** - Complete step-by-step deployment
2. **Read BACKEND_SETUP.md** - Detailed technical setup
3. **Create MongoDB account** - Set up your database
4. **Get Stackmail credentials** - Configure email
5. **Deploy to Vercel** - Push backend live
6. **Upload to Hostinger** - Host your frontend
7. **Test everything** - Verify all forms work

## Troubleshooting

### Backend not deploying?
- Check DEPLOYMENT_GUIDE.md → "Troubleshooting" section
- Review Vercel logs for specific errors

### Emails not sending?
- Verify Stackmail credentials in environment variables
- Check STACKMAIL_HOST, PORT, USER, PASS are all correct
- Test email delivery in Stackmail dashboard

### Forms not working?
- Check browser console for errors
- Verify VITE_API_BASE_URL is correct
- Check network tab in DevTools for API errors

### Login not working?
- Create admin user first (see DEPLOYMENT_GUIDE.md)
- Verify user exists in MongoDB users collection
- Check JWT_SECRET is set

## Important Notes

- **Never commit `.env`** - Use `.env.local` for local development
- **All passwords are hashed** - Using bcryptjs
- **JWT tokens expire in 24 hours** - Users need to login again
- **CORS is configured** - Only your frontend domain can access API
- **Email errors don't block submissions** - Forms succeed even if email fails

## Success Checklist

After deployment, verify:

- [ ] Contact form sends emails
- [ ] Booking form creates appointments
- [ ] Admin can login with JWT token
- [ ] Admin sees real data in dashboard
- [ ] Appointments can be edited/deleted
- [ ] Emails arrive in inbox
- [ ] All forms show proper errors
- [ ] Loading states work correctly

## Get Help

For detailed information:
1. **BACKEND_SETUP.md** - Technical configuration details
2. **DEPLOYMENT_GUIDE.md** - Step-by-step deployment
3. MongoDB Atlas docs - Database issues
4. Stackmail docs - Email configuration
5. Vercel docs - Deployment questions

---

Your backend is ready to go! Follow DEPLOYMENT_GUIDE.md for complete setup instructions.
