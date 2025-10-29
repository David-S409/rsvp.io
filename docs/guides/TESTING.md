# Testing Guide

Comprehensive testing guide for RSVP.io

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Best Practices](#best-practices)
- [Coverage Requirements](#coverage-requirements)

---

## Testing Strategy

We use a multi-layered testing approach:

1. **Unit Tests** (Jest + React Testing Library) - Test individual components and functions
2. **Integration Tests** (Jest) - Test API routes and database interactions
3. **E2E Tests** (Playwright) - Test complete user workflows

### Testing Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /____\     - Critical user flows
     /      \    - Cross-browser testing
    /        \
   /__________\  Integration Tests (Some)
  /            \ - API endpoints
 /              \- Database operations
/________________\
                  Unit Tests (Many)
                  - Components
                  - Utilities
                  - Hooks
```

---

## Unit Testing

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing React Components

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import { EventCard } from './EventCard'
import { mockEvent } from '@/__tests__/utils/mock-data'

describe('EventCard', () => {
  it('displays event information', () => {
    const event = mockEvent({ title: 'Wedding' })

    render(<EventCard event={event} />)

    expect(screen.getByText('Wedding')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', async () => {
    const event = mockEvent()
    const onEdit = jest.fn()

    render(<EventCard event={event} onEdit={onEdit} />)

    await userEvent.click(screen.getByRole('button', { name: /edit/i }))

    expect(onEdit).toHaveBeenCalledWith(event.id)
  })
})
```

### Testing Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { useEvents } from './use-events'

describe('useEvents', () => {
  it('fetches events on mount', async () => {
    const { result } = renderHook(() => useEvents())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.events).toHaveLength(3)
    })
  })
})
```

### Testing Utilities

```typescript
import { formatDate } from './format-date'

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2025-12-31')
    expect(formatDate(date)).toBe('December 31, 2025')
  })

  it('handles invalid dates', () => {
    expect(formatDate(null)).toBe('Invalid date')
  })
})
```

---

## Integration Testing

### Testing API Routes

```typescript
import { POST } from '@/app/api/events/route'
import { prisma } from '@/lib/prisma'
import { mockUser, mockEvent } from '@/__tests__/utils/mock-data'

// Mock NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({
    user: mockUser()
  }))
}))

describe('POST /api/events', () => {
  beforeEach(async () => {
    // Clean database
    await prisma.event.deleteMany()
  })

  it('creates an event', async () => {
    const eventData = {
      title: 'New Event',
      date: '2025-12-31',
      location: '123 Main St'
    }

    const request = new Request('http://localhost:3000/api/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.title).toBe('New Event')

    // Verify in database
    const dbEvent = await prisma.event.findFirst({
      where: { title: 'New Event' }
    })
    expect(dbEvent).toBeTruthy()
  })

  it('returns error for invalid data', async () => {
    const request = new Request('http://localhost:3000/api/events', {
      method: 'POST',
      body: JSON.stringify({}) // Missing required fields
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
  })
})
```

### Testing Database Operations

```typescript
import { prisma } from '@/lib/prisma'
import { mockUser, mockEvent } from '@/__tests__/utils/mock-data'

describe('Event Database Operations', () => {
  let userId: string

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: mockUser()
    })
    userId = user.id
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } })
  })

  it('creates event with user relationship', async () => {
    const event = await prisma.event.create({
      data: mockEvent({ userId }),
      include: { user: true }
    })

    expect(event.user.id).toBe(userId)
  })
})
```

---

## E2E Testing

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/auth.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# View test report
npm run test:e2e:report
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Event Creation Flow', () => {
  test('user can create and view event', async ({ page }) => {
    // 1. Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password')
    await page.click('button[type="submit"]')

    // 2. Navigate to create event
    await page.goto('/events/new')

    // 3. Fill form
    await page.fill('input[name="title"]', 'E2E Test Event')
    await page.fill('input[name="date"]', '2025-12-31')
    await page.fill('input[name="location"]', '123 Test St')

    // 4. Submit
    await page.click('button[type="submit"]')

    // 5. Verify redirect
    await expect(page).toHaveURL(/\/events\/[\w-]+/)

    // 6. Verify event details
    await expect(page.locator('h1')).toHaveText('E2E Test Event')
  })
})
```

### Using Fixtures

```typescript
import { test } from '@/e2e/fixtures/auth'

test.describe('Authenticated Tests', () => {
  test('can access dashboard', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard')
    await expect(authenticatedPage).toHaveURL('/dashboard')
  })
})
```

### Testing Mobile

```typescript
import { test, devices } from '@playwright/test'

test.use({ ...devices['iPhone 12'] })

test('mobile navigation works', async ({ page }) => {
  await page.goto('/')

  // Test mobile menu
  await page.click('.mobile-menu-toggle')
  await expect(page.locator('.mobile-menu')).toBeVisible()
})
```

---

## Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// Good ✅ - Tests what user sees
expect(screen.getByText('Event created successfully')).toBeInTheDocument()

// Bad ❌ - Tests implementation details
expect(component.state.successMessage).toBe('Event created successfully')
```

### 2. Use Descriptive Test Names

```typescript
// Good ✅
it('displays error message when email is invalid', () => { })
it('disables submit button while form is submitting', () => { })

// Bad ❌
it('test 1', () => { })
it('should work', () => { })
```

### 3. Follow AAA Pattern

```typescript
it('creates an event', async () => {
  // Arrange
  const eventData = mockEvent()

  // Act
  const result = await createEvent(eventData)

  // Assert
  expect(result.success).toBe(true)
})
```

### 4. Use Mock Data Helpers

```typescript
// Good ✅
const user = mockUser({ email: 'specific@test.com' })

// Bad ❌
const user = {
  id: 'test-id',
  email: 'test@test.com',
  name: 'Test',
  passwordHash: 'hash',
  avatar: null,
  emailVerified: null,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### 5. Clean Up After Tests

```typescript
afterEach(async () => {
  // Clean database
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()
})
```

### 6. Test Edge Cases

```typescript
describe('Event validation', () => {
  it('handles past dates', () => { })
  it('handles missing required fields', () => { })
  it('handles very long titles', () => { })
  it('handles special characters', () => { })
})
```

---

## Coverage Requirements

### Minimum Coverage Thresholds

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### What to Prioritize

**High Priority (Must Test):**
- Authentication logic
- Payment processing (future)
- Data validation
- Critical user flows

**Medium Priority (Should Test):**
- UI components
- Form handling
- API routes
- Database operations

**Low Priority (Nice to Have):**
- Utility functions
- Type definitions
- Configuration files

---

## Debugging Tests

### Jest

```bash
# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Then open chrome://inspect in Chrome
```

### Playwright

```bash
# Run with UI mode for debugging
npm run test:e2e:ui

# Run with inspector
npx playwright test --debug

# Take screenshots on failure (already configured)
# Screenshots saved to test-results/
```

---

## Continuous Integration

Tests run automatically on:
- Every push to feature branches
- Every pull request
- Before merging to main

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
      - run: npm run test:e2e
```

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
