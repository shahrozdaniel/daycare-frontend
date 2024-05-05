"use client";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../event-utils";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import { useForm } from "react-hook-form";
import FoodMenu from "../../ModalComponents/FoodMenu";
import AddActivity from "../../ModalComponents/AddActivity";
import AddActivityModal from "../CalendarActivityModal";
import FoodMenuModal from "../CalendarFoodMenuModal";
import { yupResolver } from "@hookform/resolvers/yup";
import FormModal from "@/components/common/FormModal";
import { classroomCategory } from "@/app/register/components/api/RegisterApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addFoodMenuValidationSchema } from "../CalendarFoodMenuModal/FoodMenuValidation";
import {
  createActivityPlanning,
  createFoodMenu,
} from "@/services/CalendarManagementServices";
import { useRouter } from "next/navigation";
import {
  disableActionIfNotWorkingDay,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import { addActivityModalValidation } from "../CalendarActivityModal/ActivityModalValidation";
import moment from "moment";
import EventData from "../../ModalComponents/EventData";
import { useGlobalContext } from "@/app/context/store";
import { da } from "date-fns/locale";
function renderEventContent(eventInfo: any) {
  return (
    <div className="flex gap-2 items-center justify-center mx-auto  ">
      {eventInfo.event.title === "New Activity" ||
        eventInfo.event.title === "New Food Menu" ? (
        <p className="text-[#4B4B4B] bg-[#F3F3F3] font-sans text-base font-normal leading-22 text-center w-[200px] rounded-[100px] py-2 hover:bg-[#d1cfcf]">
          + {eventInfo.event.title}
        </p>
      ) : (
        <p
          className={`border ${eventInfo.event.title === "View Menu & Activity"
            ? "border-[#A1AFE2] bg-[#E1EFFF]"
            : "border-[#8B0000] bg-[#ffcccc]"
            } rounded-[100px] py-2 w-[200px] text-center capitalize`}
        >
          {eventInfo.event.title === "View Menu & Activity"
            ? eventInfo.event.title
            : `${eventInfo.event.title} Holiday`}
        </p>
      )}
    </div>
  );
}

const BasicCalendar = ({
  classRoomCatogery,
  data,
  selectedMonth,
  weekendsVisible = true,
  showNonCurrentDates = true,
  dayHeaderFormat,
  selectedSchool,
  reloadData,
}: {
  classRoomCatogery: any;
  data: any[];
  selectedMonth: any;
  weekendsVisible?: boolean;
  showNonCurrentDates?: boolean;
  dayHeaderFormat?: any;
  selectedSchool?: any;
  reloadData: any;
}) => {
  let todayDate = moment.utc().format();
  const calendarRef = useRef<any>(null);
  const [currentEvents, setCurrentEvents] = useState([]);
  // const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<string>("");
  const [selected, setSelected] = useState<any>([]);
  const [selectedOptions, setSelectedOption] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showfoodmenu, setShowFoodMenu] = useState(false);
  const [showactvity, setShowActivity] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showDataModal, setShowDataModal] = useState<boolean>(false);
  const [eventData, setEventData] = useState<any>("");
  const [activityModdal, setActivityModal] = useState<boolean>(false);
  const [val, setVal] = useState<boolean>(false);
  const {
    globalHolidayList,
    globalSettings: { workingDays },
  } = useGlobalContext();

  let router = useRouter();
  let validationSchema: any = isMenuModalOpen
    ? addFoodMenuValidationSchema
    : addActivityModalValidation;
  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCurrentOption(e.target.value);

  //   if (e.target.value && !selectedOptions.includes(e.target.value)) {
  //     setSelectedOption([...selectedOptions, e.target.value]);
  //   }
  // };

  // Definition of the handleDeleteChip function
  const handleDeleteChip = (optionToRemove: string) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option !== optionToRemove
    );

    // Assuming setSelectedOptions is a state updater function
    // Update the state to reflect the removal of the option
    setSelectedOption(updatedOptions);
  };

  const handleDateSelect = (selectInfo: any) => {
    // let title = prompt("Please enter a new title for your event");
    // let calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = (clickInfo: any) => {
    let date = moment
      .utc(clickInfo?.el?.fcSeg?.eventRange?.range?.start)
      .format("YYYY-MM-DD");
    let day = moment
      .utc(clickInfo?.el?.fcSeg?.eventRange?.range?.start)
      .format("DD");

    const isHoliday = globalHolidayList.some((holiday: any) => {
      const dateRange = holiday.dates.dates;
      if (dateRange.length === 1) {
        // Single day holiday
        return dateRange[0] === date;
      } else if (dateRange.length === 2) {
        // Range holiday
        return dateRange[0] <= date && date <= dateRange[1];
      }
      return false;
    });

    if (isHoliday) {
      // Prevent any action, like showing a popup to add an event
      toast.error("No actions are allowed on holidays.");
      return;
    }

    if (workingDays) {
      const weekDays = moment
        .utc(clickInfo?.el?.fcSeg?.eventRange?.range?.start)
        .format("dddd");
      if (workingDays["All days(Mon-Fri)"]) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        if (!days.includes(weekDays)) {
          toast.error("No actions are allowed on not working days.");
          return;
        }
      } else {
        const isAvailable = workingDays?.hasOwnProperty(weekDays);
        if (!isAvailable) {
          toast.error("No actions are allowed on not working days.");
          return;
        }
      }
    }

    let Today = Number(day);
    const item = data?.[Today];

    setEventData(item);
    setSelectedDate(date);
    if (clickInfo.event.title === "New Activity") {
      setIsActivityModalOpen(true);
    } else if (clickInfo.event.title === "New Food Menu") {
      setIsMenuModalOpen(true);
    } else if (clickInfo.event.title === "View Menu & Activity") {
      let data = {
        item: item,
        // modalName: "Add food menu"
      };
      setShowDataModal(true);
      setEventData(data);
    }
    // else if (clickInfo.event.title !== "New Food Menu") {
    //   let data = {
    //     item: item,
    //     // modalName: "Add activity"
    //   };
    //   setShowDataModal(true);
    //   setEventData(data);
    // }
  };

  const handleEvents = (events: any) => {
    setCurrentEvents(events);
  };

  const handleFormSubmit = async (data: any) => {
    
    if (eventData?.menu && eventData.menu.length > 0) {
      if (data.menuType === "Veg") {
        const existingVegMenu = eventData?.menu.find((menu: any) => {
          console.log(
            "Menu date:",
            new Date(menu.date).toISOString().split("T")[0],
            data.fromdate,
            new Date(menu.date).toISOString().split("T")[0] === data.fromdate
          );
          return (
            menu.menu_type === "Veg" &&
            menu.meal_type === data.mealType &&
            menu.classroom_category === data.classRoomCategory &&
            new Date(menu.date).toISOString().split("T")[0] === data.fromdate
          );
        });

        if (existingVegMenu) {
          toast.error(
            "A vegetarian menu already exists for this meal type, classroom category, and date."
          );
          return;
        }
      } else if (data.menuType === "Non-Veg") {
        const existingNonVegMenu = eventData?.menu.find(
          (menu: any) =>
            menu.menu_type === "Non-Veg" &&
            menu.meal_type === data.mealType &&
            menu.classroom_category === data.classRoomCategory &&
            new Date(menu.date).toISOString().split("T")[0] === data.fromdate &&
            menu.menu_subtype === data.menuSubType
        );

        if (existingNonVegMenu) {
          toast.error(
            "A non-vegetarian menu already exists for this meal type, classroom category, date, and sub-menu type."
          );
          return;
        }
      }
    }


    try {
      let body = {
        ...data,
        foodItems: data?.foodItems.map((item: any) => item.toString()),
      };
      let res = await createFoodMenu(body);
      if (res?.success) {
        // router?.push("/classroomManagement");
        toast.success(res.message);
        await reloadData();
        setIsMenuModalOpen(false);
        reset();
      } else {
        console.log(res?.error)
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnauthorizedError(router);
      }

      let errorMessages: any = error?.response?.data?.error;
      const errorMessageString = errorMessages
        .map((error: any) => error.message)
        .join("\n");
      toast.error(
        errorMessageString ||
          error.response.data.message ||
          error.response.data.error
      );
      // console.log(error.response.data)
    }
  };

  const handleActivitySubmit = async (data: any) => {
    let materialUsed = data?.materialUsed.map((item: any) => item.material);

    let instructions = data?.instructions.map((item: any) => item.step);

    try {
      data.materialsUsed = materialUsed;
      data.instructions = instructions;
      // console.log('Data',data)
      let res: any;
      if (val) {
        const from = new Date(data?.fromdate);
        const to = new Date(data?.todate);
        if (from > to) {
          toast.error("From date should  be less than to date");
        } else {
          res = await createActivityPlanning(data);
        }
      } {
        res = await createActivityPlanning(data);
      }
      if (res?.success) {
        // router?.push("/classroomManagement");
        toast.success(res.message);
        await reloadData();
        setIsActivityModalOpen(false);
        reset();
      } else {
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnauthorizedError(router);
      }

      let errorMessages: any = error?.response?.data?.error
      const errorMessageString = errorMessages.map((error: any) => error.message).join('\n');
      toast.error(errorMessageString || error.response.data.message || error.response.data.error)
      // console.log(error.response.data)
    }
  };
  const generateEventsForDays = (startDay: string, endDay: string) => {
    const events = [];
    const currentDate = moment.utc(`${selectedMonth} 1, 2024`);
    const lastDay = currentDate.clone().endOf("month").date();

    // Iterate through each day in the month
    for (let day = 1; day <= lastDay; day++) {
      const eventStartDate = currentDate.clone().date(day);

      // Check if there is data for the current day in the map
      // const item = data.find((item) => item.day === day);

      // Create events based on the data or default values for Food
      const addFoodMenuEvent = {
        title: "New Food Menu",
        start: eventStartDate.toISOString(),
        end: eventStartDate.toISOString(),
      };
      events.push(addFoodMenuEvent);
      const addFoodMenu = {
        title: "New Activity",
        start: eventStartDate.toISOString(),
        end: eventStartDate.toISOString(),
      };
      events.push(addFoodMenu);

      // Create events based on the data or default values for Activity
      const addView = {
        title: "View Menu & Activity",
        start: eventStartDate.toISOString(),
        end: eventStartDate.toISOString(),
      };
      events.push(addView);
      const holidayEvent = globalHolidayList.filter((holiday: any) => {
        const dateRange = holiday.dates.dates;

        // const startDateString = eventStartDate.toISOString().split("T")[0];

        if (dateRange.length === 1) {
          const start = moment.utc(dateRange[0]);
          const end = moment.utc(dateRange[0]);

          return (
            start.isSameOrBefore(eventStartDate) &&
            eventStartDate.isSameOrBefore(end)
          );
        } else if (dateRange.length === 2) {
          const start = moment.utc(dateRange[0]);
          const end = moment.utc(dateRange[1]);

          return (
            start.isSameOrBefore(eventStartDate) &&
            eventStartDate.isSameOrBefore(end)
          );
        }

        return false;
      });

      if (holidayEvent.length > 0) {
        // Handle multiple holiday events on the same date
        holidayEvent.forEach((holidayEvent: any) => {
          const addHolidayEvent = {
            title: holidayEvent.name,
            start: eventStartDate.toISOString(),
            end: eventStartDate.toISOString(),
            className: "holiday-event",
          };
          events.push(addHolidayEvent);
        });
      }
    }
    return events;
  };

  const handleCloseModal = () => {
    setIsActivityModalOpen(false);
    setIsMenuModalOpen(false);
    setShowFoodMenu(false);
    setShowActivity(false);
    reset()
    // setSelectedEvent(null);
  };
  const startDate = "2024-01-01";
  const endDate = "3000-12-01";

  useEffect(() => {
    let thisyear = moment().utc().year();
    const calendarApi = calendarRef.current?.getApi();
    if (selectedMonth < 10) {
      calendarApi?.gotoDate(`${thisyear}-0${selectedMonth}-01`); // YYYY-MM-DD
    } else {
      calendarApi?.gotoDate(`${thisyear}-${selectedMonth}-01`); // YYYY-MM-DD
    }
  }, [selectedMonth]);

  return (
    <div className="demo-app">
      <div className="demo-app-main relative">
        {" "}
        <div className=" text-[#4B4B4B] font-medium text-base flex flex-col xl:left-[-20px] absolute z-10 xl:text-[20px] xl:top-[18%] xl:gap-36  lg:top-[21%]  lg:gap-20  md:top-[28%] md:gap-12 md:text-xs">
          <div className="transform -rotate-90">Week 1</div>
          <div className="transform -rotate-90">Week 2</div>
          <div className="transform -rotate-90">Week 3</div>
          <div className="transform -rotate-90">Week 4</div>
          <div className="transform -rotate-90">Week 5</div>
        </div>
        <div className="px-12">
          <FullCalendar
            timeZone="UTC"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              // left: "prev,next today",
              // center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            dayHeaderClassNames="bg-[#FFF3E1] text-[#B35B3D] text-center font-bold"
            events={generateEventsForDays(startDate, endDate)}
            eventClassNames="custom-event"
            initialView="dayGridMonth"
            editable={true}
            height="auto"
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            showNonCurrentDates={showNonCurrentDates}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            dayHeaderFormat={dayHeaderFormat}
            ref={calendarRef}
            initialDate={todayDate}
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventRemove={function(){}}
 
      */
          />
        </div>
      </div>
      {isActivityModalOpen && (
        <FormModal
          modalOpen={isActivityModalOpen}
          cancelText={"Cancel"}
          AddText={"Add"}
          closeModal={handleCloseModal}
          modalName={"EditDiscountModal"}
          handleSubmit={handleSubmit}
          onformsubmit={handleActivitySubmit}
        >
          <AddActivityModal
            control={control}
            watch={watch}
            classroomCategory={classRoomCatogery}
            setValue={setValue}
            register={register}
            errors={errors}
            closeModal={handleCloseModal}
            setShowActivity={setShowActivity}
            showactivity={showactvity}
            selectedDate={selectedDate}
            selectedSchool={selectedSchool}
            val={val}
            setVal={setVal}
          />
        </FormModal>
      )}

      {isMenuModalOpen && (
        <div>
          <FormModal
            modalOpen={isMenuModalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={handleCloseModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={handleFormSubmit}
          >
            <FoodMenuModal
              register={register}
              classroomcategory={classRoomCatogery}
              errors={errors}
              setValue={setValue}
              watch={watch}
              closeModal={handleCloseModal}
              control={control}
              showfoodmenu={showfoodmenu}
              setShowFoodMenu={setShowFoodMenu}
              selected={selected}
              setSelected={setSelected}
              // handleSelectChange={handleSelectChange}
              selectedDate={selectedDate}
              selectedSchool={selectedSchool}
            />
          </FormModal>
        </div>
      )}

      {showDataModal && (
        <div>
          <FormModal
            modalOpen={showDataModal}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={() => setShowDataModal(false)}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={handleFormSubmit}
          >
            <EventData
              closeModal={() => setShowDataModal(false)}
              eventData={eventData}
              selectedSchool={selectedSchool}
              reloadData={reloadData}
            />
          </FormModal>
        </div>
      )}
      <ToastContainer />
      <style>
        {`
          .fc .fc-view-harness-active > .fc-view {
              border: 2px solid #E7A48D; 
              border-radius: 10px;
          }
          .fc .fc-col-header-cell {
              padding: 10px; /* Adjust padding as needed */
          }
          
          
          .custom-event:hover {
            background-color:white; /* hover cell background */

          }
          
          .fc-scrollgrid {
            border-top: none !important;//this is for the outer border for calender
          }

          // this is for the calender border container radius
          // .fc-day-fri{
          //   border-radius:0px 8px 0px 0px;  //for friday col
          //   border-right:none !important;
          // }
          // .fc-day-mon{
          //   border-radius:8px 0px 0px 0px;  //for monday col
          // }
         
          .fc-scrollgrid-liquid {
            border-radius:50px; 
          }
          .fc-daygrid-day-frame{
            background-color:white;
          }

          .fc-scrollgrid-sync-inner{
            border-radius:2px;           
          }
          `}
      </style>
    </div>
  );
};

export default BasicCalendar;