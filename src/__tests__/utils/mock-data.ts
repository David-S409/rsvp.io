import { User, Event, Guest, RSVP, EventType, EventStatus, RSVPStatus } from '@prisma/client'

/**
 * Mock data generators for testing
 */

export const mockUser = (overrides?: Partial<User>): User => ({
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  passwordHash: 'hashed_password',
  avatar: null,
  emailVerified: null,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  ...overrides,
})

export const mockEvent = (overrides?: Partial<Event>): Event => ({
  id: 'event-123',
  userId: 'user-123',
  title: 'Test Wedding',
  description: 'A beautiful test wedding',
  eventType: EventType.WEDDING,
  date: new Date('2025-12-31'),
  time: '18:00',
  timezone: 'America/Los_Angeles',
  location: '123 Test St, Test City, TC 12345',
  venueName: 'Test Venue',
  capacity: 100,
  isPublic: true,
  slug: 'test-wedding-2025',
  coverImage: null,
  customFields: null,
  status: EventStatus.PUBLISHED,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  ...overrides,
})

export const mockGuest = (overrides?: Partial<Guest>): Guest => ({
  id: 'guest-123',
  eventId: 'event-123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  plusOnes: 1,
  invitationSent: false,
  invitationSentAt: null,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  ...overrides,
})

export const mockRSVP = (overrides?: Partial<RSVP>): RSVP => ({
  id: 'rsvp-123',
  eventId: 'event-123',
  guestId: 'guest-123',
  status: RSVPStatus.CONFIRMED,
  responseDate: new Date('2025-01-15'),
  notes: 'Looking forward to it!',
  customResponses: null,
  createdAt: new Date('2025-01-15'),
  updatedAt: new Date('2025-01-15'),
  ...overrides,
})

/**
 * Generate multiple mock items
 */
export const mockUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) =>
    mockUser({ id: `user-${i}`, email: `user${i}@example.com` })
  )

export const mockEvents = (count: number, userId = 'user-123'): Event[] =>
  Array.from({ length: count }, (_, i) =>
    mockEvent({ id: `event-${i}`, userId, slug: `event-${i}` })
  )

export const mockGuests = (count: number, eventId = 'event-123'): Guest[] =>
  Array.from({ length: count }, (_, i) =>
    mockGuest({
      id: `guest-${i}`,
      eventId,
      email: `guest${i}@example.com`,
      name: `Guest ${i}`
    })
  )

export const mockRSVPs = (count: number, eventId = 'event-123'): RSVP[] =>
  Array.from({ length: count }, (_, i) =>
    mockRSVP({ id: `rsvp-${i}`, eventId, guestId: `guest-${i}` })
  )
