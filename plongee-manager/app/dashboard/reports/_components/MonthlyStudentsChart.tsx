import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Card as TremorCard } from "@tremor/react";

const data = [
  { month: "Jan", students: 10 },
  { month: "Feb", students: 15 },
  { month: "Mar", students: 20 },
  { month: "Apr", students: 25 },
  { month: "May", students: 30 },
  { month: "Jun", students: 35 },
  { month: "Jul", students: 40 },
  { month: "Aug", students: 45 },
  { month: "Sep", students: 40 },
  { month: "Oct", students: 35 },
  { month: "Nov", students: 30 },
  { month: "Dec", students: 25 },
];

export function MonthlyStudentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Students</CardTitle>
      </CardHeader>
      <CardContent>
        <TremorCard>
          <AreaChart
            className="h-72 mt-4"
            data={data}
            index="month"
            categories={["students"]}
            colors={["blue"]}
            yAxisWidth={40}
          />
        </TremorCard>
      </CardContent>
    </Card>
  );
}
