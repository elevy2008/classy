import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { status, teacher_notes } = body;

  // Get booking to verify ownership
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('*, student:profiles!bookings_student_id_fkey(full_name), teacher:profiles!bookings_teacher_id_fkey(full_name)')
    .eq('id', params.id)
    .single();

  if (fetchError || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  // Verify user has permission to update
  if (booking.student_id !== user.id && booking.teacher_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updates: any = {};

  if (status) {
    updates.status = status;

    if (status === 'confirmed') {
      updates.confirmed_at = new Date().toISOString();
    } else if (status === 'cancelled') {
      updates.cancelled_at = new Date().toISOString();
    } else if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    }
  }

  if (teacher_notes !== undefined) {
    updates.teacher_notes = teacher_notes;
  }

  // Update booking
  const { data: updatedBooking, error: updateError } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', params.id)
    .select(`
      *,
      student:profiles!bookings_student_id_fkey(id, full_name, email),
      teacher:profiles!bookings_teacher_id_fkey(id, full_name, email),
      slot:office_hour_slots(start_time, end_time, location, virtual_link)
    `)
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Send notification based on status change
  if (status) {
    let notificationTitle = '';
    let notificationMessage = '';
    let recipientId = '';

    if (status === 'confirmed' && booking.teacher_id === user.id) {
      recipientId = booking.student_id;
      notificationTitle = 'Booking Confirmed';
      notificationMessage = `Your booking with ${booking.teacher.full_name} has been confirmed`;
    } else if (status === 'cancelled') {
      recipientId = booking.teacher_id === user.id ? booking.student_id : booking.teacher_id;
      const cancelledBy = booking.teacher_id === user.id ? booking.teacher.full_name : booking.student.full_name;
      notificationTitle = 'Booking Cancelled';
      notificationMessage = `Your booking has been cancelled by ${cancelledBy}`;
    } else if (status === 'completed' && booking.teacher_id === user.id) {
      recipientId = booking.student_id;
      notificationTitle = 'Meeting Completed';
      notificationMessage = `Your meeting with ${booking.teacher.full_name} has been marked as completed`;
    }

    if (recipientId) {
      await supabase.from('notifications').insert({
        user_id: recipientId,
        type: 'in_app',
        title: notificationTitle,
        message: notificationMessage,
        booking_id: booking.id,
      });
    }
  }

  return NextResponse.json(updatedBooking);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get booking to verify ownership
  const { data: booking } = await supabase
    .from('bookings')
    .select('student_id, teacher_id')
    .eq('id', params.id)
    .single();

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  // Verify user has permission to delete
  if (booking.student_id !== user.id && booking.teacher_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
