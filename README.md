# TodoMVC Playwright Testing

A Playwright testing framework for TodoMVC applications, providing comprehensive end-to-end testing across multiple browsers.

## Prerequisites

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js)

## Dependencies

This project uses the following dependencies:

### Development Dependencies

- `@playwright/test: ^1.54.1` - Playwright testing framework for cross-browser automation
- `@types/node: ^24.1.0` - TypeScript type definitions for Node.js

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Miguel-Barca/todo-mvc-playwright.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd todo-mvc-playwright
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

## How to Run

### Available Scripts

The project provides several npm scripts for common testing scenarios:

**Run all tests and show HTML report:**

```bash
npm run test:ui:all:showHtmlReport
# Runs tests on Chromium, Firefox, and Safari browsers
```

**Run all tests in headed mode and show HTML report:**

```bash
npm run test:ui:all:showHtmlReport:headed
# Runs tests on Chromium, Firefox, and Safari browsers
```

**Run tests in specific browser:**

```bash
npm run test:ui:chromium    # Runs Chromium tests only
npm run test:ui:firefox     # Runs Firefox tests only
npm run test:ui:webkit      # Runs WebKit (Safari) tests only
```

### Direct Playwright Commands

**Run all tests:**

```bash
npx playwright test
```

**Run tests in specific browser:**

```bash
npx playwright test --project=chromium    # Chromium tests only
npx playwright test --project=firefox     # Firefox tests only
npx playwright test --project=webkit      # WebKit (Safari) tests only
```

**Run tests in headed mode (see browser):**

```bash
npx playwright test --headed
```

**Run specific test file:**

```bash
npx playwright test tests/ui-testing/todoReact.spec.ts
```

**Run tests in debug mode:**

```bash
npx playwright test --debug
```

### Viewing Test Reports

**Open the HTML report (after running tests):**

```bash
npx playwright show-report
```

**View test results during execution:**

- Local runs will show both HTML reports and list CLI report
- CI runs will show real-time list output and generate HTML reports as artifacts

## Project Structure

```
todo-mvc-playwright/
├── tests/
│   ├── config/           # Configuration files
│   ├── data/             # Test data
│   ├── fixtures/         # Test fixtures and setup
│   ├── helpers/          # Helper functions and utilities
│   └── ui-testing/       # UI test specifications
├── test-results/         # Screenshots and videos from test execution
├── playwright-report/    # HTML test reports
├── playwright.config.ts  # Playwright configuration
└── package.json         # Project dependencies and scripts
```

## What This Framework Tests

This framework tests the React TodoMVC implementation at `https://todomvc.com/examples/react/dist/` including:

- ✅ Adding new todo items
- ✅ Completing todos
- ✅ Deleting todo items
- ✅ Navigation between All and Completed views
- ✅ CSS styling verification for completed items
- ✅ Cross-browser compatibility (Chromium, Firefox, Safari)

## Test Configuration

The project is configured to run tests across three browsers:

- **Chromium**
- **Firefox**
- **WebKit** (Safari)

### Reporting

The project uses different reporters depending on the environment:

**Local Development:**

- **List Reporter** - Provides real-time feedback during test execution (with steps)
- **HTML Reporter** - Generates interactive HTML reports with detailed test results

**CI Environment:**

- **List Reporter** - Provides real-time feedback during test execution
- **HTML Reporter** - Generates interactive HTML reports for artifact storage and review

### Screenshots and Video Recording

The project captures visual documentation during test execution:

**Screenshots:**

- Captured at key stages throughout test execution (e.g., homepage, after adding items, after completing items, etc.)
- Stored in `test-results/screenshots/` with descriptive names

**Videos:**

- **Local Development**: Recorded for all test executions at 1280x720 resolution
- **CI Environment**: Recorded for all test executions at 1280x720 resolution
- Stored in `test-results/` directory
- Available on the HTML report

**Accessing Test Artifacts:**

- **Local**: Check the `test-results/` folder after running tests
- **CI**: Download "playwright-report" and "videos and screenshots" artifacts from the GitHub Actions "Summary" page after workflow completion

## CI/CD Integration

This project includes GitHub Actions workflows for automated testing:

- **Automatic test execution** on pull requests and pushes to main branch
- **Cross-browser testing** in CI environment
- **Artifact collection** of test reports, screenshots, and videos
- **HTML reports** available as downloadable artifacts after workflow completion

The CI configuration automatically runs all tests across Chromium, Firefox, and Safari browsers.

**Viewing CI Results**: Check the "Actions" tab in your GitHub repository to see test results and download artifacts.

## Troubleshooting

**Common Issues:**

- **Browser installation issues**: Run `npx playwright install --with-deps`
- **Permission errors**: On some systems, you may need to run commands with elevated permissions

## License

MIT
