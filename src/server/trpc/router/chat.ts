import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { v4 } from "uuid";

export const chatRouter = router({
  sendChat: protectedProcedure
    .input(
      z.object({ message: z.string(), channel: z.string(), color: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.pusher.trigger(input.channel, "chat-message", {
        id: v4(),
        username: ctx.session.user.name,
        message: input.message,
        color: input.color,
      });
    }),
});
