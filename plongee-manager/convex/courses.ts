import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const createCourse = mutation({
  args: {
    title: v.string(),
    start: v.number(), // Store as Unix timestamp
    end: v.number(),
    instructor: v.optional(v.string()),
    participants: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const courseId = await ctx.db.insert("courses", {
      title: args.title,
      start: args.start,
      end: args.end,
      instructor: args.instructor ?? "",
      participants: args.participants ?? [],
    });
    return courseId;
  },
});

export const getCourses = query({
  handler: async (ctx) => {
    return await ctx.db.query("courses").collect();
  },
});

export const updateCourse = mutation({
  args: {
    id: v.id("courses"),
    title: v.string(),
    start: v.number(),
    end: v.number(),
    instructor: v.string(),
    participants: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      start: args.start,
      end: args.end,
      instructor: args.instructor,
      participants: args.participants,
    });
  },
}); 