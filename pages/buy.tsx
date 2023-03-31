import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import useConnectMetaMask from "../hooks/useConnectMetaMask";
import { OrdinalListing } from "../types/yoecTypes";
import { ethers } from "ethers";

interface BuyPageProps {
  id: string;
}

const Buy: React.FC<BuyPageProps> = ({ id }) => {
  const { address, connectMetaMask, disconnectMetaMask } = useConnectMetaMask();
  const [listing, setListing] = useState<OrdinalListing | null>(null);
  const [buyAddress, setBuyAddress] = useState<string | null>(null);

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
        setBuyAddress(ba);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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

  async function decryptMessage() {
    const account = "0xB2D7107b9bF8942e54CC16144931b3F455ddd399";
    const structuredData = {
      version: "x25519-xsalsa20-poly1305",
      nonce: "3jlN/dyyvM4CJP72e93Wl0Ocl5ektKy/",
      ephemPublicKey: "HiEow7sLRr4s230HXWCs/Oz0jvpHjnso14UGQJ6wwUM=",
      ciphertext:
        "IBONEkwjI72ALPTGVPN+NqOjb50Gu92So3rXXnHRlOj8LQ6fB9jUVemqR1W213gCkxCznGIjeDkN03TH96rDvw2DpD11s7aIEOKEdc/qMYY=",
    };
    const ct = `0x${Buffer.from(
      JSON.stringify(structuredData),
      "utf8"
    ).toString("hex")}`;
    const decrypt = await window.ethereum.request({
      method: "eth_decrypt",
      params: [ct, account],
    });
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
          {buyAddress ? (
            <div className="flex flex-col items-center">
              <p className="font-akkurat-bold">To purchase send ETH to:</p>
              <p className="font-bookmania">{buyAddress}</p>
            </div>
          ) : null}
          {address ? (
            <Button onClick={buyOrdinal} className="w-32 mt-4">
              Check Swap
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
