import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import useConnectMetaMask from "../hooks/useConnectMetaMask";
import Link from "next/link";
import { OrdinalListing } from "../types/yoecTypes";
import Lottie from "react-lottie";
import animationData from "../public/cubicmaths.json";

const Home: NextPage = () => {
  const [listings, setListings] = useState<OrdinalListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("process.env.API_BASE_URL ", process.env.API_BASE_URL);
        const response = await fetch(`${process.env.API_BASE_URL}/listings`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        console.log(data);
        setListings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-cyan-950">
      <div className="h-min">
        <Header />
      </div>
      <div className="flex justify-center flex-col items-center">
        <div className="headline font-archivo text-2xl text-center">
          Important Notice:
        </div>
        <div className="bodytext font-akkurat px-8">
          We are migrating our Lit Network implementation currently so the
          exchange is not yet operational. Do not attempt to list an ordinal
          yet. For exchange updates please join our Telegram, thank you.
        </div>
        <Link href="https://t.me/yachtordinalexchange">
          <Button className="m-4 w-48 text-center">Join Telegram Group</Button>
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href="/list">
          <Button className="w-48">Sell Ordinal for ETH</Button>
        </Link>
      </div>
      {loading ? (
        <Lottie options={defaultOptions} height={280} width={280} />
      ) : null}
      <div className="flex flex-wrap py-8 px-8">
        {listings.map((item) => (
          <Link href={`/buy?id=${item.id}`}>
            <OrdinalCard
              key={item.id}
              ethPrice={item.ethPrice}
              inscriptionId={item.inscriptionId}
              inscriptionNumber={item.inscriptionNumber}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
