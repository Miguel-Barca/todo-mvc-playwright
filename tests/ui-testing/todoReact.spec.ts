import { test, expect } from '../fixtures/todoFixtures';
import { config } from '../config/urls';

test('create, complete and delete items from the list', async ({
  page,
  todoPage,
  todoData,
}) => {
  await test.step('navigate to todo app', async () => {
    await todoPage.goto();
    await expect(page).toHaveURL(config.REACT_URL);
  });

  const [firstItemWithTodayDate, secondItemWithTomorrowDate] =
    todoData.defaultItems;

  await todoPage.addItem(firstItemWithTodayDate);
  await todoPage.assertItemAppearsInList(firstItemWithTodayDate);

  await todoPage.addItem(secondItemWithTomorrowDate);
  await todoPage.assertItemAppearsInList(secondItemWithTomorrowDate);

  await todoPage.completeItem(firstItemWithTodayDate);
  await todoPage.confirmCSSStylingOfCompletedItem(firstItemWithTodayDate);

  await todoPage.navigateToCompletedItemsTab();
  await test.step(`verify user is on correct route: ${config.REACT_COMPLETED_ITEMS_ROUTE}`, async () => {
    await expect(page).toHaveURL(config.REACT_COMPLETED_ITEMS_ROUTE);
  });
  await todoPage.assertItemAppearsInList(firstItemWithTodayDate);
  await todoPage.confirmCSSStylingOfCompletedItem(firstItemWithTodayDate);

  await todoPage.navigateToAllItemsTab();
  await test.step(`verify user is on correct route: ${config.REACT_ALL_ITEMS_ROUTE}`, async () => {
    await expect(page).toHaveURL(config.REACT_ALL_ITEMS_ROUTE);
  });

  await todoPage.deleteItem(secondItemWithTomorrowDate);
  await todoPage.assertItemAppearsInList(secondItemWithTomorrowDate, false);
});
