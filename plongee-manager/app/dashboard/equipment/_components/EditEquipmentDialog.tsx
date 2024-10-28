import React, { useState, useEffect } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Id } from "@/convex/_generated/dataModel";

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

type Equipment = {
  _id: Id<"equipment">;
  type: typeof equipmentTypes[number];
  serialNumber: string;
  lastServiceDate: string;
  status: typeof statusTypes[number];
  size: string;
  material?: string;
  length?: string;
  weightCapacity?: string;
  thickness?: string;
  notes?: string;
};

type EditEquipmentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment;
};

export function EditEquipmentDialog({ isOpen, onClose, equipment }: EditEquipmentDialogProps) {
  const [formData, setFormData] = useState(equipment);
  const updateEquipment = useMutation(api.equipment.update);

  useEffect(() => {
    setFormData(equipment);
  }, [equipment]);

  const getSizeOptions = () => {
    switch (formData.type) {
      case 'monofin':
      case 'bifin':
        return finSizeOptions;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEquipment({
        id: equipment._id,
        type: formData.type,
        serialNumber: formData.serialNumber,
        status: formData.status,
        lastServiceDate: formData.lastServiceDate,
        size: formData.size,
        material: formData.material || undefined,
        length: formData.length ? Number(formData.length) : undefined,
        weightCapacity: formData.weightCapacity ? Number(formData.weightCapacity) : undefined,
        thickness: formData.thickness ? Number(formData.thickness) : undefined,
        notes: formData.notes || undefined,
      });
      toast.success('Equipment updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating equipment:', error);
      toast.error('Failed to update equipment. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            required
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as typeof equipmentTypes[number] })}
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
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as typeof statusTypes[number] })}
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
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            required
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              Next Service Date:
            </span>
            <Input
              type="date"
              className="pl-40"
              value={formData.lastServiceDate}
              onChange={(e) => setFormData({ ...formData, lastServiceDate: e.target.value })}
              required
            />
          </div>
          <Select
            required
            value={formData.size}
            onValueChange={(value) => setFormData({ ...formData, size: value })}
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
            value={formData.material || ''}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Length in meters (optional)"
            value={formData.length || ''}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Weight Capacity in kg (optional)"
            value={formData.weightCapacity || ''}
            onChange={(e) => setFormData({ ...formData, weightCapacity: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Thickness in mm (optional)"
            value={formData.thickness || ''}
            onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
          />
          <Input
            placeholder="Notes (optional)"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
