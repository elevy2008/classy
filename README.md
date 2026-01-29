# Classy Pro - Premium Student-Teacher Communication Platform

<div align="center">
  <h3>🎓 AI-Powered Academic Collaboration</h3>
  <p>The most advanced platform for student-teacher communication, office hours scheduling, and academic success</p>
</div>

## ✨ Features

### For Students 📚
- **Smart Office Hours Booking** - View teacher availability and book appointments instantly
- **Find Classmates** - Connect with students in your classes and form study groups
- **AI Study Assistant** - Get personalized recommendations based on your academic needs
- **Real-time Notifications** - Email, SMS, and in-app alerts for upcoming meetings
- **Beautiful Dashboard** - Track all your appointments and classes in one place

### For Teachers 👨‍🏫
- **Effortless Scheduling** - Set up recurring office hours or create one-time slots
- **Booking Management** - Auto-approve or manually review student requests
- **AI-Powered Analytics** - Track engagement patterns, popular times, and discussion topics
- **Meeting Notes** - Add private notes and AI-generated summaries
- **Calendar Integration** - Two-way sync with Google Calendar

### AI-Powered Features 🤖
- Intelligent scheduling recommendations
- Automatic meeting summaries
- Smart email composition assistance
- Student engagement analytics
- Popular topics tracking
- Personalized study recommendations

## 🎨 Design

Built with a **premium dark glassmorphic UI** featuring:
- Smooth animations and transitions
- Gradient mesh backgrounds
- Glow effects and shadows
- Responsive design for all devices
- Accessible components with Radix UI

Inspired by modern design trends from Dribbble and featuring:
- Glass-morphism effects
- Neumorphic shadows
- Premium gradients
- Custom animations
- Beautiful typography

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Styling** | Tailwind CSS 3 |
| **UI Components** | Radix UI |
| **Animations** | Framer Motion |
| **AI** | OpenAI GPT-4 |
| **Email** | Resend |
| **Charts** | Recharts |
| **Icons** | Lucide React |

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- A Supabase account (free tier works!)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/classy-pro.git
   cd classy-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   OPENAI_API_KEY=your-openai-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
classy-pro/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── bookings/            # Booking endpoints
│   │   └── office-hours/        # Office hours endpoints
│   ├── login/                    # Login page
│   ├── signup/                   # Signup with role selection
│   ├── student/                  # Student dashboard
│   ├── teacher/                  # Teacher dashboard
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles + dark theme
├── components/
│   └── ui/                      # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx     # Auth state management
│   ├── hooks/                   # Custom React hooks
│   │   ├── useBookings.ts      # Booking operations
│   │   └── useOfficeHours.ts   # Office hours operations
│   ├── supabase/               # Supabase clients
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   ├── types/                  # TypeScript types
│   │   └── database.ts         # Database types
│   └── utils.ts                # Utility functions
├── supabase/
│   └── schema.sql              # Complete database schema
├── middleware.ts                # Auth middleware
├── .env.example                 # Environment variables template
├── SETUP.md                     # Detailed setup guide
└── README.md                    # You are here!
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema with:

### Core Tables
- **profiles** - User profiles with role (student/teacher)
- **teacher_profiles** - Teacher-specific settings
- **student_profiles** - Student-specific information
- **classes** - Courses taught by teachers
- **enrollments** - Student-class relationships

### Booking System
- **office_hours_templates** - Recurring office hours schedules
- **office_hour_slots** - Specific time slots for booking
- **bookings** - Student appointments with status tracking

### Features
- **notifications** - Multi-channel notification system
- **ai_recommendations** - Personalized AI suggestions
- **booking_analytics** - Engagement tracking and insights

All tables include:
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamps
- ✅ Proper indexes for performance
- ✅ Foreign key constraints
- ✅ Enums for type safety

## 🔐 Security

- **Row Level Security (RLS)** - All database tables protected
- **Server-side Authentication** - Secure session management
- **Input Validation** - Zod schemas for all inputs
- **CSRF Protection** - Built into Next.js
- **SQL Injection Prevention** - Parameterized queries via Supabase
- **Type Safety** - Full TypeScript coverage

## 🎯 Key Features Implementation

### Authentication Flow
1. User signs up with email/password
2. Selects role (student or teacher)
3. Profile and role-specific record created
4. Redirected to appropriate dashboard
5. Session managed via Supabase middleware

### Booking Flow
1. Student browses available office hour slots
2. Selects slot and provides topic/description
3. Booking created (auto-approved or pending)
4. Both parties receive notifications
5. Teacher can approve/reject if manual review
6. Meeting takes place
7. Teacher marks as completed with optional notes

### Office Hours Management
1. Teacher creates recurring schedule template
2. System generates individual slots
3. Or teacher creates one-off slots
4. Students can view and book available slots
5. Bookings tracked with full history
6. Analytics generated on booking patterns

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/classy-pro)

### Environment Variables for Production

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

Optional:
- `OPENAI_API_KEY` (for AI features)
- `RESEND_API_KEY` (for email)
- `GOOGLE_CLIENT_ID` (for calendar sync)
- `GOOGLE_CLIENT_SECRET` (for calendar sync)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [OpenAI](https://openai.com/) - AI-powered features

## 📧 Support

For questions or support:
- Open an [Issue](https://github.com/your-username/classy-pro/issues)
- Check the [Setup Guide](./SETUP.md)
- Review the [Supabase Docs](https://supabase.com/docs)
- Review the [Next.js Docs](https://nextjs.org/docs)

---

<div align="center">
  <p>Built with ❤️ using Next.js, Supabase, and OpenAI</p>
  <p>© 2025 Classy Pro. All rights reserved.</p>
</div>