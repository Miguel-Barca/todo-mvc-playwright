import { test, expect } from '../fixtures/todoFixtures';

const urlToTestAgainst = 'https://todomvc.com/examples/react/dist/';

test('create, complete and delete items from the list', async ({
  page,
  todoPage,
  todoData,
}) => {
  await test.step('navigate to todo app', async () => {
    await todoPage.goto();
    await expect(page).toHaveURL(urlToTestAgainst);
  });

  const [firstItemWithTodayDate, secondItemWithTomorrowDate] =
    todoData.defaultItems;

  await todoPage.addItem(firstItemWithTodayDate);
  await todoPage.verifyItem(firstItemWithTodayDate);

  await todoPage.addItem(secondItemWithTomorrowDate);
  await todoPage.verifyItem(secondItemWithTomorrowDate);

  await todoPage.deleteItem(secondItemWithTomorrowDate);
  await todoPage.verifyItem(secondItemWithTomorrowDate, false);

  await todoPage.checkItem(firstItemWithTodayDate);
});
