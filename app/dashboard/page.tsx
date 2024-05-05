import React from "react";
import { MainPageContainer } from "./mainPage.styled";
import UserTable from "../daycareManagement/components/UserTable";
import Navbar from "@/components/common/Navbar";
import { User, columns } from "../daycareManagement/coulmns";
import DashboardComponent from "./components";
import { ToastContainer } from "react-toastify";
export default function Page() {
  return (
    <>
      <DashboardComponent />
      <ToastContainer />
    </>
  );
}
