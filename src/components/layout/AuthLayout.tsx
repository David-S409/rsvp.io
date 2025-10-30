'use client';

import Link from 'next/link';
import Logo from '../branding/Logo';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Branding */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-700 dark:from-orange-600 dark:to-orange-500 p-12 flex-col justify-between text-white relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative z-10">
                    <Link href="/" aria-label="Go to home page">
                        <Logo />
                    </Link>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4">
                        Welcome to RSVP&apos;d
                    </h2>
                    <p className="text-xl text-orange-50">
                        The modern way to manage your events, track RSVPs, and create
                        unforgettable experiences.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Easy RSVP Management</h3>
                                <p className="text-orange-50 text-sm">
                                    Track responses in real-time with beautiful dashboards
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Custom Invitations</h3>
                                <p className="text-orange-50 text-sm">
                                    Create stunning invitations that match your event
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Guest Analytics</h3>
                                <p className="text-orange-50 text-sm">
                                    Get insights into attendance and response patterns
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-orange-50">
                    © {new Date().getFullYear()} RSVP&apos;d. All rights reserved.
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50 dark:bg-slate-900">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 flex justify-center">
                        <Link href="/" aria-label="Go to home page">
                            <Logo />
                        </Link>
                    </div>

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 mb-8 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </Link>

                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {title}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
                    </div>

                    {/* Form Content */}
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayout;
