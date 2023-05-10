import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import TextInput from "../components/TextInput";
import Lottie from "react-lottie";
import animationData from "../public/cubicmaths.json";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const List: NextPage = () => {
  const { address, connector, isConnected } = useAccount();
  const [inscriptionNumber, setInscriptionNumber] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [inscriptionId, setInscriptionId] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchData = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.hiro.so/ordinals/v1/inscriptions/${id}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      console.log(data);
      setInscriptionId(data.id);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      console.error("Error:", error);
    }
  };

  const createListing = async (
    ethAddress: string | undefined,
    ethPrice: string,
    inscriptionId: string,
    inscriptionNumber: string
  ) => {
    const payload = {
      ethAddress,
      ethPrice,
      inscriptionId,
      inscriptionNumber,
    };

    const response = await fetch(`${process.env.API_BASE_URL}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.error) {
      console.error("Error creating listing", data.error);
      return;
    }
    return data;
  };

  const handleInscriptionNumberChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInscriptionNumber(event.target.value);
    await fetchData(event.target.value);
  };

  const handleEthPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthPrice(event.target.value);
  };

  const listOrdinal = async () => {
    if (!loading) {
      setLoading(true);
      const result = await createListing(
        address,
        ethPrice,
        inscriptionId,
        inscriptionNumber
      );
      setLoading(false);
      console.log(result);
      router.push("/profile-page");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-min">
        <Header />
      </div>
      <div className="flex flex-col items-center">
        <TextInput
          label="Inscription Number"
          id="inscriptionNumber"
          name="inscriptionNumber"
          placeholder="Enter the inscription number"
          onChange={handleInscriptionNumberChange}
        />
        <TextInput
          label="Price in ETH"
          id="ethPrice"
          name="ethPrice"
          placeholder="Enter the price in ETH"
          onChange={handleEthPriceChange}
        />
        {isValid ? (
          <OrdinalCard
            key={inscriptionId}
            inscriptionNumber={inscriptionNumber}
            ethPrice={ethPrice}
            inscriptionId={inscriptionId}
          />
        ) : null}
        {isValid && address && ethPrice && !loading ? (
          <Button onClick={listOrdinal}>List Ordinal</Button>
        ) : null}
        {!isValid ? (
          <p className="bodytext mt-4">
            Enter valid ordinal number, price and connect wallet
          </p>
        ) : null}
        {loading ? (
          <Lottie options={defaultOptions} height={280} width={280} />
        ) : null}
      </div>
    </div>
  );
};
export default List;
