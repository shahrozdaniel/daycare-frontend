"use client";
import { useContext, useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "../Utils/firebase";
import { AuthContext } from "@/app/context/AuthContext";
const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(app);
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BJq2VSP-3KOYuiCMZuG7zivexQCwOFnSnu1WUGgBeuBEnJl8iPyiufmVqU7rvikQsjR3eos0tYV-Nr4X-hfnUC4",
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };
    retrieveToken();
  }, []);
  return { fcmToken: token, notificationPermissionStatus };
};
export default useFcmToken;
