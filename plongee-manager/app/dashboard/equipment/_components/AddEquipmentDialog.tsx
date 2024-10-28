import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const equipmentTypes = ["monofin", "bifin", "mask", "snorkel", "wetsuit", "weight-belt", "lanyard", "buoy", "rope"] as const;
const statusTypes = ["available", "in-use", "maintenance"] as const;
const finSizeOptions = [
  // EU sizes
  "EU-32", "EU-33", "EU-34", "EU-35", "EU-36", "EU-37", "EU-38", "EU-39",
  "EU-40", "EU-41", "EU-42", "EU-43", "EU-44", "EU-45", "EU-46", "EU-47",
  "EU-48", "EU-49", "EU-50", "EU-51", "EU-52", "EU-53", "EU-54",
  // US sizes
  "US-0", "US-1", "US-2", "US-3", "US-4", "US-5", "US-6", "US-7", "US-8",
  "US-9", "US-10", "US-11", "US-12", "US-13", "US-14", "US-15", "US-16",
  "US-17", "US-18", "US-19", "US-20", "US-21", "US-22"
] as const;
const maskSizes = ["XS", "S", "M", "L", "XL"];

export function AddEquipmentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [newEquipment, setNewEquipment] = useState({
    type: '',
    serialNumber: '',
    lastMaintenance: '',
    status: '',
    size: '',
    material: '',
    length: '',
    weightCapacity: '',
    thickness: '',
    notes: '',
  });

  const addEquipment = useMutation(api.equipment.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const equipmentData = {
        type: newEquipment.type as typeof equipmentTypes[number],
        serialNumber: newEquipment.serialNumber,
        status: newEquipment.status as typeof statusTypes[number],
        lastServiceDate: newEquipment.lastMaintenance,
        size: newEquipment.size as typeof finSizeOptions[number],
        notes: newEquipment.notes,  // Add this line
      };
      await addEquipment(equipmentData);
      toast.success('New equipment added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding new equipment:', error);
      toast.error('Failed to add new equipment. Please try again.');
    }
  };

  const getSizeOptions = () => {
    switch (newEquipment.type) {
      case 'monofin':
      case 'bifin':
        return finSizeOptions; // EU/US sizes
      case 'wetsuit':
        return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
      case 'mask':
        return maskSizes;
      case 'snorkel':
        return ['one-size'];
      case 'weight-belt':
        return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
      default:
        return ['one-size'];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            required
            onValueChange={(value) => setNewEquipment({ ...newEquipment, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {equipmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            required
            onValueChange={(value) => setNewEquipment({ ...newEquipment, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusTypes.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Serial Number"
            value={newEquipment.serialNumber}
            onChange={(e) => setNewEquipment({ ...newEquipment, serialNumber: e.target.value })}
            required
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              Next Service Date:
            </span>
            <Input
              type="date"
              className="pl-40"
              value={newEquipment.lastMaintenance}
              onChange={(e) => setNewEquipment({ ...newEquipment, lastMaintenance: e.target.value })}
              required
            />
          </div>
          <Select
            required
            onValueChange={(value) => setNewEquipment({ ...newEquipment, size: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {getSizeOptions().map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Material (optional)"
            value={newEquipment.material}
            onChange={(e) => setNewEquipment({ ...newEquipment, material: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Length in meters (optional)"
            value={newEquipment.length}
            onChange={(e) => setNewEquipment({ ...newEquipment, length: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Weight Capacity in kg (optional)"
            value={newEquipment.weightCapacity}
            onChange={(e) => setNewEquipment({ ...newEquipment, weightCapacity: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Thickness in mm (optional)"
            value={newEquipment.thickness}
            onChange={(e) => setNewEquipment({ ...newEquipment, thickness: e.target.value })}
          />
          <Input
            placeholder="Notes (optional)"
            value={newEquipment.notes}
            onChange={(e) => setNewEquipment({ ...newEquipment, notes: e.target.value })}
          />
          <Button type="submit">Add Equipment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
