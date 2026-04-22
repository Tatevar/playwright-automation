export class MainPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.locator('div[style*="cursor: pointer"]');
    this.logoutItem = page.locator('ul >> li:has-text("Log Out")');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutItem.waitFor({ state: "visible" });
    await this.logoutItem.click();
  }
}
