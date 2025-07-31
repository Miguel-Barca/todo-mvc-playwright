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
   cd todo-mvc-playwright
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

4. **Install the custom Indent List Reporter (for enhanced local development experience):**
   ```bash
   npm install indent-list-reporter --save-dev
   ```

## How to Run

### Available Scripts

The project provides several npm scripts for common testing scenarios:

**Run all tests and show HTML report:**

```bash
npm run test:ui:all:showHtmlReport # (Browsers: Chromium, Firefox, Safari)
```

**Run all tests with indent list reporter only:**

```bash
npm run test:ui:all:showIndentListReport # (Browsers: Chromium, Firefox, Safari)
```

**Run tests in specific browser:**

```bash
npm run test:ui:chromium
npm run test:ui:firefox
npm run test:ui:webkit
```

### Direct Playwright Commands

**Run all tests:**

```bash
npx playwright test
```

**Run tests in headed mode (see browser):**

```bash
npx playwright test --headed
```

### Viewing Test Reports

**Open the HTML report (after running tests):**

```bash
npx playwright show-report
```

**View test results during execution:**

- Local runs will show both HTML reports and indented list output
- CI runs will show real-time list output and generate HTML reports as artifacts

## Project Structure

```
todo-mvc-playwright/
├── tests/
│   ├── config/           # Configuration files
│   ├── fixtures/         # Test fixtures and setup
│   ├── helpers/          # Helper functions and utilities
│   └── ui-testing/       # UI test specifications
├── test-results/         # Screenshots and videos from test execution
├── playwright-report/    # HTML test reports
├── playwright.config.ts  # Playwright configuration
└── package.json         # Project dependencies and scripts
```

## Test Configuration

The project is configured to run tests across three browsers:

- **Chromium**
- **Firefox**
- **WebKit** (Safari)

### Reporting

The project uses different reporters depending on the environment:

**Local Development:**

- **HTML Reporter** - Generates interactive HTML reports with detailed test results
- **[Indent List Reporter](https://github.com/syzzana/indent-list-reporter)** - Shows test structure in an indented, hierarchical format during execution

**CI Environment:**

- **List Reporter** - Provides real-time feedback during test execution
- **HTML Reporter** - Generates reports for artifact storage and review

### Screenshots and Video Recording

The project captures visual documentation during test execution:

**Screenshots:**

- Captured at key stages throughout test execution (e.g., homepage, after adding items, after completing items, etc.)
- Stored in `test-results/screenshots/` with descriptive names
- Implemented using `todoPage.captureScreenshot()` method

**Videos:**

- **Local Development**: Recorded for all test executions at 1280x720 resolution
- **CI Environment**: Only retained for failed tests to conserve storage
- Stored in `test-results/` directory

**Accessing Test Artifacts:**

- **Local**: Check the `test-results/` folder after running tests
- **CI**: Download artifacts from the GitHub Actions "Summary" page after workflow completion

## License

MIT
