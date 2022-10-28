import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const chatRouter = router({
  sendChat: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ ctx, input }) => {}),
});
