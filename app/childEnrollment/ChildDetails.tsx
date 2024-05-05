import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { useForm } from "react-hook-form";
import { getChildEnrollment } from "./childEnrolmentAPI";
import { GENDER_TYPE } from "../Dropdowns";
import EnrollmentDaysComponent from "./components/enrollmentDays";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
interface Child {
  id: number;
  first_name: string;
  last_name: string;
  preferred_name: string;
  dob: string;
  photo: any;
  language: string;
  gender: string;
  age: string;
  parent_id: number;
  is_active: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  parents: Parent[];
}
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
const ChildDetails = ({
  data,
  setValue,
  control,
  register,
  classroomData,
  errors,
  selectedDays,
  setSelectedDays,
  watch,
}: any) => {
  // const [childEnrollData, setChildEnrollData] = useState<Child>();
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    if (data) {
      let tempData = {
        childFirstName: data?.child?.first_name,
        childPreferredName: data?.child?.preferred_name,
        childLastName: data?.child?.last_name,
        // age: data?.child?.age,
        classroom: data?.enrollment ? data?.enrollment?.classroom_id : null,
        startDate: data?.start_date,
        endDate: data?.enrollment ? data?.enrollment.end_date : null,
        dob: data?.child?.dob,
        childLanguage: data?.child?.language,
        childGender: data?.child?.gender,
        image: data?.child?.photo || null,
      };
      Object.entries(tempData).map((key: any) => {
        setValue(key[0], key[1]);
        setSelectedDays(data?.days);
        setSelectAllChecked(data?.days?.length === 5);
      });
    }
  }, [data]);
  const handleSelectAllChange = (isChecked: any) => {
    setSelectAllChecked(isChecked);

    if (isChecked) {
      setSelectedDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    } else {
      setSelectedDays([]);
    }
  };

  const handleCheckboxChange = (day: string) => {
    setSelectedDays((prevSelectedDays: any) => {
      prevSelectedDays = prevSelectedDays || [];
      // Check if the day is already selected
      const isDaySelected = prevSelectedDays?.includes(day);

      // If the day is selected, remove it from the array; otherwise, add it
      const updatedSelectedDays = isDaySelected
        ? prevSelectedDays.filter((selectedDay: any) => selectedDay !== day)
        : [...prevSelectedDays, day];

        setSelectAllChecked(updatedSelectedDays.length === 5);

      return updatedSelectedDays;
    });
  };
  const startDate = watch("startDate");
  const endDatate = watch("endDate");
  const DateOfbirth = watch("dob");
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/Group.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain mb-1 "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Child Details
          </h1>
        </div>

        <div
          className="flex items-center absolute left-2 top-2 cursor-pointer"
          onClick={() =>  router.push("/childManagement?enrolled=true")}
        >
          <ChevronLeft color="#8E8E8E" size={32}/>
          <div className="text-[1.25rem] py-2 px-1 text-[#4B4B4B] font-sans font-[500]">
            Back
          </div>
        </div>
       
      </div>

      <section className="">
        <div className="mx-auto w-fit flex flex-col items-center justify-center my-8">
          <ImageUpload control={control} name="image" />
        </div>
        <div className="flex  justify-center gap-x-4">
          <div className="w-4/12 flex flex-col gap-y-5">
            <CustomInput
              type="text"
              placeholder="First Name"
              name="childFirstName"
              control={control}
              register={register}
              error={errors.childFirstName}
            />
            <CustomInput
              type="text"
              placeholder="Nickname (if any)"
              name="childPreferredName"
              control={control}
              register={register}
              // pattern="[A-Za-z]"
            />
            {/* <CustomInput
              className="rounded-[20px] bg-[#F5F5F5]"
              type="text"
              placeholder="Age"
              name="age"
              control={control}
              register={register}
            /> */}
            {/* <CustomInput
              type="text"
              placeholder="Class Room"
              name="classroom"
              control={control}
              className="rounded-[20px] bg-[#F5F5F5]"
              register={register}
            /> */}
            <CustomSelect
              name="classroom"
              label="Classroom"
              options={classroomData}
              control={control}
              register={register}
              required={true}
              error={errors.classroom}
            />

            {/* <DatePickerComponent
              // className="rounded-[20px] bg-[#F5F5F5]"
              name="childDob"
              label="Start Date"
              control={control}
            /> */}
            <CustomSelect
              required={true}
              className="rounded-[20px] bg-[#F5F5F5] "
              name="childLanguage"
              label="Child Language"
              options={[
                { value: "", label: " Child Language" },
                { value: "English", label: "English" },
                { value: "French", label: "French" },
                { value: "Other", label: "Other" },
                // Add more options as needed
              ]}
              control={control}
              register={register}
            />
            <CustomInput
              type="date"
              placeholder="Start Date"
              name="startDate"
              control={control}
              className="rounded-[20px] bg-[#F5F5F5]"
              register={register}
              min={DateOfbirth}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-5">
            <CustomInput
              className="rounded-[20px] bg-[#F5F5F5]"
              label=""
              type="text"
              placeholder="Last Name"
              name="childLastName"
              control={control}
              register={register}
              error={errors.childLastName}
            />
            {/* <DatePickerComponent
              // className="rounded-[20px] bg-[#F5F5F5]"
              name="childDob"
              label="Date Of Birth"
              control={control}
              // value = {}
            /> */}

            <CustomInput
              type="date"
              placeholder="Date Of Birth"
              name="dob"
              control={control}
              className="rounded-[20px] bg-[#F5F5F5]"
              register={register}
            />
            {/* <CustomInput
              className="rounded-[20px] bg-[#F5F5F5]"
              label=""
              type="text"
              placeholder="Language Spoken"
              name="childLanguage"
              control={control}
              value={childEnrollData?.language}
            /> */}

            <CustomSelect
              className="rounded-[20px] bg-[#F5F5F5]"
              name="childGender"
              label="Gender"
              options={GENDER_TYPE}
              control={control}
              register={register}
              error={errors.childGender}
            />

            <CustomInput
              type="date"
              placeholder="End Date"
              name="endDate"
              control={control}
              className="rounded-[20px] bg-[#F5F5F5]"
              register={register}
            // min={minStartDate}
            />
            {/* <DatePickerComponent
              // className="rounded-[20px] bg-[#F5F5F5]"
              name="childDob"
              label="End Date"
              control={control}
            /> */}

            {/* <CustomInput
              type="date"
              placeholder="End Date"
              name="endDate"
              control={control}
              className="rounded-[20px] bg-[#F5F5F5]"
              register={register}
            /> */}
          </div>
        </div>
        <div className="pl-[17%] my-2">
        <div className="my-2 flex items-center">
                        <label className="mr-2">Days</label>
                        <div className="flex-shrink-0">
                          <Checkbox
                            id={`checkbox-SelectAll`}
                            checked={selectAllChecked}
                            onCheckedChange={(isChecked) =>
                              handleSelectAllChange(isChecked)
                            }
                          />
                          <label
                            htmlFor={`checkbox-SelectAll`}
                            className="text-sm font-medium leading-none ml-1"
                          >
                            Select All
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                        ].map((day, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-3 bg-[#F4FBFB] border border-[#D3E4E6] rounded-[20px] mb-4 my-2"
                          >
                            <label
                              htmlFor={`checkbox-${day}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                            >
                              {day}
                            </label>
                            <div className="flex-shrink-0">
                              <Checkbox
                                id={`checkbox-${day}`}
                                checked={selectedDays?.includes(day)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(day)
                                }
                                // disabled={selectAllChecked}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
        </div>
      </section>
      {/* <div className='flex justify-center gap-6'>
        <div className='w-4/12 flex flex-col gap-2'>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-contenet-center align-Items-center'>
              <input type="checkbox" placeholder='Monday' />
              <label > Monday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              // register={register}
              />
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-contenet-center align-Items-center'>
              <input type="checkbox" placeholder='Monday' />
              <label >Tuesday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-contenet-center align-Items-center'>
              <input type="checkbox" placeholder='Monday' />
              <label >Wednesday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-contenet-center align-Items-center'>
              <input type="checkbox" placeholder='Monday' />
              <label > Thrusday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-contenet-center align-Items-center'>
              <input type="checkbox" placeholder='Monday' />
              <label > Friday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-contenet-center align-Items-center'>
              <input type="checkbox" placeholder='Monday' />
              <label > Saturday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
              <CustomInput
                label=""
                type="time"
                // // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
          <div className='w-12/12 flex flex-row gap-2'>
            <div className='w-4/12 flex flex-row gap-2 justify-self: auto'>
              <input type="checkbox" placeholder='Monday' />
              <label > Sunday</label>
            </div>
            <div className='w-8/12 flex flex-row gap-2'>
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
              <CustomInput
                label=""
                type="time"
                // placeholder="Time Slots"
                name="description"
                control={control}
                className="time-picker w-9/12"
              />
            </div>
          </div>
        </div>
        <div className='w-4/12 flex flex-col gap-2'></div>
      </div> */}
    </>
  );
};

export default ChildDetails;