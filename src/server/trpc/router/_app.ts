// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { chatRouter } from "./chat";

export const appRouter = router({
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
