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

interface BuyPageProps {
  id: string;
}

const Buy: React.FC<BuyPageProps> = ({ id }) => {
  const { address, provider, signer, connectMetaMask, disconnectMetaMask } =
    useConnectMetaMask();
  const [listing, setListing] = useState<OrdinalListing | null>(null);
  const [buyAddress, setBuyAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/listings?id=${id}`);
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
  }, []);

  const sendTransaction = async () => {
    if (!provider || !buyAddress || !amount || !address) {
      alert(
        "Please fill in all the fields and make sure MetaMask is installed."
      );
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();
    const weiAmount = ethers.utils.parseEther(amount);

    try {
      const tx = await signer.sendTransaction({
        to: buyAddress,
        value: weiAmount,
      });
      await tx.wait();
      alert(`Transaction successful! Hash: ${tx.hash}`);
    } catch (error) {
      console.error(error);
      alert("Transaction failed. Please check the console for more details.");
    }
  };

  async function getPubKey(): Promise<string> {
    // Get public key for encryption with salsa20-poly1305
    // Key is returned as base64
    const keyB64 = (await window.ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [address],
    })) as string;
    //const publicKey = Buffer.from(keyB64, "base64");
    return keyB64;
  }

  async function decryptMessage(structuredData: any) {
    const ct = `0x${Buffer.from(
      JSON.stringify(structuredData),
      "utf8"
    ).toString("hex")}`;
    const decrypt = await window.ethereum.request({
      method: "eth_decrypt",
      params: [ct, address],
    });
    alert(decrypt);
  }

  const buyOrdinal = async () => {
    if (!listing) {
      return;
    }
    try {
      const pubkey = await getPubKey();
      const payload = {
        listingId: id,
        pkpPublicKey: listing.pkpPublicKey,
        encryptionPubKey: pubkey,
        isBuy: true,
      };

      const response = await fetch(`http://localhost:3001/listings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      decryptMessage(data);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-min">
        <Header
          onClickConnect={connectMetaMask}
          onClickDisconnect={disconnectMetaMask}
          ethAddress={address}
        />
        <div className="flex flex-col items-center">
          {listing ? (
            <OrdinalCard
              inscriptionNumber={listing.inscriptionNumber}
              ethPrice={listing.ethPrice}
              inscriptionId={listing.inscriptionId}
            />
          ) : null}
          {listing && address ? (
            <Button onClick={buyOrdinal} className="w-32 mt-4">
              Buy Ordinal
            </Button>
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
