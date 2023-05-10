import React from "react";
import Button from "./Button";

interface OrdinalCardProps {
  className?: string;
  inscriptionNumber: string;
  ethPrice: string;
  inscriptionId: string;
}

const OrdinalCard: React.FC<OrdinalCardProps> = ({
  className,
  inscriptionNumber,
  ethPrice,
  inscriptionId,
}) => {
  return (
    <div className="flex flex-col ordcard px-8 py-8 justify-between rounded">
      <div className="flex bodytext font-archivo-narrow py-1 text-2xl">{`#${inscriptionNumber}`}</div>
      <div className="flex">
        <img
          src={`https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionId}/content`}
          className="h-72"
        />
      </div>
      <div className="flex bodytext font-akkurat-bold self-center py-4 text-xl">{`${ethPrice} Ξ`}</div>
    </div>
  );
};
export default OrdinalCard;
