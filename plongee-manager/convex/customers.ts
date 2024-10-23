import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("customers").collect();
  },
});

export const add = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const newCustomerId = await ctx.db.insert("customers", args);
    return newCustomerId;
  },
});

export const remove = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("customers"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    certLevel: v.optional(v.string()),
    totalDives: v.optional(v.number()),
    lastDiveDate: v.optional(v.string()),
    emergencyContact: v.optional(v.object({
      name: v.string(),
      phone: v.string(),
    })),
    diveInsurance: v.optional(v.object({
      provider: v.string(),
      policyNumber: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});
