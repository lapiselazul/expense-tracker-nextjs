import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Label, Pie, PieChart } from "recharts";
import { ChartData, Expense } from "@/types";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
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

export default function ExpenseChart({
  expenses,
  chartData,
  amount,
  isMonthly,
}: {
  expenses: Array<Expense>;
  chartData: ChartData;
  amount: number;
  isMonthly?: boolean;
}) {
  return (
    <Card className="flex flex-col text-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>{isMonthly ? "Monthly" : "Daily"} Expenses</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
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
                            €{amount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Expenses
                          </tspan>
                        </text>
                      );
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
