import { test as base } from '@playwright/test';
import { config } from '../config/urls';
import { getCurrentDate, getTomorrowDate } from '../helpers/timeHelper';
import {
  addItemToTodoList,
  completeItemInTodoList,
  confirmCSSStylingOfCompletedItem,
  deleteItemFromTodoList,
  navigateToCompletedItemsTab,
  assertItemAppearsInList,
  navigateToAllItemsTab,
} from '../helpers/todoReactHelper';
import { TodoItem } from '../helpers/types';

export interface TodoFixtures {
  todoPage: {
    goto: () => Promise<void>;

    addItem: (todoItem: TodoItem) => Promise<void>;
    completeItem: (todoItem: TodoItem) => Promise<void>;
    confirmCSSStylingOfCompletedItem: (todoItem: TodoItem) => Promise<void>;
    deleteItem: (todoItem: TodoItem) => Promise<void>;
    navigateToAllItemsTab: () => Promise<void>;
    navigateToCompletedItemsTab: () => Promise<void>;
    assertItemAppearsInList: (
      todoItem: TodoItem,
      shouldExist?: boolean
    ) => Promise<void>;
  };

  todoData: {
    defaultItems: TodoItem[];
    createItem: (text: string, date?: string) => TodoItem;
  };
}

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPageActions = {
      goto: async () => {
        await page.goto(config.REACT_URL);
      },

      addItem: async (todoItem: TodoItem) => {
        await addItemToTodoList(page, todoItem);
      },

      completeItem: async (todoItem: TodoItem) => {
        await completeItemInTodoList(page, todoItem);
      },

      confirmCSSStylingOfCompletedItem: async (todoItem: TodoItem) => {
        await confirmCSSStylingOfCompletedItem(page, todoItem);
      },

      deleteItem: async (todoItem: TodoItem) => {
        await deleteItemFromTodoList(page, todoItem);
      },

      navigateToAllItemsTab: async () => {
        await navigateToAllItemsTab(page);
      },

      navigateToCompletedItemsTab: async () => {
        await navigateToCompletedItemsTab(page);
      },

      assertItemAppearsInList: async (
        todoItem: TodoItem,
        isOnTheList: boolean = true
      ) => {
        await assertItemAppearsInList(page, todoItem, isOnTheList);
      },
    };

    await use(todoPageActions);
  },

  todoData: async ({}, use) => {
    const data = {
      defaultItems: [
        { item: 'TODO 1 -', date: getCurrentDate() },
        { item: 'TODO 2 -', date: getTomorrowDate() },
      ],

      createItem: (
        text: string,
        date: string = getCurrentDate()
      ): TodoItem => ({
        item: text,
        date,
      }),
    };

    await use(data);
  },
});

export { expect } from '@playwright/test';
