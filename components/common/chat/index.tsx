"use client";

import { useContext, useEffect, useState } from "react";
import Chatbox from "./Chatbox";
import Image from "next/image";
import { AuthContext } from "@/app/context/AuthContext";
import { XIcon } from "lucide-react";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "../Utils/firebase";

export default function Chat() {
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [pushNotification, setPushNotification] = useState<boolean>(false);
  const [notificationContent, setNotificationContent] = useState<any>("");

  const { currentUser } = useContext(AuthContext);
  function showNotification(title: string, body: string) {
    const options = {
      body: body,
      requireInteraction: false,
      onclick: () => {},
    };
    new Notification(title, options);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(app);
      const unsubscribe = onMessage(messaging, (payload: any) => {
        setNotificationContent(payload.notification);
        setPushNotification(true);
        if (Notification.permission === "granted") {
          showNotification(
            payload.notification.title,
            payload.notification.body
          );
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    if (pushNotification) {
      const timeout = setTimeout(() => {
        setPushNotification(false);
        setNotificationContent("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [pushNotification]);

  if (!currentUser) {
    return null;
  }
  const data = "2";
  console.log(notificationContent);

  return (
    <>
      {chatOpen && (
        <div className="fixed right-10 bottom-2 z-10 w-1/5 h-4/5">
          <Chatbox setChatOpen={setChatOpen} />
        </div>
      )}
      {!chatOpen && (
        <div
          className="fixed right-2 bottom-5 z-10 cursor-pointer"
          onClick={() => setChatOpen(true)}
        >
          <Image
            src={"/svgs/chat-icon.svg"}
            width={72}
            height={72}
            alt="chat"
          />
          {/* <div className="absolute top-10 left-10 text-[18px] bg-white rounded-full w-6 h-6 flex justify-center items-center border-2 border-[white] text-[green] font-semibold">
            {data}
          </div> */}
        </div>
      )}

      {/* {!pushNotification && !notificationContent && !chatOpen && (
        <>
          <div className="fixed right-2 bottom-24 z-[12] w-1/4 h-1/5  bg-[#008FDC] rounded-lg ">
            <div className="flex justify-between px-3 py-2">
              <p className="capitalize text-[16px] w-[90%]  break-words">
                {" "}
                {notificationContent?.title}
              </p>
              <XIcon
                color="white"
                className="cursor-pointer"
                onClick={() => {
                  setPushNotification(false);
                  setNotificationContent("");
                }}
              />
            </div>
            <div className="text-[16px] text-white p-2">
              {notificationContent?.body}
            </div>
          </div>
        </>
      )} */}
    </>
  );
}
