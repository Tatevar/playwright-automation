import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { MainPage } from "../pages/mainPage";

//test- 1
test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("admin@gmail.com", "QeL@9mR!xZfA2K");
  await loginPage.expectDashboard();
});

//test- 2
test("user can logout", async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("admin@gmail.com", "QeL@9mR!xZfA2K");
  //await loginPage.expectDashboard();
  await mainPage.openMenu();
  await mainPage.logout();
});
