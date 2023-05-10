import React from "react";
import dynamic from "next/dynamic";
import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "./Button";
//import { Profile } from "./Profile";
const Profile = dynamic(() => import("./Profile").then((mod) => mod.Profile), {
  ssr: false,
});

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className="flex flex-row justify-between py-8 px-8">
      <Link href="/">
        <div className="flex space-x-3 focus:cursor: cursor-pointer">
          <img src="/Yacht_Logomark_White.png" className="h-16 md:h-20" />
          <div className="logo self-center font-archivo-narrow text-xl md:text-2xl">
            yacht.
          </div>
        </div>
      </Link>

      <Profile />
    </div>
  );
};
export default Header;
