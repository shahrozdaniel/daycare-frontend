import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../events-utils";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useGlobalContext } from "@/app/context/store";
import { el } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
// import FoodMenu from "../../ModalComponents/FoodMenu";
// import AddActivity from "../../ModalComponents/AddActivity";
// import AddActivityModal from "../CalendarActivityModal";
// import FoodMenuModal from "../CalendarFoodMenuModal";

const VacancyCalendar: React.FC<{
  data: any;
  selectedMonth: number;
  selectedYear?: number;
  showEnrolledChildTable: boolean;
  setShowEnrolledChildTable: any;
  setEnrolledChildData: any;
  onClicDate: any;
  year: any;
  selectedDate: any;
  getChildWaitlistDataByStartDate: any;
}> = ({
  data,
  selectedMonth,
  selectedYear,
  showEnrolledChildTable,
  setShowEnrolledChildTable,
  setEnrolledChildData,
  onClicDate,
  selectedDate,
  year,
  getChildWaitlistDataByStartDate,
}) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [showfoodmenu, setShowFoodMenu] = useState(false);
  const [showactvity, setShowActivity] = useState(false);
  const { control } = useForm();
  const calendarRef = useRef<any>(null);

  const {
    globalHolidayList,
    globalSettings: { workingDays, dateFormat },
  } = useGlobalContext();
  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const preprocessEvents = (events: any) => {
    let combinedEvents: any = [];

    events.forEach((event: any) => {
      if (event.title === "Vacant" || event.title === "T. Capacity") {
        // Check if there's already a combined event for this date
        let existing = combinedEvents.find((e: any) => e.start === event.start);

        if (existing) {
          // If there's already an event on this date, add this event's data to the combinedEvents property
          existing.combinedEvents.push(event);
        } else {
          combinedEvents.push({
            ...event,
            combinedEvents: [event],
          });
        }
      } else {
        combinedEvents.push(event);
      }
    });
    return combinedEvents;
  };

  function renderEventContent(eventInfo: any) {
    let count = 0;
    const isSelectedDate =
      selectedDate && moment(selectedDate).isSame(eventInfo.event.start, "day");

    const todaydate = moment(eventInfo.event.start).isSame(
      eventInfo.event.start,
      "day"
    );

    // Get the current event's index in the combinedEvents array
    const currentIndex =
      eventInfo.event?.extendedProps?.combinedEvents?.findIndex(
        (item: any) => item.id === eventInfo.event.id
      );
    count++;
    return (
      <div className={`w-full ${isSelectedDate ? "selected-date" : ""}`}>
        {eventInfo.event.extendedProps?.combinedEvents?.length > 0 ? (
          <div
            className={`flex py-4  border-l-[0.4em]  mx-2 rounded ${
              eventInfo.event.extendedProps.val === 0
                ? "border-l-[#FE4445] bg-[#FFF3F0]"
                : "border-l-[#227644] bg-[#EEFCF4]"
            }`}
          >
            {eventInfo.event.extendedProps.combinedEvents.map(
              (combinedEvent: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`w-1/2 flex flex-col text-center p-2 ${
                      combinedEvent?.title === "Vacant" &&
                      eventInfo.event.extendedProps.val === 0 &&
                      "border-r-2 border-[#EFC5C5]"
                    } ${
                      combinedEvent?.title === "T. Capacity" &&
                      eventInfo.event.extendedProps.val > 0 &&
                      "border-l-2 border-[#C5EFDD]"
                    }  `}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        let startdate = moment(combinedEvent.start).format(
                          "YYYY-MM-DD"
                        );
                        if (
                          (combinedEvent.title === "Vacant" ||
                            combinedEvent.title === "T. Capacity") &&
                          eventInfo.event.extendedProps.enrolledchildData
                            ?.length > 0
                        ) {
                          onClicDate(
                            moment.utc(combinedEvent?.start).format(format)
                          );
                          setShowEnrolledChildTable(true);
                          setEnrolledChildData(
                            eventInfo.event.extendedProps.enrolledchildData.map(
                              (item: any) => {
                                let childdata = {
                                  childname: `${item.first_name} ${item.last_name}`,
                                  childphoto: item.photo,
                                };
                                return {
                                  ...item,
                                  childName: childdata,
                                  schedule: item?.days,
                                  graduationDate: item.end_date_string
                                    ? item.end_date_string
                                    : item.graduationDate,
                                  reason: item.graduation_date
                                    ? "termination"
                                    : "graduation",
                                };
                              }
                            )
                          );

                          getChildWaitlistDataByStartDate(startdate);
                        } else {
                          console.log("c");
                          
                          setEnrolledChildData([])
                          setShowEnrolledChildTable(false);
                          getChildWaitlistDataByStartDate(startdate);
                        }
                      }}
                    >
                      <div
                        className={`${
                          eventInfo.event.extendedProps.val === 0
                            ? "text-[#FE4445]"
                            : "text-[#227644]"
                        }  font-bold text-[16px]`}
                      >
                        {combinedEvent.val}
                      </div>

                      <div className="text-[#555353] mt-1 font-semibold text-[12px]">
                        {combinedEvent.title}
                      </div>
                    </button>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="bg-[#EEFCF4] mx-2 text-[#227644] rounded-md font-bold text-center p-2 capitalize">
            {eventInfo.event.title} Holiday
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (selectedMonth < 10) {
      calendarApi?.gotoDate(`${year}-0${selectedMonth}-01`); // YYYY-MM-DD
    } else {
      calendarApi?.gotoDate(`${year}-${selectedMonth}-01`); // YYYY-MM-DD
    }
  }, [selectedMonth, year]);
  const format = dateFormat?.toUpperCase() || "DD-MM-YYYY";

  const generateEventsForDays = () => {
    const events = [];
    const currentDate = moment.utc(`${selectedMonth} 1, ${year}`);
    const lastDay = currentDate.clone().endOf("month").date();
    let weekdays = workingDays && Object.keys(workingDays);

    for (let day = 1; day <= lastDay; day++) {
      const eventStartDate = currentDate.clone().date(day);
      const dayOfWeek = eventStartDate.format("dddd");

      if (eventStartDate.isSameOrAfter(moment.utc(), "day")) {
        const anotherTypeEvent = {
          title: "Vacant",
          val: data[day]?.vacancy,
          start: eventStartDate.toISOString(),
          enrolledchildData: data[day]?.enrolledChildData,
        };

        const Tcapacity = {
          title: "T. Capacity",
          val: data[day]?.capacity,
          start: eventStartDate.toISOString(),
        };

        const holidayEvent = globalHolidayList.filter((holiday: any) => {
          const dateRange = holiday.dates.dates;

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
        // Check if the day is Saturday (6) or Sunday (0)
        const isWeekend =
          eventStartDate.day() === 6 || eventStartDate.day() === 0;

        if (holidayEvent.length > 0) {
          holidayEvent.forEach((holidayEvent: { name: string }) => {
            const addHolidayEvent = {
              title: holidayEvent.name,
              start: eventStartDate.toISOString(),
              end: eventStartDate.toISOString(),
              className: "holiday-event",
            };

            events.push(addHolidayEvent);
          });
        } else if (isWeekend || !weekdays?.includes(dayOfWeek)) {
          console.log("dont do anything");
        } else {
          events.push(anotherTypeEvent);
          events.push(Tcapacity);
        }
      }
    }

    return events;
  };

  const combinedEvents = preprocessEvents(generateEventsForDays());

  const handleCloseModal = () => {
    setIsActivityModalOpen(false);
    setIsMenuModalOpen(false);
    setShowFoodMenu(false);
    setShowActivity(false);
    // setSelectedEvent(null);
  };

  const dayHeaderContent = (arg: any) => {
    // If you want to hide specific days (for example, weekends), you can return null
    if (arg.date.getDay() === 0 || arg.date.getDay() === 6) {
      return "hello";
    }
    // Otherwise, return the content of the day header cell
    return arg.dayNumberText;
  };

  const handleEventClick = (clickInfo: any) => {
    const selectedDate = clickInfo?.el?.fcSeg?.eventRange?.range?.start;
    let date = moment.utc(selectedDate).format(format);
    onClicDate(moment.utc(selectedDate).format(format));

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
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main relative">
        {/* <div className=" text-[#4B4B4B] font-medium text-base flex flex-col xl:left-[-50px] absolute z-10 xl:text-[20px] xl:top-[18%] xl:gap-36  lg:top-[21%]  lg:gap-20  md:top-[28%] md:gap-14 md:left-[-30px] md:text-xs">
          <div className="transform -rotate-90">Week 1</div>
          <div className="transform -rotate-90">Week 2</div>
          <div className="transform -rotate-90">Week 3</div>
          <div className="transform -rotate-90">Week 4</div>
          <div className="transform -rotate-90">Week 5</div>
        </div> */}

        <FullCalendar
          timeZone="UTC"
          plugins={[dayGridPlugin]}
          events={combinedEvents}
          weekends={true}
          ref={calendarRef}
          initialView="dayGridMonth"
          // hiddenDays={ [ 1, 3, 5 ]}
          height="auto"
          firstDay={1}
          eventContent={renderEventContent}
          eventClassNames="custom-event"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dayHeaderClassNames="bg-[#FFF3E1] text-[#B35B3D] h-10 text-[16px] text-center font-bold"
          showNonCurrentDates={true}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventClick={handleEventClick}
          dayHeaderFormat={{ weekday: "long" }}
        />
      </div>
      <ToastContainer />

      {/* {isActivityModalOpen && (
        <div>
          <Modal
            modalOpen={isActivityModalOpen}
            cancelText={"Cancel"}
            AddText={"Save"}
            closeModal={handleCloseModal}
            modalName={"acvittymodal"}
          >
            <AddActivityModal
              control={control}
              setShowActivity={setShowActivity}
              showactivity={showactvity}
            />
          </Modal>
        </div>
      )}

      {isMenuModalOpen && (
        <div>
          <Modal
            modalOpen={isMenuModalOpen}
            cancelText={"Cancel"}
            AddText={"Save"}
            closeModal={handleCloseModal}
            modalName={"FoodMenuModal"}
          >
            <FoodMenuModal
              control={control}
              showfoodmenu={showfoodmenu}
              setShowFoodMenu={setShowFoodMenu}
            />
          </Modal>
        </div>
      )} */}
      <style>{`

.fc .fc-view-harness-active > .fc-view {
  border: 2px solid #E7A48D; 
  border-radius: 10px;
}
.fc .fc-col-header-cell {
  padding: 10px; /* Adjust padding as needed */
}
.fc-day-fri{
  border-radius:0px 8px 0px 0px;  //for friday col
  border-right:none !important;
}
.fc-day-mon{
  border-radius:8px 0px 0px 0px;  //for monday col
}

.fc-scrollgrid-liquid {
  border-radius:50px; 
}
.fc-daygrid-day-frame{
  background-color:white;
}

.fc-scrollgrid-sync-inner{
  border-radius:2px;           
}
          .fc-daygrid-dot-event:hover{
            background-color:white;
          }
          .fc-toolbar-chunk:nth-child(3) {
            display: none;
        }
        .selected-date {
          // background-color: #a0d3ff; 
          border-radius: 5px; 
          border: 2px solid #1e4a7f;
          color: #1e4a7f;
        }
      `}</style>
    </div>
  );
};

export default VacancyCalendar;
