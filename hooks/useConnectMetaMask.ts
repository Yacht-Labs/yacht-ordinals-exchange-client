import { useState } from "react";

const useConnectMetaMask = () => {
  const [address, setAddress] = useState("");

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const chainId = parseInt(window.ethereum.chainId);
      if (chainId !== 1) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }], // 0x1 is the Ethereum Mainnet ID
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
    connectMetaMask,
    disconnectMetaMask,
  };
};

export default useConnectMetaMask;
