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
  getMonthlyExpenses: (date: Date) => Array<Expense>;
  createExpense: (name: string, category: ExpenseCategory, amount: number, date: Date) => void;
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: {},
      getDailyExpenses: (date: Date) => {
        const currentState = get();
        const { monthKey, dayKey } = createKeysFromDate(date);

        return currentState.expenses[monthKey] && currentState.expenses[monthKey][dayKey]
          ? currentState.expenses[monthKey][dayKey]
          : [];
      },
      getMonthlyExpenses: (date: Date) => {
        const { monthKey } = createKeysFromDate(date);
        const expensesForMonth = get().expenses[monthKey];
        return expensesForMonth ? Object.values(expensesForMonth).flat() : [];
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
