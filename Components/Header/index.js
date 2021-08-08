import Image from "next/image";
import Link from "next/link";
import logo from "public/talkbox-logo.png";
import profilePic from "public/images/joe-pic.jpg";

const Header = () => {
  return (
    <header className="fixed top-0 flex items-center shadow py-3 px-4 bg-white z-50 w-full">
      <div className="w-1/2 flex items-center">
        <Link href="/">
          <a className="inline-flex items-center">
            <Image src={logo} alt="Talkbox logo" />
          </a>
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-end">
        <span className="pr-4">
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
    </header>
  );
};

export default Header;
