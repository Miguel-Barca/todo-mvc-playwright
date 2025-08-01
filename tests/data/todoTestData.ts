import { getCurrentDate, getTomorrowDate } from '../helpers/timeHelper';
import { TodoItem } from '../helpers/types';

export type TodoItemKey = 'today' | 'tomorrow';

export const todoTestData: Record<TodoItemKey, TodoItem> = {
  today: { item: 'TODO 1 -', date: getCurrentDate() },
  tomorrow: { item: 'TODO 2 -', date: getTomorrowDate() },
} as const;
