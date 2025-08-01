import { test as base } from '@playwright/test';
import { config } from '../config/urls';
import {
  addItemToTodoList,
  completeItemInTodoList,
  confirmCSSStylingOfCompletedItem,
  deleteItemFromTodoList,
  navigateToCompletedItemsTab,
  verifyItemAppearsInList,
  navigateToAllItemsTab,
} from '../helpers/todoReactHelper';
import { TodoItem } from '../helpers/types';
import { captureScreenshot } from '../helpers/screenshotHelper';
import { TodoItemKey, todoTestData } from '../data/todoTestData';

export interface TodoFixtures {
  todoPage: {
    goto: () => Promise<void>;

    addItem: (todoItem: TodoItem) => Promise<void>;
    captureScreenshot: (testName: string) => Promise<void>;
    completeItem: (todoItem: TodoItem) => Promise<void>;
    confirmCSSStylingOfCompletedItem: (todoItem: TodoItem) => Promise<void>;
    deleteItem: (todoItem: TodoItem) => Promise<void>;
    navigateToAllItemsTab: () => Promise<void>;
    navigateToCompletedItemsTab: () => Promise<void>;
    verifyItemAppearsInList: (
      todoItem: TodoItem,
      isOnTheList?: boolean
    ) => Promise<void>;
  };

  todoData: {
    todoListItems: Record<TodoItemKey, TodoItem>;
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

      captureScreenshot: async (testName: string) => {
        await captureScreenshot(page, testName);
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

      verifyItemAppearsInList: async (
        todoItem: TodoItem,
        isOnTheList: boolean = true
      ) => {
        await verifyItemAppearsInList(page, todoItem, isOnTheList);
      },
    };

    await use(todoPageActions);
  },

  todoData: async ({}, use) => {
    await use({ todoListItems: todoTestData });
  },
});

export { expect } from '@playwright/test';
