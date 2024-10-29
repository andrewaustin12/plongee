import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const finSizes = v.union(
  // EU sizes
  v.literal("EU-32"), v.literal("EU-33"), v.literal("EU-34"),
  v.literal("EU-35"), v.literal("EU-36"), v.literal("EU-37"),
  v.literal("EU-38"), v.literal("EU-39"), v.literal("EU-40"),
  v.literal("EU-41"), v.literal("EU-42"), v.literal("EU-43"),
  v.literal("EU-44"), v.literal("EU-45"), v.literal("EU-46"),
  v.literal("EU-47"), v.literal("EU-48"), v.literal("EU-49"),
  v.literal("EU-50"), v.literal("EU-51"), v.literal("EU-52"),
  v.literal("EU-53"), v.literal("EU-54"),
  // US sizes
  v.literal("US-0"),  v.literal("US-1"),  v.literal("US-2"),
  v.literal("US-3"),  v.literal("US-4"),  v.literal("US-5"),
  v.literal("US-6"),  v.literal("US-7"),  v.literal("US-8"),
  v.literal("US-9"),  v.literal("US-10"), v.literal("US-11"),
  v.literal("US-12"), v.literal("US-13"), v.literal("US-14"),
  v.literal("US-15"), v.literal("US-16"), v.literal("US-17"),
  v.literal("US-18"), v.literal("US-19"), v.literal("US-20"),
  v.literal("US-21"), v.literal("US-22")
);

const wetsuitSizes = v.union(
  v.literal("XXS"),
  v.literal("XS"),
  v.literal("S"),
  v.literal("M"),
  v.literal("L"),
  v.literal("XL"),
  v.literal("XXL"),
  v.literal("3XL")
);

const maskSizes = v.union(
  v.literal("XS"),
  v.literal("S"),
  v.literal("M"),
  v.literal("L"),
  v.literal("XL")
);

const oneSize = v.literal("one-size");

// For items that don't have specific sizes
const noSize = v.literal("no size");

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("equipment").collect();
  },
});

export const add = mutation({
  args: {
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
    serialNumber: v.string(),
    lastServiceDate: v.optional(v.string()),
    status: v.union(
      v.literal("available"),
      v.literal("in-use"),
      v.literal("maintenance")
    ),
    // Size is now a union of all possible size types
    size: v.union(
      finSizes,
      wetsuitSizes,
      maskSizes,
      oneSize,
      noSize
    ),
    assignedTo: v.optional(v.id("staff")),
    thickness: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate that the size matches the equipment type
    const { type, size } = args;
    
    // Size validation
    if (
      (type === "monofin" || type === "bifin") && 
      !size.startsWith("EU-") && !size.startsWith("US-")
    ) {
      throw new Error("Fins must use EU or US sizes");
    }
    
    if (
      type === "wetsuit" && 
      !["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"].includes(size)
    ) {
      throw new Error("Wetsuit must use standard sizes (XXS-3XL)");
    }

    if (
      type === "mask" && 
      !["XS", "S", "M", "L", "XL"].includes(size)
    ) {
      throw new Error("Mask must use standard sizes (XS-XL)");
    }

    if (
      ["snorkel", "weight-belt", "lanyard", "buoy", "rope"].includes(type) && 
      size !== "one-size"
    ) {
      throw new Error("This equipment type should use 'one-size'");
    }

    // Validate staff member exists if assignedTo is provided
    if (args.assignedTo) {
      const staff = await ctx.db.get(args.assignedTo);
      if (!staff) {
        throw new Error("Invalid staff member ID");
      }
    }

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
    type: v.optional(v.union(
      v.literal("monofin"),
      v.literal("bifin"),
      v.literal("mask"),
      v.literal("snorkel"),
      v.literal("wetsuit"),
      v.literal("weight-belt"),
      v.literal("lanyard"),
      v.literal("buoy"),
      v.literal("rope")
    )),
    serialNumber: v.optional(v.string()),
    lastMaintenance: v.optional(v.string()), // Changed from lastServiceDate
    status: v.optional(v.union(
      v.literal("available"),
      v.literal("in-use"),
      v.literal("maintenance")
    )),
    assignedTo: v.optional(v.id("staff")),
    size: v.optional(v.string()),
    thickness: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Add similar size validation if size is being updated
    if (args.size && args.type) {
      // Similar validation logic as in add mutation
    }
    
    // Validate staff member exists if assignedTo is being updated
    if (args.assignedTo) {
      const staff = await ctx.db.get(args.assignedTo);
      if (!staff) {
        throw new Error("Invalid staff member ID");
      }
    }

    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});
