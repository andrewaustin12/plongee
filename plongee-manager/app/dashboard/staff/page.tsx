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
import { EmptyState } from "@/components/EmptyState";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Staff } from '@/convex/staff';
import { EditStaffDialog } from "./_components/EditStaffDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function StaffManagement() {
  const staffMembers = useQuery(api.staff.getAll);
  const deleteStaffMember = useMutation(api.staff.remove);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStaff, setEditingStaff] = useState<(Staff & { _id: Id<"staff"> }) | null>(null);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<Id<"staff"> | null>(null);

  const handleDelete = async (id: Id<"staff">) => {
    try {
      await deleteStaffMember({ id });
      toast.success('Staff member deleted successfully');
    } catch (error) {
      console.error('Error deleting staff member:', error);
      toast.error('Failed to delete staff member. Please try again.');
    } finally {
      setStaffToDelete(null);
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Staff Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 gap-4">
            <Input 
              className="max-w-sm" 
              placeholder="Search staff..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => setIsNewDialogOpen(true)}>
              Add Staff Member
            </Button>
          </div>
          
          <NewStaffDialog 
            open={isNewDialogOpen}
            onClose={() => setIsNewDialogOpen(false)}
          />
          <EditStaffDialog 
            staff={editingStaff}
            open={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setEditingStaff(null);
            }}
          />
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
                  <TableHead>Certification Level</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffMembers.map((staff) => (
                  <TableRow key={staff._id}>
                    <TableCell>{staff.firstName} {staff.lastName}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>
                      <Badge variant={staff.staffType === "permanent" ? "default" : "secondary"}>
                        {staff.staffType === "permanent" ? "Permanent" : "Freelance"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {staff.certLevel?.replace(/^[^-]+ - /, '') || staff.certLevel}
                    </TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => {
                              setEditingStaff(staff as Staff & { _id: Id<"staff"> });
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setStaffToDelete(staff._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!staffToDelete} onOpenChange={(open) => !open && setStaffToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff member from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => staffToDelete && handleDelete(staffToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
