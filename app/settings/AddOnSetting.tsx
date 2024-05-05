'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PenSquare } from "lucide-react";
import { useGlobalContext } from "../context/store";

const AddOnSetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions
  const [disable, setIsdisable] = useState<boolean>(false)
 
  const isDisablePermisson = () => {
    if (IsAdmin) {
      setIsdisable(false)
    }
    if (userPermission?.setting?.add_edit === false) {
      setIsdisable(true)
    }
  }
  useEffect(() => {
    isDisablePermisson()
  }, [IsAdmin, permission])
  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Add On Setting</h1>
      <hr /> */}

      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Add On Setting
          </h1>
        </div>
      </div>

      {/* <div className="flex p-4 gap-10">
        <Card className="flex items-center w-fit relative rounded-[24px]">
          <PenSquare className="text-blue-b1 absolute top-3 right-3" size={16}/>
          <CardHeader className="p-1">
            <Image src={"/images/facebook.png"} alt="facebook" width={70} height={70}/>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <p className="font-sans font-medium mt-5">Facebook</p>
            <p className="text-black-b2">Facebook Integration</p>
            <p className="bg-red-r4 text-red-r3 p-1 rounded-xl w-fit text font-sans font-medium text-xs flex gap-1">
              <Image src={"/svgs/redring.svg"} alt="ring" height={12} width={12}/>
              Disabled
            </p>
          </CardContent>
        </Card>
        <Card className="flex items-center w-fit relative rounded-[24px]">
          <PenSquare className="text-blue-b1 absolute top-3 right-3" size={16}/>
          <CardHeader className="p-1">
            <Image src={"/images/google.png"} alt="facebook" width={70} height={70}/>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <p className="font-sans font-medium mt-5">Google</p>
            <p className="text-black-b2">Google Integration</p>
            <p className="bg-green-g1 text-green-g2 p-1 rounded-xl w-fit text font-sans font-medium text-xs flex gap-1">
              <Image src={"/svgs/greenring.svg"} alt="ring" height={12} width={12}/>
              Enabled
            </p>
          </CardContent>
        </Card>
      </div> */}
      <h1 className="text-center mb-2 text-black-b1" style={{ marginTop: "20%" }}>No add on avilable</h1>
    </>
  );
};

export default AddOnSetting;
