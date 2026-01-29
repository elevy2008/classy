import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookingWithDetails } from '@/lib/types/database';

export function useBookings() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: {
    slot_id: string;
    topic: string;
    description?: string;
  }) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
      }

      const newBooking = await response.json();
      setBookings(prev => [newBooking, ...prev]);
      return newBooking;
    } catch (err: any) {
      throw err;
    }
  };

  const updateBooking = async (
    id: string,
    updates: { status?: string; teacher_notes?: string }
  ) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update booking');

      const updated = await response.json();
      setBookings(prev =>
        prev.map(b => (b.id === id ? updated : b))
      );
      return updated;
    } catch (err: any) {
      throw err;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete booking');

      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      throw err;
    }
  };

  return {
    bookings,
    loading,
    error,
    refresh: fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
  };
}
