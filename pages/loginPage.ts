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
    await this.page.waitForLoadState("domcontentloaded");

    const inputs = this.page.locator("input");

    await inputs.nth(0).click({ force: true });
    await inputs.nth(0).fill(username, { force: true });

    await inputs.nth(1).click({ force: true });
    await inputs.nth(1).fill(password, { force: true });

    await this.page
      .getByRole("button", { name: /log in/i })
      .click({ force: true });
  }
  async expectDashboard() {
    await expect(this.page).toHaveURL(/admin/);
  }
}
