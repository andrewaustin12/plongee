"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from 'sonner';

export function NewStaffDialog() {
  const [open, setOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    certLevel: ""
  });

  const addStaffMember = useMutation(api.staff.add);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStaffMember(newStaff);
      toast.success('New staff member added successfully!');
      setOpen(false);
      setNewStaff({ name: "", position: "", email: "", phone: "", certLevel: "" });
    } catch (error: unknown) {
      console.error('Error adding new staff member:', error);
      toast.error('Failed to add new staff member. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Staff Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={newStaff.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" value={newStaff.position} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={newStaff.email} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={newStaff.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="certLevel">Certification Level</Label>
            <Input id="certLevel" name="certLevel" value={newStaff.certLevel} onChange={handleInputChange} required />
          </div>
          <Button type="submit">Add Staff Member</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}