'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  MessageSquare,
  Brain,
  Users,
  GraduationCap,
  CheckCircle,
  Zap,
  Bell,
  BarChart3,
  Sparkles,
  ArrowRight,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <nav className="relative border-b border-border-glass glass backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl glass-strong glow-sm flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-gradient-primary">Classy Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-foreground hover:bg-surface-elevated">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="gradient-primary hover:opacity-90 shadow-lg hover-glow">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full text-sm font-medium mb-8 border border-border-glass">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-gradient-primary">AI-Powered Academic Platform</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            The Future of
            <br />
            <span className="text-gradient-primary">Student-Teacher</span>
            <br />
            Connection
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium platform combining intelligent scheduling, real-time analytics,
            and AI-powered insights for seamless academic collaboration
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gradient-primary hover:opacity-90 text-lg h-16 px-10 rounded-2xl shadow-2xl hover-glow">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg h-16 px-10 rounded-2xl border-border-glass glass hover:bg-surface-elevated">
                View Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            <div className="glass-card p-6 rounded-2xl border border-border-glass">
              <div className="text-4xl font-bold text-gradient-primary mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-border-glass">
              <div className="text-4xl font-bold text-gradient-success mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-border-glass">
              <div className="text-4xl font-bold text-gradient-warning mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Premium Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for world-class academic collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-7 h-7" />}
              title="Smart Scheduling"
              description="AI-powered office hours booking with intelligent conflict resolution and automatic reminders"
              gradient="gradient-primary"
            />
            <FeatureCard
              icon={<Brain className="w-7 h-7" />}
              title="AI Assistant"
              description="Get personalized study recommendations, meeting summaries, and intelligent email composition"
              gradient="gradient-success"
            />
            <FeatureCard
              icon={<BarChart3 className="w-7 h-7" />}
              title="Real-time Analytics"
              description="Track engagement patterns, popular times, and get actionable insights with beautiful visualizations"
              gradient="gradient-warning"
            />
            <FeatureCard
              icon={<Users className="w-7 h-7" />}
              title="Student Network"
              description="Connect with classmates, form study groups, and collaborate on projects seamlessly"
              gradient="gradient-primary"
            />
            <FeatureCard
              icon={<Bell className="w-7 h-7" />}
              title="Multi-channel Alerts"
              description="Email, SMS, and push notifications ensure you never miss an important meeting"
              gradient="gradient-success"
            />
            <FeatureCard
              icon={<Zap className="w-7 h-7" />}
              title="Calendar Sync"
              description="Automatic two-way sync with Google Calendar and other popular calendar apps"
              gradient="gradient-warning"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Students */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-border-glass">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">For Students</span>
                </div>
                <h2 className="text-5xl font-bold text-foreground mb-4">
                  Your Academic Success,
                  <span className="text-gradient-primary"> Simplified</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tools designed to help you stay organized, connected, and ahead
                </p>
              </div>

              <div className="space-y-4">
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-accent-green" />}
                  text="Instant office hours booking with real-time availability"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-accent-green" />}
                  text="AI-powered study recommendations tailored to your needs"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-accent-green" />}
                  text="Find and connect with classmates in all your courses"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-accent-green" />}
                  text="Smart notifications ensure you never miss a meeting"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-accent-green" />}
                  text="Track all your appointments in one beautiful dashboard"
                />
              </div>

              <Link href="/signup">
                <Button className="gradient-primary hover:opacity-90 h-14 px-8 rounded-xl shadow-lg hover-glow">
                  Get Started as Student
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Teachers */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-border-glass">
                  <Briefcase className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">For Teachers</span>
                </div>
                <h2 className="text-5xl font-bold text-foreground mb-4">
                  Manage Office Hours,
                  <span className="text-gradient-warning"> Effortlessly</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Powerful tools to streamline scheduling and boost engagement
                </p>
              </div>

              <div className="space-y-4">
                <BenefitItem
                  icon={<Target className="w-6 h-6 text-accent-orange" />}
                  text="Set availability once, let students book automatically"
                />
                <BenefitItem
                  icon={<TrendingUp className="w-6 h-6 text-accent-orange" />}
                  text="AI-generated analytics on booking patterns and topics"
                />
                <BenefitItem
                  icon={<Clock className="w-6 h-6 text-accent-orange" />}
                  text="Automatic meeting summaries and follow-up suggestions"
                />
                <BenefitItem
                  icon={<MessageSquare className="w-6 h-6 text-accent-orange" />}
                  text="Track student engagement across all your classes"
                />
                <BenefitItem
                  icon={<Zap className="w-6 h-6 text-accent-orange" />}
                  text="Seamless integration with your existing calendar"
                />
              </div>

              <Link href="/signup">
                <Button className="gradient-warning hover:opacity-90 h-14 px-8 rounded-xl shadow-lg hover-glow">
                  Get Started as Teacher
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="glass-card border-glass p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh opacity-20" />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold text-foreground mb-6">
                Ready to Transform Your
                <br />
                <span className="text-gradient-primary">Academic Experience?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of students and teachers already using Classy Pro
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="gradient-primary hover:opacity-90 h-16 px-10 rounded-2xl shadow-2xl hover-glow text-lg">
                    Start Free Trial
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-border-glass glass hover:bg-surface-elevated text-lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border-glass glass backdrop-blur-xl py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">Classy Pro</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© 2025 Classy Pro. All rights reserved.</p>
            <p className="mt-1">Built with Next.js, Supabase, and OpenAI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Card className="glass-card p-8 border-glass hover:border-primary/30 transition-all duration-300 hover-glow group">
      <div className={`w-14 h-14 ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}

function BenefitItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start space-x-4 glass-card p-4 rounded-xl border border-border-glass hover:bg-surface-elevated transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <span className="text-foreground text-lg">{text}</span>
    </div>
  );
}

function Briefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
