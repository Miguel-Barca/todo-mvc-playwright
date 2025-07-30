import { test, expect } from '@playwright/test';
import { config } from '../config/urls';
import { getCurrentDate, getTomorrowDate } from '../helpers/timeHelper';
import {
  addItemToTodoList,
  checkItemInTodoList,
  deleteItemFromTodoList,
  verifyItemAppearsInList,
} from '../helpers/todoReactHelper';

const todoItems: { item: string; date: string }[] = [
  { item: 'TODO 1 -', date: getCurrentDate() },
  { item: 'TODO 2 -', date: getTomorrowDate() },
];

test('add items to the list, complete them and proceed to delete them', async ({
  page,
}) => {
  await test.step('go to the todo list home page', async () => {
    await page.goto(config.REACT_URL);
  });

  await test.step('page url should be correct', async () => {
    await expect(page).toHaveURL(config.REACT_URL);
  });

  await addItemToTodoList(page, todoItems[0]);
  await verifyItemAppearsInList(page, todoItems[0]);

  await addItemToTodoList(page, todoItems[1]);
  await verifyItemAppearsInList(page, todoItems[1]);

  await deleteItemFromTodoList(page, todoItems[1]);
  await verifyItemAppearsInList(page, todoItems[1], false);

  await checkItemInTodoList(page, todoItems[0]);
  // TODO: add tests for the todo items
  // await expect(page.getByTestId('todo-item-label')).toBeVisible();
  // await page.getByTestId('todo-item-toggle').check();
  // await expect(page.getByTestId('todo-item-toggle')).toBeVisible();
  // await page.getByTestId('todo-item-label').click();
  // await page.getByTestId('todo-item-toggle').uncheck();
  // await page.getByTestId('todo-item-toggle').check();
});
