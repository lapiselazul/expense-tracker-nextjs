"use client";

import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useExpenseStore } from "@/store/useExpenseStore";
import ExpenseChart from "./ExpenseChart";
import { ChartData } from "@/types";
import DatePicker from "./DatePicker";
import ExpenseDetails from "./ExpenseDetails";

export default function DailyTab() {
  // needs to be "or undefined" because of Shadcn's Calendar DatePicker component to work
  const [date, setDate] = useState<Date | undefined>(new Date());
  const dailyExpenses = useExpenseStore(useShallow((state) => state.getDailyExpenses(date as Date)));
  /*
    Prevents an issue with Zustand and Next.js SSR:
    The server render still happens even with "use client",
    which conflicts with the client-side persistence (localStorage)
  */
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const todaysTotalAmount = dailyExpenses
    ? dailyExpenses.reduce((acc, curr) => acc + curr.amount, 0)
    : 0;
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
      <DatePicker date={date} setDate={setDate} isMonthlyPicker={false} />
      <ExpenseChart expenses={dailyExpenses} chartData={chartData} amount={todaysTotalAmount} />
      <ExpenseDetails expenseData={dailyExpenses} />
    </div>
  );
}
