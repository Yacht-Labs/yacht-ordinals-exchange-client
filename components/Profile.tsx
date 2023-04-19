import React, { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useYachtAccount } from "../hooks/useYachtAccount";
import Button from "./Button";
import Link from "next/link";

interface ProfileProps {
  className?: string;
}

export const Profile: React.FC<ProfileProps> = ({ className }) => {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { yachtAccount, setYachtAccount } = useYachtAccount();

  useEffect(() => {
    if (isConnected && yachtAccount === null) {
      const fetchData = async () => {
        try {
          console.log("IM FETCHIIIING ACCOUNT");
          const response = await fetch(
            `${process.env.API_BASE_URL}/accounts?address=${address}`
          );
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
          const data = await response.json();
          console.log(data);
          setYachtAccount(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-self-end">
      {isConnected && address ? (
        <div className="flex flex-col items-center">
          <Button className="w-32" onClick={disconnect}>
            Disconnect
          </Button>
          <Link href="/profile-page">
            <Button className="m-2 truncate p-2 w-32">{address}</Button>
          </Link>
        </div>
      ) : null}
      {!isConnected
        ? connectors.map((connector) => (
            <Button key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
            </Button>
          ))
        : null}
      {error && <div>{error.message}</div>}
    </div>
  );
};
