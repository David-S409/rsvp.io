import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login, view dashboard, and logout successfully', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('/login')

    // 2. Verify login page loaded
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    // 3. Fill in login form
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')

    // 4. Submit form
    await page.click('button[type="submit"]')

    // 5. Wait for redirect to dashboard
    await page.waitForURL('/dashboard')

    // 6. Verify dashboard loaded
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    // 7. Verify user is logged in (check welcome message)
    await expect(page.getByText(/Welcome/)).toBeVisible()
    await expect(page.getByText(/test@example.com/)).toBeVisible()

    // 8. Click logout button
    await page.click('button:has-text("Logout")')

    // 9. Wait for redirect to login page
    await page.waitForURL('/login')

    // 10. Verify back on login page
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    // Navigate to login
    await page.goto('/login')

    // Try to login with wrong password
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Should see error message
    await expect(page.getByText(/error|invalid|incorrect/i)).toBeVisible()
  })

  test('should not access dashboard when logged out', async ({ page }) => {
    // Try to access dashboard without logging in
    await page.goto('/dashboard')

    // Should see "Please Login" message
    await expect(page.getByText('Please Login')).toBeVisible()
  })
})
