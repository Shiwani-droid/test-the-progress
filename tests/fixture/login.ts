import { expect, type Page } from '@playwright/test';
import { user, pas } from '../helper/env'


//This is a function use to add employee to the portal
export async function logIn(page: Page): Promise<void> {
      await page.goto('/login');
      await page.locator('#username').fill(user!);
      await page.locator('#password').fill(pas!)
      await page.locator('button', { hasText: 'Login' }).click();
      await page.waitForURL('**/dashboard');
}
