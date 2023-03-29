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
  const { address, connectMetaMask, disconnectMetaMask } = useConnectMetaMask();
  const [loading, setLoading] = useState<boolean>(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    document.querySelector("body").classList.add("bg-yacht-white");
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.80:3000/listings");
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
  //  <body className="bg-yacht-white h-screen">
  return (
    <div className="flex flex-col h-full">
      <div className="h-min">
        <Header
          onClickConnect={connectMetaMask}
          onClickDisconnect={disconnectMetaMask}
          ethAddress={address}
        />
      </div>
      <div className="flex justify-center">
        <Link href="/list">
          <Button>Sell Ordinal for ETH</Button>
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
