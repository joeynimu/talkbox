import Image from "next/image";
import { FC } from "react";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export type ChatProps = {
  chatId: number | string;
  senderName: string;
  senderImage: string;
  sentAt: any;
  text: any;
};

const ChatList: FC<ChatProps> = ({
  chatId,
  senderName,
  sentAt,
  text,
  senderImage,
}) => {
  return (
    <div className="flex px-4 py-3 w-full border-b border-opacity-60 hover:bg-gray-200 hover:bg-opacity-30">
      <div>
        <Link href={`/chats/${chatId}`}>
          <a>
            <div className="mr-2 w-[38px] h-[38px]">
              <Image
                src={senderImage}
                alt="User name"
                width={38}
                height={38}
                layout="fixed"
                className="rounded-full"
              />
            </div>
          </a>
        </Link>
      </div>
      <div className="w-[calc(100%-40px)]">
        <Link href={`/chats/${chatId}`}>
          <a>
            <div className="relative">
              <p className="font-medium text-base">{senderName}</p>
              <span className="absolute top-1 right-0 text-xs">
                <ReactTimeAgo date={new Date(sentAt.past())} />
              </span>
            </div>
            <p className="text-sm max-w-full truncate">{text.paragraph()}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ChatList;
