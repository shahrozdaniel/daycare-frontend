"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/components/common/Utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextProps {
  currentUser: any;
  userData: any;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  userData: null,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        setUserData(userDoc.data() as any);
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};