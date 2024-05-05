"use client";
import React, { useEffect, useState } from "react";
import {
  DailyReportContainer,
  HeaderBar,
  ImgContainer,
  ProfileContainer,
  ProfileDescription,
  ProfileDetails,
  ProfileInfo,
  ProfileName,
  TagContainer,
} from "../dailyReports/dailyReport.styled";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getChildActivityDetail,
  getChildprofileDetail,
} from "@/services/childrenActionServices";
import CustomInput from "@/components/common/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { TwoInputContainer } from "../reports/Common.styled";
import { DataTable } from "@/components/common/data-table";
import { CheckIn, Screen } from "./CheckInColoum";
import Activitytable from "./ActivityTable";
import { ActivityColoum } from "./ActivityColoum";
import { NoteColoum } from "./NoteColoum";
import { FoodColoum } from "./FoodColoum";
import { sleepColoum } from "./SleepCoolum";
import { LooColoum } from "./LooColoum";
import { MoodColoum } from "./MoodColoum";
import { MooveRoom } from "./MooveRoomColoum";
import { HealthStatus } from "./HealthColoum";
import { Supplies } from "./SuppliesColoum";
import { FluidColoum } from "./FluidColoum";
import { CheckoutColoum } from "./CheckOutColoum";
import "./styles.css";
import { useGlobalContext } from "../context/store";
import { incidentColumn } from "./IncidentColumn";

const ChildActivity = () => {
  const todayDate = new Date();
  let FromatedTodayDate = moment(todayDate)?.format("YYYY-MM-DD");
  const [activityData, setActivityData] = useState<any>([]);
  const [chidProfileData, setChildProfileData] = useState<any>([]);
  const [date, setDate] = useState<any>(FromatedTodayDate);
  const [childId, setchildId] = useState<any>("");
  const { globalSettings } = useGlobalContext();
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const slug = window?.location?.pathname;
    if (slug.split("/")[2]) {
      setchildId(slug.split("/")[2]);
    }
  }, [date]);
  const ChildActivity = async () => {
    setLoader(true);
    let res;
    try {
      res = await getChildActivityDetail(childId, date, date);
      if (res?.success) {
        setActivityData(res?.data);
        toast.success("Data fetched successfully");
        setLoader(false);
      } else {
        setActivityData([]);
        setLoader(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setLoader(false);
    }
  };

  let childProfile = async () => {
    let res;
    try {
      res = await getChildprofileDetail(childId);
      if (res?.success) {
        setChildProfileData(res?.data);
      } else {
      }
    } catch (error: any) {
      console.log(error?.res?.response?.data?.message);
    }
  };

  useEffect(() => {
    childProfile();
  }, [childId]);

  useEffect(() => {
    if (childId && date) {
      ChildActivity();
    }
  }, [childId, date]);

  let checkInData: any = [];
  let checkOutData: any = [];
  let activity: any = [];
  let notes: any = [];
  let FoodData: any[] = [];
  let SleepData: any[] = [];
  let LooData: any[] = [];
  let MoodData: any[] = [];
  let MoovRoomsData: any[] = [];
  let SuppliesData: any[] = [];
  let FluidData: any[] = [];
  let healthStatusData: any[] = [];
  let incidentData: any[] = [];

  checkInData = [
    {
      CheckInTime: activityData?.["Check In"]?.[0]?.check_in
        ?.split("T")?.[1]
        ?.split(".")[0],
      CheckInNote: activityData?.["Check In"]?.[0]?.check_in_note,
    },
  ];

  activityData?.["IncidentReport"]?.map((item: any) => {
    incidentData.push({
      incidentName: item.incident_type,
      nature: item.nature,
      staff_name: item.staff_name,
      incidentTime: moment(item.created_at).format("HH:mm:ss"),
    });
  });
  // // let activity: any = []
  activityData?.["Activity"]?.map((ele: any, ind: any) => {
    activity.push({
      Classroom: ele?.classroomname,
      Domain: ele?.details?.Domain?.split("_").join(" "),
      activityname: ele?.details?.activityName,
      material: Array.isArray(ele?.details?.matterials_used)
        ? ele?.details?.matterials_used?.map((ele: any) => {
            return ele;
          })
        : ele?.details?.matterials_used,
      instruction: Array.isArray(ele?.details?.instruction)
        ? ele?.details?.instruction?.map((ele: any) => {
            return ele;
          })
        : ele?.details?.instruction,
      Description: ele?.details?.description,
      totalData: ele,
    });
  });
  // let notes: any = []
  activityData?.["Notes"]?.map((ele: any, ind: any) => {
    notes.push({
      NoteType: ele?.details?.notesRecord?.noteTypes?.split("_").join(" "),
      Notes: ele?.details?.notesRecord?.addNotes,
      totalData: ele,
    });
  });

  activityData?.["Food"]?.map((ele: any, ind: any) => {
    FoodData.push({
      FoodType: ele?.details?.foodRecord?.foodType,
      Quantity: ele?.details?.foodRecord?.quantity,
      Foodmenu: ele?.details?.foodRecord?.foodMenu,
      totalData: ele,
    });
  });

  activityData?.["Sleep"]?.map((ele: any, ind: any) => {
    SleepData.push({
      StartTime: ele?.details?.sleepRecord?.startTime,
      EndTime: ele?.details?.sleepRecord?.endTime,
      SleepCheck: ele?.details?.sleepRecord?.sleepCheck.split("_").join(" "),
      Didtsleep: ele?.details?.sleepRecord?.DoNotSleep == true ? "YES" : "--",
      Note: ele?.details?.sleepRecord?.addNotes,
      totalData: ele,
    });
  });

  activityData?.["Toilet"]?.map((ele: any, ind: any) => {
    LooData.push({
      Time: ele?.details?.toiletRecord?.startTime,
      ToiletType: ele?.details?.toiletRecord?.toiletType.split("_").join(" "),
      Note: ele?.details?.toiletRecord?.addNotes,
      totalData: ele,
    });
  });

  activityData?.["Mood"]?.map((ele: any, ind: any) => {
    MoodData.push({
      Mood: ele?.details?.moodRecord?.mood,
      Level: ele?.details?.moodRecord?.Level,
      Note: ele?.details?.moodRecord?.addNotes,
      Domain: ele?.details?.tagDevelopmentSkill?.Domain?.split("_").join(" "),
      Skill: ele?.details?.tagDevelopmentSkill?.Skill?.split("_").join(" "),
      Indicator: ele?.details?.tagDevelopmentSkill?.Indicators,
      totalData: ele,
    });
  });

  activityData?.["Move Rooms"]?.map((ele: any, ind: any) => {
    console.log("ele", ele);
    MoovRoomsData.push({
      Time: ele?.details?.MoveRooms?.time,
      ClassroomType: chidProfileData?.child_movement?.name,
      Note: ele?.details?.MoveRooms?.addNotes,
      totalData: ele,
    });
  });

  activityData?.["Health"]?.map((ele: any, ind: any) => {
    healthStatusData.push({
      HealthStatus: ele?.details?.healthRecord?.healthStatus,
      Observation: ele?.details?.healthRecord?.observations,
      Note: ele?.details?.healthRecord?.addNotes,
      totalData: ele,
    });
  });

  activityData?.["Supplies"]?.map((ele: any, ind: any) => {
    SuppliesData.push({
      Supplies: ele?.details?.suppliesRecord?.supplies,
      Note: ele?.details?.suppliesRecord?.addNotes,
      totalData: ele,
    });
  });

  activityData?.["Fluids"]?.map((ele: any, ind: any) => {
    FluidData.push({
      Fluid: ele?.details?.fluidRecord?.fluidType,
      IntakeTime: ele?.details?.fluidRecord?.intakeTime,
      Quantity: ele?.details?.fluidRecord?.quantity,
      Note: ele?.details?.fluidRecord?.addNotes,
      totalData: ele,
    });
  });

  checkOutData = activityData?.["Checkout"] ? [
    {
      CheckOutTime: activityData?.["Checkout"]?.[0]?.check_out
        ?.split("T")?.[1]
        ?.split(".")[0],
      CheckoutNote: activityData?.["Checkout"]?.[0]?.check_out_note
      ,
    },
  ]:[];

  const screenig =
    activityData?.["Check In"]?.[0]?.details?.questions?.length > 0 &&
    activityData?.["Check In"]?.[0]?.details?.questions?.map(
      (item: any, index: number) => {
        return { ...item, questionNumber: index + 1 };
      }
    );
  return (
    <>
      <DailyReportContainer
        className="md:flex md:flex-col md:justify-center md:items-center lg:flex-row "
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
        }}
      >
        {/* profile Container profile description  */}
        <ProfileContainer className="bg-white border-2 border-[#D3E4E6]">
          <ProfileDetails>
            <ImgContainer>
              <Image
                src={
                  chidProfileData?.photo
                    ? chidProfileData?.photo
                    : "/svgs/no-image.svg"
                }
                width={204}
                height={204}
                alt="coodle image"
                className="w-[204px] h-[204px] rounded-full object-cover"
              />
              {/* <img
                src={
                  "https://aiims.s3.ap-south-1.amazonaws.com/public/daycare/child/profile/2.jpg"
                }
                alt=""
              /> */}
            </ImgContainer>
            <ProfileInfo>
              {chidProfileData?.first_name && (
                <p className="text-[#4B4B4B] leading-5 font-sans text-[24px] font-medium mt-2 capitalize">
                  {`${chidProfileData?.first_name} ${chidProfileData?.last_name}`}
                </p>
              )}
              <TagContainer>
                <div className="bg-[#FFDCC9] text-[#D41A00] font-sans text-[12px] font-[500] rounded-lg px-2 cursor-pointer mt-3	">
                  Allergy
                </div>
              </TagContainer>
              <div className="flex flex-row justify-between items-center mx-auto">
                <Image
                  src={
                    chidProfileData?.classroom_details?.logo
                      ? chidProfileData?.classroom_details?.logo
                      : "/svgs/no-image.svg"
                  }
                  width={60}
                  height={60}
                  alt="coodle image"
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />

                <div className="ml-4">
                  <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                    Classroom
                  </p>
                  <p className="text-[#4B4B4B] font-sans text-[20px] font-medium">
                    {chidProfileData?.movedchild
                      ? chidProfileData?.child_movement?.name
                      : chidProfileData?.classroom_details?.name}
                  </p>
                </div>
              </div>
            </ProfileInfo>
          </ProfileDetails>
        </ProfileContainer>
        {/* profile activity description  */}
        <ProfileDescription>
          <TwoInputContainer>
            <div style={{ width: "60%" }}></div>
            <div style={{ width: "40%" }}>
              <CustomInput
                name="date"
                type="date"
                label="Date"
                placeholder="Date"
                onChange={(e) => setDate(e?.target?.value)}
                value={date}
              />
            </div>
          </TwoInputContainer>
          {loader ? (
            <span className="loader"></span>
          ) : (
            <>
              {Object.keys(activityData).length > 0 ? (
                <>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Check In
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {checkInData?.length > 0 ? (
                          <Activitytable data={checkInData} columns={CheckIn} />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                        {screenig?.length > 0 ? (
                          <>
                            <p className="text-[#00000099] font-sans text-[16px] font-normal ml-5">
                              Screening Questions
                            </p>
                            <Activitytable data={screenig} columns={Screen} />
                          </>
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Activity
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        <div
                          style={{
                            width: "80%",
                            overflowX: "auto",
                            display: "flex",
                          }}
                        >
                          {activityData?.["Activity"]?.map(
                            (ele: any, ind: any) => {
                              return (
                                <>
                                  {ele?.files?.[0] && (
                                    <Image
                                      src={ele?.files?.[0]}
                                      width={250}
                                      height={250}
                                      alt="coodle image"
                                      className="w-[150px] h-[150px] object-cover p-2 border m-2"
                                      key={ind}
                                    />
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>

                        {activity?.length > 0 ? (
                          <Activitytable
                            data={activity}
                            columns={ActivityColoum}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Notes
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        <div
                          style={{
                            width: "80%",
                            overflowX: "auto",
                            display: "flex",
                          }}
                        >
                          {activityData?.["Notes"]?.map(
                            (ele: any, ind: any) => {
                              return (
                                <>
                                  {ele?.files?.[0] && (
                                    <Image
                                      src={ele?.files?.[0]}
                                      width={250}
                                      height={250}
                                      alt="coodle image"
                                      className="w-[150px] h-[150px] object-cover p-2 border m-2"
                                      key={ind}
                                    />
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                        {notes?.length > 0 ? (
                          <Activitytable data={notes} columns={NoteColoum} />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Food
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        <div
                          style={{
                            width: "80%",
                            overflowX: "auto",
                            display: "flex",
                          }}
                        >
                          {activityData?.["Food"]?.map((ele: any, ind: any) => {
                            return (
                              <>
                                {ele?.files?.[0] && (
                                  <Image
                                    src={ele?.files?.[0]}
                                    width={250}
                                    height={250}
                                    alt="coodle image"
                                    className="w-[150px] h-[150px] object-cover p-2 border m-2"
                                    key={ind}
                                  />
                                )}
                              </>
                            );
                          })}
                        </div>
                        {FoodData?.length > 0 ? (
                          <Activitytable data={FoodData} columns={FoodColoum} />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Sleep
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        <div
                          style={{
                            width: "80%",
                            overflowX: "auto",
                            display: "flex",
                          }}
                        >
                          {activityData?.["Sleep"]?.map(
                            (ele: any, ind: any) => {
                              return (
                                <>
                                  {ele?.files?.[0] && (
                                    <Image
                                      src={ele?.files?.[0]}
                                      width={250}
                                      height={250}
                                      alt="coodle image"
                                      className="w-[150px] h-[150px] object-cover p-2 border m-2"
                                      key={ind}
                                    />
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                        {SleepData?.length > 0 ? (
                          <Activitytable
                            data={SleepData}
                            columns={sleepColoum}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Loo Break
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {LooData?.length > 0 ? (
                          <Activitytable data={LooData} columns={LooColoum} />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Mood
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        <div
                          style={{
                            width: "80%",
                            overflowX: "auto",
                            display: "flex",
                          }}
                        >
                          {activityData?.["Mood"]?.map((ele: any, ind: any) => {
                            return (
                              <>
                                {ele?.files?.[0] && (
                                  <Image
                                    src={ele?.files?.[0]}
                                    width={250}
                                    height={250}
                                    alt="coodle image"
                                    className="w-[150px] h-[150px] object-cover p-2 border m-2"
                                    key={ind}
                                  />
                                )}
                              </>
                            );
                          })}
                        </div>
                        {MoodData?.length > 0 ? (
                          <Activitytable data={MoodData} columns={MoodColoum} />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Move Room
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {MoovRoomsData?.length > 0 ? (
                          <Activitytable
                            data={MoovRoomsData}
                            columns={MooveRoom}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Health
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        <div
                          style={{
                            width: "80%",
                            overflowX: "auto",
                            display: "flex",
                          }}
                        >
                          {activityData?.["Health"]?.map(
                            (ele: any, ind: any) => {
                              return (
                                <>
                                  {ele?.files?.[0] && (
                                    <Image
                                      src={ele?.files?.[0]}
                                      width={250}
                                      height={250}
                                      alt="coodle image"
                                      className="w-[150px] h-[150px] object-cover p-2 border m-2"
                                      key={ind}
                                    />
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                        {healthStatusData?.length > 0 ? (
                          <Activitytable
                            data={healthStatusData}
                            columns={HealthStatus}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Supplies
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {SuppliesData?.length > 0 ? (
                          <Activitytable
                            data={SuppliesData}
                            columns={Supplies}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Fluid
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {FluidData?.length > 0 ? (
                          <Activitytable
                            data={FluidData}
                            columns={FluidColoum}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Check Out
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {checkOutData?.length > 0 ? (
                          <Activitytable
                            data={checkOutData}
                            columns={CheckoutColoum}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger>
                          {" "}
                          <p className="text-[#00000099] font-sans text-[18px] font-medium">
                            Incident
                          </p>
                        </AccordionTrigger>
                      </HeaderBar>
                      <AccordionContent>
                        {incidentData?.length > 0 ? (
                          <Activitytable
                            data={incidentData}
                            columns={incidentColumn}
                          />
                        ) : (
                          <p className="text-center mb-4">No results found.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              ) : (
                <>
                  <Accordion
                    type="multiple"
                    className=""
                    defaultValue={["item-1"]}
                  >
                    <AccordionItem
                      value="item-1"
                      className="bg-white rounded-2xl"
                    >
                      {" "}
                      <HeaderBar>
                        <p className="text-[#00000099] font-sans text-[18px] font-medium p-8">
                          No child daily report available on date {date}
                        </p>
                      </HeaderBar>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
            </>
          )}
        </ProfileDescription>
        {/* Activity */}
      </DailyReportContainer>
      <ToastContainer />
      <style>{`
              .sc-dmlpXa{
                border:1px solid rgba(0, 0, 0, 0.20);
              }`}</style>
    </>
  );
};

export default ChildActivity;
