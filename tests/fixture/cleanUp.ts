import { expect, type Page } from '@playwright/test';

export async function deleteEmployees(page: Page, name: string): Promise<void> {
  await page.getByPlaceholder('Search employees...').click()
  const a = await page.locator('//ul[@role="list"]/li').allInnerTexts();
  const names = a.map(entry => {
    const lines = entry.split('\n');
    return lines[1]; // The second line contains the full name
  });

  if (names.find(emp => emp == name)) {
    await page.getByPlaceholder('Search employees...').fill(name);
    await page.getByTestId('typeAhead').getByText(name).waitFor({ state: 'visible' })
    await page.getByTestId('typeAhead').getByText(name).click();;
    page.locator('a[href*="delete"]').click();
    await page.locator('//*[@class="w-5 transition-colors ease-in-out fill-transparent"]').click();
    await page.locator('button:has-text("Delete")').click();
    await expect(page.locator('button', { hasText: 'Return to employee hub' })).toBeVisible()
    await page.locator('button', { hasText: 'Return to employee hub' }).click();
    await page.reload();
  }
}