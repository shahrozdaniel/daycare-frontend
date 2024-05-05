import React, { useEffect, useState } from "react";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { HOURS, MINUTES, TIME } from "@/utils/constants";

type DayAvailability = string[];

export type AvailabilityState = {
  [key: string]: DayAvailability;
};

export type SetAvailabilityFunction = React.Dispatch<
  React.SetStateAction<AvailabilityState>
>;

interface DaysComponentProps {
  control: any;
  value: AvailabilityState;
  setValue: SetAvailabilityFunction;
  state?: boolean;
  error?: any;
  setError?: any;
}

const DaySelector: React.FC<{
  day: string;
  value: string[];
  onChange: (value: string[], index: number) => void;
  onCheckboxChange?: (e: any) => void;
  state?: boolean;
  error?: any;
  timeval?: any;
  checkval?: any;
}> = ({
  day,
  value,
  onChange,
  onCheckboxChange,
  state,
  error,
  timeval,
  checkval,
}) => {
  let mainPart,bracketPart;
  if(day==="All days(Mon-Fri)"){
  const start=day.indexOf('(');
  const end = day.indexOf(')');
  mainPart = day.substring(0, start).trim();
  bracketPart = day.substring(start, end+1);
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 grid-rows-auto gap-3">
      <div className="flex items-center space-x-2 p-2 bg-input_bg rounded-[6px] mb-2 mt-1 col-span-1 lg:col-span-2 xl:col-span-1">
        <label
          htmlFor={`terms-${day}`}
          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer break-all"
        >
          {day==="All days(Mon-Fri)"? <><p>{mainPart}</p><p className="mt-1">{bracketPart}</p></>: day}
        </label>
        <div className="flex-shrink-0">
          {!state && (
            <input
              type="checkbox"
              id={`terms-${day}`}
              checked={Object.keys(timeval).includes(day)}
              onClick={onCheckboxChange}
            />
          )}
        </div>
      </div>
      {value.map((item: any, index) => {
        const start = error[day] && error[day][0];
        const end = error[day] && error[day][1];
        return (
          <div
            key={index}
            className="col-span-2 flex flex-col gap-2 md:col-span-1 xl:col-span-2"
          >
            {index === 0 && (
              <p className="text-[#323232] text-sm xl:hidden">
                Start Time
              </p>
            )}
            {index === 1 && (
              <p className="text-[#323232] text-sm xl:hidden">
                End Time
              </p>
            )}
            <div className="flex flex-1 flex-row gap-1">
              <CustomSelect
                name={"hour"}
                value={item.hour}
                options={HOURS}
                label="Hr"
                onChange={(e) => {
                  const updatedValue: any = [...value];

                  updatedValue[index].hour = e.target.value;

                  onChange(updatedValue, index);
                }}
              />
              <CustomSelect
                name={"minute"}
                value={item.minute}
                options={MINUTES}
                label="Mins"
                onChange={(e) => {
                  const updatedValue: any = [...value];
                  updatedValue[index].minute = e.target.value;

                  onChange(updatedValue, index);
                }}
              />
              <CustomSelect
                name={"timeZone"}
                value={item.meridian}
                options={TIME}
                label="As"
                onChange={(e) => {
                  const updatedValue: any = [...value];
                  updatedValue[index].meridian = e.target.value;

                  onChange(updatedValue, index);
                }}
              />
            </div>

            {/* <CustomInput
              name="start time"
              type="time"
              placeholder={index === 0 ? "Start Time:" : "End Time:"}
              value={(timeval[day] && timeval[day][index]) || item}
              onChange={(e) => {
                const updatedValue = [...value];
                updatedValue[index] = e.target.value;

                onChange(updatedValue, index);
              }}
              className="time-picker w-6/12"
            /> */}
            {end &&
            end.hour === "0" &&
            end.minute === "00" &&
            end.meridian === "PM" &&
            index === 1 ? (
              <p className="text-red-500 text-sm  ml-4">End time is required</p>
            ) : null}
            {start &&
            start.hour === "0" &&
            start.minute === "00" &&
            start.meridian === "AM" &&
            index === 0 ? (
              <p className="text-red-500 text-sm  ml-4">
                Start time is required
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const ResponsiveDaysComponent: React.FC<DaysComponentProps> = ({
  control,
  value,
  setValue,
  state,
  error,
}) => {
  // const [value, setValue] = useState<any>([]);
  const [availability, setAvailability] = useState<any>({
    Monday: [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
    Tuesday: [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
    Wednesday: [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
    Thursday: [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
    Friday: [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
  });
  const [checkedval, setCheckedVal] = useState(value || []);
  const [allDay, setAllDay] = useState<any>({
    "All days(Mon-Fri)": [
      { hour: "0", minute: "00", meridian: "AM" },
      { hour: "0", minute: "00", meridian: "PM" },
    ],
  });

  useEffect(() => {
    if (value && state) {
      const available = { ...allDay, ...value };
      setAllDay(available);
    }
    if (value && !state) {
      const available = { ...availability, ...value };
      setAvailability(available);
    }
  }, [value]);

  const handleCheckboxChange = (day: string, e: any) => {
    setAvailability((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };
      // if (updatedAvailability[day].length === 0) {
      // If no time is selected, set default times
      // updatedAvailability[day] = ["10:00 AM", "6:00 PM"];
      // } else {
      // If times are selected, reset them
      // updatedAvailability[day] = [];
      // }
      return updatedAvailability;
    });

    setValue((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[day] = [
        { hour: "0", minute: "00", meridian: "AM" },
        { hour: "0", minute: "00", meridian: "PM" },
      ];
      // If times are selected, reset them
      // if (updatedAvailability[day]) {
      //   updatedAvailability[day] = [];
      // }
      if (e.target.checked === false) {
        if (day in updatedAvailability) {
          delete updatedAvailability[day];
        }
      }

      return updatedAvailability;
    });
  };

  const handleTimeChange = (day: string, value: string[], index: number) => {
    // const getTimePeriod = (time: string): string => {
    //   const hours = parseInt(time.split(":")[0], 10);
    //   return hours < 12 ? "AM" : "PM";
    // };

    // let timenewval = value.map((item) => {
    //   return item + " " + getTimePeriod(item);
    // });

    setValue((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };

      //       let filtered: any = value.filter(
      //         (item) => value.indexOf(item) != index
      //         //  &&
      //         // (value[1].includes("PM") || value[0].includes("AM"))
      //       );
      // console.log(filtered);

      //       if (filtered.length !== 0) {
      //         let indexhere = value.indexOf(filtered[0]);
      //         console.log(indexhere);

      //         value[indexhere] = "";
      //       }
      updatedAvailability[day] = value;
      return updatedAvailability;
    });

    state
      ? setAllDay((prevAvailability: any) => {
          const updatedAvailability = { ...prevAvailability };
          updatedAvailability[day] = value;
          return updatedAvailability;
        })
      : setAvailability((prevAvailability: any) => {
          const updatedAvailability = { ...prevAvailability };
          updatedAvailability[day] = value;
          return updatedAvailability;
        });
  };

  return (
    <>
      {/* ... (your existing code) ... */}

      {Object.keys(state ? allDay : availability).map((day) => (
        <DaySelector
          state={state}
          key={day}
          day={day}
          error={error}
          value={state ? allDay[day] : availability[day]}
          timeval={value}
          checkval={checkedval}
          onChange={(value, index) => handleTimeChange(day, value, index)}
          onCheckboxChange={(e) => handleCheckboxChange(day, e)}
        />
      ))}
      {/* ... (your existing code) ... */}
    </>
  );
};

export default ResponsiveDaysComponent;
