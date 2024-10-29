import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export type Staff = {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
  certLevel: string;
  staffType: "permanent" | "freelance";
};

export const add = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    certLevel: v.string(),
    staffType: v.union(v.literal("permanent"), v.literal("freelance")),
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
    firstName: v.string(),
    lastName: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    certLevel: v.string(),
    staffType: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});

export const list = query({
  handler: async (ctx) => {
    const staff = await ctx.db.query("staff").collect();
    return staff;
  },
});
