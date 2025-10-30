'use client';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import FeaturedEvents from '@/components/events/FeaturedEvents';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2, Mail, Users, Calendar, BarChart, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { typography, spacing } from '@/lib/design-tokens';

const Home = () => {
    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariant = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <div className="overflow-hidden">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-4rem)] md:min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-600 dark:via-orange-500 dark:to-orange-400 flex items-center justify-center px-4 pt-24 pb-20 lg:pt-32 lg:pb-28">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className={spacing.container}>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                        {/* Left side - Text content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center lg:text-left text-white"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30"
                            >
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-medium">Modern Event Management</span>
                            </motion.div>

                            <h1 className={`${typography.h1} mb-6 leading-tight`}>
                                Create Unforgettable Events with{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10">RSVP&apos;d</span>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="absolute bottom-2 left-0 h-3 bg-white/30 -z-0"
                                    />
                                </span>
                            </h1>

                            <p className={`${typography.lead} mb-8 text-orange-50 max-w-2xl ${
                                'lg:max-w-xl'
                            }`}>
                                Streamline your event planning with beautiful invitations,
                                real-time RSVP tracking, and powerful guest management tools.
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex gap-4 justify-center lg:justify-start flex-wrap"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl hover:shadow-2xl transition-all h-12 px-8 text-base font-semibold"
                                >
                                    <Link href="/register">
                                        Get Started Free
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="border-2 border-white text-white hover:bg-white/10 hover:text-white h-12 px-8 text-base font-semibold"
                                >
                                    <Link href="#features">Explore Features</Link>
                                </Button>
                            </motion.div>

                            {/* Social Proof */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 justify-center lg:justify-start text-orange-50"
                            >
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-white">10K+</div>
                                    <div className="text-xs sm:text-sm">Events Created</div>
                                </div>
                                <div className="w-px h-12 bg-white/30" />
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-white">50K+</div>
                                    <div className="text-xs sm:text-sm">Happy Users</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right side - Hero image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl" />
                                <Image
                                    src="/images/hero/garden party-cuate.svg"
                                    alt="Garden party illustration showing people celebrating at an event"
                                    width={500}
                                    height={500}
                                    unoptimized
                                    className="relative w-full h-auto max-w-lg drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
                    >
                        <div className="w-1.5 h-3 bg-white rounded-full mx-auto" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section
                className={`${spacing.section} bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 scroll-mt-10`}
                id="features"
            >
                <div className={spacing.container}>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full mb-4 text-sm font-medium">
                            <Zap className="h-4 w-4" />
                            Features
                        </div>
                        <h2 className={`${typography.h2} mb-4 text-gray-900 dark:text-white`}>
                            Everything you need to succeed
                        </h2>
                        <p className={`${typography.body} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
                            Powerful features designed to make event management effortless and enjoyable
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            {[
                                {
                                    icon: Mail,
                                    title: 'Easy RSVP Collection',
                                    description: 'Send beautiful invitations and collect responses instantly with automated tracking',
                                },
                                {
                                    icon: Users,
                                    title: 'Guest Management',
                                    description: 'Organize guests, track attendance, and manage plus-ones with ease',
                                },
                                {
                                    icon: Calendar,
                                    title: 'Event Scheduling',
                                    description: 'Create multiple events and manage timelines seamlessly from one dashboard',
                                },
                                {
                                    icon: BarChart,
                                    title: 'Real-time Analytics',
                                    description: 'Track responses and get valuable insights into your guest list patterns',
                                },
                            ].map((feature) => (
                                <motion.div key={feature.title} variants={cardVariant}>
                                    <Card className="h-full hover:shadow-lg dark:hover:shadow-orange-500/10 transition-shadow duration-300 border-gray-200 dark:border-slate-700">
                                        <CardHeader>
                                            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-3">
                                                <feature.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                                            <CardDescription className="text-sm">
                                                {feature.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center"
                        >
                            <Image
                                src="/images/hero/Music festival-cuate.svg"
                                alt="Music festival illustration"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-full h-auto max-w-md"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                icon: CheckCircle2,
                                title: 'Automated Reminders',
                                description: 'Send automatic reminders to guests who haven\'t responded yet',
                            },
                            {
                                icon: Mail,
                                title: 'Custom Invitations',
                                description: 'Design personalized invitations that perfectly match your event theme',
                            },
                        ].map((feature) => (
                            <motion.div key={feature.title} variants={cardVariant}>
                                <Card className="hover:shadow-lg dark:hover:shadow-orange-500/10 transition-shadow duration-300 border-gray-200 dark:border-slate-700">
                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-3">
                                            <feature.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                        <CardDescription className="text-sm">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Events Section */}
            <FeaturedEvents />

            {/* Pricing Section */}
            <section
                className={`${spacing.section} scroll-mt-10 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900`}
                id="pricing"
            >
                <div className={spacing.container}>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full mb-4 text-sm font-medium">
                            <Sparkles className="h-4 w-4" />
                            Pricing
                        </div>
                        <h2 className={`${typography.h2} mb-4 text-gray-900 dark:text-white`}>
                            Simple, transparent pricing
                        </h2>
                        <p className={`${typography.body} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
                            Choose the perfect plan for your event needs
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="h-full hover:shadow-xl dark:hover:shadow-orange-500/10 transition-shadow duration-300 border-gray-200 dark:border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Free</CardTitle>
                                    <CardDescription>Perfect for small events</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
                                        <span className="text-gray-500 dark:text-gray-400">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {['Up to 10 guests', '1 event', 'Basic analytics'].map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="h-full border-orange-600 dark:border-orange-500 border-2 relative shadow-xl hover:shadow-2xl dark:hover:shadow-orange-500/20 transition-shadow duration-300">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                                    Most Popular
                                </div>
                                <CardHeader className="pt-8">
                                    <CardTitle className="text-2xl">Pro</CardTitle>
                                    <CardDescription>For professional event planners</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">$29</span>
                                        <span className="text-gray-500 dark:text-gray-400">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {[
                                            'Up to 500 guests',
                                            'Unlimited events',
                                            'Advanced analytics',
                                            'Custom invitations',
                                            'Mobile check-ins',
                                        ].map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="h-full hover:shadow-xl dark:hover:shadow-orange-500/10 transition-shadow duration-300 border-gray-200 dark:border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Enterprise</CardTitle>
                                    <CardDescription>For large organizations</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {[
                                            'Unlimited guests',
                                            'Unlimited events',
                                            'Priority support',
                                            'Custom integrations',
                                        ].map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/contact">Contact Sales</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About/CTA Section */}
            <section
                className={`${spacing.section} bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 scroll-mt-10`}
                id="about"
            >
                <div className={spacing.container}>
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                                <Sparkles className="h-4 w-4" />
                                About RSVP&apos;d
                            </div>
                            <h2 className={`${typography.h2} mb-6 text-gray-900 dark:text-white`}>
                                Making event management effortless
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p className={typography.body}>
                                    RSVP&apos;d was created to simplify event management for everyone.
                                    Whether you&apos;re planning an intimate gathering or a large-scale
                                    celebration, we provide the tools you need to succeed.
                                </p>
                                <p className={typography.body}>
                                    Our platform makes it easy to create beautiful invitations,
                                    track RSVPs in real-time, and gain valuable insights into
                                    your events. We believe planning should be simple, intuitive,
                                    and stress-free.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                                    <Link href="/register">Start Planning Your Event</Link>
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            <Image
                                src="/images/hero/Bachelorette party-pana.svg"
                                alt="Bachelorette party illustration"
                                width={300}
                                height={300}
                                unoptimized
                                className="w-full h-auto rounded-2xl"
                            />
                            <Image
                                src="/images/hero/Outdoor party-pana.svg"
                                alt="Outdoor party illustration"
                                width={300}
                                height={300}
                                unoptimized
                                className="w-full h-auto rounded-2xl mt-12"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
