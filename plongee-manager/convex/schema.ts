import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  staff: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    certLevel: v.string(),
    isPermanent: v.boolean(),
  }),
  customers: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    certLevel: v.string(),
    totalDives: v.number(),
    lastDiveDate: v.optional(v.string()),
    emergencyContact: v.object({
      name: v.string(),
      phone: v.string(),
    }),
    diveInsurance: v.optional(v.object({
      provider: v.string(),
      policyNumber: v.string(),
    })),
  }),
  equipment: defineTable({
    type: v.union(
      v.literal("monofin"),
      v.literal("bifin"),
      v.literal("mask"), 
      v.literal("snorkel"),
      v.literal("wetsuit"),
      v.literal("weight-belt"),
      v.literal("lanyard"),
      v.literal("buoy"),
      v.literal("rope")
    ),
    status: v.union(
      v.literal("available"),
      v.literal("in-use"),
      v.literal("maintenance")
    ),
    size: v.string(),
    lastMaintenance: v.optional(v.string()),
    serialNumber: v.string(),
    assignedTo: v.optional(v.id("staff")),
    thickness: v.optional(v.number()), // in mm, for wetsuits
    notes: v.optional(v.string()),
    
  }),
  // ... other tables in your schema
});
