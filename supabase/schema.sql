-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'teacher');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE notification_type AS ENUM ('email', 'sms', 'in_app');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  phone_number TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teacher-specific information
CREATE TABLE teacher_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  title TEXT, -- Dr., Prof., etc.
  office_location TEXT,
  calendar_integration_enabled BOOLEAN DEFAULT false,
  google_calendar_id TEXT,
  max_bookings_per_week INTEGER DEFAULT 10,
  booking_advance_days INTEGER DEFAULT 14,
  auto_approve_bookings BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student-specific information
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  student_id TEXT UNIQUE,
  major TEXT,
  year INTEGER,
  gpa DECIMAL(3, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes/Courses
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL, -- e.g., "CS101"
  name TEXT NOT NULL,
  description TEXT,
  semester TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(code, semester, year)
);

-- Class enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id)
);

-- Office hours templates (recurring schedules)
CREATE TABLE office_hours_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  day_of_week day_of_week NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  location TEXT,
  virtual_link TEXT,
  is_active BOOLEAN DEFAULT true,
  max_slots_per_period INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specific office hour slots (generated from templates or one-off)
CREATE TABLE office_hour_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES office_hours_templates(id) ON DELETE SET NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  virtual_link TEXT,
  is_available BOOLEAN DEFAULT true,
  max_bookings INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_id UUID REFERENCES office_hour_slots(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status booking_status DEFAULT 'pending',
  topic TEXT NOT NULL,
  description TEXT,
  student_notes TEXT,
  teacher_notes TEXT,
  meeting_summary TEXT, -- AI-generated summary
  calendar_event_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- AI Recommendations (for students)
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recommendation_type TEXT NOT NULL, -- 'study_tip', 'office_hours', 'resource'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB, -- Additional data like links, tags, etc.
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Analytics tracking
CREATE TABLE booking_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC,
  metadata JSONB,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);
CREATE INDEX idx_office_hours_teacher ON office_hours_templates(teacher_id);
CREATE INDEX idx_office_hour_slots_teacher ON office_hour_slots(teacher_id);
CREATE INDEX idx_office_hour_slots_time ON office_hour_slots(start_time, end_time);
CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_teacher ON bookings(teacher_id);
CREATE INDEX idx_bookings_slot ON bookings(slot_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_ai_recommendations_student ON ai_recommendations(student_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_hours_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_hour_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view other profiles" ON profiles
  FOR SELECT USING (true);

-- RLS Policies for teacher_profiles
CREATE POLICY "Teachers can view their own profile" ON teacher_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Teachers can update their own profile" ON teacher_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for student_profiles
CREATE POLICY "Students can view their own profile" ON student_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile" ON student_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for classes
CREATE POLICY "Anyone can view classes" ON classes
  FOR SELECT USING (true);

CREATE POLICY "Teachers can manage their classes" ON classes
  FOR ALL USING (auth.uid() = teacher_id);

-- RLS Policies for enrollments
CREATE POLICY "Students can view their enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view their class enrollments" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classes WHERE classes.id = enrollments.class_id AND classes.teacher_id = auth.uid()
    )
  );

-- RLS Policies for office hours
CREATE POLICY "Anyone can view available office hours" ON office_hour_slots
  FOR SELECT USING (is_available = true OR auth.uid() = teacher_id);

CREATE POLICY "Teachers can manage their office hours" ON office_hours_templates
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can manage their slots" ON office_hour_slots
  FOR ALL USING (auth.uid() = teacher_id);

-- RLS Policies for bookings
CREATE POLICY "Students can view their bookings" ON bookings
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view their bookings" ON bookings
  FOR SELECT USING (auth.uid() = teacher_id);

CREATE POLICY "Students can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their bookings" ON bookings
  FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY "Teachers can update bookings" ON bookings
  FOR UPDATE USING (auth.uid() = teacher_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for AI recommendations
CREATE POLICY "Students can view their recommendations" ON ai_recommendations
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can dismiss recommendations" ON ai_recommendations
  FOR UPDATE USING (auth.uid() = student_id);

-- Functions for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teacher_profiles_updated_at BEFORE UPDATE ON teacher_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_office_hours_templates_updated_at BEFORE UPDATE ON office_hours_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_office_hour_slots_updated_at BEFORE UPDATE ON office_hour_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
