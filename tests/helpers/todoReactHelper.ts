import { test, Page, expect } from '@playwright/test';
import { TodoItem } from './types';

function getItemText(todoItem: { item: string; date: string }): string {
  return todoItem.item + todoItem.date;
}

export async function assertItemAppearsInList(
  page: Page,
  todoItem: TodoItem,
  isOnTheList: boolean = true
) {
  const itemText = getItemText(todoItem);
  const locator = page.getByTestId('todo-item-label').getByText(itemText);

  const action = isOnTheList ? 'appears in' : 'does not appear in';

  await test.step(
    `assert '${itemText}' ${action} the list`,
    async () => {
      if (isOnTheList) {
        await expect(locator).toBeVisible();
      } else {
        await expect(locator).not.toBeVisible();
      }
    },
    { box: true }
  );
}

export async function addItemToTodoList(page: Page, todoItem: TodoItem) {
  const itemText = getItemText(todoItem);
  await test.step(
    `add item: '${itemText}' to the list`,
    async () => {
      await page.getByTestId('text-input').fill(itemText);
      await page.getByTestId('text-input').press('Enter');
    },
    { box: true }
  );
}

export async function completeItemInTodoList(page: Page, todoItem: TodoItem) {
  const itemText = getItemText(todoItem);

  const itemOnTheList = page
    .getByTestId('todo-item')
    .filter({ hasText: itemText });

  await test.step(
    `mark item as completed`,
    async () => {
      await itemOnTheList.getByTestId('todo-item-toggle').click();
    },
    { box: true }
  );
}

export async function confirmCSSStylingOfCompletedItem(
  page: Page,
  todoItem: TodoItem
) {
  const itemText = getItemText(todoItem);

  await test.step(
    `assert item is displayed as completed with CSS styling - strike through the item`,
    async () => {
      await expect(
        page.getByTestId('todo-item-label').filter({ hasText: itemText })
      ).toHaveCSS('text-decoration', /line-through/);
    },
    { box: true }
  );
}

export async function deleteItemFromTodoList(page: Page, todoItem: TodoItem) {
  const itemText = getItemText(todoItem);
  await test.step(
    `hover over the item: '${itemText}' to show the delete button`,
    async () => {
      await page
        .getByTestId('todo-item-label')
        .filter({ hasText: itemText })
        .hover();
    },
    { box: true }
  );

  await test.step(
    `delete item from the list`,
    async () => {
      await page
        .getByTestId('todo-item')
        .filter({ hasText: itemText })
        .getByTestId('todo-item-button')
        .click();
    },
    { box: true }
  );
}

export async function navigateToAllItemsTab(page: Page) {
  await test.step(
    `navigate to the all items tab`,
    async () => {
      await page.getByRole('link', { name: 'All' }).click();
    },
    { box: true }
  );
}

export async function navigateToCompletedItemsTab(page: Page) {
  await test.step(
    `navigate to the completed items tab`,
    async () => {
      await page.getByRole('link', { name: 'Completed' }).click();
    },
    { box: true }
  );
}
