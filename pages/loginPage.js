export class LoginPage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="text"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole("button", { name: /log in/i });
  }

  async goto() {
    await this.page.goto("/admin/sign-in");
  }

  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
