import React from "react";
import { User, columns } from "./columns";
import HealthTable from "./HealthTable";

const allergyData: User[] = [
  {
    id: "1",
    childName: "Baby name",
    associatedClass: "Toddler",
    healthStatus: "health",
    observation: "observation",
    viewProfile: "view profile",
  },
];

const HealthReport : React.FC<any> = ({ selectedOption, selectedReport }) => {
  return (
    <>
      <HealthTable columns={columns} data={[]} />
    </>
  );
};

export default HealthReport;
