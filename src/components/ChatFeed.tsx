import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { env } from "../env/client.mjs";

const ChatFeed = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: env.NEXT_PUBLIC_PUSHER_REGION,
  });

  useEffect(() => {
    const channel = pusher.subscribe("chat");

    channel.bind("chat-update", (data: string) => {
      setMessages((prevMessage) => [...prevMessage, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  return (
    <div className="grid grid-cols-1 divide-y">
      {messages.map((message) => (
        <div key={Date.now() + message}>{message}</div>
      ))}
    </div>
  );
};

export default ChatFeed;
