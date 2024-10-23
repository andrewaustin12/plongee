import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function EquipmentManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Equipment Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input 
              className="max-w-sm" 
              placeholder="Search equipment..." 
            />
            <Button>Add New Equipment</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'BCD #1', type: 'BCD', status: 'Available', lastMaintenance: '2023-05-15' },
                { name: 'Regulator Set #3', type: 'Regulator', status: 'In Use', lastMaintenance: '2023-06-01' },
                { name: 'Wetsuit L', type: 'Wetsuit', status: 'Maintenance', lastMaintenance: '2023-04-30' },
                { name: 'Dive Computer #5', type: 'Computer', status: 'Available', lastMaintenance: '2023-05-20' },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.lastMaintenance}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
