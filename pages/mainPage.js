import { expect } from "@playwright/test";

export class MainPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.locator(".ant-col-2 div").first();
    this.logoutItem = page.locator('li:has-text("Log Out")');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutItem.waitFor({ state: "visible" });
    await this.logoutItem.click();
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(/\/admin$/);
  }
}
