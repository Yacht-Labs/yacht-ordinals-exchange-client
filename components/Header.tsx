import React from "react";
import Link from "next/link";
import Button from "./Button";
import { Profile } from "./Profile";
import { Suspense } from "react";
interface HeaderProps {
  className?: string;
  ethAddress?: string;
  onClickConnect?: () => void;
  onClickDisconnect?: () => void;
}


const Header: React.FC<HeaderProps> = ({
  className,
  ethAddress,
  onClickConnect,
  onClickDisconnect,
}) => {
  return (

    <div className="flex flex-row justify-between py-8 px-8">
      <Link href="/">
        <div className="flex space-x-3 focus:cursor: cursor-pointer">
          <img src="/YachtLogo.svg" className="h-16 md:h-20" />
          <span className="self-center font-bookmania text-xl pl-2 md:text-2xl">
            Yacht Ordinal Exchange
          </span>
        </div>
      </Link>

      <Profile />

    </div>

  );
};
export default Header;
