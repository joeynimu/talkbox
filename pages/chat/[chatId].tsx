import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import backArrow from "public/back-arrow.svg";
import Image from "next/image";
import Link from "next/link";
import MicIcon from "public/mic-icon.svg";
import getTokenOrRefresh from "Utils/token_util";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
import data from "Data";
import { Chat } from "Components/Chats";
import faker from "faker";
import { GetStaticProps, GetStaticPaths } from "next";

type Chat = {
  text: string;
  time_stamp: Date;
  sender_id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map(({ chat_id }) => ({
    params: { chatId: chat_id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      data,
    },
  };
};

const SingleChat = ({ data }) => {
  const router = useRouter();
  const currChat = data.find(({ chat_id }) => chat_id === router.query.chatId);
  const sentChat = currChat?.chats[0];
  const initialChat: Chat = {
    text: sentChat?.chat_text || "Hey there!",
    sender_id: "friend",
    time_stamp: sentChat?.sent_at || new Date(),
  };

  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState("Online");
  const [chats, setChats] = useState<Chat[] | []>([]);
  const [recoInstance, setRecoInstance] = useState(null);
  const chatContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    const getToken = async () => {
      const tokenRes = await getTokenOrRefresh();
      if (tokenRes.authToken === null) {
      }
    };
    getToken();
  }, []);

  const hasChat = router?.query?.hasChat?.toString() || "false";

  useEffect(() => {
    if (hasChat === "true") {
      setChats([initialChat]);
    }
  }, [hasChat]);

  const setUpConfig = useCallback(async () => {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    return new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
  }, []);

  const onStartRecording = useCallback(async () => {
    const recognizer = await setUpConfig();
    setRecoInstance(recognizer);
    recognizer.startContinuousRecognitionAsync(function (err) {
      if (err) {
        console.log({ err });
        return;
      }
      setIsRecording(true);
    });

    recognizer.recognized = function (s, e) {
      if (e?.result?.text) {
        setChats((prev) => [
          ...prev,
          {
            text: e.result.text,
            time_stamp: new Date(),
            sender_id: "you",
          },
        ]);
      }
    };
  }, []);

  const onStopRecording = useCallback(async () => {
    if (recoInstance?.stopContinuousRecognitionAsync) {
      await recoInstance.stopContinuousRecognitionAsync((err: any) => {
        if (err) {
          console.log({ err });
          return;
        }
        setIsRecording(false);
      });

      setTimeout(() => {
        setStatusText("Recording...");
        setTimeout(
          () =>
            setChats((prev) => [
              ...prev,
              {
                sender_id: "friend",
                text: faker.lorem.sentence(),
                time_stamp: new Date(),
              },
            ]),
          5000
        );

        setTimeout(() => setStatusText("Online"), 3000);
      }, 2000);
    }
  }, [recoInstance]);

  useEffect(() => {
    if (chatContainer?.current) {
      chatContainer.current.scroll({
        top: chatContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  return (
    <div className="h-screen">
      <div className="w-full shadow px-4 py-3 flex items-center sticky top-0 z-50 bg-white">
        <div className="flex items-center w-2/3">
          <span className="mr-2">
            <Link href="/">
              <a>
                <Image src={backArrow} alt="back" />
              </a>
            </Link>
          </span>
          <Image
            src={currChat.sender_image}
            alt={currChat.sender_name}
            layout="fixed"
            height={38}
            width={38}
            className="rounded-full"
          />
          <div className="pl-2">
            <span>{currChat.sender_name}</span>
            <span className="text-xs block">{statusText}</span>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <div className="flex flex-col">
            <span className="bg-gray-400 h-1 w-1 rounded-full mb-1" />
            <span className="bg-gray-400 h-1 w-1 rounded-full mb-1" />
            <span className="bg-gray-400 h-1 w-1 rounded-full" />
          </div>
        </div>
      </div>

      <div
        className="bg-[#EFEDED] h-[calc(100vh-132px)] relative z-10 overflow-scroll py-4"
        ref={chatContainer}
      >
        {chats.length === 0 && (
          <p className="text-center text-sm px-4 py-2 text-[#889A74] bg-[#E4E9F0] mx-4">
            This is the beginning of a conversation with{" "}
            <span className="font-medium">{currChat.sender_name}</span>. Start a
            conversation with them by pressing the record button below.
          </p>
        )}
        {chats.map(({ text, time_stamp, sender_id }, index: number) => {
          const sentDate = new Date(time_stamp);
          return (
            <Chat
              chatText={text}
              sentAt={sentDate}
              senderId={sender_id}
              key={index}
            />
          );
        })}

        <div className="fixed w-full bottom-0 h-[70px] text-center bg-white shadow flex items-center justify-center">
          <div>
            <button
              className={`rounded-full flex items-center justify-center text-white h-12 w-12 ${
                isRecording ? "bg-[#EC3724]" : "bg-[#3E7FE0]"
              }`}
            >
              {!isRecording ? (
                <Image
                  src={MicIcon}
                  alt="Start recording"
                  className="fill-current"
                  layout="fixed"
                  onClick={onStartRecording}
                />
              ) : (
                <span
                  className="bg-white h-[20px] w-[20px] animate-pulse"
                  onClick={onStopRecording}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
