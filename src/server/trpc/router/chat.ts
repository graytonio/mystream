import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const chatRouter = router({
  sendChat: protectedProcedure
    .input(
      z.object({ message: z.string(), channel: z.string(), color: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.pusher.trigger(input.channel, "chat-message", {
        username: ctx.session.user.name,
        message: input.message,
        color: input.color,
      });
    }),
});
