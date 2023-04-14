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

const ProfilePage: NextPage = () => {
    const [listings, setListings] = useState<OrdinalListing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { address, connector, isConnected } = useAccount();

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
                const response = await fetch(`${process.env.API_BASE_URL}/listings?address=${address}`);
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
        <div className="flex flex-col h-full">
            <div className="h-min">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="font-bookmania text-lg">My Listings</div>
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
export default ProfilePage;