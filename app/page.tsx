import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import Login from "./login/components/LoginForm";

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return <>
    <Login />
    <ToastContainer />
  </>
 
}
 