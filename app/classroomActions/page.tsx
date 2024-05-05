"use client";
import React, { useState } from "react";
import {
  ClassroomActionContainer,
  TableContainer,
} from "./classroomActions.styled";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SliderSwiper from "@/components/common/Slider";
import ClassroomCard from "./components/classroomCard";
import ClassRoomList from "./components/classroomList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Page = () => {
  const [slideraction, setSliderAction] = useState("");

  const handleSliderAction = (value: string) => {
    setSliderAction(value);
  };
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
 
  return (
    <>
      <div className="bg-[url('/images/classroom-background.png')] w-full h-full object-cover pt-14 px-14">
        <ClassRoomList />
      </div>
      {/* <ClassroomActionContainer>
        <div>
          <SliderSwiper handleSliderAction={handleSliderAction} />
        </div>
      </ClassroomActionContainer> */}
    </>
  );
};

export default Page;
