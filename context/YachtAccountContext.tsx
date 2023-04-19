import React, { useState } from "react";
import {
  YachtAccount,
  YachtAccountContextData,
  YachtAccountProviderProps,
} from "../types/yoecTypes";

export const YachtAccountContext = React.createContext<
  YachtAccountContextData | undefined
>(undefined);

export const YachtAccountProvider: React.FC<YachtAccountProviderProps> = ({
  children,
}) => {
  const [yachtAccount, setYachtAccount] = useState<YachtAccount | null>(null);
  const value = { yachtAccount, setYachtAccount };

  return (
    <YachtAccountContext.Provider value={value}>
      {children}
    </YachtAccountContext.Provider>
  );
};
