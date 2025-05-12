"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyTab from "@/components/DailyTab";
import MonthlyTab from "@/components/MonthlyTab";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <div className="w-full min-w-full mx-auto p-4 flex-grow">
        <h1 className="text-xl text-center font-bold m-4">Expense Tracker</h1>

        <Tabs defaultValue="daily" className="w-full">
          <div className="flex justify-center w-full mb-4 bg-yellow-50">
            <TabsList className="grid grid-cols-2 w-full md:w-1/2 lg:w-1/2">
              <TabsTrigger value="daily">Daily Expenses</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Expenses</TabsTrigger>
            </TabsList>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full md:w-3/4 lg:w-1/2">
              <TabsContent value="daily" className="mt-4 p-4 border rounded-md">
                <DailyTab />
              </TabsContent>

              <TabsContent value="monthly" className="mt-4 p-4 border rounded-md">
                <MonthlyTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      <footer className="w-full p-4 text-center bg-black text-white">
        <p>
          &copy; {new Date().getFullYear()} Thanos Dimitriades &middot;
          <a href="https://github.com/lapiselazul" className="underline hover:text-white ml-1">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
