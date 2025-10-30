'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../branding/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        // If we're not on the home page, navigate to home with hash
        if (pathname !== '/') {
            router.push(`/#${id}`);
            return;
        }

        // If we're on the home page, smooth scroll to the section
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Check scroll position immediately
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // Handle hash navigation on page load
    useEffect(() => {
        if (pathname === '/' && window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const el = document.getElementById(id);
                el?.scrollIntoView({ behavior: 'smooth' });
                // Update scrolled state after scrolling
                setTimeout(() => {
                    setScrolled(window.scrollY > 50);
                }, 300);
            }, 100);
        }
    }, [pathname]);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '/events', label: 'Events', isRoute: true },
        { href: '#pricing', label: 'Pricing' },
        { href: '#about', label: 'About' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md text-gray-900 dark:text-white'
                    : 'bg-transparent text-white'
            }`}
        >
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0" aria-label="RSVP'd Home">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            link.isRoute ? (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`font-medium transition-colors hover:scale-105 transform duration-200 ${
                                        scrolled
                                            ? 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500'
                                            : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href.substring(1))}
                                    className={`font-medium transition-colors hover:scale-105 transform duration-200 ${
                                        scrolled
                                            ? 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500'
                                            : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            )
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons and Theme Toggle */}
                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <Button
                            asChild
                            variant="ghost"
                            className={
                                scrolled
                                    ? 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800'
                                    : 'text-white hover:bg-white/10'
                            }
                        >
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button
                            asChild
                            className={
                                scrolled
                                    ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white shadow-md'
                                    : 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg'
                            }
                        >
                            <Link href="/register">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile Theme Toggle and Menu Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md hover:bg-white/10 dark:hover:bg-slate-800/50 transition-colors"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 overflow-hidden"
                    >
                        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
                            {navLinks.map((link) => (
                                link.isRoute ? (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium py-2 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href.substring(1))}
                                        className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium py-2 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                )
                            ))}
                            <div className="pt-4 border-t border-gray-200 dark:border-slate-700 flex flex-col gap-3">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Link href="/login">Sign In</Link>
                                </Button>
                                <Button
                                    asChild
                                    className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Link href="/register">Get Started</Link>
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
