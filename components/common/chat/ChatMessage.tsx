import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { AuthContext } from "@/app/context/AuthContext";
import { ChatContext } from "@/app/context/ChatContext";
export default function ChatMessage({
  chatData,
  userData,
  chatId,
}: {
  chatData: any;
  userData: any;
  chatId: string;
}) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext) as any;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  return (
    <div className="h-[85%] overflow-scroll message-scroll pt-2">
      {chatData.length > 0 &&
        chatData?.map((chat: any, index: number) => {
          return (
            <div key={index} ref={ref}>
              {chat.senderId !== currentUser?.uid ? (
                <div className="flex items-start py-1 gap-2 mx-1 ">
                  <div className="relative">
                    <Image
                      src={
                        userData?.userType == "parent"
                          ? userData?.photo
                            ? userData?.photo
                            : "/svgs/no-image.svg"
                          : userData?.photoURL
                          ? userData?.photoURL
                          : "/svgs/no-image.svg"
                      }
                      width={20}
                      height={20}
                      alt={"profile"}
                      className="w-[20px] h-[20px] rounded-full object-cover mt-2"
                    />
                    {/* <div
                      className={`absolute top-5 right-0 w-2 h-2 rounded-full border-2 border-[white] ${
                        chat?.isOnline ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div> */}
                  </div>
                  {chat.file && (
                    <Image
                      src={chat.file}
                      width={100}
                      height={100}
                      alt="file"
                      className="rounded-b-lg rounded-r-lg"
                    />
                  )}
                  {chat.text && (
                    <p
                      className={`max-w-[70%] border rounded-b-lg rounded-r-lg bg-[#F1F6FA] px-3 py-1 text-[#4C4C4C] text-[14px] font-sans break-words `}
                    >
                      {chat.text}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex justify-end py-1 gap-1 mx-2 relative">
                  {chat.file && (
                    <Image
                      src={chat.file}
                      width={200}
                      height={100}
                      alt="file"
                      className="rounded-b-lg rounded-l-lg"
                    />
                  )}
                  {chat.text && (
                    <p
                      className={`max-w-[70%] border rounded-b-lg rounded-l-lg bg-[#00858e] py-2 pl-3 pr-6  text-[white] text-[14px] font-sans break-words`}
                    >
                      {chat.text}
                      {chat?.messageStatus === "read" ? (
                        <Image
                          src={"/svgs/message-read-icon.svg"}
                          width={16}
                          height={16}
                          alt={"double-tick"}
                          className="absolute bottom-2 right-1"
                        />
                      ) : (
                        <Image
                          src={"/svgs/message-sent-icon.svg"}
                          width={16}
                          height={16}
                          alt={"single-tick"}
                          className="absolute bottom-2 right-1"
                        />
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      <style>{`
     .message-scroll::-webkit-scrollbar {
       display:none;
       
    }
 
   
`}</style>
    </div>
  );
}