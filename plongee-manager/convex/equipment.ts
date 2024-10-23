import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllEquipment = query({
  handler: async (ctx) => {
    return await ctx.db.query("equipment").collect();
  },
});

export const addEquipment = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    status: v.string(),
    lastMaintenance: v.string(),
    serialNumber: v.string(),
  },
  handler: async (ctx, args) => {
    const newEquipmentId = await ctx.db.insert("equipment", {
      name: args.name,
      type: args.type,
      status: args.status,
      lastMaintenance: args.lastMaintenance,
      serialNumber: args.serialNumber,
    });
    return newEquipmentId;
  },
});
