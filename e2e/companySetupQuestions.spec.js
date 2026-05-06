import { test, expect } from '@playwright/test';
import { CompanySetupQuestionsPage } from '../pages/companySetupQuestionsPage.js';
import { randomText, randomNumber } from '../utils/dataHelper.js';


test('user can create and publish question', async ({ page }) => {
  const questionsPage = new CompanySetupQuestionsPage(page);

  await questionsPage.goToQuestions();
  await questionsPage.createNewQuestion();

  const data = {
    title: randomText('title'),
    question: randomText('question'),
    options: [randomNumber(), randomNumber(), randomNumber()],
  };

  await questionsPage.fillQuestionDetails(data);
  await questionsPage.selectAvailablePreviousQuestion();
  await questionsPage.selectAvailablePreviousAnswer();

  await questionsPage.publish();

  await expect(page.getByText('The Question was successfully created.')).toBeVisible();
});
