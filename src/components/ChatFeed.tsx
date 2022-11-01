import { ChatMessage, Emote } from "chat-types";
import Pusher from "pusher-js";
import { useEffect, useState, useRef, FormEvent } from "react";
import { env } from "../env/client.mjs";
import { getRandomColor } from "../utils/colors";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";
import Image from "next/image.js";

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

const ChatDisplay = ({
  message,
  emotes,
}: {
  message: ChatMessage;
  emotes: Emote[];
}) => {
  const GetEmoteWord = ({ word }: { word: string }) => {
    for (const emote of emotes) {
      if (word === emote.code) {
        return (
          <div className="relative h-8 w-8">
            <Image
              src={emote.urls[0]?.url || "#"}
              alt={message.message}
              layout="fill"
              objectFit="contain"
            />
          </div>
        );
      }
    }
    return <span>{word}</span>;
  };

  return (
    <div className="flex items-center gap-1 p-1 align-middle">
      <span className={`h-full font-bold text-${message.color}`}>
        {message.username}:{" "}
      </span>
      {message.message.split(" ").map((word, idx) => (
        <GetEmoteWord key={idx} word={word} />
      ))}
    </div>
  );
};

const ChatFeed = ({ channel_name, className = "" }: ChatFeedProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [emotes, setEmotes] = useState<Emote[]>([]);
  const ref = useChatScroll(messages);

  const channel_emotes = trpc.emotes.getEmotes.useQuery({
    channelId: channel_name,
  });

  const sendMessage = trpc.chat.sendChat.useMutation({
    onMutate: () => {
      setNewMessage("");
    },
    onError: (error) => {
      switch (error.data?.code) {
        case "UNAUTHORIZED":
          toast("You need to be logged in to chat");
          return;
        default:
          toast(error.message);
      }
    },
  });

  useEffect(() => {
    if (!channel_emotes.data) return;
    setEmotes(channel_emotes.data);
  }, [channel_emotes.data]);

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
    if (newMessage.length === 0) {
      return;
    }
    sendMessage.mutate({
      channel: channel_name,
      message: newMessage,
      color: getRandomColor(),
    });
  };

  return (
    <div
      className={`${className} flex flex-col overflow-y-auto rounded-md border border-gray-300 bg-[#181818] text-white`}
    >
      <div className="flex-1 overflow-y-auto" ref={ref}>
        {messages.map((message) => (
          <ChatDisplay key={message.id} emotes={emotes} message={message} />
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
        <button className="rounded-md rounded-l-none bg-indigo-600 px-2 py-1 text-lg text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatFeed;
