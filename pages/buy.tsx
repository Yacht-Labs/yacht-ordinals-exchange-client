import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import OrdinalCard from "../components/OrdinalCard";
import useConnectMetaMask from "../hooks/useConnectMetaMask";
import { OrdinalListing } from "../types/yoecTypes";

interface BuyPageProps {
  id: string;
}

const Buy: React.FC<BuyPageProps> = ({ id }) => {
  const { address, connectMetaMask, disconnectMetaMask } = useConnectMetaMask();
  const [listing, setListing] = useState<OrdinalListing | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.80:3000/listings?id=${id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const [data] = await response.json();
        console.log(id);
        console.log(data);
        setListing(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
            {address ? <Button className="w-32">Buy</Button> : null}
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
