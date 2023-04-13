import React from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import Button from "./Button";
//import { Profile } from "./Profile";
const Profile = dynamic(() => import('./Profile').then((mod) => mod.Profile), {
  ssr: false,
});

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  className,
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
