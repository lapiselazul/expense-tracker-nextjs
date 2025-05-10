"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MonthPicker } from "./ui/monthpicker";

type DatePickerProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isMonthlyPicker?: boolean;
};

function DatePicker({ date, setDate, isMonthlyPicker }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const handleCalendarSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "col-span-3 justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? (
            isMonthlyPicker ? (
              format(date, "MMM yyyy")
            ) : (
              format(date, "PPP")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {isMonthlyPicker ? (
          <MonthPicker onMonthSelect={handleCalendarSelect} selectedMonth={date} />
        ) : (
          <Calendar mode="single" selected={date} onSelect={handleCalendarSelect} initialFocus />
        )}
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
