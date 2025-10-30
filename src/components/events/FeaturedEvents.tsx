'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from './EventCard';
import { spacing, typography } from '@/lib/design-tokens';
import { mockEvents } from '@/lib/mock-events';

const FeaturedEvents = () => {
  // Get only featured events (limit to 3 for landing page)
  const featuredEvents = mockEvents.filter((event) => event.featured).slice(0, 3);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className={`${spacing.section} bg-white dark:bg-slate-900 scroll-mt-10`} id="events">
      <div className={spacing.container}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full mb-4 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Featured Events
          </div>
          <h2 className={`${typography.h2} mb-4 text-gray-900 dark:text-white`}>
            Discover Upcoming Events
          </h2>
          <p className={`${typography.body} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
            Join exciting events happening in your community. From conferences to celebrations,
            find the perfect event for you.
          </p>
        </motion.div>

        {/* Featured Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all group"
          >
            <Link href="/events" className="inline-flex items-center gap-2">
              Browse All Events
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
