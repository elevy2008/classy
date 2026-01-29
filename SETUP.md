# Classy Pro - Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- OpenAI API key (optional, for AI features)
- Resend API key (optional, for email notifications)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be set up (takes ~2 minutes)
3. Go to **Project Settings** > **API**
4. Copy your `Project URL` and `anon/public` key

## Step 3: Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the query editor
5. Click "Run" to execute the schema

This will create all necessary tables, indexes, RLS policies, and triggers.

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables in `.env.local`:

```env
# Required - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional - OpenAI (for AI features)
OPENAI_API_KEY=sk-...

# Optional - Resend (for email notifications)
RESEND_API_KEY=re_...

# Optional - App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Create Your First Account

1. Click "Get Started" or "Sign Up"
2. Choose your role (Student or Teacher)
3. Fill in your details
4. Sign up!

## Features Overview

### For Students:
- ✅ Book office hours with teachers
- ✅ View upcoming appointments
- ✅ Find classmates in your courses
- ✅ Get AI-powered study recommendations
- ✅ Receive notifications for meetings

### For Teachers:
- ✅ Set up recurring office hours
- ✅ Manage booking requests
- ✅ View student engagement analytics
- ✅ Auto-approve or manually review bookings
- ✅ Add meeting notes and summaries

## Optional Integrations

### Google Calendar Sync
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add credentials to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

### Email Notifications (Resend)
1. Sign up at [https://resend.com](https://resend.com)
2. Create an API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_...
   ```

### SMS Notifications (Twilio) - Optional
1. Sign up at [https://twilio.com](https://twilio.com)
2. Get your credentials
3. Add to `.env.local`:
   ```env
   TWILIO_ACCOUNT_SID=your-sid
   TWILIO_AUTH_TOKEN=your-token
   TWILIO_PHONE_NUMBER=your-twilio-number
   ```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables for Production

Make sure to add all required environment variables in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (if using AI features)
- `RESEND_API_KEY` (if using email)
- `NEXT_PUBLIC_APP_URL` (your production URL)

## Troubleshooting

### "Unauthorized" errors
- Make sure your Supabase credentials are correct
- Check that the database schema was created successfully
- Verify RLS policies are in place

### Database errors
- Run the `supabase/schema.sql` script again
- Check Supabase logs in the dashboard
- Verify your API keys have the correct permissions

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check that all environment variables are set

## Support

For issues or questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the Supabase documentation
3. Check Next.js documentation

## License

MIT License - feel free to use for your projects!
