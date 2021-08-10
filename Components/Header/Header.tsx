import Image from "next/image";
import { FC, ChangeEventHandler, SetStateAction } from "react";
import Link from "next/link";
import logo from "public/talkbox-logo.png";
import profilePic from "public/images/joe-pic.jpg";
import SearchBox from "Components/Search/Search";
import { useState } from "react";

const Header: FC<{
  searchText: string;
  onHandleSearchChange: (e: any) => void;
}> = ({ searchText, onHandleSearchChange }) => {
  const [isSearchView, setSearchView] = useState(false);
  const onSearchHide = () => setSearchView(false);
  const onSearchShow = () => setSearchView(true);
  return (
    <header className="fixed top-0  shadow py-3 px-4 bg-white z-40 w-full">
      <div className="flex items-center">
        <div className="w-1/2 flex items-center">
          <Link href="/">
            <a className="inline-flex items-center">
              <Image src={logo} alt="Talkbox logo" />
            </a>
          </Link>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          <span className="pr-4" onClick={onSearchShow}>
            <img src="/search-icon.svg" alt="search chats" />
          </span>
          <div className="relative">
            <Image
              src={profilePic}
              height={38}
              width={38}
              alt="Joe Ng'ethe"
              className="h-9 w-9 rounded-full"
            />
            <span className="bg-green-500 h-3 w-3 rounded-full absolute bottom-1 right-0 border-2 border-white"></span>
          </div>
        </div>
      </div>
      {isSearchView && (
        <SearchBox
          searchText={searchText}
          onHide={onSearchHide}
          onHandleSearch={onHandleSearchChange}
        />
      )}
    </header>
  );
};

export default Header;
