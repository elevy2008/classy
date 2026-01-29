import { useState, useEffect } from 'react';
import { OfficeHourSlotWithBookings } from '@/lib/types/database';

export function useOfficeHours(teacherId?: string, availableOnly: boolean = false) {
  const [slots, setSlots] = useState<OfficeHourSlotWithBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlots();
  }, [teacherId, availableOnly]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (teacherId) params.append('teacher_id', teacherId);
      if (availableOnly) params.append('available', 'true');

      const response = await fetch(`/api/office-hours/slots?${params}`);
      if (!response.ok) throw new Error('Failed to fetch office hours');

      const data = await response.json();
      setSlots(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSlot = async (slotData: {
    start_time: string;
    end_time: string;
    location?: string;
    virtual_link?: string;
    max_bookings?: number;
    notes?: string;
  }) => {
    try {
      const response = await fetch('/api/office-hours/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slotData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create slot');
      }

      const newSlot = await response.json();
      setSlots(prev => [...prev, newSlot].sort((a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      ));
      return newSlot;
    } catch (err: any) {
      throw err;
    }
  };

  return {
    slots,
    loading,
    error,
    refresh: fetchSlots,
    createSlot,
  };
}
