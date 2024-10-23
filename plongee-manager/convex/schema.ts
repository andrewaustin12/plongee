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
    name: v.string(),
    type: v.string(),
    status: v.string(),
    lastMaintenance: v.string(),
    serialNumber: v.string(),
    assignedTo: v.optional(v.string()),
  }),
  // ... other tables in your schema
});
