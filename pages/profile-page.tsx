import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import TextInput from "../components/TextInput";
import Lottie from "react-lottie";
import animationData from "../public/cubicmaths.json";
import { useAccount } from "wagmi";
import Link from "next/link";
import { OrdinalListing } from "../types/yoecTypes";
import { useYachtAccount } from "../hooks/useYachtAccount";

const ProfilePage: NextPage = () => {
  const [sellerListings, setSellerListings] = useState<OrdinalListing[]>([]);
  const [buyerListings, setBuyerListings] = useState<OrdinalListing[]>([]);
  const [sellerLoading, setSellerLoading] = useState<boolean>(true);
  const [buyerLoading, setBuyerLoading] = useState<boolean>(true);
  const { address, connector, isConnected } = useAccount();
  const { yachtAccount } = useYachtAccount();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setSellerLoading(true);
        const response = await fetch(
          `${process.env.API_BASE_URL}/listings/seller/${yachtAccount.id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setSellerListings(data);
        setSellerLoading(false);
      } catch (error) {
        setSellerLoading(false);
        console.error("Error:", error);
      }
    };
    const fetchBuyerData = async () => {
      try {
        setBuyerLoading(true);
        console.log(yachtAccount.id);
        const response = await fetch(
          `${process.env.API_BASE_URL}/listings/buyer/${yachtAccount.id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setBuyerListings(data);
        setBuyerLoading(false);
      } catch (error) {
        setBuyerLoading(false);
        console.error("Error:", error);
      }
    };
    fetchBuyerData();
    fetchSellerData();
  }, [yachtAccount]);

  async function sendInscriptionTouched(
    inscriptionId: string,
    address: string
  ) {
    if (typeof window.unisat === "undefined") {
      alert("Please install the Unisat extension to use this feature.");
    }
    const txid = await unisat.sendInscription(address, inscriptionId);
  }

  async function sendCardinalTouched(inscriptionId: string, address: string) {
    if (typeof window.unisat === "undefined") {
      alert("Please install the Unisat extension to use this feature.");
    }
    const txid = await unisat.sendBitcoin(address, 40000, { feeRate: 30 });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-min">
        <Header />
      </div>
      <div className="flex justify-center">
        <div className="font-archivo headline text-2xl">
          My Listings For Sale
        </div>
      </div>
      {sellerLoading ? (
        <Lottie options={defaultOptions} height={280} width={280} />
      ) : null}
      <div className="flex flex-wrap py-8 px-8">
        {sellerListings.map((item) => (
          <div className="flex flex-col">
            <OrdinalCard
              key={item.id}
              ethPrice={item.ethPrice}
              inscriptionId={item.inscriptionId}
              inscriptionNumber={item.inscriptionNumber}
            />
            {item.status === "NeedsOrdinal" || item.status === "NeedsBoth" ? (
              <Button
                className="w-64 self-center"
                onClick={() =>
                  sendInscriptionTouched(item.inscriptionId, item.pkpBtcAddress)
                }
              >
                Send Inscription to PKP
              </Button>
            ) : null}
            {item.status === "NeedsCardinal" || item.status === "NeedsBoth" ? (
              <Button
                className="w-64 m-4 self-center"
                onClick={() =>
                  sendCardinalTouched(item.inscriptionId, item.pkpBtcAddress)
                }
              >
                Send Cardinal to PKP
              </Button>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="font-archivo headline text-2xl">
          My Purchased Listings
        </div>
      </div>
      {buyerLoading ? (
        <Lottie options={defaultOptions} height={280} width={280} />
      ) : null}
      <div className="flex flex-wrap py-8 px-8">
        {buyerListings.map((item) => (
          <Link href={`/withdraw?id=${item.id}`}>
            <div className="flex flex-col">
              <OrdinalCard
                key={item.id}
                ethPrice={item.ethPrice}
                inscriptionId={item.inscriptionId}
                inscriptionNumber={item.inscriptionNumber}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ProfilePage;
