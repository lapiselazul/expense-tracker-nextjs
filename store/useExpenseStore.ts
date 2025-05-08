import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type BearStore = {
  bears: number;
  addABear: () => void;
};

type Expense = {
  name: string;
  category: "groceries" | "health" | "travel" | "entertainment" | "clothes";
  amount: number;
};

type ExpenseStore = {
  expenses: {
    [month: string]: {
      [day: string]: Array<Expense>;
    };
  };
  getTodaysExpenses: () => Array<Expense>
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
          ]
        }
      },
      getTodaysExpenses: () => {
        const todaysFullDate = new Date();
        const currentYear = todaysFullDate.getFullYear().toString();
        const currentMonth = (todaysFullDate.getMonth() + 1).toString().padStart(2, "0");
        const dayKey = todaysFullDate.getDate().toString().padStart(2, "0");

        const monthKey = `${currentYear}-${currentMonth}`;
        return get().expenses[monthKey][dayKey];
      },
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
