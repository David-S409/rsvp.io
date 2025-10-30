'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PublicEvent, getCategoryColor, formatEventDate } from '@/lib/mock-events';

interface EventCardProps {
  event: PublicEvent;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const cardVariant = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    },
  };

  const attendancePercentage = event.maxAttendees
    ? (event.attendeeCount / event.maxAttendees) * 100
    : null;

  const isNearCapacity = attendancePercentage && attendancePercentage > 80;

  return (
    <motion.div
      variants={cardVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Card className="h-full overflow-hidden hover:shadow-xl dark:hover:shadow-orange-500/10 transition-all duration-300 group border-gray-200 dark:border-slate-700 flex flex-col">
        {/* Event Image */}
        <div className="relative h-48 w-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {event.featured && (
            <div className="absolute top-3 right-3 bg-orange-600 dark:bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Featured
            </div>
          )}
          <Badge
            className={`absolute top-3 left-3 ${getCategoryColor(event.category)} border`}
          >
            {event.category}
          </Badge>
        </div>

        {/* Event Content */}
        <CardContent className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
            {event.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-2 mt-auto">
            {/* Date & Time */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span>
                {formatEventDate(event.date)} at {event.time}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0">
                <div className="font-medium">{event.location.venue}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">{event.location.city}</div>
              </div>
            </div>

            {/* Host */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <User className="h-4 w-4 text-orange-600 dark:text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span>Hosted by {event.host.name}</span>
            </div>

            {/* Attendees */}
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-orange-600 dark:text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span className={isNearCapacity ? 'text-orange-600 dark:text-orange-500 font-medium' : 'text-gray-700 dark:text-gray-300'}>
                {event.attendeeCount} attending
                {event.maxAttendees && ` • ${event.maxAttendees - event.attendeeCount} spots left`}
              </span>
            </div>
          </div>
        </CardContent>

        {/* Event Actions */}
        <CardFooter className="p-5 pt-0 flex gap-2">
          <Button
            asChild
            className="flex-1 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Link href={`/events/${event.id}`}>
              View Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;
