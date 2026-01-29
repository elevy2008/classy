# 🚀 Classy Pro - Deployment Guide

## What's Been Built

✅ **Fully Functional Student Dashboard**
- View upcoming appointments
- Book available office hours
- Cancel bookings
- Real-time status updates
- Premium dark glassmorphic UI

✅ **Complete Backend**
- Supabase authentication
- Booking API (create, update, cancel)
- Office hours API
- Row Level Security policies
- Database schema with 11 tables

✅ **Premium Dark UI**
- Glassmorphism effects
- Smooth animations
- Responsive design
- Modern dark theme

## Deploy to Vercel in 5 Minutes

### Step 1: Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - Name: `classy-pro`
   - Database Password: (generate a strong password)
   - Region: (choose closest to you)
4. Click "Create new project" and wait ~2 minutes

### Step 2: Run Database Schema (1 minute)

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase/schema.sql` from this repository
4. Copy ALL the SQL and paste it into the query editor
5. Click **RUN** (bottom right)
6. You should see "Success. No rows returned"

### Step 3: Get API Keys (30 seconds)

1. In Supabase, go to **Project Settings** > **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 4: Deploy to Vercel (1 minute)

1. Push this code to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." > "Project"
4. Import your GitHub repository
5. Click "Deploy"

### Step 5: Add Environment Variables (1 minute)

1. Once deployed, go to your project in Vercel
2. Click "Settings" > "Environment Variables"
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url-from-step3
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-step3
NEXT_PUBLIC_APP_URL=your-vercel-url.vercel.app
```

4. Click "Redeploy" to apply the variables

## 🎉 You're Done!

Your app is now live! Visit your Vercel URL to see it running.

## Test the App

1. Click "Get Started" on the landing page
2. Choose "Student" role
3. Fill in your details:
   - Name: Test Student
   - Email: student@test.com
   - Password: test123
4. Sign up!
5. You'll be redirected to the student dashboard

## Optional: Add a Teacher

1. Open a new incognito/private window
2. Go to your app URL
3. Click "Get Started"
4. Choose "Teacher" role
5. Sign up with different email

## What Works Right Now

✅ User signup (student/teacher)
✅ Authentication & session management
✅ Student dashboard
✅ View available office hours
✅ Book appointments
✅ Cancel bookings
✅ Real-time status updates
✅ Premium dark UI

## Next Steps (Optional Enhancements)

The core app is fully functional! If you want to add more features:

1. **Teacher Dashboard** - Manage office hours, approve bookings
2. **OpenAI Integration** - AI recommendations and summaries
3. **Email Notifications** - Via Resend
4. **Google Calendar Sync** - Two-way calendar integration
5. **Analytics** - Booking patterns and insights

## Troubleshooting

### "Unauthorized" error
- Make sure you added the environment variables in Vercel
- Redeploy after adding variables

### Can't sign up
- Check that you ran the `supabase/schema.sql` script
- Verify your Supabase URL and key are correct

### Build errors
- The app builds successfully locally and in CI
- Check Vercel build logs for specific errors

## Support

Check out:
- [README.md](./README.md) - Full documentation
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## Architecture

```
Frontend (Next.js 14)
  ↓
API Routes (/api/bookings, /api/office-hours)
  ↓
Supabase (PostgreSQL + Auth + Real-time)
```

All data is stored in Supabase with Row Level Security. Users can only see their own data!

---

Built with ❤️ using Next.js, Supabase, and TypeScript
