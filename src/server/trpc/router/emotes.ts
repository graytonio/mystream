import { router, publicProcedure } from "../trpc";
import fetch from "node-fetch";
import { z } from "zod";
import { Emote } from "chat-types";

export const emoteRouter = router({
  getEmotes: publicProcedure
    .input(z.object({ channelId: z.string() }))
    .query(async ({ input }) => {
      const results = await fetch(
        `https://emotes.adamcy.pl/v1/channel/${input.channelId}/emotes/all`
      );
      return (await results.json()) as Emote[];
    }),
});
