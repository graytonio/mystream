import type { NextPage } from "next";
import Head from "next/head";
import ChatFeed from "../components/ChatFeed";
import Layout from "../components/Layout";
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
      <div className="hidden text-red-600 text-orange-600 text-green-500 text-teal-500 text-yellow-500 text-violet-500"></div>{" "}
      {/* Hidden div for dynamic color generation */}
      <Layout>
        <div className="grid h-1 flex-1 grid-cols-4 gap-1">
          <NoSSR>
            <StreamPlayer
              className="col-span-3"
              src="https://suki.graytonward.com/cam/index.m3u8"
            />
          </NoSSR>
          <ChatFeed className="max-h-full" channel_name="suki" />
        </div>
      </Layout>
    </>
  );
};

export default Home;
