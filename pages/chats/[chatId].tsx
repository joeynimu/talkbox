import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import profilePic from "public/images/joe-pic.jpg";
import backArrow from "public/back-arrow.svg";
import Image from "next/image";
import Link from "next/link";
import MicIcon from "public/mic-icon.svg";
import getTokenOrRefresh from "utils/token_util";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
import { data } from "data";

type Chat = {
  text: string;
  time_stamp: Date;
};

const SingleChat = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
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

  const setUpConfig = async () => {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    return new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
  };

  const onStartRecording = async () => {
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
          },
        ]);
      }
    };
  };

  const onStopRecording = async () => {
    if (recoInstance?.stopContinuousRecognitionAsync) {
      recoInstance.stopContinuousRecognitionAsync((err: any) => {
        if (err) {
          console.log({ err });
          return;
        }
        setIsRecording(false);
      });
    }
  };

  useEffect(() => {
    if (chatContainer?.current) {
      chatContainer.current.scroll({
        top: chatContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  const currChat = data.find(({ chat_id }) => chat_id === router.query.chatId);

  const sentChat = currChat.chats[0];

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
          <span className="pl-2">{currChat.sender_name}</span>
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
        {/* sender message */}
        <div
          className="px-4 py-1 flex flex-col"
          key={sentChat.sent_at.recent().toLocaleDateString()}
        >
          <div className="max-w-[85%] relative">
            <p className="text-sm bg-white rounded pt-2 pb-[1rem] px-3 shadow relative z-10">
              {sentChat.chat_text.sentence()}
            </p>
            <div className="float-right relative mt-[-24px] mb-[-5px] mr-[4px] z-40">
              <span className="text-xs  text-[#889A74]">
                {sentChat.sent_at.recent().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {chats.map(({ text, time_stamp }) => (
          <div
            className="px-4 py-1 flex items-end flex-col"
            key={time_stamp.toISOString()}
          >
            <div className="max-w-[85%] relative">
              <p className="text-sm bg-[#E4E9F0] rounded pt-2 pb-[1rem] px-3 shadow relative z-10">
                {text}
              </p>
              <div className="float-right relative mt-[-24px] mb-[-5px] mr-[4px] z-40">
                <span className="text-xs  text-[#889A74]">
                  {time_stamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}

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
                  className="bg-white h-[20px] w-[20px]"
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
