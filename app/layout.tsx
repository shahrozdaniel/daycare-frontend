import React, { useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Navbar from "@/components/common/Navbar";
import StyledComponentsRegistry from "@/lib/registry";
import { GlobalContextProvider } from "./context/store";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Chat from "@/components/common/chat";
import { getAuthToken } from "@/components/common/Utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cooddle",
  description: "Daycare Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");

  return (
    <html lang="en">
      <body className={inter.className}>
      <GlobalContextProvider>
        <Navbar />
        <StyledComponentsRegistry>
        {children}
        </StyledComponentsRegistry>
      </GlobalContextProvider>
      </body>
    </html>
  );
}
