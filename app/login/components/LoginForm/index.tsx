"use client";
import { ApiInstance } from "@/utils/ApiInstance";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { loginuser } from "../LoginApi";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "@/app/context/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/components/common/Utils/firebase";
import useFcmToken from "@/components/common/chat/getToken";
// import ReCAPTCHA from "react-google-recaptcha";
import { collection, doc, updateDoc } from "firebase/firestore";
const Login = () => {
  const [userName, setusername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<object>({});
  const [showPassword, setShowPassword] = useState(false);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  let errorobj = {
    UserName: `User Name can't be empty`,
    Password: `Password can't be empty`,
  };
  const router = useRouter();
  const handnleLogin = async () => {
		setLoader(true);
		router.push("/adminDashboard");
    // try {
    //   if (userName == "" || password == "") {
    //     setError(errorobj);
    //   } else {
    //     let body = {
    //       userName: userName.toLowerCase(),
    //       password: password,
    //     };
    //     let res = await loginuser(body);
    //     if (res.success) {
    //       console.log("inside the res");
    //       signInWithEmailAndPassword(
    //         auth,
    //         userName.toLowerCase(),
    //         body.password
    //       )
    //         .then((userCredential) => {
    //           const user = userCredential.user;
    //           if (fcmToken) {
    //             const usersCollection = collection(db, "users");
    //             const userDoc = doc(usersCollection, user.uid);
    //             updateDoc(userDoc, {
    //               deviceToken: fcmToken,
    //             });
    //           }
    //         })
    //         .catch((error) => {
    //           const errorCode = error.code;
    //           const errorMessage = error.message;
    //         });
    //       if (res.message == "otp has been sent.") {
    //         router.push(`/verifyOtp?userName=${userName.toLowerCase()}`);
    //         return;
    //       }
    //       window.localStorage.setItem("token", res?.token);
    //       if (res.details.roleDetails.roleName === "admin") {
    //         router.push("/adminDashboard");
    //       } else {
    //         router.push("/dashboard");
    //       }
    //       // router.push("/dashboard");
    //       setTimeout(()=>{
    //         toast.success(res.message);
    //       },500)
    //       window.localStorage.setItem("userData", res);
    //     }
    //   }
    //   setLoader(false);
    // } catch (err: any) {
    //   toast.error(err.response.data.error);
    //   console.log(err, "err");
    // }
    setLoader(false);
  };
  const handleRecaptchaChange = (value:any) => {
    // You can use the value in your form submission logic
    console.log("reCAPTCHA value:", value);
  };
  return (
    <div>
      <main className="grid grid-cols-2 h-screen bg-[url('/images/login2.jpg')] bg-cover bg-left">
        <div className=""></div>
        <div className="flex flex-col items-center justify-center gap-7">
          <div className="bg-[#FFFFFF] [box-shadow:0px_8px_32px_0px_#00000014] flex flex-col items-center justify-evenly gap-6  p-16 p- rounded-xl">
            <Image
              src={"/images/coodle.png"}
              height="50"
              width="170"
              alt="coodle image"
            />
            <span className="w-[316px] h-[38px] top-[352px] left-[870px] text-[30px] font-medium leading-[38px] tracking-normal text-right ">
              Login to your account
            </span>
            <div className="flex flex-col">
              {/* <label className="block text-sm font-medium text-gray-700 mb-2 text-left w-full">
                Email
              </label> */}
              <input
                className="w-[328px] h-[56px]  rounded-[20px] bg-[#F5F5F5] p-4"
                placeholder="Enter Email"
                name="username"
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              {/* <label className="block text-sm font-medium text-gray-700 mb-2 text-left w-full">
                Enter Password
              </label> */}
              <div className="relative">
                <input
                  className="w-[328px] h-[56px]  rounded-[20px] bg-[#F5F5F5] p-4"
                  placeholder="Enter Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute top-[15px] right-[15px] cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
            {/* <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleRecaptchaChange}
            /> */}
            <Link href={"/resetPassword"}>
              <p className="text-[#3A70E2] font-sans text-[14px] leading-[22px] tracking-normal text-left">
                Forgot Password?
              </p>
            </Link>
            <button
              className="bg-[#00858E] w-[328px] h-[48px] top-[697px] left-[868px] p-[8px] rounded-[6px]"
              onClick={handnleLogin}
            >
              {loader? <span className="loader_button"></span>:<span className="text-[16px] text-[#FFFFFF] font-medium leading-[24px] tracking-normal text-center">
                Login
              </span>}
            </button>
            <Link href={"/register"}>
              <p className="text-[#3A70E2] font-sans text-[14px] leading-[22px] tracking-normal text-left">
                {`Don't have an account? Register`}
              </p>
            </Link>
          </div>
        </div>
      </main>
      {/* <ToastContainer /> */}
    </div>
  );
};
export default Login;
