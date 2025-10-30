'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Users,
  User,
  ArrowLeft,
  Clock,
  Mail,
  Share2,
  Heart,
} from 'lucide-react';
import { spacing, typography } from '@/lib/design-tokens';
import { mockEvents, getCategoryColor, formatEventDate } from '@/lib/mock-events';

const EventDetailPage = () => {
  const params = useParams();
  const eventId = params?.id as string;

  // Find the event
  const event = mockEvents.find((e) => e.id === eventId);

  // If event not found
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The event you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
              <Link href="/events">Browse All Events</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const attendancePercentage = event.maxAttendees
    ? (event.attendeeCount / event.maxAttendees) * 100
    : null;

  const spotsLeft = event.maxAttendees ? event.maxAttendees - event.attendeeCount : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Back Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 pt-20 lg:pt-24">
        <div className={spacing.container}>
          <div className="py-4">
            <Button asChild variant="ghost" className="hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-600 dark:hover:text-orange-400">
              <Link href="/events" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Event Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 py-12">
        <div className={spacing.container}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Event Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl dark:shadow-orange-500/10"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                unoptimized
                className="object-cover"
              />
              {event.featured && (
                <div className="absolute top-4 right-4 bg-orange-600 dark:bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Featured Event
                </div>
              )}
            </motion.div>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <Badge className={`${getCategoryColor(event.category)} border w-fit mb-4`}>
                {event.category}
              </Badge>

              <h1 className={`${typography.h2} text-gray-900 dark:text-white mb-4`}>{event.title}</h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>

              {/* Quick Info Cards */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">{formatEventDate(event.date)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">{event.location.venue}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {event.location.address}, {event.location.city}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">Hosted by {event.host.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">{event.attendeeCount} People Attending</div>
                    {spotsLeft !== null && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Event is full'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Attendance Progress */}
              {attendancePercentage !== null && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {Math.round(attendancePercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        attendancePercentage > 80
                          ? 'bg-orange-600 dark:bg-orange-500'
                          : attendancePercentage > 50
                          ? 'bg-orange-500 dark:bg-orange-400'
                          : 'bg-green-500 dark:bg-green-400'
                      }`}
                      style={{ width: `${attendancePercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button
                  size="lg"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  RSVP Now
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-orange-50 dark:hover:bg-orange-950/50 dark:border-slate-700 dark:hover:border-orange-700 dark:hover:text-orange-400">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-orange-50 dark:hover:bg-orange-950/50 dark:border-slate-700 dark:hover:border-orange-700 dark:hover:text-orange-400">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Details */}
      <section className={`${spacing.section} bg-white dark:bg-slate-950`}>
        <div className={spacing.container}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-gray-200 dark:border-slate-700 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="text-2xl dark:text-white">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About This Event</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What to Expect</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>Event starts promptly at {event.time}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>Location: {event.location.venue}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>Join {event.attendeeCount} other attendees</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                    <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{event.location.venue}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {event.location.address}
                        <br />
                        {event.location.city}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
