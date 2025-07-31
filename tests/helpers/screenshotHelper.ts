import { Page, test } from '@playwright/test';

export async function captureScreenshot(page: Page, testName: string) {
  await test.step(`capture screenshot of ${testName}`, async () => {
    await page.screenshot({
      path: `test-results/screenshots/${testName}.png`,
    });
  });
}
