export interface OrdinalListing {
  id: string;
  inscriptionNumber: string;
  ethPrice: string;
  inscriptionId: string;
  pkpPublicKey: string;
  pkpBtcAddress: string;
  status: string;
  buyerAccountId: string;
  buyerAccount: YachtAccount;
}
export interface YachtAccount {
  id: string;
  ethAddress: string;
  createdAt: Date;
  btcPayoutAddress?: string;
}

export interface YachtAccountContextData {
  yachtAccount: YachtAccount | null;
  setYachtAccount: React.Dispatch<React.SetStateAction<YachtAccount | null>>;
}

export interface YachtAccountProviderProps {
  children: React.ReactNode;
}

export interface BuyPageProps {
  id: string;
}

export interface WithdrawPageProps {
  id: string;
}
