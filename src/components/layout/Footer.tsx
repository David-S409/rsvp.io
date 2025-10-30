import Logo from '../branding/Logo';
import Link from 'next/link';
import { Mail, Github, X } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'About', href: '#about' },
        ],
        support: [
            { label: 'Documentation', href: '#' },
            { label: 'Help Center', href: '#' },
            { label: 'Contact Us', href: '#' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
        ],
    };

    return (
        <footer className="bg-gray-50 dark:bg-slate-950 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-slate-800">
            <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Logo />
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                            Modern event management made simple. Create beautiful invitations,
                            track RSVPs, and manage your events with ease.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
                                aria-label="X (formerly Twitter)"
                            >
                                <X className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:hello@rsvpd.io"
                                className="p-3 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-500">
                            © {currentYear} RSVP&apos;d. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-500">
                            Built with ❤️ for event planners everywhere
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
