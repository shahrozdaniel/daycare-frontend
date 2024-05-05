"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Send, Trash } from "lucide-react";
import { ChatContext, ChatContextProps } from "@/app/context/ChatContext";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from "../Utils/firebase";
import { AuthContext } from "@/app/context/AuthContext";
import { v4 as uuid } from "uuid";
import Message from "./ChatMessage";
import ChatMessage from "./ChatMessage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getToken } from "firebase/messaging";
export default function ChatRoom({
  setEnableChatRoom,
}: {
  setEnableChatRoom: (value: boolean) => void;
}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const { data, dispatch } = useContext(ChatContext) as ChatContextProps;
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);
  const handleSend = async () => {
    if ((text.trim() !== "" || file) && !loader) {
      setText("");
      // Get FCM token of the recipient
      const recipientFCMToken = data?.user?.deviceToken;
      // Update the messages in Firestore
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          messageId: uuid(),
          messageType: file !== "" ? "image" : "text",
          text,
          senderId: currentUser.uid,
          receiverId:
            data?.user?.userType === "parent"
              ? data?.user?.parentUserId + data?.user?.uid
              : data.user.uid,
          date: Timestamp.now(),
          file: file,
          messageStatus: "unread",
        }),
      });
      // Clear file-related state
      setFile("");
      setFileName("");
      // Check if recipient has an FCM token
      if (recipientFCMToken && data?.user?.userType === "parent") {
        // Send push notification
        //recipientFCMToken
        const notificationPayload = {
          to: recipientFCMToken,
          notification: {
            title: `You have a new message from ${currentUser?.displayName}`,
            body: ` ${file !== "" ? "image" : text}`,
          },
          data: {
            custom_key: ` ${file !== "" ? "image" : text}`,
          },
        };
        try {
          const response = await fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers: {
              Authorization:
                "key=AAAAJfwmICc:APA91bE5L2X6iZv2X654RQlwVXov_mxS_JQrBYAuAROZ7-MEByupdlEfYNOIG8J3uCYFZGT8iHSxJVWWU0A8rhFHSJjrlqJqG__CS_VJJ8QvrLMQtufkx98CP5P1bzHziOS_kljcWE6n",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationPayload),
          });
          const responseBody = await response.json();
          if (response.ok) {
            console.log(
              "Notification sent successfully:",
              response,
              responseBody
            );
          } else {
            console.error("Failed to send notification:", response);
          }
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileUpload = async (e: any) => {
    setLoader(true);
    const file = e.target.files[0];
    setFileName(file?.name);
    const storage = getStorage();
    const filePath = `images/${uuid()}_${file}`;
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file)
      .then(async (snapshot: any) => {
        const fileUrl = await getDownloadURL(snapshot.ref);
        setLoader(false);
        setFile(fileUrl);
      })
      .catch((error: any) => {
        console.error("Error uploading file:", error);
      });
  };
  const handleBack = () => {
    dispatch({ type: "RESET_STATE" });
  };
  return (
    <div>
      <div className="py-4 px-2 flex flex-row justify-between items-center">
        <p className="text-[16px] font-medium text-white capitalize">
          {data?.user?.userType === "parent"
            ? `${data?.user?.parentName}(${
                data?.user?.childName
              }) - (${data?.user?.classroomName?.trim()})`
            : data?.user?.firstName}
        </p>
        <Image
          src={"/svgs/chat-back.svg"}
          width={14}
          height={14}
          alt={"back"}
          className="cursor-pointer"
          onClick={() => {
            setEnableChatRoom(false);
            handleBack();
          }}
        />
      </div>
      <div className="mx-2 bg-white h-[32.5rem]">
        <ChatMessage
          chatData={messages}
          userData={data?.user}
          chatId={data?.chatId}
        />
        <div className="flex flex-col justify-center relative ">
          {/* {fileName !== "" && (
            <div className="absolute bottom-6 left-16 flex justify-center items-center">
              {" "}
              <div className="w-[12em] h-6 overflow-hidden">{fileName}</div>
              <Trash
                size={16}
                className="ml-5"
                style={{ color: "#008FDC" }}
                onClick={() => {
                  setFileName("");
                  setFile("");
                }}
              />
            </div>
          )} */}
          <div className="mx-3 my-3 py-2 flex bg-[#F0F0F0] justify-between items-center rounded-lg">
            <div
              className="w-5 h-5 rounded-full border border-[blue] flex justify-center items-center ml-2 mt-0.5 cursor-pointer"
              onClick={handleButtonClick}
            >
              <Plus color="blue" size={14} />
            </div>
            <input
              ref={(e) => {
                fileInputRef.current = e;
              }}
              type="file"
              onChange={handleFileUpload}
              onKeyDown={(e: any) => {
                if (e.key === "Enter" && !loader) {
                  handleSend();
                }
              }}
              className="hidden"
            />
            <input
              type="text"
              className="bg-[#F0F0F0] ml-2 w-[80%] outline-none"
              placeholder="Type message..."
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              ref={(e:any) => fileName && e?.focus()}
              value={text || fileName}
              onChange={(e: any) => {
                !fileName && setText(e.target.value);
              }}
            />
            <div className="mr-4">
              {fileName && (
                <Trash
                  size={16}
                  className=""
                  style={{ color: "#008FDC" }}
                  onClick={() => {
                    setFileName("");
                    setFile("");
                  }}
                />
              )}
            </div>
            {loader && (
              <Image
                src={"/svgs/loader.svg"}
                width={20}
                height={20}
                alt=""
                className="mr-2"
              />
            )}
            <button
              disabled={loader}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                loader ? "bg-gray-400" : "bg-[#00858E]"
              } mr-2`}
              onClick={handleSend}
            >
              <Image
                src={"/svgs/chat-send.svg"}
                width={14}
                height={14}
                alt={"send"}
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
