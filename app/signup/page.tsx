'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Mail, Lock, User, AlertCircle, BookOpen, Briefcase } from 'lucide-react';
import { UserRole } from '@/lib/types/database';

export default function SignUpPage() {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        role,
        full_name: fullName,
        email,
      });

      if (profileError) throw profileError;

      // Create role-specific profile
      if (role === 'teacher') {
        await supabase.from('teacher_profiles').insert({
          user_id: authData.user.id,
        });
      } else {
        await supabase.from('student_profiles').insert({
          user_id: authData.user.id,
        });
      }

      // Redirect based on role
      if (role === 'teacher') {
        router.push('/teacher/onboarding');
      } else {
        router.push('/student/onboarding');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-pattern flex items-center justify-center p-4">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative w-full max-w-2xl animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-strong glow-primary mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">Join Classy</h1>
          <p className="text-muted-foreground">Create your account in just a few steps</p>
        </div>

        {/* Role Selection Step */}
        {step === 'role' && (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-semibold text-center mb-6">I am a...</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Student Card */}
              <button
                onClick={() => {
                  setRole('student');
                  setStep('details');
                }}
                className="group relative"
              >
                <Card className="glass-card p-8 border-glass hover:border-primary/50 transition-all duration-300 hover-glow h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center glow-sm">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Student</h3>
                      <p className="text-muted-foreground">
                        Book office hours, connect with classmates, and get AI-powered study recommendations
                      </p>
                    </div>
                    <div className="pt-4">
                      <div className="inline-flex items-center gap-2 text-primary font-semibold">
                        Get Started
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </button>

              {/* Teacher Card */}
              <button
                onClick={() => {
                  setRole('teacher');
                  setStep('details');
                }}
                className="group relative"
              >
                <Card className="glass-card p-8 border-glass hover:border-secondary/50 transition-all duration-300 hover-glow h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-2xl gradient-warning flex items-center justify-center glow-sm">
                      <Briefcase className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Teacher</h3>
                      <p className="text-muted-foreground">
                        Manage office hours, track bookings, and get AI-powered insights on student engagement
                      </p>
                    </div>
                    <div className="pt-4">
                      <div className="inline-flex items-center gap-2 text-secondary font-semibold">
                        Get Started
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <Card className="glass-card p-8 border-glass animate-slide-up">
            <button
              onClick={() => setStep('role')}
              className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to role selection
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Create your {role} account
              </h2>
              <p className="text-muted-foreground mt-1">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-input border border-border-glass rounded-xl
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-input border border-border-glass rounded-xl
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-input border border-border-glass rounded-xl
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all duration-200"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-slide-down">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary hover:opacity-90 transition-opacity h-12 text-base font-semibold rounded-xl shadow-lg hover-glow"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
