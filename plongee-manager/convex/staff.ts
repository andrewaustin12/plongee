import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    name: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    certLevel: v.string(),
  },
  handler: async (ctx, args) => {
    const newStaffId = await ctx.db.insert("staff", args);
    return newStaffId;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("staff").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("staff") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("staff"),
    name: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    certLevel: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});