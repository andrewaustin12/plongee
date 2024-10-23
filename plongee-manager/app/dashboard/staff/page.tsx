"use client";

import React, { useState, useMemo } from 'react';
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
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { NewStaffDialog } from "@/app/dashboard/staff/_components/NewStaffDialog";
import { EditStaffDialog } from "@/app/dashboard/staff/_components/EditStaffDialog";
import { EmptyState } from "@/components/EmptyState";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";

export default function StaffManagement() {
  const staffMembers = useQuery(api.staff.getAll);
  const deleteStaffMember = useMutation(api.staff.remove);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: Id<"staff">) => {
    try {
      await deleteStaffMember({ id });
      toast.success('Staff member deleted successfully!');
    } catch (error) {
      console.error('Error deleting staff member:', error);
      toast.error('Failed to delete staff member. Please try again.');
    }
  };

  const filteredStaffMembers = useMemo(() => {
    if (!staffMembers) return [];
    return staffMembers.filter(staff => 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.certLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staffMembers, searchTerm]);

  const handleEdit = () => {
    // This function is called after a successful edit
    // We don't need to do anything here because Convex will automatically update the UI
    // But you could add additional logic here if needed
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <NewStaffDialog />
          </div>
          {staffMembers === undefined ? (
            <EmptyState message="Loading staff members..." />
          ) : staffMembers.length === 0 ? (
            <EmptyState message="No staff members found. Add a new staff member to get started." />
          ) : filteredStaffMembers.length === 0 ? (
            <EmptyState message="No staff members match your search." />
          ) : (
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
                {filteredStaffMembers.map((staff) => (
                  <TableRow key={staff._id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>{staff.certLevel}</TableCell>
                    <TableCell>
                      <EditStaffDialog staff={staff} onEdit={handleEdit} />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(staff._id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
