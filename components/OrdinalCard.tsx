import React from "react";
import Button from "./Button";

interface OrdinalCardProps {
  className?: string;
  inscriptionNumber: string;
  ethPrice: string;
  inscriptionId: string;
  sendInscriptionTouched: (inscriptionId: string) => void;
  isOwnedByMe: boolean;
}

const OrdinalCard: React.FC<OrdinalCardProps> = ({
  className,
  inscriptionNumber,
  ethPrice,
  inscriptionId,
  sendInscriptionTouched,
  isOwnedByMe
}) => {
  return (
    <div className="flex flex-col px-8 py-8 justify-between bg-slate-300 rounded">
      <div className="flex font-bookmania py-1 text-2xl">{`#${inscriptionNumber}`}</div>
      <div className="flex">
        <img
          src={`https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionId}/content`}
          className="h-72"
        />
      </div>
      <div className="flex font-akkurat-bold self-center py-4 text-xl">{`${ethPrice} Ξ`}</div>
      {isOwnedByMe ? (<Button className="w-32" onClick={() => sendInscriptionTouched(inscriptionId)}>Send Inscription to PKP</Button>) : null}
    </div>
  );
};
export default OrdinalCard;
