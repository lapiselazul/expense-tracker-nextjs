import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Expense, ExpenseCategory } from "@/types";


type ExpenseStore = {
  expenses: {
    [month: string]: {
      [day: string]: Array<Expense>;
    };
  };
  getTodaysExpenses: () => Array<Expense>,
  getMonthlyExpenses: (month: string) => Array<Expense>,
  createExpense: (name: string, category: ExpenseCategory, amount: number, date: Date | undefined) => void,
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: {
        "2025-05": {
          "08":  [
            { name: "AB Basilopoulos", category: "groceries", amount: 250 },
            { name: "Zara", category: "clothes", amount: 65 },
            { name: "Village Cinemas", category: "entertainment", amount: 25 },
            { name: "Errikos Ntynan Hospital", category: "health", amount: 100 },
            { name: "Visit Aunt in Australia", category: "travel", amount: 1000 },
          ],
          "09":  [
            { name: "AB Basilopoulos", category: "groceries", amount: 250 },
          ]
        },
      },
      getTodaysExpenses: () => {
        const currentState = get();
        const { monthKey, dayKey } = createKeysFromDate(new Date());

        if (!currentState.expenses[monthKey] || !currentState.expenses[monthKey][dayKey]) {
          return [];
        }

        return currentState.expenses[monthKey][dayKey];
      },
      getMonthlyExpenses: (month: string) => {
        const expensesForMonth = get().expenses[month];
        return expensesForMonth ? Object.values(expensesForMonth).reduce((res, curr) => [...res, ...curr], []) : [];
      },
      createExpense: (name: string, category: ExpenseCategory, amount: number, date: Date | undefined) => {
        if (!date) {
          date = new Date();
        }

        const createdExpense: Expense = {
          name,
          category,
          amount,
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
            createdExpense
          ];

          return { expenses: updatedExpenses };
        })
      },
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);


function createKeysFromDate(date: Date) {
  const currentYear = date.getFullYear().toString();
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayKey = date.getDate().toString().padStart(2, "0");

  const monthKey = `${currentYear}-${currentMonth}`;
  return { monthKey, dayKey };
}