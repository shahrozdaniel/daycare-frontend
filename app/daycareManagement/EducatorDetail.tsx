import React, { useEffect, useLayoutEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { classroomlist } from "../classroomManagement/classroomManagentAPI";
import { get_Country_State_city } from "@/services/UtilityApis";
import { GENDER_TYPE } from "../Dropdowns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ChevronLeft } from "lucide-react";
import { formatPhoneNumber } from "@/utils/utilityFunctions";

interface EducatorDetailsProps {
  control: any; // or use proper type for control based on your setup
  register: any;
  watch?: any;
  classroomData: {
    value: string;
    label: string;
  }[];
  citylist: {
    value: string;
    label: string;
  }[];
  statelist: {
    value: string;
    label: string;
  }[];
  countrylist: {
    value: string;
    label: string;
  }[];
  setClassroomData: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  setCitylist: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  setStatelist: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  setCountrylist: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;

  errors?: any;
  setValue?:any;
}

const EducatorDetails: React.FC<EducatorDetailsProps> = ({
  control,
  register,
  classroomData,
  setClassroomData,
  citylist,
  statelist,
  countrylist,
  setCitylist,
  setStatelist,
  setCountrylist,
  watch,
  errors,
  setValue
}) => {
  const router = useRouter();
  // const [classroomData, setClassroomData] = useState<
  //   { value: string; label: string }[]
  // >([]);
  // const [countrylist, setCountrylist] = useState<any>([
  //   { value: "", label: "Country" },
  // ]);
  // const [Statelist, setStatelist] = useState<any>([
  //   { value: "", label: "Province" },
  // ]);
  // const [citylist, setCitylist] = useState<any>([
  //   { value: "", label: "City" },
  // ]);

  //  codes  of List Country & State
  let countryCode = watch("country");
  let stateCode = watch("state");
  let CityCode = watch("city");

  // console.log('countryCode',countryCode)
  // console.log('StateCode',stateCode)
  // console.log('CityCode',CityCode)

  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        const newArray = res?.data?.list.map((item: any, index: number) => ({
          label: item.classroomName,
          value: item.classroomId,
        }));
        const newArrayWithSelect = [
          { value: "", label: "Select classroom" },
          ...newArray,
        ];

        setClassroomData(newArrayWithSelect);
        // setclassroomData(res?.data?.list);
        // setPgination(res?.['data']?.['pagination'])
      }
      // console.log(res);
    } catch (error) {}
  };

  // useLayoutEffect(() => {
  //   getclassroomlist();
  // }, []);

  //  get Country Data
  const getCountry = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      if (res?.success) {
        const newArray = res?.data?.result.map((item: any, index: number) => ({
          value: item.id,
          label: item.name,
        }));
        const newArrayWithSelectCountry = [
          { value: "", label: "Select Country" },
          ...newArray,
        ];
        setCountrylist(newArrayWithSelectCountry);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Get  State Data
  const getState = async () => {
    let body = {
      country: countryCode,
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "Province" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setStatelist(Data);
    } catch (error) {
      console.log(error);
    }
  };
  //  get City Data
  const getCity = async () => {
    let body = {
      country: countryCode,
      state: stateCode,
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "City" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setCitylist(Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getclassroomlist();
    getCountry();
  }, []);
  useEffect(() => {
    if (countryCode) {
      getState();
    }
    if (stateCode) {
      getCity();
    }
  }, [countryCode, stateCode]);


  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("number"));
    formattedNumber && setValue("number", formattedNumber);
  }, [watch("number")]);
  return (
    <>
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/educator-detail.svg"}
            alt="Logo"
            width={30}
            height={30}
            className="w-[2.24538rem] h-[2.25rem] object-contain"
          />
          <h1 className="text-center text-[1.875rem] p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            {"Educator's Personal Details"}
          </h1>
        </div>
        <div className="flex items-center absolute left-2 top-0 cursor-pointer" onClick={()=>router.back()}>
        <ChevronLeft color="#4B4B4B" />
        <div className="text-[1.25rem] p-2 text-[#4B4B4B] font-sans font-[500]">
          Back
      </div>
      </div>
      </div>

      <section className="">
        <div className="mx-auto w-fit flex flex-col items-center justify-center mb-8 mt-4">
          <ImageUpload control={control} name="image" />
        </div>
        <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex gap-3 w-full">
              <CustomInput
                className="bg-[#FBF9F4]"
                label=""
                type="text"
                placeholder="First Name"
                name="firstName"
                control={control}
                register={register}
                required={true}
                error={errors.firstName}
              />
              <CustomInput
                className="bg-[#FBF9F4]"
                label=""
                type="text"
                placeholder="Last Name"
                name="lastName"
                control={control}
                register={register}
                required={true}
                error={errors.lastName}
              />
            </div>
            <div className="flex gap-3 w-full">
              <CustomInput
                className="w-full p-3"
                label=""
                type="email"
                placeholder="Email Address"
                name="email"
                control={control}
                divclass="w-full"
                register={register}
                required={true}
                error={errors.email}
              />
              <CustomInput
                className="w-full p-3"
                label=""
                type="text"
                placeholder="Phone Number"
                name="number"
                control={control}
                required
                divclass="w-full"
                register={register}
                error={errors?.number}
              />
            </div>
            <div className="flex gap-3 w-full">
              <CustomInput
                className="w-full p-3"
                label=""
                type="date"
                placeholder="Date of birth"
                name="dob"
                max={moment().format("YYYY-MM-DD")}
                control={control}
                divclass="w-full"
                required
                register={register}
                error={errors?.dob}
              />
              {/* <CustomSelect
                name="gender"
                label="Gender"
                options={GENDER_TYPE}
                control={control}
                register={register}
                error={errors?.gender}
              /> */}
              <div className="w-full">
                {" "}
                <CustomSelect
                  name="gender"
                  label="Gender"
                  required
                  options={GENDER_TYPE}
                  control={control}
                  register={register}
                  error={errors?.gender}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
              Address:
            </div>
            <CustomInput
              className="w-full p-3"
              label="Address line 1 "
              type="text"
              placeholder="Address Line 1"
              name="addressLine1"
              control={control}
              divclass="w-full"
              register={register}
              required={true}
              error={errors.addressLine1}
            />
            <CustomInput
              className="w-full p-3"
              label="Address line 2 "
              type="text"
              placeholder="Address Line 2"
              name="addressLine2"
              control={control}
              divclass="w-full"
              register={register}
            />
            <div className="flex gap-3 w-full">
              <div className="flex-col w-full">
                <CustomSelect
                  className="w-full"
                  label="Country"
                  name="country"
                  control={control}
                  register={register}
                  options={countrylist}
                  required={true}
                  error={errors.country}
                />
              </div>
              <div className="flex-col w-full">
                <CustomSelect
                  className="w-full "
                  name="state"
                  label="Province"
                  control={control}
                  register={register}
                  options={statelist}
                  required={true}
                  error={errors.state}
                />
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="flex-col w-full">
                <CustomSelect
                  className="w-full "
                  name="city"
                  label="City"
                  control={control}
                  register={register}
                  options={citylist}
                  required={true}
                  error={errors.city}
                />
              </div>
              <CustomInput
                className="w-full p-3"
                label="Postal Code"
                type="text"
                placeholder="Postal Code"
                name="pincode"
                control={control}
                divclass="w-full"
                register={register}
                required={true}
                error={errors.pincode}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="mt-3 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
              Assign Classroom:
            </div>
            <div className="flex gap-3 w-full">
              {/* <CustomSelect
                name="location"
                label="Location"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  // Add more options as needed
                ]}
                control={control}
              /> */}
              <div className="w-full">
                {" "}
                <CustomSelect
                  name="classroom"
                  label="Classroom"
                  options={classroomData}
                  control={control}
                  register={register}
                  required={true}
                  error={errors.classroom}
                />
              </div>
            </div>
          </div>

          {/* <div className=" flex flex-col gap-2">
            <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
              Assign Role:
            </div>
            <div className="flex gap-3 ">
              <CustomSelect
                name="role"
                label="Role"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  // Add more options as needed
                ]}
                control={control}
              />
            </div>
          </div> */}
        </div>
      </section>
      {/* <Button>Next</Button> */}
    </>
  );
};

export default EducatorDetails;
