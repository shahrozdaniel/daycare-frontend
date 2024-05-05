import React from "react";
import { User, columns } from "./columns";
import SleepTable from "./SleepTable";

const allergyData: User[] = [
  {
    id: "1",
    childName: "Baby name",
    associatedClass: "Toddler",
    age: "health",
    sleepTime: "observation",
    duration: "duration",
    viewProfile: "view profile",
  },
];

const HealthReport : React.FC<any> = ({ selectedOption, selectedReport }) => {
  return (
    <>
      <SleepTable columns={columns} data={[]} />
    </>
  );
};

export default HealthReport;
