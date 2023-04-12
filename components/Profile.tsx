import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import Button from "./Button";

export function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
        {/* <div className="font-bookmania">
          {ensName ? `${ensName} (${address})` : address}
        </div> */}
        <div className="font-bookmania">Connected to {connector.name}</div>
        <Button onClick={disconnect}>Disconnect</Button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          // disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
