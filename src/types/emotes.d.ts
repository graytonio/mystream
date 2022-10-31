declare module "chat-types" {
  interface EmoteURL {
    size: string;
    url: string;
  }

  interface Emote {
    provider: number;
    code: string;
    urls: EmoteURL[];
  }
}
