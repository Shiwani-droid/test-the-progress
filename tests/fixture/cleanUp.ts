import { expect, type Page } from '@playwright/test';

//tear down process to delete the employees added by the test
export async function deleteEmployees(page: Page, name: string): Promise<void> {
  await page.getByPlaceholder('Search employees...').click()
  //Get the list of all empoyee
  const listOfEmployee = await page.locator('//ul[@role="list"]//li//span//div')
  let c = await listOfEmployee.count()
  const finalname = await listOfEmployee.allInnerTexts();
  for (let i = 0; i < c; i++) {
    if (finalname[i] == name) {
      await page.getByPlaceholder('Search employees...').fill(name);
      await page.getByTestId('typeAhead').getByText(name).first().waitFor({ state: 'visible' })
      await page.getByTestId('typeAhead').getByText(name).first().click();;
      page.locator('a[href*="delete"]').click();
      await page.locator('//*[@class="w-5 transition-colors ease-in-out fill-transparent"]').click();
      await page.locator('button:has-text("Delete")').click();
      await expect(page.locator('button', { hasText: 'Return to employee hub' })).toBeVisible()
      await page.locator('button', { hasText: 'Return to employee hub' }).click();
      await page.reload();
    }

  }

}