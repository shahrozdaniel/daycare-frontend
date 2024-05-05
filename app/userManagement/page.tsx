import React from 'react'
import Switch from '@/components/common/Switch'
import Image from 'next/image'
import down_arrow from "../../public/images/down_arrow.png"
import search from "../../public/images/search.png"
import calendar from "../../public/images/calendar.png"
import { User, columns } from './columns'
import UserTable from './components/UserTable'

const Page = () => {
  const data: User[] = [
    {
      id: "1",
      name: "efwef",
      classroom: "Toddler",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "2",
      name: "efwef",
      classroom: "Infant",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "3",
      name: "efwef",
      classroom: "K.G.",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "4",
      name: "efwef",
      classroom: "Pre-School",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "4",
      name: "efwef",
      classroom: "Toddler",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "5",
      name: "qwer",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "6",
      name: "qwer",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "7",
      name: "qwer",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "8",
      name: "qwer",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "9",
      name: "efwef",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "10",
      name: "efwef",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "11",
      name: "efwef",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "12",
      name: "efwef",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "13",
      name: "efwef",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
    {
      id: "14",
      name: "efwef",
      classroom: "dwefre",
      role: "Educator",
      date: new Date(),
      checkIn: new Date(),
      checkOut: new Date(),
      duration: new Date(),
    },
  ];

  return (
    <>
      <main className="p-4 h-[87.8%]">
        <section
          className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-6 overflow-auto
            "
        >
          <div className="mb-2">
            <Switch />
          </div>
          <UserTable columns={columns} data={data} />
        </section>
      </main>
    </>
  );
};

export default Page;
