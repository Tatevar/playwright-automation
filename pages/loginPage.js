import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("input").nth(0);
    this.passwordInput = page.locator("input").nth(1);
    this.loginButton = page.getByRole("button", { name: /log in/i });
  }

  async goto() {
    await this.page.goto(
      "https://dev-dubaicorp-front.scribex.io/admin/sign-in",
    );
  }

  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
