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

export default function StaffManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Staff Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input 
              className="max-w-sm" 
              placeholder="Search staff..." 
            />
            <Button>Add New Staff Member</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Certification Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'Sarah Johnson', position: 'Dive Instructor', email: 'sarah@divecenter.com', phone: '123-456-7890', certLevel: 'PADI IDC Staff Instructor' },
                { name: 'Mike Brown', position: 'Divemaster', email: 'mike@divecenter.com', phone: '098-765-4321', certLevel: 'PADI Divemaster' },
                { name: 'Emma Davis', position: 'Shop Manager', email: 'emma@divecenter.com', phone: '555-555-5555', certLevel: 'PADI Open Water Scuba Instructor' },
                { name: 'Chris Wilson', position: 'Boat Captain', email: 'chris@divecenter.com', phone: '111-222-3333', certLevel: 'PADI Rescue Diver' },
              ].map((staff, index) => (
                <TableRow key={index}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{staff.certLevel}</TableCell>
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
