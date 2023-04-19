import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import useConnectMetaMask from "../hooks/useConnectMetaMask";
import { OrdinalListing } from "../types/yoecTypes";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BuyPageProps } from "../types/yoecTypes";
import Lottie from "react-lottie";
import animationData from "../public/cubicmaths.json";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useYachtAccount } from "../hooks/useYachtAccount";

const Buy: React.FC<BuyPageProps> = ({ id }) => {
  const [listing, setListing] = useState<OrdinalListing | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [buyAddress, setBuyAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.API_BASE_URL}/listings?id=${id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const [data] = await response.json();
        console.log(data);
        setListing(data);
        const ba = ethers.utils.computeAddress(data.pkpPublicKey);
        setAmount(data.ethPrice);
        setBuyAddress(ba);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    const getProvider = async () => {
      const ethereumProvider = await detectEthereumProvider();
      setProvider(ethereumProvider);
    };
    getProvider();
  }, []);

  const buyOrdinal = async () => {
    if (listing == null) {
      throw new Error("Listing is null");
    }
    if (!provider || !buyAddress || !amount || !address) {
      alert(
        "Please fill in all the fields and make sure a compatible wallet is installed."
      );
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();
    const weiAmount = ethers.utils.parseEther(amount);
    setLoading(true);
    try {
      const tx = await signer.sendTransaction({
        to: buyAddress,
        value: weiAmount,
      });
      const result = await tx.wait();

      const payload = {
        listingId: listing.id,
        accountId: yachtAccount.id,
      };

      const response = await fetch(`${process.env.API_BASE_URL}/listings/buy`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      setListing(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Transaction failed. Please check the console for more details.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-min">
        <Header />
        <div className="flex flex-col items-center">
          {listing ? (
            <OrdinalCard
              inscriptionNumber={listing.inscriptionNumber}
              ethPrice={listing.ethPrice}
              inscriptionId={listing.inscriptionId}
            />
          ) : null}
          {listing && address && listing.status == "Ready" && !loading ? (
            <Button onClick={buyOrdinal} className="w-32 mt-4">
              Buy Ordinal
            </Button>
          ) : null}
          {loading ? (
            <Lottie options={defaultOptions} height={280} width={280} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id || "unknown";

  return {
    props: {
      id,
    },
  };
};

export default Buy;
