import Image from "next/image";
import { FC, useEffect, useRef } from "react";

import backArrow from "public/back-arrow.svg";

const SearchBox: FC<{
  searchText: string;
  onHide: () => void;
  onHandleSearch: () => void;
}> = ({ searchText, onHide, onHandleSearch }) => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full px-4 z-50 flex items-center justify-center bg-white">
      <div className="flex items-center justify-center w-full">
        <div className="w-6 mr-2" onClick={onHide}>
          <Image src={backArrow} alt="Back" />
        </div>
        <div className="w-[calc(100%-24px)]">
          <input
            ref={inputRef}
            placeholder="Search for by the sender's name..."
            onChange={onHandleSearch}
            value={searchText}
            className="w-full py-2 pl-4 border rounded focus:border-blue-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
