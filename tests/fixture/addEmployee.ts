import { expect, type Page } from '@playwright/test';

//This is a function use to add employee to the portal
export async function addEmployee(page: Page, firstname: string, lastname: string, email: string,
  phonenumber: string, jobtitle: string): Promise<void> {

  await page.locator('#firstName').fill(firstname)
  await page.locator('#lastName').fill(lastname)
  await page.locator('#email').scrollIntoViewIfNeeded();
  await page.locator('#email').fill(email);
  await page.locator('#phoneNumber').scrollIntoViewIfNeeded();
  await page.locator('#phoneNumber').fill(phonenumber);
  await page.locator('//*[@data-testid="input-selector"]').scrollIntoViewIfNeeded()
  await page.locator('//*[@data-testid="input-selector"]').click();
  await page.locator('//*[@class="sc-caSCKo hpHtoP"]').click()
  await page.locator('//*[text()="16"]').click();
  await page.locator('#jobTitle').fill(jobtitle);
  await page.locator('button', { hasText: 'Save new employee' }).click();
  //Validate employeed added successfully
  await expect(page.locator('//h1[contains(text(),"Success! New employee added")]')).toBeVisible();
  await page.locator('//*[@class="w-7 fill-white"]').click();
}
