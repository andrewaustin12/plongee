import { Id } from "@/convex/_generated/dataModel";

export interface Equipment {
  _id: Id<"equipment">;
  type: string;
  serialNumber: string;
  status: string;
  lastServiceDate: string;
  size: string;
  material?: string;
  length?: string;
  weightCapacity?: string;
  thickness?: string;
  notes?: string;
  assignedTo?: Id<"staff">;
}
