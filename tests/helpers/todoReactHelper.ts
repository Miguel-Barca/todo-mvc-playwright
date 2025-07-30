import { test, Page, expect } from '@playwright/test';

function getItemText(todoItem: { item: string; date: string }): string {
  return todoItem.item + todoItem.date;
}

export async function addItemToTodoList(
  page: Page,
  todoItem: { item: string; date: string }
) {
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

// TODO: strike through the item
export async function checkItemInTodoList(
  page: Page,
  todoItem: { item: string; date: string }
) {
  const itemText = getItemText(todoItem);

  await test.step(
    `check the item: '${itemText}' in the list`,
    async () => {
      await page
        .getByTestId('todo-item')
        .filter({ hasText: itemText })
        .getByTestId('todo-item-toggle')
        .click();
    },
    { box: true }
  );
}

export async function deleteItemFromTodoList(
  page: Page,
  todoItem: { item: string; date: string }
) {
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

export async function verifyItemAppearsInList(
  page: Page,
  todoItem: { item: string; date: string },
  isOnTheList: boolean = true
) {
  const itemText = getItemText(todoItem);
  const locator = page.getByTestId('todo-item-label').getByText(itemText);

  const action = isOnTheList ? 'appears in' : 'does not appear in';

  await test.step(
    `verify item: '${itemText}' ${action} the list`,
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
