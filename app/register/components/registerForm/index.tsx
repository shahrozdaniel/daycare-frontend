"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  RegisterUserBody,
  classroomCategory,
  philosophyID,
  programID,
  registerUser,
} from "../api/RegisterApi";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../schema/registrationValidationSchema";
import { setupPassword } from "../api/passwordSetupApi";
import Link from "next/link";
import { programTypeAll } from "@/app/childRegistration/childregestrationAPI";
import Button from "@/components/common/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DaysComponent from "@/app/daycareManagement/components/DaysComponent";
import ResponsiveDaysComponent from "../ResponsiveDaysComponent";
import { Checkbox } from "@/components/ui/checkbox";
import {
  convertTo24HourFormat,
  formatCardValidity,
  formatPhoneNumber,
  splitCreditCardNumber,
} from "@/utils/utilityFunctions";
import Icon from "@/public/svgs/icons";
import Image from "next/image";
import DaysComponent from "@/app/daycareManagement/components/DaysComponent";
import { get_Country_State_city } from "@/services/UtilityApis";
export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(registerValidationSchema),
  });

  const [programId, setProgramId] =
    useState<{ value: string; label: string }[]>();

  const [philosophyId, setPhilosophyId] =
    useState<{ value: string; label: string }[]>();
  const [phoneNo, setPhoneNo] = useState<any>("");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [error, setError] = useState<any>({});
  const [availabilityval, setAvailabilityValue] = useState<any>(
    {
      "All days(Mon-Fri)": [
        { hour: "0", minute: "00", meridian: "AM" },
        { hour: "0", minute: "00", meridian: "PM" },
      ],
    }
  );
 
  const [countrylist, setCountrylist] = useState<any>([])
  const [timeZone, setTimeZone] = useState<any>([])
  const [timeZoneData, setTimeZonedata] = useState<any>([
    { value: "", label: "Select Time zone" },
  ]);
  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("phoneNo"));
    formattedNumber && setValue("phoneNo", formattedNumber);
  }, [watch("phoneNo")]);
  useEffect(() => {
    const formattedCard = formatCardValidity(watch("expiration"));
    formattedCard && setValue("expiration", formattedCard);
  }, [watch("expiration")]);
  const router = useRouter();
  //   generating all days working days data 
  function generateSchedule(data: any) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const schedule: any = {};

    days.forEach(day => {
      schedule[day] = data
    });

    return schedule;
  }

 
  const onFormSubmit: SubmitHandler<RegisterUserBody> = async (
    data: RegisterUserBody
  ) => {
    // setError({}); // Reset errors at the beginning
    // let updatedError: any = [];
    // Validate AM and PM in availabilityval
    // Object.keys(availabilityval).forEach((key) => {
    //   const value = availabilityval[key];

    //   if (
    //     value[0].hour === "0" &&
    //     value[0].minute === "00" &&
    //     value[0].meridian === "AM"
    //   ) {
    //     updatedError[key] = value;
    //   }
    //   if (
    //     value[1].hour === "0" &&
    //     value[1].minute === "00" &&
    //     value[1].meridian === "PM"
    //   ) {
    //     updatedError[key] = value;
    //   }
    // });

    // setError(updatedError);

    // if (Object.keys(updatedError).length === 0) {
    //   // Continue with form submission if there are no errors
    //   const convertedData: any = {};
    //   for (const day in availabilityval) {
    //     const timings = availabilityval[day].map((time: any) =>
    //       convertTo24HourFormat(time.hour, time.minute, time.meridian)
    //     );
    //     convertedData[day] = timings;
    //   }
    // }

    let databody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      phoneNo: data?.phoneNo,
      centerName: data.centerName,
      programType: data.programType,
      userName: data.userName,
      philosophyId: data.philosophyId,
      workingDays: isChecked ? generateSchedule(availabilityval?.["All days(Mon-Fri)"]) : availabilityval,
      country: data?.country,
      time_zone: data?.time_zone,
      dateFormat: "dd/mm/yyyy"
    };
    const res = await registerUser(databody, router, toast);
  };

  const programApi = async () => {
    try {
      const res: any = await programID();
      let options = (res?.data?.data as any[])?.map((item: any) => ({
        value: item.programTypeId,
        label: item.programName,
      }));
      options = [{ value: "", label: "Select program type" }, ...options];
      setProgramId(options);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const philosphyApi = async () => {
    try {
      const res: any = await philosophyID();
      let options = (res?.data?.data?.philosophyMasterList as any[])?.map(
        (item: any) => ({
          value: item.philosophy_id,
          label: item.name,
        })
      );
      options = [{ value: "", label: "Select philosophy type" }, ...options];
      setPhilosophyId(options);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    programApi();
    philosphyApi();
  }, []);
  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("phoneNo"));
    formattedNumber && setValue("phoneNo", formattedNumber);
  }, [watch("phoneNo")]);

  const number = watch("cardNumber");
  useEffect(() => {
    const val = parseInt(number, 10);
    if (typeof val === "number") {
      const value = splitCreditCardNumber(number);
      setValue("cardNumber", value);
    } else {
      setValue("cardNumber", "");
    }
  }, [number]);

  const RegisterProfile = [
    {
      icon: "laptop",
      title: "Real-Time Communication",
    },
    {
      icon: "bus",
      title: "safe Arrival System",
    },
    {
      icon: "bell",
      title: "Timely Alerts $ Reports",
    },
    {
      icon: "homeSettings",
      title: "Center Planning & Forecasting",
    },
    {
      icon: "complianceRegister",
      title: "compliance Management",
    },
    {
      icon: "step",
      title: "Info Chips",
    },
    {
      icon: "chatSpace",
      title: "Chat Space Integration",
    },
    {
      icon: "HealthScreening",
      title: "Health Screening",
    },
    {
      icon: "whiteLabel",
      title: "White Label",
    },
  ];
  const getCountry = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      setTimeZone(resData);
      let Data: any = [{ value: "", label: "Country" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setCountrylist(Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountry()
  }, [])

  let countryId = watch('country')
  useEffect(() => {
    let TimeZone: any = [{ value: "", label: "Select Time zone" },];
    if (timeZone && countryId) {
      let filterData = timeZone?.filter((timeZoneList: any) => {
        return timeZoneList?.id == countryId;
      });
      let data = filterData?.[0]?.timezones;
      // TimeZone.push({value:"Asia/Kolkata",label:"Asia/Kolkata"})
      data?.map((ele: any) => {
        TimeZone?.push({ value: ele?.zoneName, label: ele?.zoneName });
      });
      setTimeZonedata(TimeZone);
    }
  }, [countryId, timeZone]);

  return (
    <div className="bg-[#ECF2F4] px-14 py-8 h-screen w-screen">
      <div className="w-full h-full grid grid-cols-2 overflow-hidden rounded-2xl [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px]">
        <div className="bg-[#fdf6da] flex items-center flex-col py-8 px-8 gap-6 hide-scroll overflow-y-auto">
          <p className="text-center font-sans text-neutral-900 antialiased font-semibold text-[1.25rem] lg:text-2xl xl:text-3xl">
            Say Hello! To Hassle-free <br />
            Parenting and Childcare with
          </p>
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-center items-center">
              <Icon type={"cooddleLogo"} />
            </div>
            <p className="font-sans antialiased text-sm lg:text-md xl:text-lg font-light text-neutral-800 text-center">
              {/* Features in free trial include: */}
              Experience our platform risk-free with <br />a complimentary
              30-day trial period.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center gap-6 max-w-[500px]">
            {/* <div className="flex flex-wrap justify-center "> */}
            {RegisterProfile.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3.5 w-28"
                >
                  <div className="flex justify-center items-center bg-white rounded-lg [box-shadow:0px_0px_10px_3px_#00000014] w-16 h-16 md:w-20 md:h-20">
                    <Icon type={item.icon} />
                  </div>
                  <div className="text-center font-sans capitalize leading-tight text-xs md:text-sm font-medium text-neutral-900">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full h-full bg-white [box-shadow:0px_0px_20px_2px_#BBCFE9] overflow-y-auto px-10 py-6 gap-8">
          <p className="text-xl font-medium text-[#4B4B4B]">User Signup</p>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col flex-1 gap-6"
          >
            {/* <span className="w-[330px] h-[38px] text-[30px] font-medium leading-[38px] tracking-normal text-center">
                  Register your Daycare
                </span> */}
            {/* <Separator /> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-4 w-full">
              <CustomInput
                label=""
                required
                type="text"
                placeholder="Username"
                name="userName"
                control={control}
                className="w-full h-full"
                register={register}
                error={errors?.userName}
              />
              <CustomInput
                label=""
                required
                type="text"
                placeholder="First Name"
                name="firstName"
                control={control}
                className="w-full h-full"
                register={register}
                error={errors?.firstName}
              />
              <CustomInput
                label=""
                type="text"
                required
                name="lastName"
                placeholder="Last Name"
                control={control}
                className="w-full h-full"
                register={register}
                error={errors?.lastName}
              />
              <CustomInput
                label=""
                type="email"
                name="email"
                required
                placeholder="Work Email"
                control={control}
                className="w-full h-full"
                register={register}
                error={errors?.email}
              />
              <CustomInput
                label=""
                type="text"
                name="phoneNo"
                required
                placeholder="Phone No."
                control={control}
                className="w-full h-full"
                register={register}
                error={errors?.phoneNo}
              />
              {/* <CustomInput
                    required
                    label=""
                    type="text"
                    placeholder="Phone Number"
                    name="lastName"
                    control={control}
                    onChange={(e: any) =>
                      setPhoneNo(formatPhoneNumber(e?.target?.value))
                    }
                    value={phoneNo}
                  /> */}
              <CustomInput
                label=""
                type="text"
                required
                name="centerName"
                placeholder="Center Name"
                control={control}
                className="w-full h-full"
                register={register}
                error={errors?.centerName}
              />

              <CustomSelect
                name="programType"
                label="Program Type"
                options={programId || []}
                control={control}
                required
                register={register}
                error={errors?.programType}
              />

              <CustomSelect
                name="philosophyId"
                label="Philosophy Type"
                options={philosophyId || []}
                control={control}
                required
                register={register}
                error={errors?.philosophyId}
              />
              <CustomSelect
                name="country"
                label="Country"
                options={countrylist}
                control={control}
                register={register}
                required
                error={errors?.country}
              />
              <CustomSelect
                name="time_zone"
                label="Time Zone"
                options={timeZoneData}
                control={control}
                register={register}
                disabled={countryId ? false : true}
                required
                error={errors?.time_zone}
              />
            </div>
            {/* <div className="grid grid-cols-2 gap-[24px] w-full mt-[24px] mb-[24px]">
            <div> */}
            {/* <label>program type</label> */}
            {/* </div>
            <div> */}
            {/* <label>framework type</label> */}
            {/* </div>
          </div> */}
            {/* <div
                className="grid grid-cols-1 gap-2 mb-[20px]"
                style={{
                  height: "100%",
                  minHeight: "140px",
                }}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="pl-4 pb-2 text-[18px] font-medium ">
                    Working Days
                  </div>
                  <div className="grid grid-cols-6 gap-3  text-[#a4a4a4] text-[16px]">
                    <div className="flex gap-2 items-center col-span-2">
                      <p>All days(Mon-Fri)</p>
                      <Checkbox
                        id="terms"
                        checked={isChecked}
                        onClick={() => {
                          setIsChecked(!isChecked);
                          setAvailabilityValue([]);
                        }}
                      />
                    </div>
                    <div className="col-span-2 ">Start Time</div>
                    <div className="col-span-2 text-enter">End Time</div>
                  </div>
                </div>
                <DaysComponent
                  control={control}
                  value={availabilityval}
                  setValue={setAvailabilityValue}
                  state={isChecked}
                  error={error}
                  setError={setError}
                />
              </div> */}
            <div className="flex flex-col flex-1">
              <p className="text-xl font-medium text-[#4B4B4B] mb-6">
                Working Days
              </p>
              <div className="grid grid-cols-6 gap-3  text-[#a4a4a4] text-[16px] w-full">
                <div className="flex gap-2 items-center col-span-6 xl:col-span-2">
                  <p className="text-center text-sm">All days (Mon-Fri)</p>

                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onClick={() => {
                      setIsChecked(!isChecked);
                      setAvailabilityValue([]);
                    }}
                  />
                </div>
                <div className="col-span-2 text-sm hidden xl:block">Start Time</div>
                <div className="col-span-2 text-center text-sm mr-14 hidden xl:block">
                  End Time
                </div>
              </div>
              <ResponsiveDaysComponent
                control={control}
                value={availabilityval}
                setValue={setAvailabilityValue}
                state={isChecked}
                error={error}
                setError={setError}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xl font-medium text-[#4B4B4B]">
                Credit Card Details{" "}
              </p>
              <p
                className={
                  "font-sans text-[#6e6f6ea7] text-xs leading-relaxed text-justify font-normal"
                }
              >
                Experience Without Obligation: We understand the importance of
                trust and transparency. That&apos;s why we only ask for your
                credit card details to start your free trial – no charges until
                the trial ends. Your information is guarded with the highest
                security standards and will only be used according to our strict
                privacy policy. Dive into our platform worry-free, explore its
                full potential, and see for yourself why we&apos;re the right
                choice for you. Plus, you can cancel anytime hassle-free.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-4 w-full mt-4 mb-6">
              <div>
                {/* <label>program type</label> */}
                <CustomInput
                  label=""
                  required
                  type="text"
                  placeholder="Name"
                  name="name"
                  control={control}
                  className="w-full h-full"
                  register={register}
                  error={errors?.name}
                />
              </div>
              <div>
                <CustomInput
                  label=""
                  required
                  type="text"
                  placeholder="Credit Card Number"
                  name="cardNumber"
                  control={control}
                  className="w-full h-full"
                  register={register}
                  error={errors?.cardNumber}
                />
              </div>

              <div>
                {/* <label>program type</label> */}
                <CustomInput
                  label="Expiration Date"
                  required
                  type="text"
                  placeholder="Expiration Date"
                  name="expiration"
                  control={control}
                  className="w-full h-full"
                  register={register}
                  error={errors?.expiration}
                />
              </div>
              <div>
                <CustomInput
                  label=""
                  required
                  type="number"
                  placeholder="CVV"
                  name="cvv"
                  control={control}
                  className="w-full h-full"
                  register={register}
                  error={errors?.cvv}
                />
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-[24px] w-full mt-[24px] mb-[24px]">
          
          
        </div> */}
            <div className="flex justify-end self-end gap-4 mt-2 mb-4">
              <Link href={"/"}>
                {" "}
                <Button
                  form="blue"
                  type="button"
                  className="text-[16px] text-[#FFFFFF] font-medium leading-[24px] tracking-normal text-center"
                >
                  Cancel
                </Button>{" "}
              </Link>
              <Button
                form="blue"
                type="submit"
                className="text-[16px] text-[#FFFFFF] font-medium leading-[24px] tracking-normal text-center flex gap-2 items-center"
              >
                Save
              </Button>
            </div>
          </form>
          <style>{`
      .hide-scroll::-webkit-scrollbar {
        display: none;
      }`}</style>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
