export type UserRole = 'student' | 'teacher';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type NotificationType = 'email' | 'sms' | 'in_app';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  phone_number?: string;
  department?: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherProfile {
  id: string;
  user_id: string;
  title?: string;
  office_location?: string;
  calendar_integration_enabled: boolean;
  google_calendar_id?: string;
  max_bookings_per_week: number;
  booking_advance_days: number;
  auto_approve_bookings: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  student_id?: string;
  major?: string;
  year?: number;
  gpa?: number;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  teacher_id: string;
  code: string;
  name: string;
  description?: string;
  semester?: string;
  year?: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  class_id: string;
  enrolled_at: string;
}

export interface OfficeHoursTemplate {
  id: string;
  teacher_id: string;
  day_of_week: DayOfWeek;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  location?: string;
  virtual_link?: string;
  is_active: boolean;
  max_slots_per_period: number;
  created_at: string;
  updated_at: string;
}

export interface OfficeHourSlot {
  id: string;
  teacher_id: string;
  template_id?: string;
  start_time: string;
  end_time: string;
  location?: string;
  virtual_link?: string;
  is_available: boolean;
  max_bookings: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  slot_id: string;
  student_id: string;
  teacher_id: string;
  status: BookingStatus;
  topic: string;
  description?: string;
  student_notes?: string;
  teacher_notes?: string;
  meeting_summary?: string;
  calendar_event_id?: string;
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  completed_at?: string;
  cancelled_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  booking_id?: string;
  is_read: boolean;
  sent_at: string;
  read_at?: string;
}

export interface AIRecommendation {
  id: string;
  student_id: string;
  recommendation_type: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
  is_dismissed: boolean;
  created_at: string;
  expires_at?: string;
}

export interface BookingAnalytics {
  id: string;
  teacher_id: string;
  booking_id?: string;
  metric_name: string;
  metric_value?: number;
  metadata?: Record<string, any>;
  recorded_at: string;
}

// Extended types with relations
export interface BookingWithDetails extends Booking {
  student?: Profile;
  teacher?: Profile;
  slot?: OfficeHourSlot;
}

export interface OfficeHourSlotWithBookings extends OfficeHourSlot {
  teacher?: Profile;
  bookings?: Booking[];
  bookings_count?: number;
}

export interface ClassWithEnrollments extends Class {
  teacher?: Profile;
  enrollments?: Enrollment[];
  enrollment_count?: number;
}
