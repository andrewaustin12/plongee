import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@tremor/react";

const data = [
  { equipment: "Fins", sales: 400 },
  { equipment: "Masks", sales: 300 },
  { equipment: "Wetsuits", sales: 200 },
];

export function EquipmentSalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          className="h-72 mt-4"
          data={data}
          index="equipment"
          categories={["sales"]}
          colors={["blue"]}
        />
      </CardContent>
    </Card>
  );
}
