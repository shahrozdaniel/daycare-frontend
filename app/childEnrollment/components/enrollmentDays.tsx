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
}

const DaySelector: React.FC<{
  day: string;
  value: string[];
  onChange: (value: string[]) => void;
  onCheckboxChange: () => void;
}> = ({ day, value, onChange, onCheckboxChange }) => {
  return (
    <div className="flex gap-3">
      <div className="flex items-center space-x-2 p-3 bg-input_bg rounded-[20px] mb-4">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
        >
          {day}
        </label>
        <div className="flex-shrink-0">
          <Checkbox id="terms" onChange={onCheckboxChange} />
        </div>
      </div>
      {/* {value.map((item: string, index) => (
        <div key={index}>
          <CustomInput
            name="start time"
            type="time"
            placeholder={index === 0 ? "Start Time:" : "End Time:"}
            value={item}
            onChange={(e) => {
              const updatedValue = [...value];
              updatedValue[index] = e.target.value;
              onChange(updatedValue);
            }}
            className="time-picker w-6/12"
          />
        </div>
      ))} */}
    </div>
  );
};

const EnrollmentDaysComponent: React.FC<DaysComponentProps> = ({
  control,
  value,
  setValue,
}) => {
  // const [value, setValue] = useState<any>([]);
  const [availability, setAvailability] = useState<any>({
    Mon: ["10:00 AM", "6:00 PM"],
    Tue: ["10:00 AM", "6:00 PM"],
    Wed: ["10:00 AM", "6:00 PM"],
    Thu: ["10:00 AM", "6:00 PM"],
    Fri: ["10:00 AM", "6:00 PM"],
    Sat: ["10:00 AM", "6:00 PM"],
    Sun: ["10:00 AM", "6:00 PM"],
  });

  const handleCheckboxChange = (day: string) => {
    // setAvailability((prevAvailability: any) => {
    //   const updatedAvailability = { ...prevAvailability };
    //   if (updatedAvailability[day].length === 0) {
    //     // If no time is selected, set default times
    //     updatedAvailability[day] = ["10:00 AM", "6:00 PM"];
    //   } else {
    //     // If times are selected, reset them
    //     updatedAvailability[day] = [];
    //   }
    //   return updatedAvailability;
    // });

    setValue((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };

      // If times are selected, reset them
      updatedAvailability[day] = [];
      return updatedAvailability;
    });
  };

  const handleTimeChange = (day: string, value: string[]) => {
    // const getTimePeriod = (time: string): string => {
    //   const hours = parseInt(time.split(":")[0], 10);
    //   return hours < 12 ? "AM" : "PM";
    // };

    // let timenewval = value.map((item) => {
    //   return item + " " + getTimePeriod(item);
    // });

    setAvailability((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[day] = value;
      return updatedAvailability;
    });
    setValue((prevAvailability: any) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[day] = value;
      return updatedAvailability;
    });
  };

  return (
    <div className="flex gap-2">
      {/* ... (your existing code) ... */}
      {Object.keys(availability).map((day) => (
        <DaySelector
          key={day}
          day={day}
          value={availability[day]}
          onChange={(value) => handleTimeChange(day, value)}
          onCheckboxChange={() => handleCheckboxChange(day)}
        />
      ))}
      {/* ... (your existing code) ... */}
    </div>
  );
};

export default EnrollmentDaysComponent;
