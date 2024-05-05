"use client";
import { GENDER_TYPE, LANGUAGE_TYPE } from "@/app/Dropdowns";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import {
  childParentlEdit,
  childemgContactEdit,
} from "@/services/childrenActionServices";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./styles.css";
import { get_Country_State_city } from "@/services/UtilityApis";
import { capitalizeAfterSpace, formatPhoneNumber } from "@/utils/utilityFunctions";
import Image from "next/image";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import { ModalInputContainer } from "@/app/reports/Common.styled";

const Parentupdate: React.FC<any> = ({
  data,
  id,
  closeModal,
  getChildData,
}) => {
  // first parent
  const [parentId, setParentId] = useState<number>();
  const [addid, setAddId] = useState<number>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [preFredName, setPreFredName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [relaton, setRelation] = useState<string>("");
  const [isCustudian, setIsCustudian] = useState<any>();
  // const [language, setLanguage] = useState<string>('')
  const [occupution, setOccupution] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");

  const [isEmgCon, setisEmgCon] = useState<boolean>();
  const [isPickupAuth, setispickUpAuth] = useState<boolean>();

  const [countryId, setCountryId] = useState<string>();
  const [cityId, setCityId] = useState<string>();
  const [stateId, setStateId] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();

  const [countryList, setCountryList] = useState<any>();
  const [stateList, setStateList] = useState<any>();
  const [cityList, setCityList] = useState<any>();

  // second Parent
  const [parentId2, setParentId2] = useState<number>();
  const [addid2, setAddId2] = useState<number>();
  const [firstName2, setFirstName2] = useState<string>("");
  const [lastName2, setLastName2] = useState<string>("");
  const [preFredName2, setPreFredName2] = useState<string>("");
  const [phoneNumber2, setPhoneNumber2] = useState<any>();
  const [gender2, setGender2] = useState<string>("");
  const [email2, setEmail2] = useState<string>("");
  const [relaton2, setRelation2] = useState<string>("");
  const [isCustudian2, setIsCustudian2] = useState<any>();
  // const [language2, setLanguage2] = useState<string>('')
  const [occupution2, setOccupution2] = useState<string>("");
  const [addressLine3, setAddressLine3] = useState<string>("");
  const [addressLine4, setAddressLine4] = useState<string>("");

  const [isEmgCon2, setisEmgCon2] = useState<boolean>();
  const [isPickupAuth2, setispickUpAuth2] = useState<boolean>();

  const [countryId2, setCountryId2] = useState<string>();
  const [cityId2, setCityId2] = useState<string>();
  const [stateId2, setStateId2] = useState<string>();
  const [postalCode2, setPostalCode2] = useState<string>();

  const [countryList2, setCountryList2] = useState<any>();
  const [stateList2, setStateList2] = useState<any>();
  const [cityList2, setCityList2] = useState<any>();

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [relationError, setRelationError] = useState<string>("");
  const [genderError, setGenderError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");
  const [countryError, setCountryError] = useState<string>("");
  const [postalCodeError, setPostalCodeError] = useState<string>("");
  const [addressLine1Error, setAddressLine1Error] = useState<string>("");
  const [phoneNumber2Error, setPhoneNumber2Error] = useState<string>("");
  const [email2Error, setEmail2Error] = useState<string>("");
  const [postalCode2Error, setPostalCode2Error] = useState<string>("");

  useEffect(() => {
    let parent = data?.[0];
    let parentAdd = data?.[0]?.address;

    let parent2 = data?.[1];
    let parentAdd2 = data?.[1]?.address;

    setParentId(parent?.id);
    setAddId(parentAdd?.id);
    setFirstName(capitalizeAfterSpace(parent?.first_name));
    setLastName(capitalizeAfterSpace(parent?.last_name));
    setPreFredName(parent?.preferred_name);
    setPhoneNumber(formatPhoneNumber(parent?.phone_no));
    setGender(parent?.gender);
    setEmail(parent?.email);
    setRelation(parent?.relation);
    setIsCustudian(parent?.is_custodian);
    setOccupution(parent?.occupation);
    setAddressLine1(parentAdd?.address_line_1);
    setAddressLine2(parentAdd?.address_line_2);

    setisEmgCon(parent?.is_emergency_contact);
    setispickUpAuth(parent?.is_pickup_authorized);

    setCountryId(parentAdd?.country);
    setCityId(parentAdd?.city);
    setStateId(parentAdd?.state);
    setPostalCode(parentAdd?.postal_code);
    // =================================parent 2 =======================================
    setParentId2(parent2?.id);
    setAddId2(parentAdd2?.id);
    setFirstName2(capitalizeAfterSpace(parent2?.first_name));
    setLastName2(capitalizeAfterSpace(parent2?.last_name));
    setPreFredName2(parent2?.preferred_name);
    setPhoneNumber2(formatPhoneNumber(parent2?.phone_no));
    setGender2(parent2?.gender);
    setEmail2(parent2?.email);
    setRelation2(parent2?.relation);
    setIsCustudian2(parent2?.is_custodian);
    setOccupution2(parent2?.occupation);
    setAddressLine3(parentAdd2?.address_line_1);
    setAddressLine4(parentAdd2?.address_line_2);

    setisEmgCon2(parent2?.is_emergency_contact);
    setispickUpAuth2(parent2?.is_pickup_authorized);

    setCountryId2(parentAdd2?.country);
    setCityId2(parentAdd2?.city);
    setStateId2(parentAdd2?.state);
    setPostalCode2(parentAdd2?.postal_code);
  }, []);

  const getCountryList = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let listArr: any = [{ value: "", label: "Country" }];
      if (res?.success) {
        let list = res?.data?.result;
        list?.map((ele: any, id: any) => {
          listArr?.push({ value: ele?.id, label: ele?.name });
        });
      }
      setCountryList(listArr);
    } catch (error) {}
  };

  // get State Data
  const getStateList = async () => {
    let body = {
      country: countryId,
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let listArr: any = [{ value: "", label: "Province" }];
      if (res?.success) {
        let list = res?.data?.result;
        list?.map((ele: any, id: any) => {
          listArr?.push({ value: ele?.id, label: ele?.name });
        });
      }
      setStateList(listArr);
    } catch (error) {}
  };

  // get City Data
  const getCityList = async () => {
    let body = {
      country: countryId,
      state: stateId,
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let listArr: any = [{ value: "", label: "City" }];
      if (res?.success) {
        let list = res?.data?.result;
        list?.map((ele: any, id: any) => {
          listArr?.push({ value: ele?.id, label: ele?.name });
        });
      }
      setCityList(listArr);
    } catch (error) {}
  };
  useEffect(() => {
    getCountryList();
  }, []);
  useEffect(() => {
    if (countryId) {
      getStateList();
    }
  }, [countryId]);
  useEffect(() => {
    if (stateId) {
      getCityList();
    }
  }, [stateId]);

  //  for parent 2
  const getCountryList2 = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let listArr: any = [{ value: "", label: "Country" }];
      if (res?.success) {
        let list = res?.data?.result;
        list?.map((ele: any, id: any) => {
          listArr?.push({ value: ele?.id, label: ele?.name });
        });
      }
      setCountryList2(listArr);
    } catch (error) {}
  };

  // get State Data
  const getStateList2 = async () => {
    let body = {
      country: countryId2,
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let listArr: any = [{ value: "", label: "Province" }];
      if (res?.success) {
        let list = res?.data?.result;
        list?.map((ele: any, id: any) => {
          listArr?.push({ value: ele?.id, label: ele?.name });
        });
      }
      setStateList2(listArr);
    } catch (error) {}
  };

  // get City Data
  const getCityList2 = async () => {
    let body = {
      country: countryId2,
      state: stateId2,
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let listArr: any = [{ value: "", label: "City" }];
      if (res?.success) {
        let list = res?.data?.result;
        list?.map((ele: any, id: any) => {
          listArr?.push({ value: ele?.id, label: ele?.name });
        });
      }
      setCityList2(listArr);
    } catch (error) {}
  };
  useEffect(() => {
    getCountryList2();
  }, []);
  useEffect(() => {
    if (countryId2) {
      getStateList2();
    }
  }, [countryId2]);
  useEffect(() => {
    if (stateId2) {
      getCityList2();
    }
  }, [stateId2]);

  useEffect(() => {}, []);

  const validateForm = () => {
    let valid = true;

    if (!firstName.match(/^[a-zA-Z0-9 ]+$/)) {
      setFirstNameError(
        "Invalid characters. Use only alphabetical characters."
      );
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.match(/^[a-zA-Z0-9 ]+$/)) {
      setLastNameError("Invalid characters. Use only alphabetical characters.");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!relaton) {
      setRelationError("Relation is required.");
      valid = false;
    } else {
      setRelationError("");
    }

    if (!gender) {
      setGenderError("Gender is required.");
      valid = false;
    } else {
      setGenderError("");
    }

    if (!email?.match(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/)) {
      setEmailError("Invalid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    if (formattedPhoneNumber.length !== 10) {
      setPhoneNumberError("Contact number must be 10 digits.");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!cityId) {
      setCityError("City is required.");
      valid = false;
    } else {
      setCityError("");
    }

    if (!stateId) {
      setStateError("Province is required.");
      valid = false;
    } else {
      setStateError("");
    }

    if (!countryId) {
      setCountryError("Country is required.");
      valid = false;
    } else {
      setCountryError("");
    }

    if (!postalCode) {
      setPostalCodeError("Postal Code is required.");
      valid = false;
    } else if (postalCode.length !== 6) {
      setPostalCodeError("Postal Code must be exactly six characters.");
      valid = false;
    } else {
      setPostalCodeError("");
    }

    if (!addressLine1?.trim()) {
      setAddressLine1Error("Address Line 1 is required.");
      valid = false;
    } else {
      setAddressLine1Error("");
    }

    if (phoneNumber2 && phoneNumber2.replace(/\D/g, "").length !== 10) {
      setPhoneNumber2Error("Phone number must be 10 digits.");
      valid = false;
    } else {
      setPhoneNumber2Error("");
    }

    if (email2 && !email2.match(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/)) {
      setEmail2Error("Invalid email address.");
      valid = false;
    } else {
      setEmail2Error("");
    }

    if (postalCode2 && postalCode2.length !== 6) {
      setPostalCode2Error("Postal code must be 6 characters.");
      valid = false;
    } else {
      setPostalCode2Error("");
    }

    return valid;
  };
  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }
    let body = {
      parentDetails: [
        {
          id: parentId,
          first_name: firstName,
          last_name: lastName,
          preferred_name: preFredName,
          phone_no: phoneNumber?.replace(/\D/g, ""),
          alternate_phone_no: null,
          gender: gender,
          address_id: addid,
          email: email,
          relation: relaton,
          occupation: occupution,
          is_custodian: isCustudian,
          language: null,
          is_primary: null,
          is_emergency_contact: isEmgCon,
          is_pickup_authorized: isPickupAuth,
          address: {
            id: addid,
            street: `${addressLine1} ${addressLine2}`,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city: cityId,
            state: stateId,
            postal_code: postalCode,
            country: countryId,
          },
        },
        {
          id: parentId2,
          first_name: firstName2,
          last_name: lastName2,
          preferred_name: preFredName2,
          phone_no: phoneNumber2?.replace(/\D/g, ""),
          email: email2,
          alternate_phone_no: null,
          gender: gender2,
          address_id: addid2,
          relation: relaton2,
          occupation: occupution2,
          is_custodian: isCustudian2,
          language: null,
          is_primary: null,
          is_emergency_contact: isEmgCon2,
          is_pickup_authorized: isPickupAuth2,
          address: {
            id: addid2,
            street: `${addressLine3} ${addressLine4}`,
            address_line_1: addressLine3,
            address_line_2: addressLine4,
            city: cityId2,
            state: stateId2,
            postal_code: postalCode2,
            country: countryId2,
          },
        },
      ],
    };
    let res;
    try {
      
      res = await childParentlEdit(id, body);
      if (res?.success) {
        toast.success(res?.message);
        getChildData();
        closeModal();
      }
    } catch (error: any) {
      toast.error(res?.error);
      
      console.log(error);
      toast.error("Some thing Went Wrong");
    }
  };

  return (
    <ModalDetailsContainer>
      {/* <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
          {"Child's Parents Contact Details"}
        </div>
      </HeaderContainer> */}
      <HeaderContainer>
        <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
          {"Child's Parents Contact Details"}
        </div>

        <button type="button" className="" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <ScrollableFormContainer>
        <FormContainer>
          <div className="w-full relative my-1">
            <form>
              <div className="flex-col w-full max-w-[826px] mx-auto items-center justify-center gap-6 ">
                <div className="w-full flex flex-col items-center justify-center gap-y-5 gap-x-4">
                  <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-2 mt-2">
                    <h2>Is this a custodian case ? </h2>
                    <div className="flex flex-row gap-5">
                      <input
                        type="radio"
                        name=""
                        onChange={() => setIsCustudian(true)}
                        checked={isCustudian}
                      />
                      <label>Yes</label>
                      <input
                        type="radio"
                        name=""
                        onChange={() => setIsCustudian(false)}
                        checked={!isCustudian}
                      />
                      <label>No</label>
                    </div>
                  </div>
                  {/* <ModalInputContainer>
                    <div className="w-4/6 mx-auto mt-2">
                      <div className="flex w-4/5 ml-3 justify-between mb-4">
                        <h2 className="text-black-b1">
                          Is this an emergency contact?
                        </h2>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={(e: any) =>
                              setisEmgCon(e?.target?.checked)
                            }
                            checked={isEmgCon}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="w-4/6 mx-auto mt-2">
                      <div className="flex w-5/7 ml-3 justify-between mb-4">
                        <h2 className="text-black-b1">
                          Authorization to pickup the child ?
                        </h2>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={(e: any) =>
                              setispickUpAuth(e?.target?.checked)
                            }
                            checked={isPickupAuth}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </ModalInputContainer> */}
                  <div className="text-[#4b4b4b] font-[DM_Sans] text-[15px] font-medium mt-3">
                    {isCustudian
                      ? "Custodian Details"
                      : "Parent 1 Contact Details"}
                  </div>

                  <ModalInputContainer>
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="First Name"
                      onChange={(e: any) => setFirstName(e?.target?.value)}
                      value={firstName}
                      error={firstNameError}
                      required
                    />
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="Last Name"
                      onChange={(e: any) => setLastName(e?.target?.value)}
                      value={lastName}
                      error={lastNameError}
                      required
                    />
                  </ModalInputContainer>
                  <ModalInputContainer>
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="Preferred Name"
                      onChange={(e: any) => setPreFredName(e?.target?.value)}
                      value={preFredName}
                    />
                    <CustomInput
                      type="tel"
                      name=""
                      label=""
                      placeholder="Contact Number "
                      onChange={(e: any) =>
                        setPhoneNumber(formatPhoneNumber(e?.target?.value))
                      }
                      value={phoneNumber}
                      error={phoneNumberError}
                      required
                    />
                  </ModalInputContainer>
                  <ModalInputContainer>
                    <CustomSelect
                      name=""
                      options={GENDER_TYPE}
                      label="Gender"
                      onChange={(e: any) => setGender(e.target.value)}
                      value={gender}
                      error={genderError}
                      required
                    />

                    <CustomInput
                      type="email"
                      name=""
                      label=""
                      placeholder="Email"
                      onChange={(e: any) => setEmail(e?.target?.value)}
                      value={email}
                      error={emailError}
                      required
                    />
                  </ModalInputContainer>
                  <ModalInputContainer>
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="Relation"
                      onChange={(e: any) => setRelation(e?.target?.value)}
                      value={relaton}
                      error={relationError}
                      required
                    />
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="Occupation"
                      onChange={(e: any) => setOccupution(e?.target?.value)}
                      value={occupution}
                    />
                  </ModalInputContainer>

                  <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium mt-3">
                    {isCustudian
                      ? "Custodian Details"
                      : "Parent 1 Personal Details"}
                  </div>
                  <ModalInputContainer>
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="Address Line 1"
                      onChange={(e: any) => setAddressLine1(e?.target?.value)}
                      value={addressLine1}
                      error={addressLine1Error}
                      required
                    />
                  </ModalInputContainer>
                  <ModalInputContainer>
                    <CustomInput
                      type="text"
                      name=""
                      label=""
                      placeholder="Address line 2"
                      onChange={(e: any) => setAddressLine2(e?.target?.value)}
                      value={addressLine2}
                    />
                  </ModalInputContainer>
                  <ModalInputContainer>
                    <CustomSelect
                      name=""
                      label="Country"
                      options={countryList}
                      onChange={(e: any) => setCountryId(e?.target?.value)}
                      value={countryId}
                      error={countryError}
                      required
                    />
                    <CustomSelect
                      name=""
                      label="Province"
                      options={stateList}
                      onChange={(e: any) => setStateId(e?.target?.value)}
                      value={stateId}
                      disabled={countryId ? false : true}
                      error={stateError}
                      required
                    />
                  </ModalInputContainer>
                  <ModalInputContainer>
                    <CustomSelect
                      name=""
                      label="City"
                      options={cityList}
                      onChange={(e: any) => setCityId(e?.target?.value)}
                      value={cityId}
                      disabled={stateId ? false : true}
                      error={cityError}
                      required
                    />
                    <CustomInput
                      label=""
                      type="text"
                      placeholder="Postal Code"
                      name=""
                      // control={control}
                      className="w-full"
                      onChange={(e: any) => setPostalCode(e?.target?.value)}
                      value={postalCode}
                      error={postalCodeError}
                      required
                    />
                  </ModalInputContainer>
                  {/* <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-2 mt-2">
          <h2>Is this a custodian case ? </h2>
          <div className="flex flex-row gap-5">
            <input
              type="radio"
              name=""
              onChange={() => setIsCustudian(true)}
              checked={isCustudian}
            />
            <label>Yes</label>
            <input
              type="radio"
              name=""
              onChange={() => setIsCustudian(false)}
              checked={!isCustudian}
            />
            <label>No</label>
          </div>
        </div>
        <ModalInputContainer>
          <div className="w-4/6 mx-auto mt-2">
            <div className="flex w-4/5 ml-3 justify-between mb-4">
              <h2 className="text-black-b1">Is this an emergency contact?</h2>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e: any) => setisEmgCon(e?.target?.checked)}
                  checked={isEmgCon}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="w-4/6 mx-auto mt-2">
            <div className="flex w-5/7 ml-3 justify-between mb-4">
              <h2 className="text-black-b1">
                Authorization to pickup the child ?
              </h2>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e: any) => setispickUpAuth(e?.target?.checked)}
                  checked={isPickupAuth}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </ModalInputContainer> */}
                </div>
              </div>
            </form>

            {!isCustudian && (
              <form>
                <div className="flex-col w-full mx-auto items-center justify-center gap-6 ">
                  <div className="w-full flex flex-col items-center justify-center gap-y-5 gap-x-4">
                    <div className="text-[#4b4b4b] font-[DM_Sans] text-[15px] font-medium mt-3">
                      Parent 2 Contact Details
                    </div>
                    <ModalInputContainer>
                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="first Name"
                        onChange={(e: any) => setFirstName2(e?.target?.value)}
                        value={firstName2}
                      />
                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="Last Name"
                        onChange={(e: any) => setLastName2(e?.target?.value)}
                        value={lastName2}
                      />
                    </ModalInputContainer>
                    <ModalInputContainer>
                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="Preferred Name"
                        onChange={(e: any) => setPreFredName2(e?.target?.value)}
                        value={preFredName2}
                      />
                      <CustomInput
                        type="tel"
                        name=""
                        label=""
                        placeholder="Contact Number "
                        onChange={(e: any) =>
                          setPhoneNumber2(formatPhoneNumber(e?.target?.value))
                        }
                        value={phoneNumber2}
                        error={phoneNumber2Error}
                      />
                    </ModalInputContainer>
                    <ModalInputContainer>
                      <CustomSelect
                        name=""
                        options={GENDER_TYPE}
                        label="Gender"
                        onChange={(e: any) => setGender2(e.target.value)}
                        value={gender2}
                      />

                      <CustomInput
                        type="email"
                        name=""
                        label=""
                        placeholder="Email"
                        onChange={(e: any) => setEmail2(e?.target?.value)}
                        value={email2}
                        error={email2Error}
                      />
                    </ModalInputContainer>
                    <ModalInputContainer>
                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="Occupution"
                        onChange={(e: any) => setOccupution2(e?.target?.value)}
                        value={occupution2}
                      />

                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="Relation"
                        onChange={(e: any) => setRelation2(e?.target?.value)}
                        value={relaton2}
                      />
                    </ModalInputContainer>
                    <div className="text-[#4b4b4b] font-[DM_Sans] text-[15px] font-medium mt-3">
                      Parent 2 address details
                    </div>
                    <ModalInputContainer>
                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="Address Line 1"
                        onChange={(e: any) => setAddressLine3(e?.target?.value)}
                        value={addressLine3}
                      />
                    </ModalInputContainer>
                    <ModalInputContainer>
                      <CustomInput
                        type="text"
                        name=""
                        label=""
                        placeholder="Address line 2"
                        onChange={(e: any) => setAddressLine4(e?.target?.value)}
                        value={addressLine4}
                      />
                    </ModalInputContainer>
                    <ModalInputContainer>
                      <CustomSelect
                        name=""
                        label="Country"
                        options={countryList2}
                        onChange={(e: any) => setCountryId2(e?.target?.value)}
                        value={countryId2}
                      />
                      <CustomSelect
                        name=""
                        label="Province"
                        options={stateList2}
                        onChange={(e: any) => setStateId2(e?.target?.value)}
                        value={stateId2}
                        disabled={countryId2 ? false : true}
                      />
                    </ModalInputContainer>
                    <ModalInputContainer>
                      <CustomSelect
                        name=""
                        label="City"
                        options={cityList2}
                        onChange={(e: any) => setCityId2(e?.target?.value)}
                        value={cityId2}
                        disabled={stateId2 ? false : true}
                      />
                      <CustomInput
                        label=""
                        type="text"
                        placeholder="Postal Code"
                        name=""
                        // control={control}
                        className="w-full"
                        onChange={(e: any) => setPostalCode2(e?.target?.value)}
                        value={postalCode2}
                        error={postalCode2Error}
                      />
                    </ModalInputContainer>
                    {/* <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-2 mt-2">
          <h2>Is this a custodian case ? </h2>
          <div className="flex flex-row gap-5">
            <input
              type="radio"
              name=""
              onChange={() => setIsCustudian2(true)}
              checked={isCustudian2}
            />
            <label>Yes</label>
            <input
              type="radio"
              name=""
              onChange={() => setIsCustudian2(false)}
              checked={!isCustudian2}
            />
            <label>No</label>
          </div>
        </div>
        <ModalInputContainer>
          <div className="w-4/6 mx-auto mt-2">
            <div className="flex w-4/5 ml-3 justify-between mb-4">
              <h2 className="text-black-b1">Is this an emergency contact?</h2>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e: any) => setisEmgCon2(e?.target?.checked)}
                  checked={isEmgCon2}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="w-4/6 mx-auto mt-2">
            <div className="flex w-5/7 ml-3 justify-between mb-4">
              <h2 className="text-black-b1">
                Authorization to pickup the child ?
              </h2>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e: any) => setispickUpAuth2(e?.target?.checked)}
                  checked={isPickupAuth2}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </ModalInputContainer> */}
                  </div>
                </div>
              </form>
            )}
          </div>
        </FormContainer>
      </ScrollableFormContainer>

      {/* <hr /> */}

      {/* <ModalButton>
        <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
        <AddButton type="button" onClick={submitForm}>
        {"Add"}
        </AddButton>
      </ModalButton> */}
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px]">
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton type="button" onClick={submitForm}>
              {"Save"}
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      <ToastContainer />
    </ModalDetailsContainer>
  );
};

export default Parentupdate;