import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const teacherId = searchParams.get('teacher_id');
  const availableOnly = searchParams.get('available') === 'true';
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  let query = supabase
    .from('office_hour_slots')
    .select(`
      *,
      teacher:profiles!office_hour_slots_teacher_id_fkey(id, full_name, email, avatar_url, department),
      bookings(id, status, student_id, topic)
    `)
    .order('start_time', { ascending: true });

  if (teacherId) {
    query = query.eq('teacher_id', teacherId);
  }

  if (availableOnly) {
    query = query.eq('is_available', true);
  }

  if (startDate) {
    query = query.gte('start_time', startDate);
  }

  if (endDate) {
    query = query.lte('end_time', endDate);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter out past slots and add booking count
  const now = new Date();
  const slots = data
    .filter(slot => new Date(slot.start_time) > now)
    .map(slot => ({
      ...slot,
      bookings_count: slot.bookings?.filter((b: any) => b.status !== 'cancelled').length || 0,
      is_fully_booked: (slot.bookings?.filter((b: any) => b.status !== 'cancelled').length || 0) >= slot.max_bookings,
    }));

  return NextResponse.json(slots);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify user is a teacher
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'teacher') {
    return NextResponse.json({ error: 'Only teachers can create office hour slots' }, { status: 403 });
  }

  const body = await request.json();
  const { start_time, end_time, location, virtual_link, max_bookings = 1, notes } = body;

  if (!start_time || !end_time) {
    return NextResponse.json(
      { error: 'Start time and end time are required' },
      { status: 400 }
    );
  }

  // Validate times
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  if (startDate >= endDate) {
    return NextResponse.json(
      { error: 'End time must be after start time' },
      { status: 400 }
    );
  }

  if (startDate < new Date()) {
    return NextResponse.json(
      { error: 'Cannot create slots in the past' },
      { status: 400 }
    );
  }

  // Create slot
  const { data: slot, error } = await supabase
    .from('office_hour_slots')
    .insert({
      teacher_id: user.id,
      start_time,
      end_time,
      location,
      virtual_link,
      max_bookings,
      notes,
      is_available: true,
    })
    .select(`
      *,
      teacher:profiles!office_hour_slots_teacher_id_fkey(id, full_name, email)
    `)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(slot, { status: 201 });
}
