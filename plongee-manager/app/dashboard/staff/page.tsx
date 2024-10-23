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
import { NewStaffDialog } from "./_components/NewStaffDialog";
import { EditStaffDialog } from "./_components/EditStaffDialog";
import { EmptyState } from "@/components/EmptyState";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function StaffManagement() {
  const staffMembers = useQuery(api.staff.getAll);
  const deleteStaffMember = useMutation(api.staff.remove);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: Id<"staff">) => {
    try {
      await deleteStaffMember({ id });
    } catch (error) {
      console.error('Error deleting staff member:', error);
      toast.error('Failed to delete staff member. Please try again.');
    }
  };

  const filteredStaffMembers = useMemo(() => {
    if (!staffMembers) return [];
    return staffMembers.filter(staff => 
      (staff.firstName + " " + staff.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <CardTitle>Staff Members</CardTitle>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Certification Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffMembers.map((staff) => (
                  <TableRow key={staff._id}>
                    <TableCell>{staff.firstName} {staff.lastName}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>
                      <Badge variant={staff.isPermanent ? "default" : "secondary"}>
                        {staff.isPermanent ? "Permanent" : "Freelance"}
                      </Badge>
                    </TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>{staff.certLevel}</TableCell>
                    <TableCell>
                      <EditStaffDialog staff={staff} onEdit={handleEdit} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="ml-2"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the staff member
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(staff._id)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
