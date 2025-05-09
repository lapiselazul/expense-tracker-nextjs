"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "./DatePicker";
import { useExpenseStore } from "@/store/useExpenseStore";
import { ExpenseCategory } from "@/types";
import { useShallow } from 'zustand/react/shallow'


export function DialogCreateExpense() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("groceries");
  const [date, setDate] = useState<Date | undefined>(new Date());

  /*
  Prevents an issue with Zustand and Next.js SSR:
  The server render still happens even with "use client",
  which conflicts with the client-side persistence (localStorage)
*/
  const [hydrated, setHydrated] = useState(false);
  const createExpense = useExpenseStore(useShallow(state => state.createExpense));

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value as ExpenseCategory);
  }

  const handleSubmit = () => {
    const amountNumber = Number(amount);
    console.log("called submit");
    createExpense(name, category, amountNumber, date as Date);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add New Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Add a new expense, and click &quot;Submit Expense&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} placeholder="Enter expense name" onChange={handleNameChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" value={category} placeholder="Enter expense category" onChange={handleCategoryChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" type="number" step={0.01} value={amount} placeholder="Enter amount" onChange={handleAmountChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <DatePicker date={date} setDate={setDate} />

          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Submit Expense</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
