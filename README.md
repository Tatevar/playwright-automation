# Playwright Demo

End-to-end automation suite for the Scribex DubaiCorp admin application using Playwright Test.

The suite covers admin sign-in/sign-out flows and Company Set Up question creation using a page-object structure. It can run directly with Node.js or inside Docker, and CI runs the Dockerized test workflow in GitHub Actions.

## Tech Stack

- Node.js
- Playwright Test
- JavaScript ES modules
- Docker
- GitHub Actions

## Requirements

- Node.js LTS and npm for local runs
- Docker for containerized runs
- Access to the configured test environment:

```text
https://dev-dubaicorp-front.scribex.io
```

## Environment

Tests use environment variables for the target URL and login credentials:

```text
PLAYWRIGHT_BASE_URL=https://dev-dubaicorp-front.scribex.io
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Use `.env.example` as the local template for Docker Compose. For direct `npm` runs, export the variables in your shell before running tests.

## Local Setup

Install dependencies:

```bash
npm ci
```

Install Playwright browsers for direct local runs:

```bash
npm run playwright:install
```

Run the full suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npm run test:report
```

## Docker

The project uses the official Playwright Docker image in `Dockerfile`. The image installs npm dependencies with `npm ci`, copies the test suite, and runs `npm test`.

Build and run through Docker Compose:

```bash
npm run test:docker
```

Compose passes `PLAYWRIGHT_BASE_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` into the container and mounts these artifact directories back to the host:

```text
playwright-report/
test-results/
```

## Authentication State

Authenticated tests use a saved browser storage state at:

```text
playwright/.auth/user.json
```

The setup project creates that file at runtime by logging in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The auth state is intentionally ignored by git.

## GitHub Actions

`.github/workflows/playwright.yml` runs on pushes, pull requests, and manual dispatches.

The workflow:

1. Checks out the repository.
2. Validates that `ADMIN_EMAIL` and `ADMIN_PASSWORD` repository secrets are configured.
3. Builds the Playwright Docker test image.
4. Runs the suite inside Docker.
5. Uploads `playwright-report/` and `test-results/` as artifacts.

Configure these repository settings before relying on CI:

```text
Secrets:
ADMIN_EMAIL
ADMIN_PASSWORD

Optional repository variable:
PLAYWRIGHT_BASE_URL
```

If `PLAYWRIGHT_BASE_URL` is not set, CI defaults to `https://dev-dubaicorp-front.scribex.io`.

## Project Structure

```text
.
|-- .github/workflows/playwright.yml
|-- e2e/
|   |-- auth.setup.js
|   |-- companySetupQuestions.spec.js
|   `-- login.spec.js
|-- pages/
|   |-- companySetupQuestionsPage.js
|   |-- loginPage.js
|   `-- mainPage.js
|-- utils/
|   |-- dataHelper.js
|   `-- env.js
|-- Dockerfile
|-- docker-compose.yml
|-- playwright.config.js
`-- package.json
```

## Troubleshooting

If tests fail because credentials are missing, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` locally or add them as GitHub repository secrets.

If browsers are missing during a direct local run, run:

```bash
npm run playwright:install
```

If Docker artifacts are empty after a failed run, check the GitHub Actions log or local Docker output first; Playwright only writes the HTML report after the test process starts.
