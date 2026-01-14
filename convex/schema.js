import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    // User scores table - each user has one score record
    scores: defineTable({
        userId: v.id("users"),
        score: v.number(),
    }).index("by_userId", ["userId"]),
});

export default schema;
