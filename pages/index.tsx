import Header from "Components/Header";
import { ChatList } from "Components/Chats";
import { data } from "data";

const App = () => {
  return (
    <div className="h-screen relative">
      <Header />
      <div className="z-10 relative">
        {data.map(({ chats, chat_id, sender_name, sender_image }) => {
          const latestChat = chats[chats.length - 1];
          const { chat_text, sent_at } = latestChat;
          return (
            <div key={chat_id}>
              <ChatList
                senderName={sender_name}
                sentAt={sent_at}
                chatId={chat_id}
                text={chat_text}
                senderImage={sender_image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
