"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyTab from "@/components/DailyTab";

export default function Home() {
  return (
    <div className="w-full max-w-full mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Expense Tracker</h1>

      <Tabs defaultValue="daily" className="w-full">
        <div className="flex justify-center w-full mb-4">
          <TabsList className="grid grid-cols-2 w-full md:w-1/2 lg:w-1/2">
            <TabsTrigger value="daily" className="px-4 py-2">
              Daily Expenses
            </TabsTrigger>
            <TabsTrigger value="monthly" className="px-4 py-2">
              Monthly Expenses
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2">
            <TabsContent value="daily" className="mt-4 p-4 border rounded-md">
              <DailyTab />
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
