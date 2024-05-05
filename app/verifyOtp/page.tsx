"use client";

import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
// import { verifyOtp } from "./verifyOtpApi";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { verifyOtpApi } from "./components";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/common/Utils/firebase";
import { useParams } from "next/navigation";

const VerifyOtp = () => {
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<any>([
    null,
    null,
    null,
    null,
  ]);
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    const numericValue = value.replace(/[^0-9]/g, "");

    const newOtpValues = [...otpValues];
    newOtpValues[index] = numericValue;
    setOtpValues(newOtpValues);

    if (index < otpValues.length - 1 && numericValue !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      const newOtpValues = [...otpValues];

      if (newOtpValues[index] !== "") {
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);

        event.preventDefault();
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const isButtonDisabled = otpValues.some((value) => value === "");

  const handleVerify = async () => {
    // Convert the array of string digits to a single number
    const otpNumber = parseInt(otpValues.join(""), 10);
    let userName = params?.get("userName");
    console.log("this is otp number", otpNumber);

    const requestBody = {
      email: userName || "rjd1199@mailinator.com",
      otp: otpNumber.toString(),
    };

    try {
       // Set email to an empty string if it is undefined or null
      let res = await verifyOtpApi(requestBody);
      if (res.success) {
        window.localStorage.setItem("token", res?.token);
        if (res.details.roleDetails.roleName === "admin") {
          router.push("/adminDashboard");
        } else {
          router.push("/dashboard");
        }
        // router.push("/dashboard");
        toast.success(res.message);
        window.localStorage.setItem("userData", res);

        // signInWithEmailAndPassword(
        //   auth,
        //   userName.toLowerCase(),
        //   body.password
        // )
        //   .then((userCredential) => {
        //     const user = userCredential.user;
        //   })
        //   .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //   });
      }
    } catch (error) {
      console.error("Error while making API call:", error);
    }
  };

  return (
    <div>
      <main className="grid grid-cols-2 h-screen bg-[url('/images/Login.png')] bg-cover bg-left">
        <div className=""></div>
        <div className="flex flex-col items-center justify-center gap-7">
        <div className="bg-[#FFFFFF] [box-shadow:0px_8px_32px_0px_#00000014] flex flex-col items-center justify-evenly gap-6 p-16 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold mb-8">Enter your OTP</p>
            <div className="flex space-x-4">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleChange(index, event)}
                  onKeyDown={(event) => handleBackspace(index, event)}
                  ref={(inputRef:any) => (inputRefs.current[index] = inputRef)}
                  className="w-16 h-16 p-4 border border-gray-300 rounded text-center text-2xl focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
            <button
              className={`mt-8 px-6 py-3 class="flex bg-[#00858E] text-white rounded text-xl ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isButtonDisabled}
              onClick={handleVerify}
            >
              Verify OTP
            </button>
          </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default VerifyOtp;
