export type ExpenseCategory = "groceries" | "health" | "travel" | "entertainment" | "clothes";

export type Expense = {
  name: string;
  category: ExpenseCategory;
  amount: number;
};