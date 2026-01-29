'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useBookings } from '@/lib/hooks/useBookings';
import { useOfficeHours } from '@/lib/hooks/useOfficeHours';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  CheckCircle,
  AlertCircle,
  Plus,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function StudentDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const { bookings, loading: bookingsLoading, createBooking, updateBooking } = useBookings();
  const { slots, loading: slotsLoading } = useOfficeHours(undefined, true);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [bookingTopic, setBookingTopic] = useState('');
  const [bookingDescription, setBookingDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'student')) {
      router.push('/login');
    }
  }, [user, profile, authLoading, router]);

  const handleBookSlot = async () => {
    if (!selectedSlot || !bookingTopic.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await createBooking({
        slot_id: selectedSlot.id,
        topic: bookingTopic,
        description: bookingDescription,
      });
      toast.success('Booking created successfully!');
      setSelectedSlot(null);
      setBookingTopic('');
      setBookingDescription('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await updateBooking(bookingId, { status: 'cancelled' });
      toast.success('Booking cancelled');
    } catch (error: any) {
      toast.error('Failed to cancel booking');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center grid-pattern">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    b => b.status !== 'cancelled' && b.status !== 'completed' &&
    new Date(b.slot?.start_time) > new Date()
  );

  const pastBookings = bookings.filter(
    b => b.status === 'completed' || new Date(b.slot?.start_time) <= new Date()
  );

  return (
    <div className="min-h-screen grid-pattern">
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      {/* Header */}
      <nav className="relative border-b border-border-glass glass backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-gradient-primary">Student Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {profile.full_name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Appointments</h2>
              {bookingsLoading ? (
                <Card className="glass-card p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </Card>
              ) : upcomingBookings.length === 0 ? (
                <Card className="glass-card p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Book office hours to get started
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="glass-card p-6 border-glass">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {booking.teacher?.full_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {booking.teacher?.department || 'Teacher'}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2 ml-13">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>
                                {format(new Date(booking.slot?.start_time), 'EEEE, MMMM d · h:mm a')}
                              </span>
                            </div>

                            {booking.slot?.location && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{booking.slot.location}</span>
                              </div>
                            )}

                            {booking.slot?.virtual_link && (
                              <div className="flex items-center gap-2 text-sm">
                                <Video className="w-4 h-4 text-primary" />
                                <a
                                  href={booking.slot.virtual_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            )}

                            <div className="mt-3 p-3 rounded-lg bg-surface-elevated">
                              <p className="text-sm font-medium text-foreground mb-1">Topic:</p>
                              <p className="text-sm text-muted-foreground">{booking.topic}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {booking.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium">
                              <AlertCircle className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                          {booking.status === 'confirmed' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Confirmed
                            </span>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Available Slots */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Available Office Hours</h2>
              {slotsLoading ? (
                <Card className="glass-card p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </Card>
              ) : slots.length === 0 ? (
                <Card className="glass-card p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-muted mx-auto mb-4" />
                  <p className="text-muted-foreground">No available office hours</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {slots.slice(0, 6).map((slot) => (
                    <Card
                      key={slot.id}
                      className="glass-card p-4 border-glass hover:border-primary/30 transition-all cursor-pointer"
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg gradient-success flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {slot.teacher?.full_name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {slot.teacher?.department}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <Clock className="w-3 h-3" />
                            <span>{format(new Date(slot.start_time), 'MMM d, h:mm a')}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="flex-shrink-0">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass-card p-6 border-glass">
              <h3 className="text-lg font-semibold text-foreground mb-4">Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">
                    {upcomingBookings.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-success">
                    {pastBookings.filter(b => b.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-warning">
                    {slots.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="glass-card max-w-lg w-full p-6 border-glass">
            <h3 className="text-xl font-bold text-foreground mb-4">Book Office Hours</h3>

            <div className="mb-6 p-4 rounded-lg bg-surface-elevated">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedSlot.teacher?.full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedSlot.teacher?.department}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(selectedSlot.start_time), 'EEEE, MMMM d · h:mm a')}</span>
                </div>
                {selectedSlot.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedSlot.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Topic <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  placeholder="e.g., Project feedback, Assignment help"
                  className="w-full px-4 py-2 bg-input border border-border-glass rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Details (Optional)
                </label>
                <textarea
                  value={bookingDescription}
                  onChange={(e) => setBookingDescription(e.target.value)}
                  placeholder="Provide any additional context..."
                  rows={3}
                  className="w-full px-4 py-2 bg-input border border-border-glass rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setSelectedSlot(null);
                  setBookingTopic('');
                  setBookingDescription('');
                }}
                variant="outline"
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleBookSlot}
                className="flex-1 gradient-primary"
                disabled={submitting || !bookingTopic.trim()}
              >
                {submitting ? 'Booking...' : 'Confirm'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
