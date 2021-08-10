import { useState, useCallback, useMemo } from "react";
import SearchBox from "Components/Search/Search";
import Link from "next/link";
import Image from "next/image";
import data from "Data";

const ContactSearch = ({ onHide }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = useCallback(
    (e) => setSearchText(e.target.value),
    []
  );
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter(({ sender_name }) =>
      sender_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [searchText]);
  return (
    <div className="bg-white fixed w-full h-screen z-50 top-0 left-0 overflow-scroll">
      <div className="py-4 fixed top-0 w-full shadow bg-white z-50 px-4">
        <SearchBox
          searchText={searchText}
          onHide={onHide}
          placeHolderText="Search contacts..."
          onHandleSearch={handleSearchChange}
        />
      </div>
      <div className="h-[calc(100vh-68px)] pt-[68px] px-4">
        <h1 className="font-bold pt-3">Contacts List</h1>
        {filteredData.length === 0 && (
          <p className="font-medium text-center py-4">
            No contact found with that name :(
          </p>
        )}
        <ul>
          {filteredData.map(({ sender_image, sender_name, chat_id }) => (
            <li
              key={chat_id}
              className="flex py-2 w-full border-b border-opacity-60 hover:bg-gray-200 hover:bg-opacity-30 items-center"
            >
              <div className="mr-2 w-[38px] h-[38px]">
                <Link
                  href={{
                    pathname: `chat/${chat_id}`,
                    query: { hasChat: false },
                  }}
                >
                  <a>
                    <Image
                      src={sender_image}
                      alt={sender_name}
                      width={38}
                      height={38}
                      className="rounded-full"
                    />
                  </a>
                </Link>
              </div>
              <div className="font-medium">
                <Link
                  href={{
                    pathname: `chat/${chat_id}`,
                    query: { hasChat: false },
                  }}
                >
                  <a>{sender_name}</a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactSearch;
