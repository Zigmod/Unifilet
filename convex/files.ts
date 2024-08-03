import { mutation } from "./_generated/server";
import { v } from "@clerk/nextjs";

export const createFile = mutation({
    args: {
        name: v.string(),

    },
    async handler(ctx, args) {
        await ctx.db.insert('files', {
            name: args.name,

        });
    },
});
