import { expect, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      "https://dev-dubaicorp-front.scribex.io/admin/sign-in",
    );
  }

  async login(username: string, password: string) {
    const inputs = this.page.locator("input");

    await inputs.nth(0).fill(username);
    await inputs.nth(1).fill(password);
    this.page.getByRole("button", { name: /log in/i }).click();
  }
  async expectDashboard() {
    await expect(this.page).toHaveURL(/\/admin$/);
  }
}
