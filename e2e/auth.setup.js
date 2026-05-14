import { test as setup, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';
import { MainPage } from '../pages/mainPage.js';
import { authFile, getAdminCredentials } from '../utils/env.js';

setup('authenticate', async ({ page }) => {
  const { username, password } = getAdminCredentials();
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await fs.mkdir(path.dirname(authFile), { recursive: true });
  await loginPage.goto();
  await loginPage.login(username, password);
  await mainPage.expectDashboard();
  await page.context().storageState({ path: authFile });
});
