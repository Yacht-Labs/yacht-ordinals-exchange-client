import React from "react";

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
    <div className="flex flex-col px-8 py-8 justify-between">
      <div className="flex font-bookmania py-1 text-2xl">{`#${inscriptionNumber}`}</div>
      <div className="flex">
        <img
          src={`https://ordinals.com/content/${inscriptionId}`}
          className="h-72"
        />
      </div>
      <div className="flex font-akkurat-bold self-center py-4 text-xl">{`${ethPrice} Ξ`}</div>
    </div>
  );
};
export default OrdinalCard;
