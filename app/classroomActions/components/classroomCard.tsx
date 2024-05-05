"use client";
import React, { useState } from "react";
import ChildrenCards from "./childrenCards";
import { Separator } from "@/components/ui/separator";
import CheckInCard from "./checkInCard";
import AddActivityCard from "./addActivityCard";
import AddNotesCard from "./addNotesCard";
import AddMealCard from "./addMealCard";
import AddSleepRecord from "./addSleepRecordCard";
import AddToiletRecord from "./addToiletRecordCard";
import AddMoodCard from "./addMoodCard";
import AddMoveRoom from "./addMoveRoomCard";
import CheckOutCard from "./checkOutCard";
import AddHealthRecordCard from "./addHealthRecordCard";
import AddRequestSuppliesCard from "./addRequestSuppliesCard";
import AddRecordFluidCard from "./addRecordFluidCard";
import SliderSwiper from "@/components/common/Slider";

interface ClassroomProps {
  slideraction: string;
  submitClassRoomAction: any;
  clasRoomType?:any;

}
const ClassroomCard: React.FC<ClassroomProps> = ({ slideraction, submitClassRoomAction,clasRoomType }) => {
  return (
   
   
        <div className="flex flex-col gap-[40px]">
          {" "}
          {slideraction === "checkIn" && (
            <div
            >
              <CheckInCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addActivity" && (
            <div
            >
              <AddActivityCard submitClassRoomAction={submitClassRoomAction} clasRoomType={clasRoomType}/>
            </div>
          )}
          {slideraction === "addNotes" && (
            <div
            >
              <AddNotesCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addMeals" && (
            <div>
              <AddMealCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addSleep" && (
            <div>
              <AddSleepRecord submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addToilet" && (
            <div>
              <AddToiletRecord submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addMood" && (
            <div>
              <AddMoodCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addMoveRoom" && (
            <div>
              <AddMoveRoom submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}

          {slideraction === "addHealth" && (
            <div>
              <AddHealthRecordCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addSupplies" && (
            <div>
              <AddRequestSuppliesCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addFluids" && (
            <div>
              <AddRecordFluidCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
          {slideraction === "addCheckOut" && (
            <div>
              <CheckOutCard submitClassRoomAction={submitClassRoomAction} />
            </div>
          )}
        </div>
     
   
  );
};

export default ClassroomCard;
