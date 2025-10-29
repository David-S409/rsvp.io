import { test as base } from '@playwright/test'

/**
 * Custom fixtures for E2E tests
 * Example: authenticated user, database setup, etc.
 */

export const test = base.extend({
  // Add custom fixtures here as needed
  // Example:
  // authenticatedUser: async ({ page }, use) => {
  //   // Login logic here
  //   await page.goto('/login')
  //   await page.fill('input[name="email"]', 'test@example.com')
  //   await page.fill('input[name="password"]', 'password')
  //   await page.click('button[type="submit"]')
  //   await use(page)
  // },
})

export { expect } from '@playwright/test'
