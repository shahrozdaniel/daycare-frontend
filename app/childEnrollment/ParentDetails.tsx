import React, { useState, useEffect } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import { get_Country_State_city } from "@/services/UtilityApis";
import { GENDER_TYPE } from "../Dropdowns";
import Image from "next/image";
import { TwoInputContainer } from "../reports/Common.styled";
import { formatPhoneNumber } from "@/utils/utilityFunctions";
interface Parent {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  preferred_name: string;
  phone_no: string;
  alternate_phone_no: any;
  gender: string;
  email: string;
  address_id: number;
  relation: string;
  occupation: string;
  is_custodian: boolean;
  language: any;
  is_primary: any;
  is_emergency_contact: any;
  is_pickup_authorized: any;
  is_active: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  address: Address;
}
interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: any;
  lattitude: any;
  created_at: string;
  updated_at: string;
}
interface ParentDetailsProps {
  control: any;
  data: Parent[];
}

const ParentDetails = ({
  control,
  data,
  register,
  setValue,
  countrylists,
  statelists,
  citylists,
  countrylist2s,
  statelist2s,
  citylist2s,
  // setIsCustodian,
  // isCustodian,
  watch,
  errors,
  setisCustdion,
  custudian,
}: any) => {
  const options = [
    { value: "option1", label: "Yes" },
    { value: "option2", label: "No" },
    { value: "option3", label: "Not required" },
  ];

  let custodianRelation = [
    { value: "", label: "Select Relation to Child" },
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Others", label: "Others" },
    // Add more options as needed
  ];

  let normalRelation = [
    { value: "", label: "Select Relation to Child" },
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    // Add more options as needed
  ];
  const [countrylist, setCountrylist] = countrylists;
  const [statelist, setStatelist] = statelists;
  const [citylist, setCitylist] = citylists;
  const [statelist2, setStatelist2] = statelist2s;
  const [citylist2, setCitylist2] = citylist2s;

  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("parent1Contact"));
    formattedNumber && setValue("parent1Contact", formattedNumber);
  }, [watch("parent1Contact")]);
  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("parent2Contact"));
    formattedNumber && setValue("parent2Contact", formattedNumber);
  }, [watch("parent2Contact")]);

  useEffect(() => {
    const setParentValues = (parentData: any, parentIndex: number) => {
      const parentKey = `parent${parentIndex + 1}`;
      const parentValues = {
        [`${parentKey}FirstName`]: parentData.first_name,
        [`${parentKey}LastName`]: parentData.last_name,
        [`${parentKey}PreferredName`]: parentData.preferred_name,
        [`${parentKey}Occupation`]: parentData.occupation,
        [`${parentKey}Relation`]: parentData.relation,
        [`${parentKey}Contact`]: parentData.phone_no,
        [`${parentKey}Email`]: parentData.email,
        [`${parentKey}Gender`]: parentData.gender,
        [`${parentKey}AddressId`]: parentData.address_id,
        [`${parentKey}Id`]: parentData.id,
      };
      const parentAddress = parentData.address || {};

      Object.assign(parentValues, {
        [`${parentKey}Street`]: parentAddress.street,
        // [`${parentKey}City`]: parentAddress.city,
        [`${parentKey}State`]: parentAddress.state,
        [`${parentKey}PinCode`]: parentAddress.postal_code,
        [`${parentKey}Country`]: parentAddress.country,
        [`${parentKey}AddressLine1`]: parentAddress.address_line_1,
        [`${parentKey}AddressLine2`]: parentAddress.address_line_2,
      });
      return parentValues;
    };

    if (data) {
      setisCustdion(data?.[0]?.is_custodian);
      const parentValues = data
        ?.filter((item: any) => !item.is_emergency_contact)
        .map((parent: any, index: any) => setParentValues(parent, index));
      const allValues = {
        ...(parentValues || []).reduce(
          (acc: any, curr: any) => ({ ...acc, ...curr }),
          {}
        ),
      };
      Object.entries(allValues).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
    getCountryStateList({ country: "", state: "" }, setCountrylist);
  }, [data]);

  useEffect(() => {
    const setParentValues = (parentData: any, parentIndex: number) => {
      const parentKey = `parent${parentIndex + 1}`;
      const parentAddress = parentData.address || {};
      const parentValues = {
        [`${parentKey}City`]: parentAddress.city,
      };

      return parentValues;
    };

    if (data && citylist) {
      const parentValues = data
        ?.filter((item: any) => !item.is_emergency_contact)
        .map((parent: any, index: any) => setParentValues(parent, index));
      console.log("parent values", parentValues);
      const allValues = {
        ...(parentValues || []).reduce(
          (acc: any, curr: any) => ({ ...acc, ...curr }),
          {}
        ),
      };
      console.log("all values", allValues);
      Object.entries(allValues).forEach(([key, value]) => {
        console.log("jey value", key, value);
        setValue(key, value);
      });
    }
  }, [data, citylists]);

  console.log("city lists", citylist2);

  console.log("data,dat", data);
  const getCountryStateList = async (body: any, setValues: any) => {
    try {
      let res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      if (body.country === "" && body.state === "") {
        setValues(Data);
      } else if (body.country && body.state === "") {
        setValues(Data);
      } else {
        setValues(Data);
      }
      Data = [];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryStateList(
      { country: watch("parent1Country"), state: "" },
      setStatelist
    );
    getCountryStateList(
      { country: watch("parent1Country"), state: watch("parent1State") },
      setCitylist
    );
  }, [watch("parent1Country"), watch("parent1State")]);
  useEffect(() => {
    if (watch("parent2Country")) {
      getCountryStateList(
        { country: watch("parent2Country"), state: "" },
        setStatelist2
      );
    }
    if (watch("parent2Country") && watch("parent2State")) {
      getCountryStateList(
        { country: watch("parent2Country"), state: watch("parent2State") },
        setCitylist2
      );
    }
  }, [watch("parent2Country"), watch("parent2State")]);
  console.log("errors", errors);
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/Vector-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Parent Details
          </h1>
        </div>
      </div>
      <section className="w-full">
        <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-8 mt-4">
          <h2>Is this a custodian case ?:</h2>
          <div className="flex flex-row gap-5">
            <input
              type="radio"
              name="parentIsCustodian"
              onChange={(e: any) => setisCustdion(true)}
              checked={custudian}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="parentIsCustodian"
              onChange={(e: any) => setisCustdion(false)}
              checked={!custudian}
            />
            <label>No</label>
            {/* <input
              type="radio"
              name="parentIsCustodian"
              onChange={(e: any) => setisCustdion(null)}
              checked={custudian === null ? true : false}
            />
            <label>Not required</label> */}
          </div>
        </div>
        {/* <div className="flex flex-start justify-center">
          {" "}
          <DocumentUpload
            name="doc"
            label="Upload Document"
            control={control}
            className="flex"
          />
        </div> */}
        {/* {data &&
          data.length > 0 &&
          data?.map((info: Parent, index: number) => (
            <div key={index} className="px-25 w-full flex flex-col ">
              <span className="px-[17%] mb-4">
                Parent {index + 1} Personal Details :
              </span>
              <div className="flex items-center justify-center gap-4 mt-4 w-full">
                <div className="w-4/12 flex flex-col gap-2">
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="First Name"
                    name={`parent${index + 1}FirstName`}
                    register={register}
                    control={control}
                  />
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Nickname (if any)"
                    name={`parent${index + 1}PrefferedName`}
                    register={register}
                    control={control}
                  />
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="email"
                    placeholder="Email Address"
                    name={`parent${index + 1}Email`}
                    register={register}
                    control={control}
                  />
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Occupation"
                    name={`parent${index + 1}Occupation`}
                    register={register}
                    control={control}
                  />
                </div>
                <div className="w-4/12 flex flex-col gap-2">
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Last Name"
                    name={`parent${index + 1}LastName`}
                    register={register}
                    control={control}
                  />
                  <CustomSelect
                    required={true}
                    className="rounded-[20px] bg-[#F5F5F5] "
                    name={`parent${index + 1}Relation`}
                    label="Relation to Child"
                    options={[
                      { value: "", label: "Relation to Child" },
                      { value: "Father", label: "Father" },
                      { value: "Mother", label: "Mother" },
                      // Add more options as needed
                    ]}
                    register={register}
                    control={control}
                  />
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Contact Number"
                    name={`parent${index + 1}Contact`}
                    register={register}
                    control={control}
                  />

                  <CustomSelect
                    className="rounded-[20px] bg-[#F5F5F5] "
                    name={`parent${index + 1}Gender`}
                    label="Gender"
                    options={[
                      { value: "", label: "Gender" },
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      // Add more options as needed
                    ]}
                    control={control}
                    register={register}
                  />
                </div>
              </div>
              <span className="px-[17%] mb-2 mt-2">Parent 1 Address :</span>
              <div className="flex flex-col items-center mt-4 gap-2">
                <div className="w-[68%]">
                  <CustomInput
                    className=" p-3"
                    label=""
                    type="text"
                    placeholder="Address Line 1"
                    name={`parent${index + 1}AddressLine1`}
                    control={control}
                    register={register}
                  />
                </div>
                <div className="w-[68%]">
                  <CustomInput
                    className=" p-3"
                    label=""
                    type="text"
                    placeholder="Address Line 2"
                    name={`parent${index + 1}AddressLine2`}
                    register={register}
                    control={control}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="w-4/12 flex flex-col gap-2">
                  <CustomSelect
                    required={true}
                    className="w-full bg-input_bg rounded-[20px] h-full "
                    name={`parent${index + 1}Country`}
                    label="Country"
                    control={control}
                    register={register}
                    options={countrylist}
                  />

                  <CustomSelect
                    required={true}
                    className="w-full bg-input_bg rounded-[20px] h-full "
                    name={`parent${index + 1}City`}
                    label="City"
                    control={control}
                    register={register}
                    options={citylist}
                  />
                </div>
                <div className="w-4/12 flex flex-col gap-2">
                  <CustomSelect
                    required={true}
                    className="w-full bg-input_bg rounded-[20px] h-full "
                    name={`parent${index + 1}State`}
                    label="Province"
                    control={control}
                    register={register}
                    options={statelist}
                  />

                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Postal Code"
                    name={`parent${index + 1}Pincode`}
                    control={control}
                    register={register}
                  />
                </div>
              </div>
            </div>
          ))} */}
        <div className="px-25 w-full flex flex-col ">
          <span className="px-[17%] mb-4">
            {custudian ? "Custodian Details" : "Parent 1 Personal Details"} :
          </span>
          <div className="flex items-center justify-center gap-4 mt-4 w-full">
            <div className="w-4/12 flex flex-col gap-5">
              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="text"
                placeholder="First Name"
                name={`parent1FirstName`}
                register={register}
                control={control}
                error={errors.parent1FirstName}
              />
              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="text"
                placeholder="Nickname (if any)"
                name={`parent1PreferredName`}
                register={register}
                control={control}
                error={errors.parent1PreferredName}
              />
              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="email"
                disabled={true}
                placeholder="Email Address"
                name={`parent1Email`}
                register={register}
                control={control}
              />
              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="text"
                placeholder="Occupation"
                name={`parent1Occupation`}
                register={register}
                control={control}
              />
            </div>
            <div className="w-4/12 flex flex-col gap-5">
              <CustomInput
                label=""
                type="text"
                placeholder="Last Name"
                name={`parent1LastName`}
                register={register}
                control={control}
                error={errors.parent1LastName}
              />
              <CustomSelect
                required={true}
                className="rounded-[20px] bg-[#F5F5F5] "
                name={`parent1Relation`}
                label="Select Relation to Child"
                options={custudian ? custodianRelation : normalRelation}
                register={register}
                control={control}
                error={errors?.parent1Relation}
              />
              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="text"
                placeholder="Contact Number"
                name={`parent1Contact`}
                register={register}
                control={control}
                error={errors?.parent1Contact}
              />

              <CustomSelect
                className="rounded-[20px] bg-[#F5F5F5] "
                name={`parent1Gender`}
                label="Gender"
                options={GENDER_TYPE}
                control={control}
                register={register}
                error={errors.parent1Gender}
              />
            </div>
          </div>
          <span className="px-[17%] mb-2 mt-2">
            {" "}
            {custudian ? "Custodian Address" : "Parent 1 Address"} :
          </span>
          <div className="flex flex-col items-center my-4 gap-x-4 gap-y-5">
            <div className="w-[68%]">
              <CustomInput
                className=" p-3"
                label=""
                type="text"
                placeholder="Address Line 1"
                name={`parent1AddressLine1`}
                control={control}
                register={register}
                error={errors.parent1AddressLine1}
                required
              />
            </div>
            <div className="w-[68%]">
              <CustomInput
                className=" p-3"
                label=""
                type="text"
                placeholder="Address Line 2"
                name={`parent1AddressLine2`}
                register={register}
                control={control}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-4 mt-1">
            <div className="w-4/12 flex flex-col gap-y-5">
              <CustomSelect
                required={true}
                className="w-full bg-input_bg rounded-[20px] h-full "
                name={`parent1Country`}
                label="Country"
                control={control}
                register={register}
                options={countrylist}
                error={errors.parent1Country}
              />

              <CustomSelect
                required={true}
                className="w-full bg-input_bg rounded-[20px] h-full "
                name={`parent1City`}
                label="City"
                control={control}
                register={register}
                options={citylist}
                error={errors.parent1City}
              />
            </div>
            <div className="w-4/12 flex flex-col gap-y-5">
              <CustomSelect
                required={true}
                className="w-full bg-input_bg rounded-[20px] h-full "
                name={`parent1State`}
                label="Province"
                control={control}
                register={register}
                options={statelist}
                error={errors.parent1State}
              />

              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="text"
                placeholder="Postal Code"
                name={`parent1PinCode`}
                control={control}
                register={register}
                error={errors.parent1PinCode}
              />
            </div>
          </div>
        </div>

        {!custudian && (
          <div className="px-25 w-full flex flex-col my-2">
            <span className="px-[17%] mb-4">Parent 2 Personal Details :</span>
            <div className="flex items-center justify-center gap-4 mt-4 w-full">
              <div className="w-4/12 flex flex-col gap-5">
                <CustomInput
                  label=""
                  divclass="w-full"
                  className="w-full p-3"
                  type="text"
                  placeholder="First Name"
                  name={`parent2FirstName`}
                  register={register}
                  control={control}
                  error={errors?.parent2FirstName}
                />
                <CustomInput
                  label=""
                  divclass="w-full"
                  className="w-full p-3"
                  type="text"
                  placeholder="Nickname Name (if any)"
                  name={`parent2PreferredName`}
                  register={register}
                  control={control}
                  error={errors?.parent2PreferredName}
                />
                <CustomInput
                  label=""
                  divclass="w-full"
                  className="w-full p-3"
                  type="email"
                  disabled={true}
                  placeholder="Email Address"
                  name={`parent2Email`}
                  register={register}
                  control={control}
                  error={errors?.parent2Email}
                />
                <CustomInput
                  label=""
                  divclass="w-full"
                  className="w-full p-3"
                  type="text"
                  placeholder="Occupation"
                  name={`parent2Occupation`}
                  register={register}
                  control={control}
                  error={errors?.parent2Occupation}
                />
              </div>
              <div className="w-4/12 flex flex-col gap-5">
                <CustomInput
                  type="text"
                  placeholder="Last Name"
                  name={`parent2LastName`}
                  register={register}
                  control={control}
                  error={errors?.parent2LastName}
                />
                <CustomSelect
                  name={`parent2Relation`}
                  label="Relation to Child"
                  options={normalRelation}
                  register={register}
                  control={control}
                  error={errors?.parent2Relation}
                />
                <CustomInput
                  label=""
                  divclass="w-full"
                  className="w-full p-3"
                  type="text"
                  placeholder="Contact Number"
                  name={`parent2Contact`}
                  register={register}
                  control={control}
                  error={errors?.parent2Contact}
                />

                <CustomSelect
                  className="rounded-[20px] bg-[#F5F5F5] "
                  name={`parent2Gender`}
                  label="Gender"
                  options={GENDER_TYPE}
                  control={control}
                  register={register}
                  error={errors.parent2Gender}
                />
              </div>
            </div>
            <span className="px-[17%] mb-2 mt-2">Parent 2 Address :</span>
            <div className="flex flex-col items-center my-4 gap-y-5">
              <div className="w-[68%]">
                <CustomInput
                  className=" p-3"
                  label=""
                  type="text"
                  placeholder="Address Line 1"
                  name={`parent2AddressLine1`}
                  control={control}
                  register={register}
                  error={errors.parent2Street}
                  // required
                />
              </div>
              <div className="w-[68%]">
                <CustomInput
                  className=" p-3"
                  label=""
                  type="text"
                  placeholder="Address Line 2"
                  name={`parent2AddressLine2`}
                  register={register}
                  control={control}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-4 mt-1">
              <div className="w-4/12 flex flex-col gap-y-5">
                <CustomSelect
                  className="w-full bg-input_bg rounded-[20px] h-full "
                  name={`parent2Country`}
                  label="Country"
                  control={control}
                  register={register}
                  options={countrylist}
                  error={errors.parent2Country}
                />

                <CustomSelect
                  className="w-full bg-input_bg rounded-[20px] h-full "
                  name={`parent2City`}
                  label="City"
                  control={control}
                  register={register}
                  options={citylist2}
                  error={errors.parent2City}
                />
              </div>
              <div className="w-4/12 flex flex-col gap-y-5">
                <CustomSelect
                  className="w-full bg-input_bg rounded-[20px] h-full "
                  name={`parent2State`}
                  label="Province"
                  control={control}
                  register={register}
                  options={statelist2}
                  error={errors.parent2State}
                />

                <CustomInput
                  label=""
                  divclass="w-full"
                  className="w-full p-3"
                  type="text"
                  placeholder="Postal Code"
                  name={`parent2PinCode`}
                  control={control}
                  register={register}
                  error={errors.parent2PinCode}
                />
              </div>
            </div>
          </div>
        )}
        {/* /////////////////////////////////////////////////////////////////////////// */}

        {/* <span className="px-[17%] mb-4">Parent 2 Personal Details :</span>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="w-4/12 flex flex-col gap-2">
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="First Name"
              name="firstName"
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Nickname (if any)"
              name="lastName"
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="email"
              placeholder="Email Address"
              name="lastName"
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Occupation"
              name="lastName"
              control={control}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-2">
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Last Name"
              name="lastName"
              control={control}
            />
              <CustomSelect
                name="childRelation"
                label="Relation to Child"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  // Add more options as needed
                ]}
                control={control}
              />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              control={control}
            />
            <CustomSelect
              name="gender"
              label="Gender"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </div>
        </div>
        <span className="px-[17%] mb-4">Parent 2 Address :</span>
        <div className="flex flex-col items-center mt-4">
            <CustomInput
              className="w-[70%] p-3"
              label=""
              type="text"
              placeholder="Address Line 1"
              name="addressLine1"
              control={control}
            />
            <CustomInput
              className="w-[70%] p-3"
              label=""
              type="text"
              placeholder="Address Line 2"
              name="addressLine2"
              control={control}
            />
        </div>
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="w-4/12 flex flex-col gap-2">
          <CustomSelect
              name="city"
              label="City"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
            <CustomSelect
              name="country"
              label="Country"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-2">
            <CustomSelect
              name="state"
              label="State/Province"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Postal Code"
              name="pincode"
              control={control}
            />
          </div>
        </div> */}
      </section>
      {/* <Button>Next</Button> */}
    </>
  );
};

export default ParentDetails;
