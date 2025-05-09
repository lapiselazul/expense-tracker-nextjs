"use client"

import { useState, useEffect } from "react"
import { Label, Pie, PieChart } from "recharts"
import { useShallow } from 'zustand/react/shallow'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useExpenseStore } from "@/store/useExpenseStore";
import { DialogCreateExpense } from "./DialogCreateExpense";

const chartConfig = {
  expenses: {
    label: "expenses",
  },
  clothes: {
    label: "clothes",
    color: "var(--chart-1)",
  },
  entertainment: {
    label: "entertainment",
    color: "var(--chart-2)",
  },
  groceries: {
    label: "groceries",
    color: "var(--chart-3)",
  },
  travel: {
    label: "travel",
    color: "var(--chart-4)",
  },
  health: {
    label: "health",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;


export default function ExpenseChart() {
  const todaysExpenses = useExpenseStore(useShallow(state => state.getTodaysExpenses()));
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

  const todaysTotalAmount = todaysExpenses ? todaysExpenses.reduce((acc, curr) => acc + curr.amount, 0) : 0;
  const chartData: { [category: string]: { amount: number, fill: string } } = {};
  todaysExpenses.forEach(expense => {
    if (chartData[expense.category]) {
      chartData[expense.category].amount += expense.amount;
    } else {
      chartData[expense.category] = { amount: expense.amount, fill: `var(--color-${expense.category})` };
    }
  });

  return (
    <Card className="flex flex-col text-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Daily Expenses</CardTitle>
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {todaysExpenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={Object.values(chartData)}
                dataKey="amount"
                nameKey="category"
                innerRadius={70}
                outerRadius={100}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl sm:text-2xl font-bold"
                          >
                            €{todaysTotalAmount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Expenses
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="category" />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <DialogCreateExpense />
      </CardFooter>
    </Card>
  );
}
