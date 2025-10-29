# API Documentation

This directory contains API endpoint documentation for RSVP.io

## API Structure

All API routes are located in `src/app/api/`

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Events

- `GET /api/events` - List all user's events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get event details
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `GET /api/events/:slug/public` - Get public event page

### Guests

- `GET /api/events/:eventId/guests` - List event guests
- `POST /api/events/:eventId/guests` - Add guest(s)
- `PATCH /api/events/:eventId/guests/:id` - Update guest
- `DELETE /api/events/:eventId/guests/:id` - Remove guest
- `POST /api/events/:eventId/guests/import` - Bulk import guests (CSV)

### RSVPs

- `GET /api/events/:eventId/rsvps` - List event RSVPs
- `POST /api/events/:eventId/rsvps` - Submit RSVP
- `PATCH /api/rsvps/:id` - Update RSVP
- `GET /api/rsvps/:id` - Get RSVP details

### Notifications

- `POST /api/events/:eventId/invitations/send` - Send invitations
- `POST /api/events/:eventId/reminders` - Send event reminders

## API Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

## Authentication

API routes require authentication using NextAuth.js session cookies. Include session cookie in requests to authenticated endpoints.

## Rate Limiting

- Public endpoints: 100 requests per 15 minutes
- Authenticated endpoints: 1000 requests per 15 minutes

## Example Request

```typescript
// Example: Create an event
const response = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Wedding',
    date: '2025-12-31',
    time: '18:00',
    location: '123 Main St',
    eventType: 'WEDDING',
  }),
})

const data = await response.json()
```

## See Individual Endpoint Documentation

- [Authentication Endpoints](./auth.md)
- [Event Endpoints](./events.md)
- [Guest Endpoints](./guests.md)
- [RSVP Endpoints](./rsvps.md)
