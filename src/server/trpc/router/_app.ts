// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { chatRouter } from "./chat";
import { emoteRouter } from "./emotes";

export const appRouter = router({
  chat: chatRouter,
  emotes: emoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
