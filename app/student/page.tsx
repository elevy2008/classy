'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, TrendingUp, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { mockStudentUser } from '@/lib/mock-data';

export default function StudentDashboard() {
  const user = mockStudentUser;

  const upcomingBookings = user.bookings.filter(
    (b) => new Date(b.date) > new Date() && b.status !== 'CANCELLED'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Classy</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your schedule</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Upcoming Bookings"
            value={upcomingBookings.length}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-blue-500"
          />
          <StatCard
            title="Classes Today"
            value={user.schedules.length}
            icon={<Clock className="w-6 h-6" />}
            color="bg-purple-500"
          />
          <StatCard
            title="Active Teachers"
            value={12}
            icon={<Users className="w-6 h-6" />}
            color="bg-green-500"
          />
          <StatCard
            title="This Week"
            value={`${upcomingBookings.length} meetings`}
            icon={<TrendingUp className="w-6 h-6" />}
            color="bg-orange-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Office Hours</CardTitle>
              <CardDescription>Your scheduled meetings with teachers</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingBookings && upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.teacher.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString()} at {booking.startTime}
                          </p>
                          {booking.notes && (
                            <p className="text-xs text-gray-500 mt-1">{booking.notes}</p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming bookings</p>
                  <Button className="mt-4 gradient-bg">Browse Teachers</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gradient-bg" size="lg">
                <Calendar className="w-5 h-5 mr-3" />
                Book Office Hours
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Clock className="w-5 h-5 mr-3" />
                Manage My Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Users className="w-5 h-5 mr-3" />
                Find Classmates
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <TrendingUp className="w-5 h-5 mr-3" />
                AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Class Schedule */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Class Schedule</CardTitle>
            <CardDescription>Your weekly classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {user.schedules.map((schedule) => {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">{days[schedule.dayOfWeek]}</p>
                        <p className="text-xs text-gray-500">{schedule.startTime}</p>
                      </div>
                      <div className="w-px h-12 bg-gray-200" />
                      <div>
                        <p className="font-medium text-gray-900">{schedule.subject}</p>
                        <p className="text-sm text-gray-600">{schedule.location}</p>
                        <p className="text-xs text-gray-500">
                          {schedule.startTime} - {schedule.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Personalized suggestions to help you succeed</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-medium text-gray-900">📚 Schedule office hours with Dr. Smith</p>
              <p className="text-sm text-gray-600 mt-1">
                Based on your upcoming exam in Calculus II, we recommend booking time this week.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-medium text-gray-900">👥 Connect with your study group</p>
              <p className="text-sm text-gray-600 mt-1">
                3 classmates from CS301 are available this afternoon for group study.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-medium text-gray-900">⏰ Don't forget!</p>
              <p className="text-sm text-gray-600 mt-1">
                You have office hours with Prof. Chen in 2 days. Prepare your project questions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
          <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
