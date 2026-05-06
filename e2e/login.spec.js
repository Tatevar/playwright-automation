import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { MainPage } from "../pages/mainPage";

//test- 1
test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
   await expect(loginPage.page).toHaveScreenshot();

});

//test- 2
test("user can logout", async ({ page }) => {
  const mainPage = new MainPage(page);

  await page.goto("https://dev-dubaicorp-front.scribex.io/admin");
  await mainPage.expectDashboard();

  await mainPage.openMenu();
  await mainPage.logout();

  await expect(page).toHaveURL(/\/admin\/sign-in$/);
});
