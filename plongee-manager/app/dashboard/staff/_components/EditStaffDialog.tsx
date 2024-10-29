"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Staff } from "@/convex/staff";
import { CertificationSelect } from "@/components/certification-select";
import { Id } from "@/convex/_generated/dataModel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EditStaffDialogProps {
  staff: (Staff & { _id: Id<"staff"> }) | null;
  open: boolean;
  onClose: () => void;
}

export function EditStaffDialog({ staff, open, onClose }: EditStaffDialogProps) {
  const updateStaff = useMutation(api.staff.update);
  const [formData, setFormData] = useState<Omit<Staff, '_id'>>({
    firstName: staff?.firstName ?? '',
    lastName: staff?.lastName ?? '',
    email: staff?.email ?? '',
    phone: staff?.phone ?? '',
    position: staff?.position ?? '',
    certLevel: staff?.certLevel ?? '',
    staffType: staff?.staffType ?? 'permanent',
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        phone: staff.phone,
        position: staff.position,
        certLevel: staff.certLevel,
        staffType: staff.staffType,
      });
    }
  }, [staff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStaff({
        id: staff!._id as Id<"staff">,
        ...formData,
      });
      toast.success("Staff member updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating staff member:", error);
      toast.error("Failed to update staff member");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certLevel">Certification Level</Label>
            <CertificationSelect
              value={formData.certLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, certLevel: value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Staff Type</Label>
            <RadioGroup
              value={formData.staffType}
              onValueChange={(value: "permanent" | "freelance") =>
                setFormData({ ...formData, staffType: value })
              }
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="permanent" />
                <Label>Permanent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="freelance" />
                <Label>Freelance</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}