'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@tremor/react"
import { useCallback } from 'react';
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

// Helper function to calculate percentage change
const percentageChange = (current: number, previous: number) => {
  return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
};

// Sample data for monthly sales
const monthlySalesData = [
  { month: "Jan", year: 2023, sales: 4000 },
  { month: "Feb", year: 2023, sales: 3000 },
  { month: "Mar", year: 2023, sales: 5000 },
  { month: "Apr", year: 2023, sales: 4500 },
  { month: "May", year: 2023, sales: 6000 },
  { month: "Jun", year: 2023, sales: 7000 },
  { month: "Jul", year: 2023, sales: 6500 },
  { month: "Aug", year: 2023, sales: 5500 },
  { month: "Sep", year: 2023, sales: 7500 },
  { month: "Oct", year: 2023, sales: 8000 },
  { month: "Nov", year: 2023, sales: 7000 },
  { month: "Dec", year: 2023, sales: 9000 },
  { month: "Jan", year: 2024, sales: 4500 },
  { month: "Feb", year: 2024, sales: 3500 },
  { month: "Mar", year: 2024, sales: 5500 },
];

// Calculate MoM and YoY changes
const salesDataWithChanges = monthlySalesData.map((entry, index, array) => {
  const prevMonth = array[index - 1];
  const prevYear = array.find(e => e.month === entry.month && e.year === entry.year - 1);
  
  const momChange = prevMonth ? percentageChange(entry.sales, prevMonth.sales) : 0;
  const yoyChange = prevYear ? percentageChange(entry.sales, prevYear.sales) : 0;
  
  return {
    ...entry,
    momChange: parseFloat(momChange.toFixed(2)),
    yoyChange: parseFloat(yoyChange.toFixed(2)),
  };
});

export function MonthlySalesChart() {
  const valueFormatter = useCallback((number: number) => `$${number.toLocaleString()}`, []);

  const customTooltip = useCallback(({ payload, active }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <p className="font-bold">{`${data.month} ${data.year}`}</p>
        <p>{`Sales: $${data.sales.toLocaleString()}`}</p>
        <p>{`MoM Change: ${data.momChange.toFixed(2)}%`}</p>
        <p>{`YoY Change: ${data.yoyChange.toFixed(2)}%`}</p>
      </div>
    );
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="h-72 mt-4"
          data={salesDataWithChanges}
          index="month"
          categories={["sales"]}
          colors={["blue"]}
          valueFormatter={valueFormatter}
          yAxisWidth={60}
          showLegend={false}
          showTooltip={true}
          customTooltip={customTooltip}
        />
      </CardContent>
    </Card>
  );
}
