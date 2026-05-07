export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/admin/sign-in");
  }

  async login(username, password) {
    await this.page.locator('input[type="text"]').fill(username);
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.getByRole("button", { name: /log in/i }).click();
  }
}
