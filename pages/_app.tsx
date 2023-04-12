import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { client } from "../hooks/useWagmi";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
