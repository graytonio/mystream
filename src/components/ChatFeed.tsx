import { ChatMessage } from "chat-types";
import Pusher from "pusher-js";
import { useEffect, useState, useRef, FormEvent } from "react";
import { env } from "../env/client.mjs";
import { trpc } from "../utils/trpc";

type ChatFeedProps = {
  channel_name: string;
  className?: string;
};

function useChatScroll<T>(
  dep: T
): React.MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

const ChatFeed = ({ channel_name, className = "" }: ChatFeedProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const ref = useChatScroll(messages);
  const sendMessage = trpc.chat.sendChat.useMutation({
    onMutate: () => {
      setNewMessage("");
    },
  });

  useEffect(() => {
    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_REGION,
    });

    const channel = pusher.subscribe(channel_name);

    channel.bind("chat-message", (data: ChatMessage) => {
      setMessages((prevMessage) => [...prevMessage, data]);
    });

    return () => {
      pusher.unsubscribe(channel_name);
    };
  }, [channel_name]);

  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage.mutate({ channel: channel_name, message: newMessage });
  };

  return (
    <div
      ref={ref}
      className={`${className} flex max-h-screen flex-col overflow-y-auto bg-black text-white`}
    >
      <div className="flex-1" ref={ref}>
        {messages.map((message) => (
          <div key={message.id} className="p-1">
            <span className={`font-bold text-${message.color}`}>
              {message.username}
            </span>
            : {message.message}
          </div>
        ))}
      </div>

      <form className="flex-0 m-2 flex h-10 text-black" onSubmit={sendChat}>
        <input
          className="h-full flex-1 rounded-md rounded-r-none px-4 py-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Chat"
        />
        <button className="rounded-md rounded-l-none bg-purple-600 px-2 py-1 text-lg text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatFeed;
