import { test, expect } from '@playwright/test';
import { addEmployee } from './fixture/addEmployee'
import { validateEmployees } from './fixture/validateEmployee'
import { deleteEmployees } from './fixture/cleanUp'
import { employeeDeatils } from './fixture/testData'
import { user, pas } from '../tests/helper/env'

test('Add Employee to the portal', async ({ page }) => {
  //Login process to the portal
  await page.goto('/login');
  await page.locator('#username').fill(user!);
  await page.locator('#password').fill(pas!)
  await page.locator('button', { hasText: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  //Assert user looged in successfully
  await expect(page.locator('text="SB"')).toBeVisible();
  //Add Employee via employee tab on the left-hand side of the panel
  await page.locator('//*[text()="Employees"]//parent::div[@title="Employees"]').click();
  await page.locator('button', { hasText: 'Add employee' }).click();
  //Calling addEmployee function and adding all the Employee details for first employee
  await addEmployee(page, employeeDeatils.E1.firstname,
    employeeDeatils.E1.lastname, employeeDeatils.E1.email,
    employeeDeatils.E1.phonenumber, employeeDeatils.E1.jobtile);
  await page.locator('button', { hasText: 'Add employee' }).click();
  //Calling addEmployee function and adding all the Employee details for second employee
  await addEmployee(page, employeeDeatils.E2.firstname,
    employeeDeatils.E2.lastname, employeeDeatils.E2.email,
    employeeDeatils.E2.phonenumber, employeeDeatils.E2.jobtile);
  //Reload the page to see the changes made recently 
  await page.reload();
  //Validate Employees added successfully
  const employeeOneFullName = `${employeeDeatils.E1.firstname} ${employeeDeatils.E1.lastname}`;
  const employeeTwoFullName = `${employeeDeatils.E2.firstname} ${employeeDeatils.E2.lastname}`;
  await validateEmployees(page, employeeOneFullName);
  await validateEmployees(page, employeeTwoFullName);
  //Tear down process to delete the added employees
  await deleteEmployees(page, employeeOneFullName);
  await deleteEmployees(page, employeeTwoFullName);
});
