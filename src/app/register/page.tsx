'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Password strength indicator
    const getPasswordStrength = (pass: string) => {
        if (pass.length === 0) return null;
        if (pass.length < 6) return { label: 'Weak', color: 'bg-red-500' };
        if (pass.length < 10) return { label: 'Medium', color: 'bg-yellow-500' };
        return { label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registration failed');
                setLoading(false);
                return;
            }

            // Auto-login after registration
            const signInRequest = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (signInRequest?.error) {
                setError(signInRequest.error || 'Login after registration failed');
                setLoading(false);
                return;
            }

            router.push('/dashboard');
        } catch {
            setError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Start managing your events with RSVP'd"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-red-900 dark:text-red-400 mb-1">
                                Registration failed
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 dark:text-gray-100 font-medium">
                        Full name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-11"
                        autoComplete="name"
                        disabled={loading}
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-gray-100 font-medium">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11"
                        autoComplete="email"
                        disabled={loading}
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-900 dark:text-gray-100 font-medium">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11"
                        autoComplete="new-password"
                        disabled={loading}
                        minLength={6}
                    />

                    {/* Password Strength Indicator */}
                    {passwordStrength && (
                        <div className="space-y-1.5 animate-fade-in">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                                <span className={`font-medium ${
                                    passwordStrength.label === 'Weak' ? 'text-red-600 dark:text-red-500' :
                                    passwordStrength.label === 'Medium' ? 'text-yellow-600 dark:text-yellow-500' :
                                    'text-green-600 dark:text-green-500'
                                }`}>
                                    {passwordStrength.label}
                                </span>
                            </div>
                            <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                    style={{
                                        width: passwordStrength.label === 'Weak' ? '33%' :
                                               passwordStrength.label === 'Medium' ? '66%' : '100%'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Must be at least 6 characters long
                    </p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                    <p>
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-medium">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-medium">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-medium"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Creating account...
                        </>
                    ) : (
                        'Create account'
                    )}
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                            Already have an account?
                        </span>
                    </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <Link
                        href="/login"
                        className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-medium"
                    >
                        Sign in instead
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
