import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddEquipmentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: '',
    serialNumber: '',
    lastServiceDate: '',
    status: '',
  });

  const addEquipment = useMutation(api.equipment.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEquipment(newEquipment);
      toast.success('New equipment added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding new equipment:', error);
      toast.error('Failed to add new equipment. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Name"
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
          />
          <Input
            placeholder="Type"
            value={newEquipment.type}
            onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
          />
          <Input
            placeholder="Serial Number"
            value={newEquipment.serialNumber}
            onChange={(e) => setNewEquipment({ ...newEquipment, serialNumber: e.target.value })}
          />
          <Input
            type="date"
            placeholder="Last Service Date"
            value={newEquipment.lastServiceDate}
            onChange={(e) => setNewEquipment({ ...newEquipment, lastServiceDate: e.target.value })}
          />
          <Input
            placeholder="Status"
            value={newEquipment.status}
            onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value })}
          />
          <Button type="submit">Add Equipment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
