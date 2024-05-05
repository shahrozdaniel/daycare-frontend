"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ChildrenCards from "../components/childrenCards";
import { ClassroomActionContainer } from "../classroomActions.styled";
import CheckInCard from "../components/checkInCard";
import {
  childListbyclass,
  classRoomACtionCreate,
  classroomDetailsById,
} from "@/services/classroomActionServices";
import { useSearchParams, usePathname } from "next/navigation";
import SliderSwiper from "@/components/common/Slider";
import ClassroomCard from "../components/classroomCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const ChildList = () => {
  const [slideraction, setSliderAction] = useState<any>("checkIn");
  const [childrenList, setChildrenList] = useState<any>([]);
  const [selectedChildren, setSelectedChildren] = useState<any>([]);
  const [classroomData, setClassroomData] = useState<any>([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  let clasRoomID = searchParams?.get("class_room_id");

  // console.log('search---------->', clasRoomID)
  const handleSliderAction = (value: string) => {
    setSliderAction(value);
    selectedChildren.length > 0 && setSelectedChildren([]);
  };

  const getClassroomdetails = async () => {
    let res;
    try {
      res = await classroomDetailsById(clasRoomID);
      if (res?.success) {
        setClassroomData(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getALlchildListbyClass = async (id: any) => {
    let res;
    try {
      res = await childListbyclass(id);
      // console.log('res======>',res)
      if (res?.success) {
        setChildrenList(res?.data?.childrenList);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getClassroomdetails();
    getALlchildListbyClass(clasRoomID);
  }, []);

  const submitClassRoomAction = async (
    actionsType: string,
    body: any,
    files: any
  ) => {
    try {
      // let newFormbody = {
      //   ...body,
      //   childDetails: JSON.stringify(selectedChildren),
      // };
      let formData = new FormData();
      formData.append("childDetails", JSON.stringify(selectedChildren));
      if (actionsType === "1") {
        formData.append("checkIn", body.checkIn);
        formData.append("checkInNote", body.checkInNote);
      } else if (actionsType === "12") {
        formData.append("checkOut", body.checkOut);
        formData.append("checkOutNote", body.checkOutNote);
      } else {
        if (files) {
          formData.append("files", files);
        }
        formData.append("details", JSON.stringify(body));
      }

      // console.log("action type", actionsType);
      // console.log("submit action body", newFormbody);
      let res;

      if (selectedChildren && selectedChildren.length > 0) {
        try {
          res = await classRoomACtionCreate(actionsType, formData);
          if (res?.success) {
            // setSelectedChildren([]);
            return res;
          } else {
            toast.error("error");
          }
        } catch (error: any) {
          toast.error(error.response.data.error);
        }
      } else {
        toast.error("Please select a Children");
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  // console.log(selectedChildren)
  console.log("selcted children", selectedChildren);
  return (
    <div className="bg-[url('/images/classroom-background.png')] ">
      <div className="flex items-center justify-center pt-3 ">
        <div className="bg-white flex flex-row justify-center rounded px-5 py-1  items-center gap-2">
          <Image
            src={
              classroomData?.logo ? classroomData?.logo : "/svgs/no-image.svg"
            }
            alt={"classroom logo"}
            width={40}
            height={40}
            className="rounded-full h-10 w-10 object-cover border border-[#00858E]"
          />
          <p className=" text-lg font-semibold text-[#4b4b4b] capitalize">
            {" "}
            {classroomData?.classroomName}
          </p>
        </div>
      </div>
      <div className="h-full  mr-14 ml-16">
        <SliderSwiper
          handleSliderAction={handleSliderAction}
          slideraction={slideraction}
        />
      </div>
      <div className="pb-5">
        <ClassroomActionContainer>
          {/* <SliderSwiper handleSliderAction={handleSliderAction} /> */}
          <div className="h-full bg-white rounded-xl pb-5 mx-4">
            <div className=" mb-5 text-center pt-6 ">
              <span className="text-[30px] font-medium leading-9 text-[#4B4B4B]">
                {"Select children to add activity"}
              </span>
              <hr className="bg-[#00858E] mx-auto  h-[3px] w-1/2 mt-1" />
            </div>
            {/* Children list Items  */}

            <ChildrenCards
              childrenList={childrenList}
              setSelectedChildren={setSelectedChildren}
              selectedChildren={selectedChildren}
              slideraction={slideraction}
            />
          </div>
        </ClassroomActionContainer>

        {selectedChildren.length > 0 && (
          <div className=" bg-white rounded-xl pb-6 mx-[80px]">
            <ClassroomCard
              slideraction={slideraction}
              submitClassRoomAction={submitClassRoomAction}
              clasRoomType={classroomData?.classroomType}
            />
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ChildList;
