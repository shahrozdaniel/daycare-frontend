import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { get_Country_State_city } from "@/services/UtilityApis";
import { useForm, SubmitHandler } from "react-hook-form";
import { EdituserMangementPersonalDetails } from "@/services/User-management-API";
import { usePathname, useSearchParams } from "next/navigation";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { GENDER_TYPE } from "@/app/Dropdowns";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { HeaderContainer } from "@/app/reports/Common.styled";
import { formatPhoneNumber, handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import moment from "moment";
import { getloggedInuserPermission } from "@/services/authpermission";
import { GlobalContextProvider, useGlobalContext } from "@/app/context/store";
import { ModalDetailsContainer, FormButton, FormContainer, ScrollableFormContainer } from "@/app/feesManagement/ModalComponent/Common.styled";

interface ModalProps {
  control: any; // or use proper type for control based on your setup
  personalDetails?: any;
  register?: any;
  classroomData: {
    value: string;
    label: string;
  }[];
  getUserDetailsData?: any;
  closeModal: any;
  setClassroomData: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  tab?: string;
}

const EditPersonalDetail: React.FC<ModalProps> = ({
  control,
  classroomData,
  personalDetails,
  closeModal,
  getUserDetailsData,
  tab,
}) => {
  // console.log('personalDetails', personalDetails)
  const [image, setImage] = useState<any>(null);
  const [Fristname, setFristname] = useState<any>("");
  const [lastName, setlastName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phoneNo, setPhone] = useState<any>("");
  const [dob, setDob] = useState<any>("");
  const [gender, setGender] = useState<any>("");
  const [state, setState] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [country, setCountry] = useState<any>("");
  const [pincode, setPincode] = useState<any>("");
  const [classRoom, setClassRoom] = useState<any>("");
  const [role, setRole] = useState<any>("");
  const [addLine1, SetAddLine1] = useState<any>("");
  const [addLine2, SetAddLine2] = useState<any>("");
  const [stateList, setStateList] = useState<any>([]);
  const [cityList, setcityList] = useState<any>([]);
  const [countryList, secountryeList] = useState<any>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<any>(true);
  const { setRoleData } = useGlobalContext();
  let router = useRouter();
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  let classroomdetail = personalDetails?.classroom?.classroom_id;
  let address = personalDetails?.address;
  personalDetails = personalDetails?.usersDetails;
  let id = personalDetails?.userId;

  //  get Country Data
  const getCountry = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "Country" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      secountryeList(Data);
    } catch (error) {
      console.log(error);
    }
  };
  // Get  State Data
  const getState = async () => {
    let body = {
      country: country,
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
      setStateList(Data);
    } catch (error) {
      console.log(error);
    }
  };
  //  get City Data
  const getCity = async () => {
    let body = {
      country: country,
      state: state,
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "City" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setcityList(Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
  }, [personalDetails]);
  useEffect(() => {
    getState();
  }, [country]);
  useEffect(() => {
    getCity();
  }, [state]);

  useEffect(() => {
    setImage(personalDetails?.photo);
    setFristname(personalDetails?.firstName);
    setlastName(personalDetails?.lastName);
    setEmail(personalDetails?.email);
    setPhone(personalDetails?.phoneNo);
    setDob(moment(personalDetails?.dob).format("YYYY-MM-DD"));
    setGender(personalDetails?.gender);
    setState(address?.state);
    setCity(address?.city);
    setCountry(address?.country);
    setPincode(address?.postal_code || '');
    SetAddLine1(address?.address_line_1 || '');
    SetAddLine2(address?.address_line_2 || '');
    setClassRoom(classroomdetail);
    setRole(personalDetails?.roleId);
  }, [personalDetails]);

  useEffect(() => {
    setCity(address?.city);
  }, [personalDetails, cityList])
  useEffect(() => {
    setState(address?.state);
  }, [personalDetails, stateList])
  const submitForm = async () => {
    let formData = new FormData();
    formData.append("photo", image);
    formData.append("firstName", Fristname);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNo);
    formData.append("dob", dob === "Invalid date" ? "" : dob);
    formData.append("gender", gender);
    formData.append("street", `${addLine1}${addLine2}`);
    formData.append("address_line_1", addLine1);
    formData.append("address_line_2", addLine2);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("pincode", pincode);
    formData.append("classroom_id", classRoom);
    formData.append("rolename", role);
    // formData.append("rolename", 'admin');
    let res;
    if (!Fristname) {
      toast.error("First name is required")
    }
    if (!lastName) {
      toast.error('Last name is required')
    }
    if (!gender) {
      toast.error('Gender is required')
    }

    if (!phoneNo && phoneNo.length == 14) {
      toast.error("Phone Number is required")
    }
    if (!addLine1) {
      toast.error('Address line 1 is required')
    }
    if (!country) {
      toast.error('Country is required')
    }
    if (!pincode) {
      toast.error('Postal code is required')
    }
    if (!city) {
      toast.error("City Number is required")
    }
    if (!state) {
      toast.error('Province  is required')
    }
    if (!dob) {
      toast.error('Date of birth is required')
    }
    // if (!tab) {
    //   if (!classRoom) {
    //     toast.error('Classroom  is required')
    //   }
    // }
    if (Fristname && lastName && phoneNo && dob && gender && addLine1 && city && state && country && pincode) {
      try {
        res = await EdituserMangementPersonalDetails(id, formData);
        if (res?.success) {
          toast.success("Personal Details successfully submited");
          await getUserDetailsData();
          const response = await getloggedInuserPermission();
          setRoleData(response.data);
          closeModal();
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          handleUnauthorizedError(router);
        }
        if (error.response.data.error) {
          toast.error(error.response?.data?.error);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer className="z-20">
          <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
            {tab ? "User" : " Educator"} Personal Details
          </div>

          <button type="button" className="" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <ScrollableFormContainer>
          <FormContainer>
            <section className="w-full relative my-1">
              <div className="mx-auto w-fit flex flex-col items-center justify-center mb-8 mt-4">
                <label className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e: any) => setImage(e.target.files[0])}
                  // value={image}
                  />
                  <div className="w-[140px] h-[140px] rounded-full bg-[linear-gradient(0deg,_#E1E1E1,_#E1E1E1),linear-gradient(0deg,_#F5F5F5,_#F5F5F5)] flex flex-col items-center justify-center border-[1px] border-[solid] border-[#E1E1E1] cursor-pointer">
                    {/* <Image
                  src={image ? image : "/images/avatar.png"}
                  alt="Preview"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-full mt-2"
                  onClick={handleButtonClick}
                /> */}

                    {image ? (
                      <Image
                        src={
                          typeof image !== "string"
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt="Preview"
                        width={50}
                        height={50}
                        className="w-full h-full object-fit rounded-full"
                      />
                    ) : (
                      <>
                        <Image
                          src={"/svgs/User.svg"}
                          alt="Logo"
                          width={30}
                          height={30}
                          className="w-[1.5rem] h-[1.5rem] object-contain mb-2 "
                        />
                        <span className="text-center font-dm-sans text-[#00858E] text-[0.75rem] font-medium">
                          Upload Picture
                        </span>
                      </>
                    )}
                  </div>
                </label>
              </div>
              <form>
                <div className="flex-col w-full max-w-[826px] mx-auto items-center justify-center gap-y-5 gap-x-4 ">
                  <div className="w-full flex flex-col items-center justify-center gap-x-4 gap-y-5">
                    <div className="flex gap-x-4 gap-y-5 w-full">
                      <CustomInput
                        className="w-full p-3"
                        label=""
                        type="text"
                        placeholder="First Name"
                        divclass="w-full"
                        name="firstName"
                        // control={control}
                        onChange={(e: any) => setFristname(e?.target?.value)}
                        value={Fristname}
                        // register={register}
                        required
                      />
                      <CustomInput
                        className="w-full p-3"
                        label=""
                        type="text"
                        divclass="w-full"
                        placeholder="Last Name"
                        name="lastName"
                        control={control}
                        // register={register}
                        onChange={(e: any) => setlastName(e?.target?.value)}
                        value={lastName}
                        required

                      />
                    </div>
                    <div className="flex gap-x-4 gap-y-5 w-full">
                      <CustomInput
                        className="w-full p-3"
                        label=""
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        control={control}
                        // register={register}
                        divclass="w-full"
                        disabled={true}
                        onChange={(e: any) => setEmail(e?.target?.value)}
                        value={email}
                        required

                      />
                      <CustomInput
                        className="w-full p-3"
                        label=""
                        type="text"
                        placeholder="Phone Number"
                        name="number"
                        control={control}
                        divclass="w-full"
                        onChange={(e: any) => setPhone(formatPhoneNumber(e?.target?.value))}
                        value={phoneNo}
                        // register={register}
                        required

                      />
                    </div>
                    <div className="flex gap-x-4 gap-y-5 w-full">
                      <CustomInput
                        className="w-full p-3"
                        label=""
                        type="date"
                        placeholder="Date of Birth"
                        name="dob"
                        control={control}
                        max={moment().format("YYYY-MM-DD")}
                        divclass="w-full"
                        onChange={(e: any) => setDob(e?.target?.value)}
                        value={dob}
                        // register={register}
                        required

                      />
                      <CustomSelect
                        name="gender"
                        label="Gender"
                        options={GENDER_TYPE}
                        control={control}
                        onChange={(e: any) => setGender(e?.target?.value)}
                        value={gender}
                        required
                      // register={register}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-x-4 gap-y-5">
                    <div className="text-left text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                      Address:
                    </div>
                    <CustomInput
                      className="w-full p-3"
                      label=""
                      type="text"
                      placeholder="Address Line 1"
                      name="addressLine1"
                      control={control}
                      divclass="w-full"
                      onChange={(e: any) => SetAddLine1(e?.target?.value)}
                      value={addLine1}
                      // register={register}
                      required

                    />
                    <CustomInput
                      className="w-full p-3"
                      label=""
                      type="text"
                      placeholder="Address Line 2"
                      name="addressLine2"
                      control={control}
                      divclass="w-full"
                      onChange={(e: any) => SetAddLine2(e?.target?.value)}
                      value={addLine2}
                    // register={register}
                    />
                    <div className="flex gap-x-4 gap-y-5 w-full">
                      <CustomSelect
                        className="w-full"
                        label="Country"
                        name="country"
                        control={control}
                        // register={register}
                        options={countryList}
                        required={true}
                        onChange={(e: any) => setCountry(e?.target?.value)}
                        value={country}
                      />

                      <CustomSelect
                        className="w-full "
                        name="state"
                        label="Province"
                        control={control}
                        // register={register}
                        options={stateList}
                        required={true}
                        onChange={(e: any) => setState(e?.target?.value)}
                        value={state}
                      />
                    </div>
                    <div className="flex gap-x-4 gap-y-5 w-full">
                      <CustomSelect
                        className="w-full "
                        name="city"
                        label="City"
                        control={control}
                        // register={register}
                        options={cityList}
                        required={true}
                        onChange={(e: any) => setCity(e?.target?.value)}
                        value={city}
                      />

                      <CustomInput
                        className="w-full p-3"
                        label=""
                        type="text"
                        placeholder="Postal Code"
                        name="pincode"
                        control={control}
                        divclass="w-full"
                        onChange={(e: any) => setPincode(e?.target?.value)}
                        value={pincode}
                        // register={register}
                        required

                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-x-4 gap-y-5 mt-5">
                    {/* <div className="mt-3 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
                  Assign Classroom:
                </div> */}
                    <div className="flex gap-3 w-full">
                      {tab ? (
                        <CustomSelect
                          name="role"
                          label="Role"
                          options={classroomData}
                          value={role}
                          onChange={(e: any) => setRole(e?.target?.value)}
                          disabled={
                            // personalDetails.rolename === "admin" ||
                              // personalDetails.rolename === "parent"
                              // ? true
                               true
                              // : false
                          }
                        />
                      ) : (
                        <CustomSelect
                          name="classroom"
                          label="Classroom"
                          options={classroomData}
                          control={control}
                          className="mt-2"
                          // register={register}
                          // required={true}
                          onChange={(e: any) => setClassRoom(e?.target?.value)}
                          value={classRoom}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </FormContainer>
        </ScrollableFormContainer>
        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
              <CancelButton onClick={() => closeModal("")} type="button">
                {"Cancel"}
              </CancelButton>
              <AddButton type="button" onClick={submitForm}>
                {"Save"}
              </AddButton>
            </div>
          </FormContainer>
        </FormButton>
      </ModalDetailsContainer>
      <ToastContainer />
      <style>{`
      .hide-scroll::-webkit-scrollbar {
        display: none;
      }`}</style>
    </>
  );
};

export default EditPersonalDetail;
