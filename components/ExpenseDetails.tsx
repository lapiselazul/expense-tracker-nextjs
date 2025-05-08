"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function ExpenseDetails({detailsData}: {detailsData: Array<{ name: string, category: string, amount: number, fill: string }>}) {
  if (!detailsData) return (<p>No expenses exist for this time period.</p>);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {detailsData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
