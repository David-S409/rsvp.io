/**
 * Mock Event Data
 *
 * Sample public events for demonstration purposes
 */

export type EventCategory =
  | 'Wedding'
  | 'Conference'
  | 'Birthday'
  | 'Corporate'
  | 'Networking'
  | 'Workshop'
  | 'Concert'
  | 'Charity';

export interface PublicEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  location: {
    venue: string;
    address: string;
    city: string;
  };
  host: {
    name: string;
    avatar?: string;
  };
  attendeeCount: number;
  maxAttendees?: number;
  imageUrl: string;
  featured?: boolean;
}

export const mockEvents: PublicEvent[] = [
  {
    id: '1',
    title: 'Sarah & Michael\'s Wedding Celebration',
    description: 'Join us for a beautiful garden wedding ceremony followed by an elegant reception. Celebrate love, laughter, and happily ever after with the happy couple.',
    category: 'Wedding',
    date: '2025-11-15',
    time: '4:00 PM',
    location: {
      venue: 'Rosewood Garden Estate',
      address: '1234 Bloom Street',
      city: 'San Francisco, CA',
    },
    host: {
      name: 'Sarah Johnson',
    },
    attendeeCount: 156,
    maxAttendees: 200,
    imageUrl: '/images/events/wedding.svg',
    featured: true,
  },
  {
    id: '2',
    title: 'TechConf 2025: Future of AI',
    description: 'A premier technology conference bringing together industry leaders, innovators, and developers to explore the latest in artificial intelligence and machine learning.',
    category: 'Conference',
    date: '2025-11-08',
    time: '9:00 AM',
    location: {
      venue: 'Convention Center West',
      address: '789 Innovation Drive',
      city: 'Austin, TX',
    },
    host: {
      name: 'TechEvents Inc.',
    },
    attendeeCount: 487,
    maxAttendees: 500,
    imageUrl: '/images/events/conference.svg',
    featured: true,
  },
  {
    id: '3',
    title: 'Emma\'s 30th Birthday Bash',
    description: 'Celebrate three decades of amazing memories! Join us for an unforgettable evening of music, dancing, and celebration.',
    category: 'Birthday',
    date: '2025-11-22',
    time: '7:00 PM',
    location: {
      venue: 'The Loft Downtown',
      address: '456 Party Avenue',
      city: 'Los Angeles, CA',
    },
    host: {
      name: 'Emma Rodriguez',
    },
    attendeeCount: 78,
    maxAttendees: 100,
    imageUrl: '/images/events/birthday.svg',
    featured: true,
  },
  {
    id: '4',
    title: 'Startup Founders Networking Night',
    description: 'Connect with fellow entrepreneurs, investors, and innovators. Share ideas, build relationships, and discover opportunities in an intimate networking environment.',
    category: 'Networking',
    date: '2025-11-05',
    time: '6:30 PM',
    location: {
      venue: 'Innovation Hub',
      address: '321 Startup Lane',
      city: 'Seattle, WA',
    },
    host: {
      name: 'Seattle Founders Network',
    },
    attendeeCount: 124,
    maxAttendees: 150,
    imageUrl: '/images/events/networking.svg',
    featured: false,
  },
  {
    id: '5',
    title: 'Annual Charity Gala for Education',
    description: 'An elegant evening supporting educational programs for underprivileged children. Enjoy fine dining, live entertainment, and make a difference in young lives.',
    category: 'Charity',
    date: '2025-12-10',
    time: '6:00 PM',
    location: {
      venue: 'Grand Ballroom Hotel',
      address: '555 Charity Boulevard',
      city: 'New York, NY',
    },
    host: {
      name: 'Education First Foundation',
    },
    attendeeCount: 312,
    maxAttendees: 400,
    imageUrl: '/images/events/charity.svg',
    featured: true,
  },
  {
    id: '6',
    title: 'Web Design Workshop: Modern UI/UX',
    description: 'Hands-on workshop covering the latest trends in web design, user experience principles, and practical tips for creating stunning interfaces.',
    category: 'Workshop',
    date: '2025-11-12',
    time: '10:00 AM',
    location: {
      venue: 'Design Studio Co.',
      address: '888 Creative Street',
      city: 'Portland, OR',
    },
    host: {
      name: 'Design Masters',
    },
    attendeeCount: 45,
    maxAttendees: 50,
    imageUrl: '/images/events/workshop.svg',
    featured: false,
  },
  {
    id: '7',
    title: 'Q4 Corporate Team Building Retreat',
    description: 'Strengthen team bonds and boost morale with exciting activities, leadership workshops, and collaborative challenges in a beautiful outdoor setting.',
    category: 'Corporate',
    date: '2025-11-18',
    time: '8:00 AM',
    location: {
      venue: 'Mountain Ridge Resort',
      address: '777 Summit Road',
      city: 'Denver, CO',
    },
    host: {
      name: 'Innovate Corp',
    },
    attendeeCount: 89,
    maxAttendees: 100,
    imageUrl: '/images/events/corporate.svg',
    featured: false,
  },
  {
    id: '8',
    title: 'Summer Music Festival 2025',
    description: 'Three days of incredible live music featuring top artists across multiple genres. Food trucks, art installations, and unforgettable performances.',
    category: 'Concert',
    date: '2025-12-01',
    time: '2:00 PM',
    location: {
      venue: 'Riverside Amphitheater',
      address: '999 Music Way',
      city: 'Nashville, TN',
    },
    host: {
      name: 'Live Nation Events',
    },
    attendeeCount: 2847,
    maxAttendees: 5000,
    imageUrl: '/images/events/concert.svg',
    featured: true,
  },
  {
    id: '9',
    title: 'Product Launch: NextGen Smart Home',
    description: 'Be the first to experience our revolutionary smart home technology. Live demos, exclusive previews, and special launch pricing for attendees.',
    category: 'Corporate',
    date: '2025-11-25',
    time: '5:00 PM',
    location: {
      venue: 'Tech Showroom',
      address: '123 Innovation Plaza',
      city: 'San Jose, CA',
    },
    host: {
      name: 'SmartHome Technologies',
    },
    attendeeCount: 234,
    maxAttendees: 300,
    imageUrl: '/images/events/product-launch.svg',
    featured: false,
  },
];

export const eventCategories: EventCategory[] = [
  'Wedding',
  'Conference',
  'Birthday',
  'Corporate',
  'Networking',
  'Workshop',
  'Concert',
  'Charity',
];

// Helper to get category color for badges
export const getCategoryColor = (category: EventCategory): string => {
  const colors: Record<EventCategory, string> = {
    Wedding: 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
    Conference: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    Birthday: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    Corporate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700',
    Networking: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    Workshop: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    Concert: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    Charity: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
  };
  return colors[category];
};

// Format date for display
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
