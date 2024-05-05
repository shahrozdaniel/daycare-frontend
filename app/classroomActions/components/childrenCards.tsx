"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import { sl } from "date-fns/locale";

interface childrenCardProps {
  childrenList: any;
  setSelectedChildren: any;
  selectedChildren?: any;
  slideraction?: string;
}

const ChildrenCards: React.FC<any> = ({
  childrenList,
  setSelectedChildren,
  selectedChildren,
  slideraction
}) => {
  const [childId, setChildId] = useState<any>([]);
  const [allSelect, setAllselect] = useState<boolean>(false);

  //  rendering on states
  useEffect(() => {
    CreateObj();
  }, [childId]);

  const handleChange = (e: any) => {
    let value = e.target?.checked;
    let allSelect: any = [];
    let selectIds: any = [];
    if (value) {
      setAllselect(value);
      childrenList?.map((e: any) => {
        if (slideraction!=="checkIn" && e?.check_in) {
          allSelect.push({
            childId: e?.childid,
            enrollmentId: e?.enrollmentid,
          });
          selectIds?.push(parseInt(e?.enrollmentid, 10));
        }else if(slideraction==="checkIn" && !e?.check_in){
          allSelect.push({
            childId: e?.childid,
            enrollmentId: e?.enrollmentid,
          });
          selectIds?.push(parseInt(e?.enrollmentid, 10));
        }
      });
      setSelectedChildren(allSelect);
      setChildId(selectIds);
    } else {
      setSelectedChildren([]);
      setChildId([]);
      setAllselect(false);
    }
  };

  //  creating value for selected children
  const CreateObj = () => {
    let arr: any = [];
    let sortingArr;
    childId.forEach((id: any) => {
      sortingArr = childrenList?.filter((data: any) => {
        return data?.enrollmentid == id;
      });
      arr.push({
        childId: sortingArr?.[0]?.childid,
        enrollmentId: sortingArr?.[0]?.enrollmentid,
      });
    });
    setSelectedChildren(arr);
  };

  // handling on selecting multiple children
  const handleChild = (e: any) => {
    let id = Number(e);
    //  setting child inrollment in array
    setChildId([...childId, id]);
    //  deleting  on an array
    if (childId?.includes(id)) {
      let elementToDelete = id;
      let filteredArray = childId?.filter(
        (childId: any) => childId !== elementToDelete
      );
      setChildId(filteredArray);
    }
  };

  useEffect(() => {
    if (selectedChildren.length === 0) {
      childId.length > 0 && setChildId([]);
      setAllselect(false)
    }
  }, [selectedChildren]);

  const getTileStyles=(e:any)=>{
    if(slideraction==="checkIn" && childId?.includes(Number(e?.enrollmentid)) && !e.check_in && !e.check_out){
      return "bg-[#EEFCFC]";
    }else if(slideraction!=="checkIn" && childId?.includes(Number(e?.enrollmentid)) &&  e.check_in && !e.check_out){
      return " bg-[#EEFCFC]";
    }else if((slideraction!=="checkIn" && !e.check_in) ||(slideraction==="checkIn" &&  e.check_in)){
      return " bg-[#EBEBE4] border-[#CEEEE2] border-2";
    }else if(e.check_out){
      return "bg-[#EBEBE4] border-[#CEEEE2] border-2";
    }else{
      return "shadow-md hover:border-[#CEEEE2] hover:outline-none focus:bg-[#E1E1E1]"
    }
  }

  const handleSelect = (e: any) => {
   if(slideraction === "checkIn" && !e.check_in && !e.check_out) {
      handleChild(e?.enrollmentid);
    } else if (slideraction !== "checkIn" && e.check_in && !e.check_out) {
      handleChild(e?.enrollmentid);
    }
  };

  return (
    <div
      className="flex flex-row justify-center flex-wrap gap-6 pt-3"
      style={{ cursor: "pointer" }}
    >
      <Card
        style={{ boxShadow: "8px 8px 16px 0px rgba(181, 218, 203, 0.33)" }}
        className={
          "h-[178px] h-ful w-[194px] rounded-xl hover:border-[#CEEEE2] hover:outline-none focus:bg-[#E1E1E1] border-2 border-[#CEEEE2]"
        }
      >
        <CardContent>
          <div className="flex flex-col items-center justify-center mt-16">
            <input
              type="checkbox"
              onChange={handleChange}
              checked={allSelect}
              className="w-5 h-4 rounded-[2px] border border-[#E1E1E1]"
            />
            <p className="font-sans text-[18px] leading-7 text-[#7D7E82] font-medium mt-2">
              Select all
            </p>
          </div>
        </CardContent>
      </Card>
      {(childrenList || [])?.map((e: any, index: any) => {
        return (
          <Card
            key={index}
            style={{ boxShadow: "8px 8px 16px 0px rgba(181, 218, 203, 0.33)" }}
            className={`${getTileStyles(e)} h-[178px] h-ful w-[194px] rounded-2xl border-2 border-[#CEEEE2]`}
            onClick={()=>handleSelect(e)}
          >
            <CardContent className="flex flex-col items-center  gap-[10px] justify-between py-5 px-2">
              <Image
                width={70}
                height={70}
                className="w-[94px] h-[94px] rounded-full object-cover "
                alt=""
                src={e?.photo ? e.photo : "/svgs/no-image.svg"}
              />

              <p
                className="font-sans text-[18px] font-normal leading-7 text-[#7D7E82] text-center capitalize"
                style={{ fontWeight: "500" }}
              >
                {e?.childfirstname + " " + e?.childlastname}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ChildrenCards;
