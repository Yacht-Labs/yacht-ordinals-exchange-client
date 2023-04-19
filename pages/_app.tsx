import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { client } from "../hooks/useWagmi";
import { YachtAccountProvider } from "../context/YachtAccountContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <YachtAccountProvider>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </YachtAccountProvider>
  );
}

export default MyApp;
