import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get the current user's score (live updates)
export const getScore = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return null;
        }

        const scoreRecord = await ctx.db
            .query("scores")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .unique();

        return scoreRecord?.score ?? 0;
    },
});

// Increment the user's score by 1
export const incrementScore = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("Must be logged in to increment score");
        }

        const existingScore = await ctx.db
            .query("scores")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .unique();

        if (existingScore) {
            // Update existing score
            await ctx.db.patch(existingScore._id, {
                score: existingScore.score + 1,
            });
            return existingScore.score + 1;
        } else {
            // Create new score record
            await ctx.db.insert("scores", {
                userId,
                score: 1,
            });
            return 1;
        }
    },
});
