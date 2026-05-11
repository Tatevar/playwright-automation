# Playwright Demo

End-to-end automation suite for the Scribex DubaiCorp admin application using Playwright Test.

The tests cover admin sign-in/sign-out flows and Company Set Up question creation using a page-object structure.

## Tech Stack

- Node.js
- Playwright Test
- JavaScript ES modules
- GitHub Actions for CI

## Requirements

- Node.js LTS
- npm
- Playwright browser binaries
- Access to the configured test environment:

```text
https://dev-dubaicorp-front.scribex.io
```

## Setup

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Authentication State

Authenticated tests use a saved browser storage state at:

```text
playwright/.auth/user.json
```

That file is intentionally ignored by git. A fresh clone needs a valid auth state before tests that visit `/admin` can run successfully.

The repository includes `e2e/auth.setup.js` as the login helper used to create that state. Keep real credentials out of committed code and prefer environment variables or a local-only setup when sharing this project.

## Running Tests

Run the full test suite:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test e2e/login.spec.js
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests with Playwright Inspector:

```bash
npx playwright test --debug
```

List discovered tests:

```bash
npx playwright test --list
```

## Reports

The project uses the Playwright HTML reporter. After a test run, open the report with:

```bash
npx playwright show-report
```

Reports are written to:

```text
playwright-report/
```

## Visual Snapshots

`e2e/login.spec.js` includes a visual snapshot assertion. When a visual change is intentional, update snapshots with:

```bash
npx playwright test --update-snapshots
```

Review snapshot changes carefully before committing them.

## Project Structure

```text
.
|-- e2e/
|   |-- auth.setup.js
|   |-- companySetupQuestions.spec.js
|   `-- login.spec.js
|-- pages/
|   |-- companySetupQuestionsPage.js
|   |-- loginPage.js
|   `-- mainPage.js
|-- utils/
|   `-- dataHelper.js
|-- playwright.config.js
|-- package.json
`-- .github/workflows/playwright.yml
```

## Page Objects

Page objects live in `pages/` and keep selectors plus reusable page actions out of the test files.

- `LoginPage` handles navigation to the sign-in screen and login actions.
- `MainPage` covers dashboard expectations, menu opening, and logout.
- `CompanySetupQuestionsPage` covers question creation and publishing.

## CI

GitHub Actions runs Playwright tests on pushes and pull requests targeting `main` or `master`.

The workflow:

1. Checks out the repository.
2. Sets up Node.js LTS.
3. Installs dependencies with `npm ci`.
4. Installs Playwright browsers.
5. Runs `npx playwright test`.
6. Uploads the Playwright HTML report as an artifact.

## Troubleshooting

If tests fail because `playwright/.auth/user.json` is missing, create or restore a valid local auth state before rerunning authenticated tests.

If browsers are missing, run:

```bash
npx playwright install
```

If a visual snapshot test fails after an expected UI change, update and review the snapshot:

```bash
npx playwright test --update-snapshots
```
