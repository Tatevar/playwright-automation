import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { MainPage } from "../pages/mainPage.js";
import { getAdminCredentials } from "../utils/env.js";

//test- 1
test.describe("login", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("user can login", async ({ page }) => {
    const { username, password } = getAdminCredentials();
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);

    await mainPage.expectDashboard();
  });
});

//test- 2
test("user can logout", async ({ page }) => {
  const mainPage = new MainPage(page);

  await page.goto("/admin");
  await mainPage.expectDashboard();

  await mainPage.openMenu();
  await mainPage.logout();

  await expect(page).toHaveURL(/\/admin\/sign-in$/);
});
