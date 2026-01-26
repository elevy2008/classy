'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MessageSquare,
  Brain,
  Clock,
  Users,
  Sparkles,
  CheckCircle,
  Zap,
  Mail,
  Bell
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Classy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/student">
                <Button variant="ghost">Student Demo</Button>
              </Link>
              <Link href="/teacher">
                <Button className="gradient-bg">Teacher Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Student-Teacher Communication</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Transform How Students <br />
            <span className="gradient-text">Connect with Teachers</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            The all-in-one platform for seamless office hours scheduling, student-teacher
            communication, and AI-powered academic support
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student">
              <Button size="lg" className="gradient-bg text-lg h-14 px-8">
                View Student Dashboard
              </Button>
            </Link>
            <Link href="/teacher">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                View Teacher Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to enhance communication and streamline scheduling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Smart Scheduling"
              description="Intelligent office hours booking that syncs with your class schedule"
              color="bg-blue-500"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Find Classmates"
              description="Connect with students in your classes and form study groups"
              color="bg-purple-500"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI Assistant"
              description="Get personalized recommendations and meeting summaries"
              color="bg-pink-500"
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Smart Notifications"
              description="Email, SMS, and push notifications for upcoming meetings"
              color="bg-orange-500"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Direct Messaging"
              description="Communicate with teachers and students in real-time"
              color="bg-green-500"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Calendar Sync"
              description="Automatic integration with Google Calendar"
              color="bg-yellow-500"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                For Students
              </h2>
              <div className="space-y-4">
                <BenefitItem text="Never miss office hours again" />
                <BenefitItem text="See teacher availability in real-time" />
                <BenefitItem text="Book appointments instantly" />
                <BenefitItem text="Get AI-powered study recommendations" />
                <BenefitItem text="Connect with classmates easily" />
              </div>
              <Link href="/student">
                <Button className="mt-8 gradient-bg">Explore Student View</Button>
              </Link>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                For Teachers
              </h2>
              <div className="space-y-4">
                <BenefitItem text="Manage office hours effortlessly" />
                <BenefitItem text="Track student engagement" />
                <BenefitItem text="AI-generated meeting summaries" />
                <BenefitItem text="Automated reminders and notifications" />
                <BenefitItem text="Analytics on popular times and topics" />
              </div>
              <Link href="/teacher">
                <Button className="mt-8 gradient-bg">Explore Teacher View</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and teachers already using Classy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/student">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  I'm a Student
                </Button>
              </Link>
              <Link href="/teacher">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  I'm a Teacher
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 gradient-bg rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Classy</span>
          </div>
          <p>© 2025 Classy. All rights reserved.</p>
          <p className="mt-2 text-sm">Demo Version - Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
      <span className="text-gray-700 text-lg">{text}</span>
    </div>
  );
}
