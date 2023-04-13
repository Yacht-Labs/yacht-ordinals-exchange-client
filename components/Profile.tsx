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


      {
        isConnected && address ?
          (
            <div className="flex flex-col items-center">
              <Button key={"disconnect"} onClick={disconnect}>Disconnect</Button>
              <div className="text-xs truncate w-24">{address}</div>
            </div>
          ) : null}
      {!isConnected ? connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </Button>

      )) : null}
      {error && <div>{error.message}</div>}


    </div>

  );
}
