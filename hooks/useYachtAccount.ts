import React from "react";
import { YachtAccountContext } from "../context/YachtAccountContext";
import { YachtAccountContextData } from "../types/yoecTypes";

export const useYachtAccount = (): YachtAccountContextData | undefined => {
  const context = React.useContext(YachtAccountContext);

  if (context === null) {
    throw new Error("useAccount must be used within an AccountProvider");
  }

  return context;
};
