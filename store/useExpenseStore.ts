import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Expense, ExpenseCategory } from "@/types";

type ExpenseStore = {
  expenses: {
    [month: string]: {
      [day: string]: Array<Expense>;
    };
  };
  getDailyExpenses: (date: Date) => Array<Expense>;
  getMonthlyExpenses: (month: string) => Array<Expense>;
  createExpense: (
    name: string,
    category: ExpenseCategory,
    amount: number,
    date: Date,
  ) => void;
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: {},
      getDailyExpenses: (date: Date) => {
        const currentState = get();
        const { monthKey, dayKey } = createKeysFromDate(date);

        if (!currentState.expenses[monthKey] || !currentState.expenses[monthKey][dayKey]) {
          return [];
        }

        return currentState.expenses[monthKey][dayKey];
      },
      getMonthlyExpenses: (month: string) => {
        const expensesForMonth = get().expenses[month];
        return expensesForMonth
          ? Object.values(expensesForMonth).reduce((res, curr) => [...res, ...curr], [])
          : [];
      },
      createExpense: (
        name: string,
        category: ExpenseCategory,
        amount: number,
        date: Date | undefined,
      ) => {
        if (!date) {
          date = new Date();
        }

        const createdExpense: Expense = {
          name,
          category,
          amount: Number(amount.toFixed(2)),
        };

        const { monthKey, dayKey } = createKeysFromDate(date);

        set((state) => {
          const updatedExpenses = { ...state.expenses };

          if (!updatedExpenses[monthKey]) {
            updatedExpenses[monthKey] = {};
          }

          if (!updatedExpenses[monthKey][dayKey]) {
            updatedExpenses[monthKey][dayKey] = [];
          }

          updatedExpenses[monthKey][dayKey] = [
            ...updatedExpenses[monthKey][dayKey],
            createdExpense,
          ];

          return { expenses: updatedExpenses };
        });
      },
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

function createKeysFromDate(date: Date) {
  const currentYear = date.getFullYear().toString();
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayKey = date.getDate().toString().padStart(2, "0");

  const monthKey = `${currentYear}-${currentMonth}`;
  return { monthKey, dayKey };
}
