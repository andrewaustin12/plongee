import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("equipment").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    serialNumber: v.string(),
    lastServiceDate: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { lastServiceDate, ...equipmentData } = args;
    const newEquipmentId = await ctx.db.insert("equipment", {
      ...equipmentData,
      lastMaintenance: lastServiceDate,
      assignedTo: undefined,
    });
    return newEquipmentId;
  },
});

export const remove = mutation({
  args: { id: v.id("equipment") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const edit = mutation({
  args: {
    id: v.id("equipment"),
    name: v.optional(v.string()),
    type: v.optional(v.string()),
    serialNumber: v.optional(v.string()),
    lastServiceDate: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});
