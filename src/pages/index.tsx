import type { NextPage } from "next";
import Head from "next/head";
import ChatFeed from "../components/ChatFeed";
import NoSSR from "../components/NoSSR";
import StreamPlayer from "../components/StreamPlayer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MyStream</title>
        <meta
          name="description"
          content="The best self hosted streaming solution"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen flex-col items-center justify-start">
        <NoSSR>
          <StreamPlayer src="https://suki.graytonward.com/cam/index.m3u8" />
        </NoSSR>
      </main>
    </>
  );
};

export default Home;
