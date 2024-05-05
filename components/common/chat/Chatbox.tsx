import React, { useContext, useEffect, useState } from "react";
import TabSwitch from "./TabSwitch";
import Image from "next/image";
import ChatRoom from "./ChatRoom";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Utils/firebase";
import { AuthContext } from "@/app/context/AuthContext";
import { ChatContext, ChatContextProps } from "@/app/context/ChatContext";
import ChatItem from "./ChatItem";

export default function Chatbox({ setChatOpen }: { setChatOpen: any }) {
  const [activeTab, setActiveTab] = useState("Parent");
  const [childEnrollData, setChildEnrollData] = useState<any>([]);
  const [educatorManagementData, setEducatorManagementData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([]);
  const [keySearch, setKeySearch] = useState<string>("");
  const [enableChatRoom, setEnableChatRoom] = useState<boolean>(false);
  const [online, setOnline] = useState<boolean>(false);
  const { currentUser, userData } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext) as ChatContextProps;

  const enrolledChildList = async () => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "parent"),
      where("uid", "!=", currentUser?.uid)
    );

    try {
      const querySnapshot = await getDocs(q);
      const parents: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const allChildren = parents
        .map((parent: any) =>
          (parent.child || [])
            .filter((child: any) => {
              if (userData?.role == "educator") {
                return (
                  child.dayCareId == userData.dayCareId &&
                  child.classroomId == userData.classroomId
                );
              } else if (userData?.role == "admin") {
                return child.dayCareId == userData.dayCareId;
              } else {
                return false;
              }
            })
            .map((child: any) => ({
              ...child,
              parentName: parent.firstName,
              parentUserId: parent.userId,
              parentUid: parent.uid,
              classroomName: parent?.classroomName,
              deviceToken: parent?.deviceToken,
            }))
        )
        .flat();

      for (const child of allChildren) {
        const newId = child.parentUserId + child?.uid;
        const combinedId =
          currentUser.uid > newId
            ? currentUser.uid + newId
            : newId + currentUser.uid;

        // Fetch the chat for this combination

        const unSub = onSnapshot(doc(db, "chats", combinedId), (docc) => {
          if (docc.exists()) {
            // Retrieve the last message from the messages array
            const messages = docc.data()?.messages || [];
            const lastMessage = messages[messages.length - 1];

            let unreadCount = 0;
            for (let i = messages.length - 1; i >= 0; i--) {
              const message = messages[i];

              if (
                message.senderId == child.parentUserId + child?.uid &&
                message.messageStatus == "unread"
              ) {
                unreadCount += 1;
              } else if (
                message.senderId == child.parentUserId + child?.uid &&
                message.messageStatus == "read"
              ) {
                // Stop counting if a read message is encountered
                break;
              }
            }

            if (lastMessage) {
              child.lastMessage = lastMessage;
            }
            child.unreadMessage = unreadCount;

            const sortedChilds = allChildren.sort((a: any, b: any) => {
              const timeA = a?.lastMessage?.date?.toDate() || 0;
              const timeB = b?.lastMessage?.date?.toDate() || 0;
              return timeB - timeA; // Sort in descending order (latest first)
            });

            setChildEnrollData(sortedChilds);

            // Update the state with the latest data
            setChildEnrollData((prevData: any) => {
              const index = prevData.findIndex(
                (item: any) => item.uid == child.uid
              );
              if (index != -1) {
                const newData = [...prevData];
                newData[index] = child;
                return newData;
              } else {
                return [...prevData, child];
              }
            });
          } else {
            const sortedChilds = allChildren.sort((a: any, b: any) => {
              const timeA = a?.lastMessage?.date?.toDate() || 0;
              const timeB = b?.lastMessage?.date?.toDate() || 0;
              return timeB - timeA; // Sort in descending order (latest first)
            });

            setChildEnrollData(sortedChilds);
          }
        });
      }

      // const sortedChilds = allChildren.sort((a: any, b: any) => {
      //   const timeA = a?.lastMessage?.date?.toDate() || 0;
      //   const timeB = b?.lastMessage?.date?.toDate() || 0;
      //   return timeB - timeA; // Sort in descending order (latest first)
      // });

      // setChildEnrollData(sortedChilds);
    } catch (err) {
      console.log(err);
    }
  };

  const getEducatorManagementlist = async () => {
    const q = query(
      collection(db, "users"),
      where("role", "in", ["educator", "admin"]),
      where("uid", "!=", currentUser?.uid)
    );

    try {
      const querySnapshot = await getDocs(q);
      const educators: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const particularEducator = educators.filter((e: any) => {
        return e.dayCareId == userData.dayCareId;
      });

      for (const educator of particularEducator) {
        const combinedId =
          currentUser.uid > educator.uid
            ? currentUser.uid + educator.uid
            : educator.uid + currentUser.uid;

        // Fetch the chat for this combination

        const unSub = onSnapshot(doc(db, "chats", combinedId), (docc) => {
          if (docc.exists()) {
            // Retrieve the last message from the messages array
            const messages = docc.data()?.messages || [];
            const lastMessage = messages[messages.length - 1];

            let unreadCount = 0;
            for (let i = messages.length - 1; i >= 0; i--) {
              const message = messages[i];

              if (
                message.senderId == educator.uid &&
                message.messageStatus == "unread"
              ) {
                unreadCount += 1;
              } else if (
                message.senderId == educator.uid &&
                message.messageStatus == "read"
              ) {
                // Stop counting if a read message is encountered
                break;
              }
            }

            if (lastMessage) {
              educator.lastMessage = lastMessage;
            }
            educator.unreadMessage = unreadCount;

            const sortedEducators = particularEducator.sort(
              (a: any, b: any) => {
                const timeA = a?.lastMessage?.date?.toDate() || 0;
                const timeB = b?.lastMessage?.date?.toDate() || 0;
                return timeB - timeA; // Sort in descending order (latest first)
              }
            );

            setEducatorManagementData(sortedEducators);

            // Update the state with the latest data
            setEducatorManagementData((prevData: any) => {
              const index = prevData.findIndex(
                (item: any) => item.id == educator.id
              );
              if (index != -1) {
                const newData = [...prevData];
                newData[index] = educator;
                return newData;
              } else {
                return [...prevData, educator];
              }
            });
          } else {
            const sortedEducators = particularEducator.sort(
              (a: any, b: any) => {
                const timeA = a?.lastMessage?.date?.toDate() || 0;
                const timeB = b?.lastMessage?.date?.toDate() || 0;
                return timeB - timeA; // Sort in descending order (latest first)
              }
            );

            setEducatorManagementData(sortedEducators);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = async (user: any) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
        await setDoc(chatDocRef, {
          combinedId,
          messages: [],
        });
      } else if (chatDoc.data()?.messages?.length < 1) {
        dispatch({
          type: "CHANGE_USER",
          payload: { ...user, userType: "educator" },
        });
      } else {
        const chatData = chatDoc.data();
        const messages = chatData?.messages || [];

        const lastMessage = messages[messages.length - 1];

        if (lastMessage?.senderId === currentUser.uid) {
          dispatch({
            type: "CHANGE_USER",
            payload: { ...user, userType: "educator" },
          });
          return;
        }

        if (
          lastMessage.senderId === user.uid &&
          lastMessage.messageStatus === "read"
        ) {
          dispatch({
            type: "CHANGE_USER",
            payload: { ...user, userType: "educator" },
          });
          return;
        }

        // If the last message is sent by the selected user, update the status to 'read'
        if (
          lastMessage.senderId === user.uid &&
          lastMessage.messageStatus === "unread"
        ) {
          messages[messages.length - 1].messageStatus = "read";
        }

        // Work backward from the second-to-last message and update the status
        for (let i = messages.length - 2; i >= 0; i--) {
          const message = messages[i];

          // If the senderId is the current user, terminate further updates
          if (message.senderId === currentUser.uid) {
            break;
          }

          if (
            message.senderId === user.uid &&
            message.messageStatus === "read"
          ) {
            break;
          }

          // If the senderId is the selected user, update the status to 'read'
          if (
            message.senderId === user.uid &&
            message.messageStatus === "unread"
          ) {
            messages[i].messageStatus = "read";
          }
        }

        // update the messages array in the chat document
        await updateDoc(chatDocRef, { messages });
      }

      // dispatch the change user action
      dispatch({
        type: "CHANGE_USER",
        payload: { ...user, userType: "educator" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleParentSelect = async (user: any) => {
    const newId = user?.parentUserId + user?.uid;
    const combinedId =
      currentUser.uid > newId
        ? currentUser.uid + newId
        : newId + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
        await setDoc(chatDocRef, {
          combinedId,
          messages: [],
        });
      } else if (chatDoc.data()?.messages?.length < 1) {
        dispatch({
          type: "CHANGE_PARENT",
          payload: { ...user, userType: "parent" },
        });
      } else {
        const chatData = chatDoc.data();
        const messages = chatData?.messages || [];

        const lastMessage = messages[messages.length - 1];

        if (lastMessage?.senderId === currentUser.uid) {
          dispatch({
            type: "CHANGE_PARENT",
            payload: { ...user, userType: "parent" },
          });
          return;
        }

        if (
          lastMessage.senderId === newId &&
          lastMessage.messageStatus === "read"
        ) {
          dispatch({
            type: "CHANGE_PARENT",
            payload: { ...user, userType: "parent" },
          });
          return;
        }

        // If the last message is sent by the selected user, update the status to 'read'
        if (
          lastMessage.senderId === newId &&
          lastMessage.messageStatus === "unread"
        ) {
          messages[messages.length - 1].messageStatus = "read";
        }

        // Work backward from the second-to-last message and update the status
        for (let i = messages.length - 2; i >= 0; i--) {
          const message = messages[i];

          // If the senderId is the current user, terminate further updates
          if (message.senderId === currentUser.uid) {
            break;
          }

          if (message.senderId === newId && message.messageStatus === "read") {
            break;
          }

          // If the senderId is the selected user, update the status to 'read'
          if (
            message.senderId === newId &&
            message.messageStatus === "unread"
          ) {
            messages[i].messageStatus = "read";
          }
        }

        // update the messages array in the chat document
        await updateDoc(chatDocRef, { messages });
      }

      // dispatch the change user action
      dispatch({
        type: "CHANGE_PARENT",
        payload: { ...user, userType: "parent" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchInput = () => {
    let filtered = [];
    if (activeTab === "Parent") {
      filtered = childEnrollData.filter((item: any) => {
        // Filter items whose names contain the search key
        return item?.parentName?.toLowerCase().includes(keySearch);
      });
    } else if (activeTab === "Staff") {
      filtered = educatorManagementData.filter((item: any) => {
        return item?.firstName?.toLowerCase().includes(keySearch);
      });
    }
    setSearchData(filtered); // Set the filtered data into the state
  };

  useEffect(() => {
    enrolledChildList();
    getEducatorManagementlist();
  }, []);

  useEffect(() => {
    handleSearchInput();
  }, [keySearch]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setKeySearch("");
    setSearchData([]);
  };
  const handleChatRoom = () => {
    setEnableChatRoom(true);
  };

  return (
    <div className="bg-[#008FDC] fixed right-10 bottom-1 z-40 w-[28%] h-4/5">
      {enableChatRoom ? (
        <ChatRoom setEnableChatRoom={setEnableChatRoom} />
      ) : (
        <div>
          <div className="w-full py-2">
            <TabSwitch
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              setChatOpen={setChatOpen}
            />
          </div>

          <div className="mx-3 bg-white">
            <div className="flex flex-col pt-3 mb-3">
              <input
                type="text"
                className="border border-[gray] rounded-md mx-2 py-2 pl-2"
                placeholder="Search here"
                value={keySearch}
                onChange={(e: any) =>
                  setKeySearch(e.target.value.toLowerCase())
                }
              />
            </div>

            <div className="overflow-y-scroll h-[28.7rem] chat-scroll">
              {activeTab === "Parent" && (
                <ChatItem
                  keySearch={keySearch}
                  searchData={searchData}
                  dataArr={childEnrollData}
                  handleSelect={handleParentSelect}
                  handleChatRoom={handleChatRoom}
                  type={activeTab}
                />
              )}

              {activeTab === "Staff" && (
                <ChatItem
                  keySearch={keySearch}
                  searchData={searchData}
                  dataArr={educatorManagementData}
                  handleSelect={handleSelect}
                  handleChatRoom={handleChatRoom}
                  type={activeTab}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
     .chat-scroll::-webkit-scrollbar {
        width: 4px;
    }
 
    .chat-scroll::-webkit-scrollbar-thumb {
        background-color: #DDDBDB;
        border-radius: 10px; 
    }
`}</style>
    </div>
  );
}
