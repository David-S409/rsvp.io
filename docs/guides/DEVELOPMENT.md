# Development Guidelines

This document outlines coding standards and best practices for RSVP.io development.

## Table of Contents

- [Getting Started](#getting-started)
- [Code Style](#code-style)
- [Project Structure](#project-structure)
- [TypeScript Guidelines](#typescript-guidelines)
- [React Best Practices](#react-best-practices)
- [API Development](#api-development)
- [Database](#database)
- [Testing](#testing)
- [Git Workflow](#git-workflow)

---

## Getting Started

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/David-S409/rsvp.io.git
cd rsvp.io

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start Docker containers
npm run docker:up

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

---

## Code Style

### Formatting
- **Formatter:** Prettier (automatically configured)
- **Linter:** ESLint (Next.js config)
- Run `npm run lint` before committing

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `EventCard.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)
- Hooks: `use-kebab-case.ts` (e.g., `use-auth.ts`)
- Types: `kebab-case.ts` (e.g., `event-types.ts`)

**Variables & Functions:**
- Use `camelCase` for variables and functions
- Use `PascalCase` for components and classes
- Use `UPPER_SNAKE_CASE` for constants

```typescript
// Good
const userName = 'John'
function getUserById(id: string) { }
const MAX_UPLOAD_SIZE = 5_000_000

// Bad
const user_name = 'John'
function get_user_by_id(id: string) { }
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Authenticated routes
│   ├── (public)/          # Public routes
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utilities & libraries
│   ├── api/             # API client utilities
│   ├── utils/           # Helper functions
│   └── validations/     # Zod schemas
└── types/               # TypeScript types
```

---

## TypeScript Guidelines

### Always Define Types

```typescript
// Good ✅
interface Event {
  id: string
  title: string
  date: Date
}

function createEvent(data: Event): Promise<Event> {
  // ...
}

// Bad ❌
function createEvent(data: any) {
  // ...
}
```

### Use Type Inference Where Appropriate

```typescript
// Good ✅
const events = await prisma.event.findMany() // Type is inferred

// Unnecessary ❌
const events: Event[] = await prisma.event.findMany()
```

### Avoid `any`

Use `unknown` when the type is truly unknown, then narrow it:

```typescript
// Good ✅
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}

// Bad ❌
function processData(data: any) {
  return data.toUpperCase()
}
```

---

## React Best Practices

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types
interface ComponentProps {
  title: string
  onSave?: () => void
}

// 3. Component
export function Component({ title, onSave }: ComponentProps) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false)

  // 5. Event handlers
  const handleSave = () => {
    onSave?.()
  }

  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleSave}>Save</Button>
    </div>
  )
}
```

### Server vs Client Components

**Default to Server Components:**
```typescript
// app/events/page.tsx
export default async function EventsPage() {
  const events = await prisma.event.findMany()
  return <EventList events={events} />
}
```

**Use Client Components when needed:**
```typescript
// components/EventList.tsx
'use client'

export function EventList({ events }: Props) {
  const [filter, setFilter] = useState('')
  // Interactive logic...
}
```

### Custom Hooks

Prefix with `use` and place in `src/lib/hooks/`:

```typescript
// src/lib/hooks/use-events.ts
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)

  // Hook logic...

  return { events, loading, refetch }
}
```

---

## API Development

### Route Structure

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // 2. Validation (if needed)
    // const data = schema.parse(await request.json())

    // 3. Business logic
    const events = await prisma.event.findMany({
      where: { userId: session.user.id }
    })

    // 4. Response
    return NextResponse.json({ success: true, data: events })

  } catch (error) {
    // 5. Error handling
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch events' } },
      { status: 500 }
    )
  }
}
```

### Response Format

**Success:**
```typescript
{ success: true, data: { ... } }
```

**Error:**
```typescript
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'Human-readable message',
    details: {} // Optional
  }
}
```

---

## Database

### Prisma Best Practices

**1. Use transactions for multiple operations:**
```typescript
await prisma.$transaction(async (tx) => {
  await tx.event.create({ data: eventData })
  await tx.guest.createMany({ data: guestsData })
})
```

**2. Select only needed fields:**
```typescript
// Good ✅
const event = await prisma.event.findUnique({
  where: { id },
  select: { id: true, title: true, date: true }
})

// Less efficient ❌
const event = await prisma.event.findUnique({ where: { id } })
```

**3. Use includes sparingly:**
```typescript
// Only include relations you need
const event = await prisma.event.findUnique({
  where: { id },
  include: {
    guests: true, // Only if needed
  }
})
```

### Migrations

```bash
# Create migration
npm run db:migrate

# Push schema changes (dev only)
npm run db:push

# Open Prisma Studio
npm run db:studio
```

---

## Testing

### Unit Tests (Jest)

```typescript
// Component.test.tsx
import { render, screen } from '@/__tests__/utils/test-utils'
import { Component } from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright)

```typescript
// e2e/events.spec.ts
import { test, expect } from '@playwright/test'

test('user can create an event', async ({ page }) => {
  await page.goto('/events/new')
  await page.fill('input[name="title"]', 'My Event')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/events\/[\w-]+/)
})
```

### Run Tests

```bash
# Unit tests
npm test
npm run test:watch
npm run test:coverage

# E2E tests
npm run test:e2e
npm run test:e2e:ui
```

---

## Git Workflow

### Branch Naming

- `main` - Production branch
- `dev/feature-name` - Feature branches
- `fix/bug-name` - Bug fix branches
- `docs/topic` - Documentation updates

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding tests
- `chore`: Updating build tasks, package manager configs, etc.

**Examples:**
```
feat(auth): add Google OAuth login
fix(events): correct date formatting issue
docs(api): update authentication endpoints
test(events): add unit tests for event creation
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit
3. Push to GitHub
4. Create Pull Request
5. Request review
6. Address feedback
7. Merge when approved

---

## Environment Variables

Never commit `.env` files! Always use `.env.example` as template.

**Required variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL

---

## Performance

### Images
- Use Next.js `<Image>` component
- Optimize images before uploading
- Use appropriate formats (WebP when possible)

### Code Splitting
- Dynamic imports for large components
- Route-based code splitting (automatic with App Router)

### Database
- Add indexes for frequently queried fields
- Use pagination for large datasets
- Optimize N+1 queries with includes

---

## Security

- ✅ Never expose API keys in client code
- ✅ Validate all user input
- ✅ Use parameterized queries (Prisma does this automatically)
- ✅ Implement rate limiting on public endpoints
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
