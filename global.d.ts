// global.d.ts
declare global {
  interface Window {
    ethereum: any; // You can replace 'any' with a more specific type if you know the exact shape of the ethereum object
    unisat: Unisat;
  }

  const unisat: Unisat;
}

interface Unisat {
  requestAccounts(): Promise<string[]>;
  getAccounts(): Promise<string[]>;
  getNetwork(): Promise<string>;
  switchNetwork(network: string): Promise<void>;
  getPublicKey(): Promise<string>;
  getBalance(): Promise<{
    confirmed: number;
    unconfirmed: number;
    total: number;
  }>;
  getInscriptions(
    cursor: number,
    size: number
  ): Promise<{
    total: number;
    list: Inscription[];
  }>;
  sendBitcoin(
    toAddress: string,
    satoshis: number,
    options?: { feeRate?: number }
  ): Promise<string>;
  sendInscription(
    address: string,
    inscriptionId: string,
    options?: object
  ): Promise<{ txid: string }>;
  signMessage(msg: string, address?: string): Promise<string>;
  pushTx(options: { rawtx: string }): Promise<string>;
  signPsbt(psbtHex: string): Promise<string>;
  pushPsbt(psbtHex: string): Promise<string>;
  on(event: "accountsChanged", handler: (accounts: string[]) => void): void;
  removeListener(
    event: "accountsChanged",
    handler: (accounts: string[]) => void
  ): void;
  on(event: "networkChanged", handler: (network: string) => void): void;
  removeListener(
    event: "networkChanged",
    handler: (network: string) => void
  ): void;
}

interface Inscription {
  inscriptionId: string;
  inscriptionNumber: number;
  address: string;
  outputValue: number;
  preview: string;
  content: string;
  contentLength: number;
  contentType: string;
  timestamp: number;
  genesisTransaction: string;
  location: string;
  output: string;
  offset: number;
}

// This line is required to let TypeScript know that we're augmenting the global 'Window' type
export {};
