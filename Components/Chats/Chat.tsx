import { FC } from "react";

type Props = {
  sentAt: Date;
  chatText: string;
  senderId: string;
};

const Chat: FC<Props> = ({ sentAt, chatText, senderId }) => (
  <div
    className={`px-4 py-1 flex flex-col ${senderId === "you" && "items-end"}`}
    key={sentAt.toLocaleDateString()}
  >
    <div className="max-w-[85%] relative">
      <p
        className={`text-sm rounded pt-2 pb-[1rem] px-3 shadow relative z-10 ${
          senderId === "you" ? "bg-[#E4E9F0]" : "bg-white"
        }`}
      >
        {chatText}
      </p>
      <div className="float-right relative mt-[-24px] mb-[-5px] mr-[4px] z-40">
        <span className="text-xs  text-[#889A74]">
          {new Date(sentAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  </div>
);

export default Chat;
