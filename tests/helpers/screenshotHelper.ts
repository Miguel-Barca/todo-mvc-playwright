import { Page } from '@playwright/test';

export async function captureScreenshot(page: Page, testName: string) {
  try {
    await page.screenshot({
      path: `test-results/screenshots/${testName}.png`,
    });
  } catch (error) {
    console.warn(`Failed to capture screenshot for ${testName}:`, error);
  }
}
