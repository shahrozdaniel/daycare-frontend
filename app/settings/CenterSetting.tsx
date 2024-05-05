"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  dayCareSetting,
  dayCareSettingDetails,
} from "@/services/dayCareSetting";
import { RGBColor } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import Button from "@/components/common/Button";
import { get_Country_State_city } from "@/services/UtilityApis";
import "react-toastify/dist/ReactToastify.css";
import { DATE_TYPE, ENROLLMENT_TYPE } from "../Dropdowns";
import { formatMessage, formatPhoneNumber } from "@/utils/utilityFunctions";
import { useGlobalContext } from "../context/store";
import ColorSelectionModal from "@/components/common/Modal/ColorSelectionModal";
import { Circle } from "lucide-react";
import ImageUpload from "@/components/common/ImageUpload";
import DaysComponent from "../daycareManagement/components/DaysComponent";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";

interface FormData {
  // Define your form values
  mySwitch: boolean;
  safePickup: boolean;
}

const CenterSetting = () => {
  const { permission, IsAdmin, setGlobalSettings } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
  const { control, handleSubmit, register, setValue, watch } = useForm<any>();
  const [switchValue, setswitchValue] = useState<any>(false);
  const [switchValue2, setswitchValue2] = useState<any>(false);
  const [switchValue3, setswitchValue3] = useState<any>(false);
  const [val, setVal] = useState<any>();
  const [error, setError] = useState<any>(false);

  const options = [
    { value: 1, label: "No Identification Required" },
    { value: 2, label: "Name/Initial(Typed)" },
    { value: 3, label: "Electronic Signature" },
  ];

  const [countrylist, setCountrylist] = useState<any>([
    { value: "", label: "Select Coutry" },
  ]);
  const [Statelist, setStatelist] = useState<any>([
    { value: "", label: "Select State" },
  ]);
  const [citylist, setCitylist] = useState<any>([
    { value: "", label: "Select City" },
  ]);
  const [allPrograme, setallProgram] = useState<any>([]);
  const [timeZoneList, setTimeZoneList] = useState<any>([]);
  const [countryId, setCountryId] = useState<any>("");
  const [stateId, setStateId] = useState<any>("");
  const [cityId, setCityId] = useState<any>("");
  const [timeZoneData, setTimeZonedata] = useState<any>([
    { value: "", label: "Select Timezone" },
  ]);

  const [sketchPickerColor, setSketchPickerColor] = useState<RGBColor>({
    r: 241,
    g: 212,
    b: 18,
    a: 1,
  });
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const [dayCareName, setDayCarename] = useState<any>("");
  const [autoSend, setAutoSend] = useState<any>("");
  const [dayCareId, setDaycareId] = useState<any>("");
  const [phoneNo, setPhoneNo] = useState<any>("");
  const [taxId, setTaxId] = useState<any>("");
  const [color, setColor] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [address2, setAddress2] = useState<any>("");
  const [pinCode, setPinCode] = useState<any>("");
  const [timeZone, setTimeZone] = useState<any>("");
  const [addId, setAddId] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [resetColor, setResetColor] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [availabilityval, setAvailabilityValue] = useState<any>({
    "All days(Mon-Fri)": [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
  });
  const [data, setData] = useState<any>("");

  const [disable, setIsdisable] = useState<boolean>(false)
  function generateSchedule(data: any) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const schedule: any = {};

    days.forEach(day => {
      schedule[day] = data
    });

    return JSON.stringify(schedule);
  }
  const isDisablePermisson = () => {
    if (IsAdmin) {
      setIsdisable(false)
    }
    if (userPermission?.setting?.add_edit === false) {
      setIsdisable(true)
    }
  }
  useEffect(() => {
    isDisablePermisson()
  }, [IsAdmin, permission])

  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        setData(res?.dayCareSetting);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setGlobalSettings(data);
      setDayCarename(data?.centerName);
      setDaycareId(data?.daycareType);
      setAutoSend(data?.auto_send_report_time);
      setPhoneNo(formatPhoneNumber(data?.phoneNo));
      setTaxId(data?.tax_id);
      setValue("image", data?.logo);
      setSelectedImage(data?.logo);
      setAddress(data?.address?.address_line_1);
      setAddress2(data?.address?.address_line_2 || "")
      setCountryId(data?.address?.country);
      setStateId(data?.address?.state);
      setCityId(data?.address?.city);
      setPinCode(data?.address?.postal_code);
      setColor(data?.backgroundColour);
      setTimeZone(data?.timezone);
      setAddId(data?.addressId || "");
      setswitchValue(data?.parent_settings?.signin_via_app);
      setswitchValue3(data?.parent_settings?.can_mark_attendance);
      setswitchValue2(data?.parent_settings?.safe_pickup);
      setDate(data?.dateFormat?.toUpperCase());
      setAvailabilityValue(data?.workingDays);
      if (Object.keys(data?.workingDays)?.includes(`All days(Mon-Fri)`)) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (resetColor && data?.backgroundColour !== color) {
      setConfirmModal(false);
      submitForm();
    }
    setResetColor(false);
  }, [resetColor]);
  useEffect(() => {
    if (selectedImage === "") {
      if (data) {
        submitForm();
      }
    }
  }, [selectedImage]);

  //  state City And Country
  const getCountry = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      setTimeZoneList(resData);
      let Data: any = [{ value: "", label: "Country" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setCountrylist(Data);
    } catch (error) {
      console.log(error);
    }
  };
  // Get  State Data
  const getState = async () => {
    let body = {
      country: countryId,
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
      country: countryId,
      state: stateId,
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
    getCountry();
  }, []);

  useEffect(() => {
    if (countryId) {
      getState();
    }
  }, [countryId]);
  useEffect(() => {
    if (stateId) {
      getCity();
    }
  }, [stateId]);

  useEffect(() => {
    settingDetails();
  }, []);

  const handleSelection = () => {
    let color = `rgba(${sketchPickerColor.r}, ${sketchPickerColor.g}, ${sketchPickerColor.b}, ${sketchPickerColor.a})`;
    setColor(color);
    setColorPickerOpen(false);
  };

  const handleClose = () => {
    setColorPickerOpen(false);
  };
  const submitForm = async () => {
    if (phoneNo?.replace(/\D/g, "").length !== 10) {
      setError(true);
      return;
    }
    if (dayCareName === "") {
      setError(true);
      return;
    }
    if (pinCode !== "" && pinCode?.length !== 6) {
      setError(true);
      return;
    }

    let formData = new FormData();
    let body = {
      center_name: dayCareName,
      daycareType: dayCareId,
      phoneNo: phoneNo?.replace(/\D/g, ""),
      auto_send_report_time: autoSend,
      taxId: taxId ? taxId : "",
      backgroundColour: color,
      street: `${address} ${address2}`,
      address_line1: address,
      address_line2: address2,
      city: cityId,
      state: stateId,
      country: countryId,
      pinCode: pinCode,
      timeZone: timeZone,
      address_id: addId || "",
      dateFormat: date?.toLowerCase(),
      parentSetting: {
        sign_identification: val ? val : "",
        signin_via_app: switchValue ? switchValue : false,
        safe_pickup: switchValue2 ? switchValue2 : false,
        can_mark_attendance: switchValue3 ? switchValue3 : false,
      },
    };
    formData.append("center_name", body.center_name);
    formData.append("daycare_type", body.daycareType);
    formData.append("phoneNo", body.phoneNo);
    formData.append("auto_send_report_time", body.auto_send_report_time);
    formData.append("taxId", body.taxId);
    formData.append("backgroundColour", body.backgroundColour);
    formData.append("street", body.street);
    formData.append("address_line1", body?.address_line1);
    formData.append("address_line2", body?.address_line2);
    formData.append("city", body.city);
    formData.append("state", body.state);
    formData.append("country", body.country);
    formData.append("pinCode", body.pinCode);
    formData.append("timeZone", body.timeZone);
    formData.append("address_id", body.address_id);
    formData.append("dateFormat", body.dateFormat);
    formData.append("parentSetting", JSON.stringify(body.parentSetting));
    formData.append("logo", selectedImage);
    formData.append("workingDays", JSON.stringify(availabilityval));


    let res;
    try {
      res = await dayCareSetting("center", formData);
      if (res?.success) {
        toast?.success(formatMessage(res?.message));
        settingDetails();
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast?.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    let TimeZone: any = [];
    if (timeZoneList && countryId) {
      let filterData = timeZoneList?.filter((timeZoneList: any) => {
        return timeZoneList?.id == countryId;
      });
      let data = filterData?.[0]?.timezones;
      // TimeZone.push({value:"Asia/Kolkata",label:"Asia/Kolkata"})
      data?.map((ele: any) => {
        TimeZone?.push({ value: ele?.zoneName, label: ele?.zoneName });
      });
      setTimeZonedata(TimeZone);
    }
  }, [countryId, timeZoneList]);

  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Centre Setting</h1> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Centre Setting
          </h1>
        </div>
      </div>

      {/* <hr /> */}
      <form>
        <div className="w-4/6 mx-auto mt-10">
          <div className="mx-auto w-fit flex flex-col items-center justify-center mb-8 mt-4 gap-y-5">
            <ImageUpload
              control={control}
              name="image"
              onSelect={(data: any) => {
                setSelectedImage(data);
              }}
              disabled={disable}
            />
            {(IsAdmin || userPermission?.setting?.add_edit) && <Button
              type="button"
              form="blue"
              onClick={() => {
                if (selectedImage) {
                  setSelectedImage("");
                }
              }}
            // className="mt-2 mr-4"
            >
              Reset Logo
            </Button>}
          </div>
          <div className=" flex mb-4">
            <CustomSelect
              name="DateType"
              label="Date Format Setting"
              options={DATE_TYPE}
              control={control}
              onChange={(e: any) => setDate(e?.target?.value)}
              value={date}
              disabled={disable}
            />
          </div>
          <div className="flex gap-y-5 gap-x-4">
            <div className="flex flex-col gap-y-5 gap-x-4 w-full">
              <CustomInput
                label=""
                type="text"
                placeholder="Daycare Name"
                name="lastName"
                control={control}
                required
                error={
                  error &&
                  dayCareName === "" &&
                  "Please fill daycare name"
                }
                onChange={(e: any) => setDayCarename(e?.target?.value)}
                value={dayCareName}
                disabled={disable}

              />
              <CustomSelect
                name="DayCareType"
                label="Daycare Type"
                options={ENROLLMENT_TYPE}
                control={control}
                onChange={(e: any) => setDaycareId(e?.target?.value)}
                value={dayCareId}
                disabled={disable}

              />
              <CustomInput
                label=""
                type="text"
                placeholder="Tax ID"
                name="lastName"
                control={control}
                onChange={(e: any) => setTaxId(e?.target?.value)}
                value={taxId}
                disabled={disable}
              />
            </div>
            <div className="flex flex-col gap-y-5 gap-x-4 w-full">
              <CustomInput
                label=""
                type="time"
                placeholder="Auto Send Report Timing"
                name="endTime"
                className="time-picker w-6/12"
                onChange={(e: any) => setAutoSend(e?.target?.value)}
                value={autoSend}
                disabled={disable}
              />

              <CustomInput
                label=""
                type="text"
                placeholder="Phone Number"
                name="lastName"
                control={control}
                onChange={(e: any) =>
                  setPhoneNo(formatPhoneNumber(e?.target?.value))
                }
                value={phoneNo}
                error={
                  error &&
                  phoneNo?.replace(/\D/g, "").length !== 10 &&
                  "Contact number must be 10 digits"
                }
                disabled={disable}
              />
              <div className="flex w-full items-center gap-10 mb-4">
                {color ? (
                  <div
                    style={{ backgroundColor: color }}
                    className={`h-14 w-14 rounded-full border-2 border-[#D3E4E6] cursor-pointer`}
                  />
                ) : (
                  <Circle
                    className="h-14 w-14 text-[#D3E4E6]"
                    cursor="pointer"
                    strokeWidth="1"
                  />
                )}
                {(IsAdmin || userPermission?.setting?.add_edit) &&
                  <>
                    <Button
                      type="button"
                      form="blue"
                      onClick={() => setColorPickerOpen(true)}
                    >
                      Pick a color
                    </Button>
                    <Button
                      type="button"
                      form="blue"
                      onClick={() => {
                        if (color !== "rgba(236,242,244,100)") {
                          setConfirmModal(true);
                        }
                      }}
                    >
                      Reset Color
                    </Button>
                  </>}
              </div>
            </div>
          </div>
          <div className="mt-4">Day Care Address :</div>
          <div className="flex flex-col items-center gap-y-5 gap-x-4 my-4">
            <CustomInput
              className="w-full"
              label=""
              type="text"
              placeholder="Address Line 1"
              name="addressLine1"
              control={control}
              onChange={(e: any) => setAddress(e?.target?.value)}
              value={address}
              disabled={disable}
            />

            <CustomInput
              className="w-full"
              label=""
              type="text"
              placeholder="Address Line 2"
              name="addressLine2"
              control={control}
              onChange={(e: any) => setAddress2(e?.target?.value)}
              value={address2}
              disabled={disable}
            />
          </div>
          {/* <br /> */}
          <div className="flex  justify-center gap-y-5 gap-x-4 mt-2">
            <div className="w-6/12 flex flex-col gap-x-4 gap-y-5">
              <CustomSelect
                name="country"
                label="Country"
                options={countrylist}
                control={control}
                onChange={(e: any) => setCountryId(e?.target?.value)}
                value={countryId}
                disabled={disable}
              />
              <CustomSelect
                name="city"
                label="City"
                options={citylist}
                control={control}
                onChange={(e: any) => setCityId(e?.target?.value)}
                value={cityId}
                disabled={disable}
              />
              <CustomSelect
                name="time_zone"
                label="Time Zone"
                options={timeZoneData}
                value={timeZone}
                onChange={(e: any) => setTimeZone(e?.target?.value)}
                disabled={disable}
              />
            </div>
            <div className="w-6/12 flex flex-col gap-y-5 gap-x-4">
              <CustomSelect
                name="state"
                label="State/Province"
                options={Statelist}
                control={control}
                onChange={(e: any) => setStateId(e?.target?.value)}
                value={stateId}
                disabled={disable}
              />
              <CustomInput
                label=""
                type="text"
                placeholder="Postal Code"
                name="pincode"
                control={control}
                onChange={(e: any) => setPinCode(e?.target?.value)}
                value={pinCode}
                error={
                  error &&
                  (pinCode?.length !== 6 && "Postal code must be exactly 6 characters")
                }
                disabled={disable}
              />
            </div>
          </div>
          <div>
            <div className="py-2">Working Days</div>
            <div className="grid grid-cols-6 gap-3  text-[#a4a4a4] text-[16px]">
              <div className="flex gap-2 items-center col-span-2">
                <p>All days(Mon-Fri)</p>
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onClick={() => {
                    setIsChecked(!isChecked);
                    setAvailabilityValue([]);
                  }}
                  disabled={disable}
                />
              </div>
              <div className="col-span-2 r">Start Time</div>
              <div className="col-span-2 text-center mr-14">End Time</div>
            </div>

            <DaysComponent
              control={control}
              value={availabilityval}
              setValue={setAvailabilityValue}
              state={isChecked}
              error={error}
              setError={setError}
              // disable={disable}
            />
          </div>

          <div className="my-5  text-black-b1 mx-auto w-fit">
            Parent Sign In & Pickup
          </div>
          <div className="ml-4 w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mt-[30px] mb-[30px]">
            {/* <h2 className="text-black-b1">Parent Sign Identification</h2>
            <RadioInput
              type="col"
              options={options}
              value={""}
              onChange={(value: any) => setVal(value)}
              // register={register}
              name="radioOption"
              // value = {val}
            /> */}
          </div>
          <div className="flex w-1/2 ml-3 justify-between mb-4">
            <h2 className="text-black-b1">Parent sign in via app</h2>
            {/* <CircularSwitch
              label="My Switch"
              checked={switchValue || false}
              onChange={(isChecked) => setValue("mySwitch", isChecked)}
              id="signin"
            /> */}
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e: any) => setswitchValue(e?.target?.checked)}
                checked={switchValue}
                disabled={disable}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex w-1/2 ml-3 justify-between mb-4">
            <h2 className="text-black-b1">Safe pickup</h2>
            {/* <CircularSwitch
              label="My Switch"
              checked={switchValue2 || false}
              onChange={(isChecked) => setValue("mySwitch2", isChecked)}
              id="pickup"
            /> */}
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e: any) => setswitchValue2(e?.target?.checked)}
                checked={switchValue2}
                disabled={disable}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex w-1/2 ml-3 justify-between mb-4">
            <h2 className="text-black-b1">Parent can mark child attendance</h2>
            {/* <CircularSwitch
              label="My Switch"
              checked={switchValue3 || false}
              onChange={(isChecked) => setValue("mySwitch3", isChecked)}
              id="attendance"
            /> */}
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e: any) => setswitchValue3(e?.target?.checked)}
                checked={switchValue3}
                disabled={disable}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="flex gap-4 md:mx-auto lg:mr-[16%] w-fit mt-2 mb-4">
          {(IsAdmin || userPermission?.setting?.add_edit) && (
            <Button type="button" form="blue" className="" onClick={submitForm}>
              Save
            </Button>
          )}
        </div>
      </form>
      <ColorSelectionModal
        open={colorPickerOpen}
        handleClose={handleClose}
        handleSelection={handleSelection}
        setSketchPickerColor={setSketchPickerColor}
        sketchPickerColor={sketchPickerColor}
      />
      {confirmModal && (
        <div>
          <ConfirmationModal
            title={"Reset color"}
            content={`Are you sure you want to reset the color ?`}
            modalOpen={confirmModal}
            handleConfirm={() => {
              setColor("rgba(236,242,244,100)");
              setResetColor(true);
            }}
            closeModal={() => {
              setConfirmModal(false);
            }}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CenterSetting;