'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Bell, Sparkles, ArrowLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { mockTeacherUser } from '@/lib/mock-data';

export default function TeacherDashboard() {
  const user = mockTeacherUser;

  const upcomingBookings = user.teacherBookings.filter(
    (b) => new Date(b.date) > new Date() && b.status !== 'CANCELLED'
  );

  const pendingBookings = user.teacherBookings.filter(
    (b) => b.status === 'PENDING'
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
            Welcome back, {user.name.split(' ')[1]}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Manage your office hours and student bookings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Upcoming Meetings"
            value={upcomingBookings.length}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-blue-500"
          />
          <StatCard
            title="Office Hours"
            value={user.officeHours.length}
            icon={<Clock className="w-6 h-6" />}
            color="bg-purple-500"
          />
          <StatCard
            title="Pending Requests"
            value={pendingBookings.length}
            icon={<Bell className="w-6 h-6" />}
            color="bg-orange-500"
          />
          <StatCard
            title="Total Students"
            value={47}
            icon={<Users className="w-6 h-6" />}
            color="bg-green-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pending Requests */}
          {pendingBookings && pendingBookings.length > 0 && (
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  Pending Requests
                </CardTitle>
                <CardDescription>Students waiting for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-orange-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.student.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString()} at {booking.startTime}
                          </p>
                          {booking.notes && (
                            <p className="text-xs text-gray-500 mt-1">{booking.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="gradient-bg">Accept</Button>
                        <Button size="sm" variant="outline">Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your confirmed student appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingBookings && upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.student.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString()} at {booking.startTime}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{booking.officeHour.location}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming meetings</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Office Hours Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Your Office Hours</CardTitle>
              <CardDescription>Manage your availability</CardDescription>
            </CardHeader>
            <CardContent>
              {user.officeHours && user.officeHours.length > 0 ? (
                <div className="space-y-4">
                  {user.officeHours.map((officeHour) => {
                    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    return (
                      <div
                        key={officeHour.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{officeHour.title}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {days[officeHour.dayOfWeek]} {officeHour.startTime} - {officeHour.endTime}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{officeHour.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              {officeHour.bookings?.length || 0}/{officeHour.maxStudents} booked
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button className="w-full gradient-bg">
                    <Clock className="w-4 h-4 mr-2" />
                    Add Office Hours
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No office hours set up</p>
                  <Button className="mt-4 gradient-bg">Create Office Hours</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gradient-bg" size="lg">
                <Calendar className="w-5 h-5 mr-3" />
                View All Bookings
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Clock className="w-5 h-5 mr-3" />
                Manage Office Hours
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Users className="w-5 h-5 mr-3" />
                View Students
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Bell className="w-5 h-5 mr-3" />
                Send Announcement
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>AI Insights & Analytics</CardTitle>
                <CardDescription>Data-driven recommendations for your office hours</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-medium text-gray-900">📊 Peak booking times</p>
              <p className="text-sm text-gray-600 mt-1">
                Most students book on Tuesday & Thursday afternoons. Consider adding more slots during these times.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-medium text-gray-900">⏰ Suggested availability</p>
              <p className="text-sm text-gray-600 mt-1">
                Based on student demand, consider offering office hours on Wednesday 2-4 PM.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-medium text-gray-900">💡 Common topics</p>
              <p className="text-sm text-gray-600 mt-1">
                Top discussion topics: "Assignment Help" (45%), "Exam Prep" (30%), "Project Guidance" (25%)
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
