import { expect, type Page } from '@playwright/test';

export async function validateEmployees(page: Page, name: string): Promise<void> {
    // const employeeLocator = page.locator(`//*[contains(text(),'${name}')]`);
    // await expect(employeeLocator).toBeVisible();
    await page.getByPlaceholder('Search employees...').click()
    const a = await page.locator('//ul[@role="list"]/li').allInnerTexts();
    const names = a.map(entry => {
        const lines = entry.split('\n');
        return lines[1]; // The second line contains the full name
    });

    const match = names.find(emp => emp == name);
    if (match) {
        console.log(`Emloyee added successfully with name ${name}`)
    }
    else {
        console.log("no Name found")
    }

}