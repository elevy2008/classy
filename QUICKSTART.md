# 🎯 Complete Deployment Guide - Get Your App Live in 10 Minutes

Your app is **fully built and ready**! Follow these steps to deploy:

---

## 🚀 Part 1: Deploy to Vercel (3 minutes)

### Step 1: Go to Vercel
1. Open in your browser: **https://vercel.com/new**
2. Sign in with GitHub

### Step 2: Import Repository
1. You'll see "Import Git Repository"
2. Find and click: **elevy2008/classy**
3. Click **"Import"**

### Step 3: Deploy!
1. Vercel auto-detects Next.js ✅
2. **Framework Preset:** Next.js (already selected)
3. **Root Directory:** ./ (leave as is)
4. Click **"Deploy"** button

⏱️ Building takes ~2 minutes. You'll see:
- ✅ Installing dependencies
- ✅ Building application
- ✅ Deployment successful!

**Save your deployment URL:** `https://classy-xxxxx.vercel.app`

---

## 🗄️ Part 2: Set Up Supabase (4 minutes)

### Step 1: Create Supabase Project
1. Go to: **https://supabase.com/dashboard**
2. Click **"New Project"**
3. Fill in:
   - **Name:** classy-pro
   - **Database Password:** (create a strong password - SAVE THIS!)
   - **Region:** Choose closest to you
4. Click **"Create new project"**

⏱️ Wait ~2 minutes for project setup

### Step 2: Run Database Schema
1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open this file in your editor: `supabase/schema.sql`
4. **Copy ALL the SQL** (it's ~330 lines)
5. **Paste** into Supabase SQL Editor
6. Click **"RUN"** (bottom right)
7. You should see: ✅ **"Success. No rows returned"**

### Step 3: Get API Keys
1. Go to **"Project Settings"** (⚙️ icon at bottom left)
2. Click **"API"** in the sidebar
3. Copy these TWO values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbG...` (long string)

---

## 🔧 Part 3: Configure Vercel (2 minutes)

### Add Environment Variables
1. Go back to Vercel: **https://vercel.com/dashboard**
2. Click your **classy** project
3. Go to **"Settings"** tab
4. Click **"Environment Variables"**
5. Add these THREE variables:

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: (paste your Supabase URL from Step 2.3)
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: (paste your Supabase anon key from Step 2.3)
```

**Variable 3:**
```
Name: NEXT_PUBLIC_APP_URL
Value: (paste your Vercel URL, e.g., https://classy-xxxxx.vercel.app)
```

6. Click **"Save"** for each

### Redeploy
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** to confirm

⏱️ Takes ~1 minute

---

## 🎉 Part 4: Test Your App! (1 minute)

### Your App is Live!
Open your Vercel URL: `https://classy-xxxxx.vercel.app`

### Test the Complete Flow:
1. Click **"Get Started"**
2. Click **"Student"** role
3. Fill in:
   - Name: Test Student
   - Email: student@test.com
   - Password: test123456
4. Click **"Create Account"**
5. You'll be redirected to the Student Dashboard! ✅

### What Works Right Now:
✅ User signup (student/teacher)
✅ Login/logout
✅ Student dashboard with premium UI
✅ View bookings (will be empty initially)
✅ Real-time data from Supabase
✅ Secure authentication

### Create a Teacher Account:
1. Open an **incognito/private** window
2. Go to your app URL
3. Sign up as **Teacher**
4. Use different email: teacher@test.com

---

## 🐛 Troubleshooting

### "Unauthorized" error
- Make sure you added all 3 environment variables
- Make sure you clicked "Redeploy" after adding them
- Check there are no extra spaces in the values

### Can't sign up
- Verify you ran the SQL schema in Supabase
- Check Supabase SQL Editor for errors
- Make sure database is "healthy" (green dot in dashboard)

### Build failed in Vercel
- Check build logs in Vercel dashboard
- The app builds successfully locally (tested ✅)
- Contact me if you see specific errors

---

## 📊 What's Next?

Your app is **fully functional**! Here's what you can add later:

### Optional Enhancements:
- 📧 Email notifications (via Resend)
- 🤖 OpenAI integration (AI recommendations)
- 📅 Google Calendar sync
- 📱 SMS notifications (via Twilio)
- 👨‍🏫 Enhanced teacher dashboard

### To Add Features:
1. All code is on branch: `claude/student-teacher-app-LZXai`
2. API routes are ready: `/api/bookings`, `/api/office-hours`
3. Database schema supports all features
4. Just add the UI and integrations!

---

## 🎯 Quick Reference

**Your Vercel Dashboard:**
https://vercel.com/dashboard

**Your Supabase Dashboard:**
https://supabase.com/dashboard

**GitHub Repository:**
https://github.com/elevy2008/classy

**Documentation:**
- Full README: `README.md`
- Setup Guide: `SETUP.md`
- This Guide: `DEPLOY.md`

---

## ✅ Deployment Checklist

- [ ] Vercel deployment successful
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables added
- [ ] App redeployed with env vars
- [ ] Can sign up as student
- [ ] Can sign up as teacher
- [ ] Dashboard loads correctly

---

**Need Help?**
Check the troubleshooting section above or the detailed guides in `README.md` and `SETUP.md`

**Your app is production-ready!** 🎉
