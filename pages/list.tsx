import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import useConnectMetaMask from "../hooks/useConnectMetaMask";
import TextInput from "../components/TextInput";

const List: NextPage = () => {
  const { address, connectMetaMask, disconnectMetaMask } = useConnectMetaMask();
  const [inscriptionNumber, setInscriptionNumber] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [inscriptionId, setInscriptionId] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    document.querySelector("body").classList.add("bg-yacht-white");
  }, []);

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
    alert("Listing ordinal");
  };
  // <body className="bg-yacht-white h-screen">
  return (
    <div className="flex flex-col h-full">
      <div className="h-min">
        <Header
          onClickConnect={connectMetaMask}
          onClickDisconnect={disconnectMetaMask}
          ethAddress={address}
        />
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
            inscriptionNumber={inscriptionNumber}
            ethPrice={ethPrice}
            inscriptionId={inscriptionId}
          />
        ) : null}
        {isValid && address && ethPrice ? (
          <Button onClick={listOrdinal}>List Ordinal</Button>
        ) : (
          <p className="mt-4">
            Enter valid ordinal number, price and connect wallet
          </p>
        )}
      </div>
    </div>
  );
};
export default List;
