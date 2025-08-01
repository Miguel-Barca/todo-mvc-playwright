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
  await todoPage.captureScreenshot('stage_1_homepage');

  await todoPage.addItem(todoData.todoListItems.today);
  await todoPage.verifyItemAppearsInList(todoData.todoListItems.today);
  await todoPage.captureScreenshot('stage_2_first_item_added');

  await todoPage.addItem(todoData.todoListItems.tomorrow);
  await todoPage.verifyItemAppearsInList(todoData.todoListItems.tomorrow);
  await todoPage.captureScreenshot('stage_3_second_item_added');

  await todoPage.completeItem(todoData.todoListItems.today);
  await todoPage.confirmCSSStylingOfCompletedItem(todoData.todoListItems.today);
  await todoPage.captureScreenshot('stage_4_first_item_completed_main_view');

  await todoPage.navigateToCompletedItemsTab();
  await test.step(`verify user is on correct route: completed items`, async () => {
    await expect(page).toHaveURL(config.REACT_COMPLETED_ITEMS_ROUTE);
  });
  await todoPage.verifyItemAppearsInList(todoData.todoListItems.today);
  await todoPage.confirmCSSStylingOfCompletedItem(todoData.todoListItems.today);
  await todoPage.captureScreenshot(
    'stage_5_first_item_completed_completed_view'
  );

  await todoPage.navigateToAllItemsTab();
  await test.step(`verify user is on correct route: all items`, async () => {
    await expect(page).toHaveURL(config.REACT_ALL_ITEMS_ROUTE);
  });

  await todoPage.deleteItem(todoData.todoListItems.tomorrow);
  await todoPage.verifyItemAppearsInList(
    todoData.todoListItems.tomorrow,
    false
  );
  await todoPage.captureScreenshot('stage_6_second_item_deleted');
});
