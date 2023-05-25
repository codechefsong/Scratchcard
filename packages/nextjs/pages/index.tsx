import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Digital Scratch Off</span>
          </h1>

          <Image alt="Scratchcard" className="cursor-pointer" width={400} height={400} src="/assets/scratchcard.png" />

          <p className="text-center text-lg">
            Matches 3 to Win
          </p>

          <div className="center">
            <Link href="/scratch-cards" passHref className=" py-2 px-4 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50">
              Play Scratch Card
            </Link>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Home;
