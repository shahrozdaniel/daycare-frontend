import React, { useEffect, useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import { formatPhoneNumber, genderConstant } from "@/utils/utilityFunctions";
import { get_Country_State_city } from "@/services/UtilityApis";
import Image from "next/image";

interface EmergencyDoctorDetailsProps {
  control: any;
  register: any;
  setValue: any;
  data: any;
  countrylists: any;
  statelists: any;
  watch: any;
  citylists: any;
  errors: any;
  //   register: UseFormRegister<FormData>;
}

const EmergencyDoctorDetails: React.FC<EmergencyDoctorDetailsProps> = ({
  control,
  register,
  setValue,
  data,
  countrylists,
  statelists,
  watch,
  citylists,
  errors,
}) => {
  const [val, setVal] = useState<string>("");
  const [emergencycountrylist, setEmergencyCountrylist] = countrylists;
  const [emergencyStatelist, setEmergencyStatelist] = statelists;
  const [emergencycitylist, setEmergencyCitylist] = citylists;

  useEffect(() => {
    if (data) {
      let tempData = {
        emergencyfirstName: data?.first_name,
        emergencypreferredName: data?.preferred_name,
        emergencyContact: data?.phone_no,
        emergencyEmail: data?.email,
        emergencylastName: data?.last_name,
        emergencyAddressLine1: data?.address?.address_line_1 || null,
        emergencyAddressLine2: data.address?.address_line_2 || null,
        emergencyCountry: data.address?.country || "",
        emergencyCity: data.address?.city || "",
        emergencyState: data.address?.state || "",
        emergencyPincode: data.address?.postal_code || "",
        addressId: data.address?.address_id || data?.address_id || "",
        doctorId: data.id || "",
        // emergencyGender:data.gender
        // emergencyAddressLine1
      };
      Object.entries(tempData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
    getCountryStateList({ country: "", state: "" }, setEmergencyCountrylist);
  }, [data]);

  const getCountryStateList = async (body: any, setValues: any) => {
    try {
      let res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      if (body.country === "" && body.state === "") {
        setValues([{ value: "", label: "Select Country" }, ...Data]);
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
      { country: watch("emergencyCountry") || "country", state: "" },
      setEmergencyStatelist
    );
    getCountryStateList(
      {
        country: watch("emergencyCountry") || "country",
        state: watch("emergencyState") || "state",
      },
      setEmergencyCitylist
    );
  }, [watch("emergencyCountry"), watch("emergencyState")]);

  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("emergencyContact"));
    formattedNumber && setValue("emergencyContact", formattedNumber);
  }, [watch("emergencyContact")]);

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/emergency-doctor-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain mb-1"
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Emergency Doctor Details
          </h1>
        </div>
      </div>
      <section className="mt-4">
        <div className="px-[17%] mb-4">Doctor&apos;s Personal Details :</div>
        <div className="flex items-start justify-center gap-x-4 mb-4">
          <div className="w-4/12 flex flex-col gap-5">
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="First Name"
              name="emergencyfirstName"
              control={control}
              register={register}
              required
              error={errors.emergencyfirstName}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Preferred Name (if any)"
              name="emergencypreferredName"
              control={control}
              register={register}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Email Address"
              name="emergencyEmail"
              control={control}
              register={register}
              error={errors.emergencyEmail}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-5">
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Last Name"
              name="emergencylastName"
              control={control}
              register={register}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Contact Number"
              name="emergencyContact"
              control={control}
              required
              register={register}
              error={errors.emergencyContact}
            />

            {/* <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Last Name"
              name="emergencylastName"
              control={control}
              register={register}
            /> */}
            {/* <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Relation to the child"
              name="emergencyrelationTochild"
              control={control}
            /> */}
            {/* <CustomSelect // gender ?
              name="emergencyGender"
              label="Gender"
              options={genderConstant}
              control={control}
              register={register}
            /> */}
          </div>
        </div>
        {/* <div className="text-blue-b1 text-right w-[70%] mx-auto mb-4">+ Add Another Contact</div> */}
        <span className="px-[17%] mb-2 mt-4">Doctor&apos;s Address :</span>
        <div className="flex flex-col items-center mt-4 w-full gap-y-5 gap-x-4">
          <div className="w-[68%]">
            <CustomInput
              className=" p-3"
              label=""
              type="text"
              placeholder="Address Line 1"
              name="emergencyAddressLine1"
              control={control}
              register={register}
              // error={errors.emergencyAddressLine1}
            />
          </div>
          <div className="w-[68%]">
            <CustomInput
              className="w-[70%] p-3"
              label=""
              type="text"
              placeholder="Address Line 2"
              name="emergencyAddressLine2"
              control={control}
              register={register}
              // required
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-y-5 gap-x-4 mt-5">
          <div className="w-4/12 flex flex-col gap-y-5 gap-x-4">
            <CustomSelect
              // required={true}
              className="w-full bg-input_bg rounded-[20px] h-full "
              name={`emergencyCountry`}
              label="Country"
              control={control}
              register={register}
              options={emergencycountrylist}
              // error={errors.emergencyCountry}
            />

            <CustomSelect
              // required={true}
              className="w-full bg-input_bg rounded-[20px] h-full "
              name={`emergencyCity`}
              label="City"
              control={control}
              register={register}
              options={emergencycitylist}
              // error={errors.emergencyCity}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-5">
            <CustomSelect
              // required={true}
              className="w-full bg-input_bg rounded-[20px] h-full "
              name={`emergencyState`}
              label="Province"
              control={control}
              register={register}
              options={emergencyStatelist}
              // error={errors.emergencyState}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Postal Code"
              name="emergencyPincode"
              control={control}
              register={register}
              // error={errors.emergencyPincode}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default EmergencyDoctorDetails;
