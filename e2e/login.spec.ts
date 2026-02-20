import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("admin@gmail.com", "QeL@9mR!xZfA2K");
  await loginPage.expectDashboard();
});
