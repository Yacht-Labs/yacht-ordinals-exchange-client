import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import TextInput from "../components/TextInput";
import { OrdinalListing } from "../types/yoecTypes";
import Lottie from "react-lottie";
import animationData from "../public/cubicmaths.json";
import { WithdrawPageProps } from "../types/yoecTypes";
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const Withdraw: React.FC<WithdrawPageProps> = ({ id }) => {
  const [listing, setListing] = useState<OrdinalListing | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [btcAddress, setBtcAddress] = useState<string | null>(null);

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
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  async function withdrawOrdinal() {
    if (listing == null) {
      throw new Error("Listing is null");
    }
    if (!btcAddress) {
      alert(
        "Please fill in all the fields and make sure a compatible wallet is installed."
      );
      return;
    }
    setLoading(true);
    try {
      var authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "ethereum",
      });
      console.log(authSig);

      const payload = {
        listingId: listing.id,
        btcPayoutAddress: btcAddress,
        authSig,
      };

      const response = await fetch(
        `${process.env.API_BASE_URL}/listings/withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      // const data = await response.json();
      // console.log(data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Transaction failed. Please check the console for more details.");
    }
  }

  const handleBTCAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBtcAddress(event.target.value);
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
          <TextInput
            label="BTC Withdrawal Address"
            id="btcAddress"
            name="btcAddress"
            placeholder="Enter the Withdrawal Address"
            onChange={handleBTCAddressChange}
          />
          {listing && !loading ? (
            <Button onClick={withdrawOrdinal} className="w-64 mt-4">
              Withdraw Ordinal
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
export default Withdraw;
