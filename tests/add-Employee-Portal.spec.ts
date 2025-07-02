import { test, expect } from '@playwright/test';
import { addEmployee } from './fixture/addEmployee'
import { validateEmployees } from './fixture/validateEMployee'
import { deleteEmployees } from './fixture/cleanUp'
import { employeeDeatils } from './fixture/testData'


test('Add Employee to the BrightHR portal', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill('shiwanisandal@gmail.com');
  await page.locator('#password').fill('password@123')
  await page.locator('button', { hasText: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  await expect(page.locator('text="SB"')).toBeVisible();
  await page.locator('//*[text()="Employees"]//parent::div[@title="Employees"]').click();
  await page.locator('button', { hasText: 'Add employee' }).click();
  await addEmployee(page, employeeDeatils.E1.firstname,
    employeeDeatils.E1.lastname, employeeDeatils.E1.email,
    employeeDeatils.E1.phonenumber, employeeDeatils.E1.jobtile);
  await page.locator('button', { hasText: 'Add employee' }).click();
  await addEmployee(page, employeeDeatils.E2.firstname,
    employeeDeatils.E2.lastname, employeeDeatils.E2.email,
    employeeDeatils.E2.phonenumber, employeeDeatils.E2.jobtile);
  await page.reload();
  const employeeOneFullName = `${employeeDeatils.E1.firstname} ${employeeDeatils.E1.lastname}`;
  const employeeTwoFullName = `${employeeDeatils.E2.firstname} ${employeeDeatils.E2.lastname}`;
  await validateEmployees(page, employeeOneFullName);
  await validateEmployees(page, employeeTwoFullName);
  await deleteEmployees(page, employeeOneFullName);
  await deleteEmployees(page, employeeTwoFullName);

});
