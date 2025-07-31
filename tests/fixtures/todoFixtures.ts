import { test as base } from '@playwright/test';
import { config } from '../config/urls';
import { getCurrentDate, getTomorrowDate } from '../helpers/timeHelper';
import {
  addItemToTodoList,
  checkItemInTodoList,
  deleteItemFromTodoList,
  verifyItemAppearsInList,
} from '../helpers/todoReactHelper';
import { TodoItem } from '../helpers/types';

export interface TodoFixtures {
  todoPage: {
    goto: () => Promise<void>;

    addItem: (todoItem: TodoItem) => Promise<void>;
    checkItem: (todoItem: TodoItem) => Promise<void>;
    deleteItem: (todoItem: TodoItem) => Promise<void>;
    verifyItem: (todoItem: TodoItem, shouldExist?: boolean) => Promise<void>;
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

      checkItem: async (todoItem: TodoItem) => {
        await checkItemInTodoList(page, todoItem);
      },

      deleteItem: async (todoItem: TodoItem) => {
        await deleteItemFromTodoList(page, todoItem);
      },

      verifyItem: async (todoItem: TodoItem, isOnTheList: boolean = true) => {
        await verifyItemAppearsInList(page, todoItem, isOnTheList);
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
