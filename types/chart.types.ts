import { ExpenseCategory } from "./expense.types";

export type ChartData = {
  [category: string]: { amount: number; fill: string; category: ExpenseCategory };
};
