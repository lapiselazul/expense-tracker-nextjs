"using client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseChart from "@/components/ExpenseChart";
import ExpenseDetails from "@/components/ExpenseDetails";

export default function Home() {
  const expensesData: Array<{ name: string, category: string, amount: number, fill: string }> = [
    { name: "AB Basilopoulos", category: "groceries", amount: 250.5, fill: "var(--color-groceries)" },
    { name: "Zara", category: "clothes", amount: 65, fill: "var(--color-clothes)" },
    { name: "Village Cinemas", category: "entertainment", amount: 25, fill: "var(--color-entertainment)" },
    { name: "Errikos Ntynan Hospital", category: "health", amount: 100, fill: "var(--color-health)" },
    { name: "Visit Aunt in Australia", category: "travel", amount: 1000, fill: "var(--color-travel)" },
  ];


  return (
    <div className="w-full max-w-full mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Expense Tracker</h1>

      <Tabs defaultValue="daily" className="w-full">
        <div className="flex justify-center w-full mb-4">
          <TabsList className="grid grid-cols-2 w-full md:w-1/2 lg:w-1/2">
            <TabsTrigger value="daily" className="px-4 py-2">Daily Expenses</TabsTrigger>
            <TabsTrigger value="monthly" className="px-4 py-2">Monthly Expenses</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2">
            <TabsContent value="daily" className="mt-4 p-4 border rounded-md">
              <ExpenseChart chartData={expensesData} />
              <ExpenseDetails detailsData={expensesData} />
            </TabsContent>

            <TabsContent value="monthly" className="mt-4 p-4 border rounded-md">
              <p>For later</p>
              {/* <ExpenseChart chartData={chartData} />
              <ExpenseDetails /> */}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
