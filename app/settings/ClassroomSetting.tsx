"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import {
  dayCareSetting,
  dayCareSettingDetails,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { classroomCategory } from "../register/components/api/RegisterApi";
import { useGlobalContext } from "../context/store";
import Button from "@/components/common/Button";

interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const ClassroomSetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormData>();

  const [val, setVal] = useState<string>("");
  const [classroom, setClassRoomCatogery] = useState<any>([]);
  const [clasroomId, setClassroomId] = useState<any>("");
  const [infantmin, setinfantMin] = useState<any>("6");
  const [infantmax, setinfantMax] = useState<any>("18");
  const [schoolmin, setschoolMin] = useState<any>("30");
  const [schoolmax, setschoolMax] = useState<any>("72");
  const [kgmin, setkgMin] = useState<any>("44");
  const [kgmax, setkgMax] = useState<any>("84");
  const [toddlermin, settoddlerMin] = useState<any>("18");
  const [toddlermax, settoddlerMax] = useState<any>("30");
  const [ratio, setRatio] = useState<any>("");
  const [data, setData] = useState<any>("");
  const [infantMinError, setInfantMinError] = useState<string>("");
  const [infantMaxError, setInfantMaxError] = useState<string>("");
  const [toddlerMinError, setToddlerMinError] = useState<string>("");
  const [toddlerMaxError, setToddlerMaxError] = useState<string>("");
  const [preschoolMinError, setPreschoolMinError] = useState<string>("");
  const [preschoolMaxError, setPreschoolMaxError] = useState<string>("");
  const [kindergartenMinError, setKindergartenMinError] = useState<string>("");
  const [kindergartenMaxError, setKindergartenMaxError] = useState<string>("");

  const [switchValue, setswitchValue] = useState<any>(false);
  const [disable, setIsdisable] = useState<boolean>(false)
 
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

  const options = [
    { value: 1, label: "No Identification Required" },
    { value: 2, label: "Name/Initial(Typed)" },
    { value: 3, label: "Electronic Signature" },
  ];

  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        setData(res?.dayCareSetting?.classroom_settings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    settingDetails();
  }, []);
  useEffect(() => {
    if (data) {
      setClassroomId(Number(data?.age_range?.[0]?.classroom_category));
      setRatio(data?.default_ratio);
      setinfantMin(data?.age_range?.[0]?.min_age || "6");
      setinfantMax(data?.age_range?.[0]?.max_age || "18");
      settoddlerMin(data?.age_range?.[1]?.min_age || "18");
      settoddlerMax(data?.age_range?.[1]?.max_age || "30");
      setkgMax(data?.age_range?.[2]?.max_age || "84");
      setkgMin(data?.age_range?.[2]?.min_age || "44");
      setschoolMax(data?.age_range?.[3]?.max_age || "72");
      setschoolMin(data?.age_range?.[3]?.min_age || "30");
      setswitchValue(data?.show_realtime_updates);
    }
  }, [data]);
  const submitForm = async () => {
    if (
      infantMinError ||
      infantMaxError ||
      toddlerMinError ||
      toddlerMaxError ||
      preschoolMinError ||
      preschoolMaxError ||
      kindergartenMinError ||
      kindergartenMaxError
    ) {
      return;
    }
    let res;
    let body: any = {
      classroomSetting: {
        default_ratio: ratio,
        age_range: [
          {
            classroom_category: 1, // infanat
            min_age: infantmin,
            max_age: infantmax,
          },
          {
            classroom_category: 2, //Toddler
            min_age: toddlermin,
            max_age: toddlermax,
          },
          {
            classroom_category: 3, // PreSchool
            min_age: kgmin,
            max_age: kgmax,
          },

          {
            classroom_category: 4, // school
            min_age: schoolmin,
            max_age: schoolmax,
          },
        ],
        show_realtime_updates: switchValue ? switchValue : false,
      },
    };
    try {
      res = await dayCareSetting("classroom", body);
      if (res?.success) {
        toast.success(res?.message);
        settingDetails();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClassRoom = async () => {
    let res;
    try {
      res = await classroomCategory();
      if (res?.data.success) {
        setClassRoomCatogery(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClassRoom();
  }, []);
  let clssroomName: any = [
    {
      value: "",
      label: "Select Classroom",
    },
  ];
  classroom?.map((e: any) => {
    clssroomName?.push({
      value: e?.classroomCategoryId,
      label: e?.classroomCategoryName,
    });
  });

  const validationRules = {
    infant: {
      min: 6,
      max: 18,
    },
    toddler: {
      min: 18,
      max: 30,
    },
    preschool: {
      min: 30,
      max: 72,
    },
    kindergarten: {
      min: 44,
      max: 84,
    },
  };

  const validateAgeInput = (value: any, min: any, max: any) => {
    return value >= min && value <= max;
  };

  const handleInfantMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value && !Number.isInteger(value)) {
      setInfantMinError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.infant.min,
        validationRules.infant.max
      );

      if (valid) {
        if (infantmax && value > infantmax) {
          setInfantMinError("Minimum age cannot be greater than maximum");
        } else {
          setInfantMinError("");
        }
      } else {
        setInfantMinError("Invalid age range (6-18)");
      }
    }
    setinfantMin(value == 0 ? "" : value);
  };

  const handleInfantMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value && !Number.isInteger(value)) {
      setInfantMaxError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.infant.min,
        validationRules.infant.max
      );

      if (valid) {
        if (infantmin && value < infantmin) {
          setInfantMaxError("Maximum age cannot be less than minimum");
        } else {
          setInfantMaxError("");
        }
      } else {
        setInfantMaxError("Invalid age range (6-18)");
      }
    }
    setinfantMax(value == 0 ? "" : value);
  };

  const handleToddlerMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value && !Number.isInteger(value)) {
      setToddlerMinError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.toddler.min,
        validationRules.toddler.max
      );

      if (valid) {
        if (toddlermax && value > toddlermax) {
          setToddlerMinError("Minimum age cannot be greater than maximum");
        } else {
          setToddlerMinError("");
        }
      } else {
        setToddlerMinError("Invalid age range (18-30)");
      }
    }
    settoddlerMin(value == 0 ? "" : value);
  };

  const handleToddlerMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value && !Number.isInteger(value)) {
      setToddlerMaxError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.toddler.min,
        validationRules.toddler.max
      );

      if (valid) {
        if (toddlermin && value < toddlermin) {
          setToddlerMaxError("Maximum age cannot be less than minimum");
        } else {
          setToddlerMaxError("");
        }
      } else {
        setToddlerMaxError("Invalid age range (18-30)");
      }
    }
    settoddlerMax(value == 0 ? "" : value);
  };

  const handlePreschoolMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value && !Number.isInteger(value)) {
      setPreschoolMinError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.preschool.min,
        validationRules.preschool.max
      );

      if (valid) {
        if (schoolmax && value > schoolmax) {
          setPreschoolMinError("Minimum age cannot be greater than maximum");
        } else {
          setPreschoolMinError("");
        }
      } else {
        setPreschoolMinError("Invalid age range (30-72)");
      }
    }
    setschoolMin(value == 0 ? "" : value);
  };

  const handlePreschoolMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value && !Number.isInteger(value)) {
      setPreschoolMaxError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.preschool.min,
        validationRules.preschool.max
      );

      if (valid) {
        if (schoolmin && value < schoolmin) {
          setPreschoolMaxError("Maximum age cannot be less than minimum");
        } else {
          setPreschoolMaxError("");
        }
      } else {
        setPreschoolMaxError("Invalid age range (30-72)");
      }
    }
    setschoolMax(value == 0 ? "" : value);
  };

  const handleKindergartenMinChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);

    if (value && !Number.isInteger(value)) {
      setKindergartenMinError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.kindergarten.min,
        validationRules.kindergarten.max
      );

      if (valid) {
        if (schoolmax && value > schoolmax) {
          setKindergartenMinError("Minimum age cannot be greater than maximum");
        } else {
          setKindergartenMinError("");
        }
      } else {
        setKindergartenMinError("Invalid age range (44-84)");
      }
    }
    setkgMin(value == 0 ? "" : value);
  };

  const handleKindergartenMaxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    if (value && !Number.isInteger(value)) {
      setKindergartenMaxError("Age Should be Integer");
    } else {
      const valid = validateAgeInput(
        value,
        validationRules.kindergarten.min,
        validationRules.kindergarten.max
      );

      if (valid) {
        if (kgmin && value < kgmin) {
          setKindergartenMaxError("Maximum age cannot be less than minimum");
        } else {
          setKindergartenMaxError("");
        }
      } else {
        setKindergartenMaxError("Invalid age range (44-84)");
      }
    }
    setkgMax(value == 0 ? "" : value);
  };

  const handleDefaultRatio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value && !Number.isInteger(value)) {
      setRatio("");
    } else if (value < 0) {
      setRatio("");
    } else {
      setRatio(value);
    }
  };

  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Classroom Setting</h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Classroom Setting
          </h1>
        </div>
      </div>

      <div className="w-8/12 mx-auto mt-6">
        {/* <div className="flex w-2/6 justify-between mb-8">
          <h2 className="text-black-b1"> Show real time update</h2>
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e: any) => setswitchValue(e?.target?.checked)}
              checked={switchValue}
            />
            <span className="slider round"></span>
          </label>
        </div> */}
        <div className="flex gap-2 justify-center item-center">
          {/* <div className="w-5/12">
            <label>Default Ratio :</label>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Default Classroom Ratio"
              name=""
              control={control}
              onChange={handleDefaultRatio}
              value={ratio}
            />
          </div> */}
          <div className="flex flex-col gap-[15px] w-full">
            {/* <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Max) "
              name=""
              control={control}
              onChange={(e: any) => setinfantMax(e.target?.value)}
              value={infantmax}
            /> */}
          </div>
        </div>
        <br />
        <div className="flex gap-x-4 justify-center item-center">
          <div className="w-5/12">
            <label>Infant : </label>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Min) "
              name="lastName"
              control={control}
              onChange={handleInfantMinChange}
              value={infantmin}
              error={infantMinError}
              disabled = {disable}
            />
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Max) "
              name=""
              control={control}
              onChange={handleInfantMaxChange}
              value={infantmax}
              error={infantMaxError}
              disabled = {disable}

            />
          </div>
        </div>
        <br />
        <div className="flex gap-x-4 justify-center item-center">
          <div className="w-5/12">
            <label>Toddlers : </label>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Min) "
              name="lastName"
              control={control}
              onChange={handleToddlerMinChange}
              value={toddlermin}
              error={toddlerMinError}
              disabled = {disable}

            />
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Max) "
              name=""
              control={control}
              onChange={handleToddlerMaxChange}
              value={toddlermax}
              error={toddlerMaxError}
              disabled = {disable}

            />
          </div>
        </div>
        <br />
        <div className="flex gap-x-4 justify-center item-center">
          <div className="w-5/12">
            <label>Preschool : </label>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Min) "
              name="lastName"
              control={control}
              onChange={handlePreschoolMinChange}
              value={schoolmin}
              error={preschoolMinError}
              disabled = {disable}

            />
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Max) "
              name=""
              control={control}
              onChange={handlePreschoolMaxChange}
              value={schoolmax}
              error={preschoolMaxError}
              disabled = {disable}

            />
          </div>
        </div>
        <br />
        <div className="flex gap-x-4 justify-center item-center">
          <div className="w-5/12">
            <label>Kindergarten : </label>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Min) "
              name="lastName"
              control={control}
              onChange={handleKindergartenMinChange}
              value={kgmin}
              error={kindergartenMinError}
              disabled = {disable}

            />
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <CustomInput
              label=""
              type="Number"
              placeholder="Age range  in months (Max) "
              name=""
              control={control}
              onChange={handleKindergartenMaxChange}
              value={kgmax}
              error={kindergartenMaxError}
              disabled = {disable}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 md:mx-auto lg:mr-[17%] w-fit mt-10 mb-4">
        {(IsAdmin || userPermission?.setting?.add_edit) && (
          <Button type="button" form="blue" className="" onClick={submitForm}>
            Save
          </Button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ClassroomSetting;
