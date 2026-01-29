import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile to determine role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  // Fetch bookings based on role
  const query = supabase
    .from('bookings')
    .select(`
      *,
      student:profiles!bookings_student_id_fkey(id, full_name, email, avatar_url),
      teacher:profiles!bookings_teacher_id_fkey(id, full_name, email, avatar_url),
      slot:office_hour_slots(start_time, end_time, location, virtual_link)
    `)
    .order('created_at', { ascending: false });

  if (profile.role === 'student') {
    query.eq('student_id', user.id);
  } else {
    query.eq('teacher_id', user.id);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { slot_id, topic, description } = body;

  if (!slot_id || !topic) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Get the slot to verify availability and get teacher_id
  const { data: slot, error: slotError } = await supabase
    .from('office_hour_slots')
    .select('*, teacher:profiles!office_hour_slots_teacher_id_fkey(auto_approve_bookings:teacher_profiles(auto_approve_bookings))')
    .eq('id', slot_id)
    .single();

  if (slotError || !slot) {
    return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
  }

  if (!slot.is_available) {
    return NextResponse.json({ error: 'Slot not available' }, { status: 400 });
  }

  // Check if slot is in the future
  if (new Date(slot.start_time) < new Date()) {
    return NextResponse.json({ error: 'Cannot book past slots' }, { status: 400 });
  }

  // Get teacher settings for auto-approve
  const { data: teacherProfile } = await supabase
    .from('teacher_profiles')
    .select('auto_approve_bookings')
    .eq('user_id', slot.teacher_id)
    .single();

  const autoApprove = teacherProfile?.auto_approve_bookings || false;

  // Create booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      slot_id,
      student_id: user.id,
      teacher_id: slot.teacher_id,
      topic,
      description,
      status: autoApprove ? 'confirmed' : 'pending',
      confirmed_at: autoApprove ? new Date().toISOString() : null,
    })
    .select(`
      *,
      student:profiles!bookings_student_id_fkey(id, full_name, email),
      teacher:profiles!bookings_teacher_id_fkey(id, full_name, email),
      slot:office_hour_slots(start_time, end_time, location, virtual_link)
    `)
    .single();

  if (bookingError) {
    return NextResponse.json({ error: bookingError.message }, { status: 500 });
  }

  // Create notification for teacher
  await supabase.from('notifications').insert({
    user_id: slot.teacher_id,
    type: 'in_app',
    title: 'New Booking Request',
    message: `${booking.student.full_name} requested to book office hours for ${topic}`,
    booking_id: booking.id,
  });

  // If auto-approved, notify student
  if (autoApprove) {
    await supabase.from('notifications').insert({
      user_id: user.id,
      type: 'in_app',
      title: 'Booking Confirmed',
      message: `Your booking with ${booking.teacher.full_name} has been confirmed`,
      booking_id: booking.id,
    });
  }

  return NextResponse.json(booking, { status: 201 });
}
