import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import Button from "./Button";

interface ProfileProps {
  ethAddress?: string;
  onClickConnect?: () => void;
  onClickDisconnect?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ ethAddress, onClickConnect, onClickDisconnect }) => {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (

    <div className="flex flex-row items-center justify-self-end">
      {address ? <div className="font-akkurat-bold text-sm w-32 truncate p-2">{address}</div> : null
      }
      {
        isConnected ?
          (
            <Button onClick={disconnect}>Disconnect</Button>
          ) : connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </Button>
          ))
      }
      {error && <div>{error.message}</div>}
    </div>

  );
}
