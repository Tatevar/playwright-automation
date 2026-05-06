export class CompanySetupQuestionsPage {
  constructor(page) {
    this.page = page;

    this.companySetupMenu = page.getByText('Company Set Up');
    this.questionsSection = page.getByText(/^Questions$/);
    this.createNewButton = page.getByRole('button', { name: /Create New/i });
    this.addNewButton = page.getByRole('button', { name: /Add New/i });
    this.publishButton = page.getByRole('button', { name: /Publish/i });
    this.parentQuestionSelect = page.locator(
      '.ant-form-item:has(label[for="parentId"]) .ant-form-item-control-input-content > div > div',
    );
    this.parentOptionSelect = page.locator(
      '.ant-form-item:has(label[for="parentOptions"]) .ant-form-item-control-input-content > div > div',
    );
    this.titleInput = page
      .locator('.ant-form-item')
      .filter({ hasText: 'Title*' })
      .getByRole('textbox');
    this.questionInput = page
      .locator('.ant-form-item')
      .filter({ hasText: 'Question*' })
      .getByRole('textbox')
      .first();
  }

  async goToQuestions() {
    await this.page.goto('/admin/company-set-up/questions');
  }

  async createNewQuestion() {
    await this.createNewButton.click();
  }

  async fillQuestionDetails({ title, question, options }) {
    await this.titleInput.fill(title);
    await this.questionInput.fill(question);

    await this.fillOptions(options);
  }

  async fillOptions(options) {
    for (let i = 0; i < options.length; i++) {
      if (i > 1) {
        await this.addNewButton.click();
      }

      await this.page
        .getByRole('textbox', { name: new RegExp(`Option ${i + 1}`, 'i') })
        .fill(options[i]);
    }
  }

  async selectAvailablePreviousQuestion() {
    await this.parentQuestionSelect.click();
    await this.selectFirstDropdownOption('previous-question');
  }

  async selectAvailablePreviousAnswer() {
    await this.parentOptionSelect.click();
    await this.selectFirstDropdownOption('previous-answer');
    await this.page.mouse.click(20, 20);
  }

  async selectFirstDropdownOption(name) {
    const options = this.page.locator('ul').last().locator('li');
    const count = await options.count();

    if (count === 0) {
      throw new Error(`No available ${name} options found`);
    }

    await options.first().click();
  }

  async publish() {
    await this.publishButton.click();
  }
}
