import Pusher from "pusher";
import { env } from "../../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var pusher: Pusher | undefined;
}

export const pusher =
  global.pusher ||
  new Pusher({
    appId: env.PUSHER_APP_ID,
    key: env.PUSHER_APP_KEY,
    secret: env.PUSHER_SECRET,
    cluster: env.PUSHER_REGION,
  });
