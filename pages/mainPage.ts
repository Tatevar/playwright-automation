import { Page } from "@playwright/test";

export class MainPage {
  constructor(private page: Page) {}

  async openMenu() {
    await this.page.locator('div[style*="cursor: pointer"]').click();
  }
  async logout() {
    const logoutItem = this.page.locator('ul >> li:has-text("Log Out")');
    await logoutItem.waitFor({ state: "visible" });
    await logoutItem.click();
  }
}
