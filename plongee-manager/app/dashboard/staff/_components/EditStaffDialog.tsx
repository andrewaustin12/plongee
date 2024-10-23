"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";

interface StaffMember {
  _id: Id<"staff">;
  name: string;
  position: string;
  email: string;
  phone: string;
  certLevel: string;
}

interface EditStaffDialogProps {
  staff: StaffMember;
  onEdit: () => void;
}

export function EditStaffDialog({ staff, onEdit }: EditStaffDialogProps) {
  const [open, setOpen] = useState(false);
  const [editedStaff, setEditedStaff] = useState(staff);

  const updateStaffMember = useMutation(api.staff.update);

  useEffect(() => {
    setEditedStaff(staff);
  }, [staff]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStaffMember({
        id: staff._id,
        name: editedStaff.name,
        position: editedStaff.position,
        email: editedStaff.email,
        phone: editedStaff.phone,
        certLevel: editedStaff.certLevel
      });
      toast.success('Staff member updated successfully!');
      setOpen(false);
      onEdit();
    } catch (error) {
      console.error('Error updating staff member:', error);
      toast.error('Failed to update staff member. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={editedStaff.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" value={editedStaff.position} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={editedStaff.email} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={editedStaff.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="certLevel">Certification Level</Label>
            <Input id="certLevel" name="certLevel" value={editedStaff.certLevel} onChange={handleInputChange} required />
          </div>
          <Button type="submit">Update Staff Member</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}