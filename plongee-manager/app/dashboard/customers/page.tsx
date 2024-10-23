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

export default function CustomersManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Customer Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input 
              className="max-w-sm" 
              placeholder="Search customers..." 
            />
            <Button>Add New Customer</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Certification Level</TableHead>
                <TableHead>Last Dive</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', certLevel: 'Advanced Open Water', lastDive: '2023-05-15' },
                { name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', certLevel: 'Rescue Diver', lastDive: '2023-06-01' },
                { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-555-5555', certLevel: 'Open Water', lastDive: '2023-04-30' },
                { name: 'Alice Brown', email: 'alice@example.com', phone: '111-222-3333', certLevel: 'Divemaster', lastDive: '2023-05-20' },
              ].map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.certLevel}</TableCell>
                  <TableCell>{customer.lastDive}</TableCell>
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
