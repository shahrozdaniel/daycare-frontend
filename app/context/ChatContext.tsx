"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export interface ChatContextProps {
  data: {
    chatId: string;
    user: any;
  };
  dispatch: React.Dispatch<any>;
}

export const ChatContext = createContext<ChatContextProps | undefined>(
  undefined
);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  type ActionType = "CHANGE_USER" | "CHANGE_PARENT" | "RESET_STATE";

  interface ChangeUserAction {
    type: ActionType;
    payload: any;
  }

  const chatReducer = (
    state: typeof INITIAL_STATE,
    action: ChangeUserAction
  ) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid && action.payload.uid
              ? currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
              : state.chatId,
        };

      case "CHANGE_PARENT":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid && action.payload.parentUserId + action.payload.uid
              ? currentUser.uid >
                action.payload.parentUserId + action.payload.uid
                ? currentUser.uid +
                  (action.payload.parentUserId + action.payload.uid)
                : action.payload.parentUserId +
                  action.payload.uid +
                  currentUser.uid
              : state.chatId,
        };

      case "RESET_STATE":
        return INITIAL_STATE;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};