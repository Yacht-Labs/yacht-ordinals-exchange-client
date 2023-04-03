import { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

const useConnectMetaMask = () => {
  useEffect(() => {
    (async () => {
      const ethereumProvider = await detectEthereumProvider();
      setProvider(ethereumProvider);
    })();
  }, []);

  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const chainId = parseInt(window.ethereum.chainId);
      if (chainId !== 80001) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x13881" }], // 0x1 is the Ethereum Mainnet ID
          });
        } catch (error) {
          console.error("Error switching Ethereum network:", error);
          return;
        }
      }

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Provider = new ethers.providers.Web3Provider(provider);
        setSigner(web3Provider.getSigner());
        setAddress(accounts[0]);
        console.log("Ethereum address:", accounts[0]);
      } catch (error) {
        console.error("Error connecting MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  const disconnectMetaMask = () => {
    setAddress("");
  };

  return {
    address,
    provider,
    signer,
    connectMetaMask,
    disconnectMetaMask,
  };
};

export default useConnectMetaMask;
