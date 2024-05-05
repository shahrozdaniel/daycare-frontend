import React, { useState } from "react";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";

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
  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="flex items-center space-x-2 p-3 bg-input_bg rounded-[20px] mb-4 col-span-1">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
        >
          {day}
        </label>
        <div className="flex-shrink-0">
          {!state && (
            <input
              type="checkbox"
              id="terms"
              checked={Object.keys(timeval).includes(day)}
              onClick={onCheckboxChange}
            />
          )}
        </div>
      </div>
      {value.map((item: string, index) => {
        return (
          <div key={index} className="col-span-2">
            <CustomInput
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
            />
            {error[day] && error[day].includes("end-error") && index === 1 ? (
              <p className="text-red-500 text-sm  ml-4">End time is required</p>
            ) : null}
            {error[day] && error[day].includes("start-error") && index === 0 ? (
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

const DaysComponent: React.FC<DaysComponentProps> = ({
  control,
  value,
  setValue,
  state,
  error,
}) => {
  // const [value, setValue] = useState<any>([]);
  const [availability, setAvailability] = useState<any>({
    Monday: ["10:00 AM", "6:00 PM"],
    Tuesday: ["10:00 AM", "6:00 PM"],
    Wednesday: ["10:00 AM", "6:00 PM"],
    Thursday: ["10:00 AM", "6:00 PM"],
    Friday: ["10:00 AM", "6:00 PM"],
  });
  const [checkedval, setCheckedVal] = useState(value || []);
  const [allDay, setAllDay] = useState<any>({
    "All days(Mon-Fri)": ["10:00 AM", "6:00 PM"],
  });

  const handleCheckboxChange = (day: string, e: any) => {
    setAvailability((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };
      if (updatedAvailability[day].length === 0) {
        // If no time is selected, set default times
        // updatedAvailability[day] = ["10:00 AM", "6:00 PM"];
      } else {
        // If times are selected, reset them
        // updatedAvailability[day] = [];
      }
      return updatedAvailability;
    });

    setValue((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[day] = [];
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

      let filtered: any = value.filter(
        (item) =>
          value.indexOf(item) != index &&
          (value[1].includes("PM") || value[0].includes("AM"))
      );

      if (filtered.length !== 0) {
        let indexhere = value.indexOf(filtered[0]);
        value[indexhere] = "";
      }
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

export default DaysComponent;
