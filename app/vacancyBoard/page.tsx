"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CalendarManagementContainer,
  DropdownContainer,
  Header,
  TopbarContainer,
} from "../calendarManagement/calendarManagement.styles";
import CustomSelect from "@/components/common/CustomSelect";
import VacancyCalendar from "./components/VacancyCalendar";
import { classroomlist } from "../classroomManagement/classroomManagentAPI";
import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
import { useSearchParams } from "next/navigation";
import EnrolledChildTable from "./EnrolledChildTable";
import { enrolledChildColumn } from "./enrolledChildColumn";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useGlobalContext } from "../context/store";
import { ChevronLeft } from "lucide-react";
import { YEAR_DROPDOWN } from "../Dropdowns";
import WaitlistChildTable from "./WaitlistChildTable";
import { waitlistChildColumn } from "./waitlistChildColumn";
import { getVacancyChildWailist } from "@/services/childrenActionServices";
import { ToastContainer, toast } from "react-toastify";
// import Modal from "@/components/common/Modal/Modal";
// import FoodMenu from "./ModalComponents/FoodMenu";
// import AddActivity from "./ModalComponents/AddActivity";
// import DuplicateActivity from "./ModalComponents/DuplicateActivity";
// import BasicCalendar from "./components/CalendarComponent";
const CalendarManagement: React.FC = () => {
  const router = useRouter();
  const { handleSubmit, register, watch, control, setValue } = useForm<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [foodMenu, setFoodMenu] = useState(false);
  const [addActivity, setAddActivity] = useState(false);
  const searchparam = useSearchParams();
  let classroomId = searchparam?.get("class_id");
  const currentMonth = moment.utc().month() + 1;
  const currentYear = moment.utc().year();
  const {
    globalHolidayList,
    globalSettings: { dateFormat },
  } = useGlobalContext();
  const format = dateFormat?.toUpperCase() || "DD-MM-YYYY";
  const [showEnrolledChildTable, setShowEnrolledChildTable] = useState(false);
  const [enrolledchilddata, setEnrolledChildData] = useState([]);
  const [classRoomData, setClassRoomData] = useState<any>([]);
  const [waitlistdata, setWaitlistData] = useState<any>([]);
  const [selectedClass, setSelectedClass] = useState<any>();
  const [selectedClassType, setSelectedClassType] = useState<number>(0);
  const [classtypedata, setClassTypeData] = useState<any[]>([]);
  const [calendarData, setCalenderData] = useState<any>([]);
  const { globalSettings } = useGlobalContext();
  const [selectedMonth, setSeletedMonth] = useState<any>(currentMonth);
  const [selectedDate, setSelectedDate] = useState<any>();
  const [year, setYear] = useState<any>(currentYear);
  const [selectedYear, setSelectedYear] = useState<any>(currentYear);
  useEffect(() => {
    const date = moment.utc().format(format);
    setSelectedDate(date);
  }, [format]);

  // useEffect(() => {
  //   if (classroomId) {
  //     setSelectedClass(classroomId);
  //   }
  // }, [classroomId]);
  const classRoomList = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        let filterArray = res?.data?.list?.filter((ele: any) => {
          return ele?.status == 1;
        });
        let resultarr = filterArray.map((item: any) => {
          return {
            value: item?.classroomId,
            label: item?.classroomName,
          };
        });

        if (classroomId) {
          setSelectedClass(classroomId);
        } else {
          setSelectedClass(resultarr[0].value);
        }

        // setClassTypeData(res.data.list);
        setClassRoomData([
          { value: "", label: "Select Classroom " },
          ...resultarr,
        ]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getChildWaitlistDataByStartDate = async (startDate: string) => {
    try {
      let res = await getVacancyChildWailist(startDate, selectedClass);
      if (res.success) {
        let resarray = res.data.map((item: any) => {
          return {
            childName: item.child,
            schedule: item?.days,
            registrationDate: item.created_at
              ? moment.utc(item.created_at).format("YYYY-MM-DD")
              : moment.utc(item.created_at).format("YYYY-MM-DD"),
            joiningDate: item?.start_date,
          };
        });
        setWaitlistData(resarray);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  const fetchVacancyData = async () => {
    let res;
    try {
      const token = getAuthToken();
      const config = {
        headers: {
          Authorization: token,
        },
      };
      if (selectedMonth && selectedClass) {
        const res = await ApiInstance.get(
          `vacancyPlanning/list?month=${selectedMonth}&classroom_id=${selectedClass}&year=${year}`,
          config
        );
        if (res.data.success) {
          setCalenderData(res.data.data);
          if (showEnrolledChildTable) {
            setShowEnrolledChildTable(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVacancyData();
  }, [selectedMonth, selectedClass, year]);
  useEffect(() => {
    classRoomList();
    setValue("month", currentMonth);
  }, []);
  const years = [];
  for (let year = currentYear - 1; year <= currentYear + 9; year++) {
    years.push(year);
  }
  return (
    <div
      style={{
        backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
      }}
      className="px-5 py-5"
    >
      <CalendarManagementContainer className="bg-white rounded-3xl relative">
        <div
          className="flex items-center absolute left-2 top-0 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft color="#8E8E8E" size={26} />
          <div className="text-[1rem] py-2 px-1 text-[#4B4B4B] font-sans font-[400]">
            Back
          </div>
        </div>
        <TopbarContainer>
          <div className="flex md:gap-[10px] lg:gap-[18px]">
            <div className="text-[#4B4B4B] font-sans text-[22px] font-medium">
              Monthly Vacancy Board
            </div>
          </div>
          <DropdownContainer className="mb-4">
            <div className="custom-dropdown">
              <select
                name=""
                value={selectedMonth}
                className="md:w-[160px] lg:w-[180px] rounded-md ml-2 border-2 py-2 bg-white border-[#00858E] text-[#00858E] font-normal"
                onChange={(e: any) => setSeletedMonth(e.target.value)}
              >
                <option value={1}>January </option>
                <option value={2}>February </option>
                <option value={3}>March </option>
                <option value={4}>April </option>
                <option value={5}>May </option>
                <option value={6}>June </option>
                <option value={7}>July </option>
                <option value={8}>August </option>
                <option value={9}>September </option>
                <option value={10}>October </option>
                <option value={11}>November </option>
                <option value={12}>December </option>
              </select>
            </div>
            <div className="custom-dropdown">
              <select
                name=""
                value={year}
                className="md:w-[160px] lg:w-[180px] rounded-md ml-2 border-2 py-2 bg-white border-[#00858E] text-[#00858E] font-normal"
                onChange={(e: any) => setYear(e.target.value)}
              >
                {YEAR_DROPDOWN().length > 0 &&
                  YEAR_DROPDOWN().map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
            <select
              name=""
              value={selectedClass}
              className="md:w-[160px] lg:w-[180px] rounded-md ml-2 border-2 py-2 bg-white border-[#00858E] text-[#00858E] font-normal"
              onChange={(e: any) => {
                setSelectedClass(e.target.value);
                // let filtertype = classtypedata?.filter(
                //   (item) => selectedClass || e.target.value === item.classroomId
                // );

                // setSelectedClassType(filtertype[0]?.categoryId);
              }}
            >
              {classRoomData.length > 0 &&
                classRoomData.map((item: any) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </DropdownContainer>
        </TopbarContainer>
        {/* <Calendar value={date} /> */}
        <VacancyCalendar
          data={calendarData}
          selectedMonth={selectedMonth}
          year={year}
          showEnrolledChildTable={showEnrolledChildTable}
          setShowEnrolledChildTable={setShowEnrolledChildTable}
          setEnrolledChildData={setEnrolledChildData}
          onClicDate={setSelectedDate}
          getChildWaitlistDataByStartDate={getChildWaitlistDataByStartDate}
          selectedDate={selectedDate}
        />
        <div className="flex flex-col">
          <p className="text-start">
            <span className="bold">Selected Date:</span> {selectedDate}
          </p>
          <div className="flex gap-4 mt-2">
            {" "}
            <div className="w-full">
              {showEnrolledChildTable && (
                <>
                  <p className="pb-2">Available</p>
                  <EnrolledChildTable
                    columns={enrolledChildColumn}
                    data={enrolledchilddata}
                  />
                </>
              )}
            </div>
            <div className="w-full">
              {showEnrolledChildTable && (
                <WaitlistChildTable
                  columns={waitlistChildColumn}
                  data={waitlistdata}
                />
              )}
            </div>
          </div>
        </div>
      </CalendarManagementContainer>
      {/* {modalOpen && foodMenu && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}y
            AddText={"Save"}
            closeModal={closeModal}
            modalName={"FoodMenuModal"}
          >
            <FoodMenu control={control} />
          </Modal>
        </div>
      )}
      {modalOpen && addActivity && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Save"}
            closeModal={closeModal}
            modalName={"AddActivityModal"}
          >
            <AddActivity control={control} />
          </Modal>
        </div>
      )}
      {modalOpen && duplicateActivity && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Save"}
            closeModal={closeModal}
            modalName={"DuplicateActivityModal"}
          >
            <DuplicateActivity control={control} />
          </Modal>
        </div>
      )} */}
    </div>
  );
};
export default CalendarManagement;
