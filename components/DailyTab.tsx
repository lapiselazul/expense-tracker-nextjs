"use client";

import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import { useShallow } from "zustand/react/shallow";
import { useExpenseStore } from "@/store/useExpenseStore";
import ExpenseChart from "./ExpenseChart";
import { ChartData } from "@/types";
import DatePicker from "./DatePicker";
import ExpenseDetails from "./ExpenseDetails";

type DailyTabProps = { date: Date | undefined, setDate: Dispatch<SetStateAction<Date | undefined>>};
export default function DailyTab({ date, setDate }: DailyTabProps) {
  // needs to be "or undefined" because of Shadcn's Calendar DatePicker component to work
  const dailyExpenses = useExpenseStore(
    useShallow((state) => state.getDailyExpenses(date as Date)),
  );
  const dailyTotalAmount = useMemo(
    () => dailyExpenses.reduce((acc, curr) => acc + curr.amount, 0),
    [dailyExpenses],
  );

  /*
    hydrated state and effect - prevent an issue with Zustand and Next.js SSR:
    Because the server rendering will still happen in spite of "use client",
    it conflicts with the client-side Zustand persistence (localStorage).
  */
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const chartData: ChartData = {};
  dailyExpenses.forEach((expense) => {
    if (chartData[expense.category]) {
      chartData[expense.category].amount += expense.amount;
    } else {
      chartData[expense.category] = {
        amount: expense.amount,
        fill: `var(--color-${expense.category})`,
        category: expense.category,
      };
    }
  });

  return (
    <div>
      <div className="flex justify-center mb-4">
        <DatePicker date={date} setDate={setDate} isMonthlyPicker={false} />
      </div>
      <ExpenseChart
        expenses={dailyExpenses}
        chartData={chartData}
        amount={dailyTotalAmount}
        isMonthly={false}
      />
      <ExpenseDetails expenseData={dailyExpenses} />
    </div>
  );
}
