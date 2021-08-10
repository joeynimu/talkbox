import { useMemo, useState, useCallback } from "react";
import { Header } from "Components/Header";
import { ChatList } from "Components/Chats";
import SearchBox from "Components/Search/Search";
import data from "Data";
import Image from "next/image";
import MicIcon from "public/mic-icon.svg";
import PlusIcon from "public/plus-icon.svg";
import ContactSearch from "Components/ContactSearch/ContactSearch";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchView, setSearchView] = useState(false);
  const [isContactSearchView, setContactSearchView] = useState(false);
  const onSearchHide = useCallback(() => {
    setSearchView(false);
    setSearchText("");
  }, []);

  const onSearchShow = useCallback(() => setSearchView(true), []);
  const showContactsView = useCallback(() => setContactSearchView(true), []);
  const hideContactsView = useCallback(() => setContactSearchView(false), []);

  const memoizedData = useMemo(() => {
    if (!searchText) return data;
    return data.filter(({ sender_name }) =>
      sender_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [searchText]);
  const sortedData = useMemo(
    () =>
      memoizedData.sort((a, b) => {
        const prev = a.chats[0].sent_at;
        const next = b.chats[0].sent_at;
        return new Date(next).getTime() - new Date(prev).getTime();
      }),
    [memoizedData]
  );

  const handleSearchChange = useCallback(
    (e) => setSearchText(e.target.value),
    []
  );

  return (
    <div className="h-screen relative">
      {isContactSearchView && <ContactSearch onHide={hideContactsView} />}
      <Header onSearchShow={onSearchShow}>
        {isSearchView && (
          <div className="absolute top-0 left-0 w-full h-full px-4 z-50 flex items-center justify-center bg-white">
            <SearchBox
              searchText={searchText}
              onHide={onSearchHide}
              onHandleSearch={handleSearchChange}
            />
          </div>
        )}
      </Header>

      <div className="z-10 relative pb-4 h-[calc(100vh-68px)] mt-[68px]">
        {sortedData.length === 0 && (
          <p className="text-medium font-bold text-center py-4">
            No result(s) matching your search criteria :(
          </p>
        )}
        {sortedData.map(({ chats, chat_id, sender_name, sender_image }) => {
          const latestChat = chats[chats.length - 1];
          const { chat_text, sent_at } = latestChat;
          return (
            <ChatList
              senderName={sender_name}
              sentAt={sent_at}
              chatId={chat_id}
              text={chat_text}
              senderImage={sender_image}
              key={chat_id}
            />
          );
        })}
        <div
          className="fixed bottom-4 rounded-full bg-[#3E7FE0] flex items-center justify-center right-4 h-12 w-12 shadow cursor-pointer"
          title="New recording"
        >
          <Image
            src={MicIcon}
            alt="Start recording"
            className="fill-current"
            layout="fixed"
          />
          <div
            className="h-5 w-5 absolute bottom-[-2px] right-[-2px] bg-white rounded-full shadow-lg flex items-center justify-center"
            onClick={showContactsView}
          >
            <Image
              src={PlusIcon}
              alt="Start recording"
              className="fill-current absolute left-0 right-0 top-0 bottom-0 m-auto"
              height={10}
              width={10}
              layout="fixed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
