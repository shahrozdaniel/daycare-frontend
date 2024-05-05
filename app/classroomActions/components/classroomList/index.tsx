import React, { useEffect, useState } from "react";
import {
  IconBox,
  SliderBox,
  SliderContainer,
} from "../../classroomActions.styled";
import Image from "next/image";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// import { error } from 'console'

const ClassRoomList = () => {
  const [classRoomData, setClassRoomData] = useState<any>([]);
  const router = useRouter();
  const classRoomList = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        setClassRoomData(res?.data?.list);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    classRoomList();
  }, []);
  return (
    <div className="bg-white rounded-xl w-full h-[80%] mb-2 mx-auto overflow-scroll hide-scroll">
      <Button type="button" onClick={() => router.back()} className="mx-2 my-2">
        {"<- Back"}
      </Button>
      <div className="text-[#4B4B4B] text-center leading-8  font-sans text-[30px] font-medium pt-4 pb-10">
        <span className="text-[30px] font-medium leading-9 text-[#4B4B4B]">
          Select Class
        </span>
        <hr className="bg-[#00858E] mx-auto  h-[3px] w-1/2 mt-4" />
      </div>
      <div className="mx-auto w-10/12">
        <div className="flex flex-wrap gap-[18px] mx-auto justify-center mb-10">
          {classRoomData?.map((e: any, index: any) => {
            console.log('ele',e)
            return (
              <Card
                key={index}
                className="w-[192px] h-[192px] border-2 rounded-[16px] shadow-md  hover:outline-none focus:bg-[#E1E1E1]"
              >
                <CardContent
                  className="flex flex-col items-center justify-between pt-2"
                  onClick={() =>
                    router.push(
                      `/classroomActions/childList?class_room_id=${e?.classroomId}`
                    )
                  }
                >
                  <div className="bg-[#F3FAFF] flex justify-center items-center border-2 border-[#92CDEE] w-[100px] h-[100px] rounded-full m-2">
                    <Image
                      width={60}
                      height={60}
                      alt=""
                      src={e?.logo ? e.logo : "/svgs/no-image.svg"}
                      className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                  </div>
                  <p className="font-sans text-[16px] font-normal text-[#00858E] capitalize">
                    {e?.classroomName}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <style>{`
      .hide-scroll::-webkit-scrollbar {
        display: none;
      }`}</style>
    </div>
  );
};

export default ClassRoomList;
