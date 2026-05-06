import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';
import { MainPage } from '../pages/mainPage.js';

const authFile = path.resolve('playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  await loginPage.goto();
  await loginPage.login('admin@gmail.com', 'QeL@9mR!xZfA2K');
  await mainPage.expectDashboard();
  await page.context().storageState({ path: authFile });
});
