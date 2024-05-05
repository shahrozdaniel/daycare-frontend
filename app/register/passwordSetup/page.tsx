"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import {
  PasswordBody,
  setupPassword,
  verifyEmail,
} from "../components/api/passwordSetupApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordValidationSchema } from "../components/schema/passwordValidationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function PasswordSetup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showconfirmPassword);
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PasswordBody>({
    resolver: yupResolver(passwordValidationSchema),
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // console.log(searchParams?.get("token"), "searchParams");

  const router = useRouter();
  // form submit handler
  const onFormSubmit: SubmitHandler<PasswordBody> = async (
    data: PasswordBody
  ) => {
    let bodydata = {
      username: data.username.toLowerCase(),
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    const res = await setupPassword(bodydata, router, toast);
    console.log({ data });
  };

  const verifyEmailApi = async () => {
    const getToken = searchParams?.get("token");
    try {
      const res: any = await verifyEmail(router, getToken);
      return res;
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    verifyEmailApi();
  }, []);
  // useLayoutEffect(() => {
  //   verifyEmailApi();
  // }, [])
  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="h-screen bg-[#EEFCFC]  bg-contain"
      >
        <div className="flex flex-col justify-center items-center h-full p-5">
          <div className="bg-[#FFFFFF] [box-shadow:0px_8px_32px_0px_#00000014] flex flex-col items-center justify-center gap-7 rounded-3xl max-w-[583px]  w-full px-20 py-20">
            <span className="w-[330px] h-[38px] text-[30px] font-medium leading-[38px] tracking-normal text-center">
              Password Setup
            </span>
            <Separator />
            <div className="w-full">
              <div className="flex-col gap-y-5 w-full">
                <div className="flex flex-col gap-y-5">
                  <div className="relative">
                    <CustomInput
                      label=""
                      required={true}
                      type="text"
                      placeholder="Email"
                      name="username"
                      control={control}
                      className="w-full h-full"
                      register={register}
                      error={errors?.userName}
                    />
                    {/* <div className="absolute top-[25px] right-[15px] cursor-pointer ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[white]  px-5 py-5 ">
                            <ul className="password-info-tooltip">
                              <li>Password should be at least 8 characters</li>
                              <li>Password should contain at least a number</li>
                              <li>
                                Password should contain at least a lowercase
                                letter
                              </li>
                              <li>
                                Password should contain at least an uppercase
                                letter
                              </li>
                              <li>
                                Password should contain at least a special
                                character
                              </li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-col gap-y-5 mt-5">
                  <div className="relative">
                    <CustomInput
                      label=""
                      required={true}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      control={control}
                      className="w-full "
                      register={register}
                      error={errors?.password}
                    />
                    <div
                      className="absolute top-[20px] right-[15px] cursor-pointer"
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
                  <div className="relative">
                    <CustomInput
                      label=""
                      type={showconfirmPassword ? "text" : "password"}
                      required={true}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      control={control}
                      className="w-full h-full"
                      register={register}
                      error={errors?.confirmPassword}
                    />
                    <div
                      className="absolute top-[20px] right-[15px] cursor-pointer"
                      onClick={handleToggleConfirmPassword}
                    >
                      {showconfirmPassword ? (
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
                  <ul className="password-info-tooltip ml-5 text-sm">
                    <li>Password should be at least 8 characters</li>
                    <li>Password should contain at least a number</li>
                    <li>Password should contain at least a lowercase letter</li>
                    <li>
                      Password should contain at least an uppercase letter
                    </li>
                    <li>
                      Password should contain at least a special character
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#00858E] w-[328px] h-[48px] p-[8px] rounded-[6px]"
            >
              <span className="text-[16px] text-[#FFFFFF] font-medium leading-[24px] tracking-normal text-center">
                Confirm
              </span>
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
