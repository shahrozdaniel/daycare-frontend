"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CalendarManagementContainer,
  DropdownContainer,
  Header,
  TopbarContainer,
} from "./calendarManagement.styles";
import CustomSelect from "@/components/common/CustomSelect";
import Calendar from "react-calendar";
import Modal from "@/components/common/Modal/Modal";
import FoodMenu from "./ModalComponents/FoodMenu";
import AddActivity from "./ModalComponents/AddActivity";
import DuplicateActivity from "./ModalComponents/DuplicateActivity";
import BasicCalendar from "./components/CalendarComponent";
import { classroomCatogery } from "../classroomManagement/classroomManagentAPI";
import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
import { useGlobalContext } from "../context/store";
import moment from "moment";
// import './styles.css'
const CalendarManagement: React.FC = () => {
  const thisMonth =moment.utc().month()+1
  const thisYear =moment.utc().year()
  const { handleSubmit, register, watch, control, setValue } = useForm<any>();
  const { globalSettings } = useGlobalContext();
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [foodMenu, setFoodMenu] = useState(false);
  const [addActivity, setAddActivity] = useState(false);
  const [duplicateActivity, setDuplicateActivity] = useState(false);
  const [classRoomCatogery, setClassroomCatogery] = useState<any>([]);
  const [selectedSchool, setselectedSchool] = useState<any>(4);
  const [calenderData, setCalenderData] = useState<any>([]);
  const [selectedMonth, setselectedMonth] = useState<any>(thisMonth);
  const [selectedYear, setSelectedYear] = useState<any>(thisYear);
  const getClassRoomList = async () => {
    let res;
    try {
      res = await classroomCatogery();
      if (res?.success) {
        let resultarr = res.data.map((item: any) => {
          return {
            value: item.classroomCategoryId,
            label: item.classroomCategoryName,
          };
        });
        setClassroomCatogery([
          { value: "", label: "Select Classroom Category" },
          ...resultarr,
        ]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClassRoomList();
  }, []);
  // const selectedMonth = watch("month");
  // useEffect(() => {
  //   setValue('month', thisMonth);
  // }, []);
  const getSelectedData = async () => {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token,
      },
    };
    if (selectedMonth && selectedSchool) {
      const res = await ApiInstance.get(
        `activityPlanning/calenderDetail?month=${selectedMonth}&classRoomCategory=${selectedSchool}`,
        config
      );
      if (res.data.success) {
        setCalenderData(res.data.data);
      }
    }
  };
  useEffect(() => {
    getSelectedData();
  }, [selectedMonth, selectedSchool]);
  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "FoodMenuModal") {
      setFoodMenu(true);
    }
    if (modalValue === "AddActivityModal") {
      setAddActivity(true);
    }
    if (modalValue === "DuplicateActivityModal") {
      setDuplicateActivity(true);
    }
    setModalOpen(true);
  };
  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "FoodMenuModal") {
      setFoodMenu(false);
    }
    if (modalValue === "AddActivityModal") {
      setAddActivity(false);
    }
    if (modalValue === "DuplicateActivityModal") {
      setDuplicateActivity(false);
    }
    setModalOpen(false);
  };
  const format=globalSettings?.dateFormat?.toUpperCase()||"DD-MM-YYYY"
  const currentYear = moment.utc().year();
  const years = [];
  for (let year = currentYear - 1; year <= currentYear + 9; year++) {
    years.push({value:year,label:`${year}`});
  }
  return (
    <>
      <CalendarManagementContainer
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
          margin: 0,
        }}
      >
        <div className="bg-white p-5 rounded-3xl">
          <TopbarContainer className="mb-4">
            <div className="flex md:gap-[10px] lg:gap-[18px]">
              <div className="text-[#4B4B4B] font-sans lg:text-[25px] md:text-[13px] font-semibold">
                Monthly food menu and activities
              </div>
            </div>
            <DropdownContainer className="mb-4 w-2/5">
            <CustomSelect
                name="month"
                label="Month"
                options={[
                  { value: 1, label: "January 2024" },
                  { value: 2, label: "February 2024" },
                  { value: 3, label: "March 2024" },
                  { value: 4, label: "April 2024" },
                  { value: 5, label: "May 2024" },
                  { value: 6, label: "June 2024" },
                  { value: 7, label: "July 2024" },
                  { value: 8, label: "August 2024" },
                  { value: 9, label: "September 2024" },
                  { value: 10, label: "October 2024" },
                  { value: 11, label: "November 2024" },
                  { value: 12, label: "December 2024" },
                ]}
                control={control}
                onChange={(e: any) => setselectedMonth(e?.target?.value)}
                value={selectedMonth}
              />
              {/* <CustomSelect
                name="year"
                label="Year"
                options={years}
                control={control}
                onChange={(e: any) => setSelectedYear(e?.target?.value)}
                value={selectedYear}
              /> */}
              <CustomSelect
                name="school"
                label="Classroom Category"
                options={classRoomCatogery}
                control={control}
                onChange={(e: any) => setselectedSchool(e?.target?.value)}
                value={selectedSchool}
              />
            </DropdownContainer>
          </TopbarContainer>
          {/* <Calendar value={date} /> */}
          <BasicCalendar
            classRoomCatogery={classRoomCatogery}
            data={calenderData}
            selectedMonth={selectedMonth}
            weekendsVisible={false}
            showNonCurrentDates={false}
            dayHeaderFormat={{ weekday: "long" }}
            selectedSchool={selectedSchool}
            reloadData={getSelectedData}
          />
          <p className="text-center my-3">
            <span className="bold">Selected Date:</span> {moment.utc().format(format)}
          </p>
        </div>
      </CalendarManagementContainer>
    </>
  );
};
export default CalendarManagement;