"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import facebook from "../../public/svgs/facebook-icon.svg";
import instagram from "../../public/svgs/instagram-icon.svg";
import twitter from "../../public/svgs/twitter-icon.svg";
import {
  JournalContainer,
  JournalHeading,
  JournalContent,
  ImgContainer,
  NameTimeDetails,
  Description,
  JournalBox,
  SocialIcons,
} from "./journal.styled";
import Filter from "./components/Filter";
import {
  childEnrollmetnList,
  getChildActivityDetail,
  getChildJournalDetail,
} from "@/services/childrenActionServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { classroomlist } from "../classroomManagement/classroomManagentAPI";
import Link from "next/link";
import moment from "moment";
import { getTimeFormat } from "@/utils/utilityFunctions";

export default function App() {
  // let childId: any;

  const [journalData, setJournalData] = useState<any>([]);
  const [date, setDate] = useState<any>("");
  const [childData, setChildData] = useState<any[]>([]);
  const [childid, setChildId] = useState<any>("");
  const [classroomData, setclassroomData] = useState<any>([]);
  const [selectedClass, setSelectedClass] = useState<string>();
  const [filterData, setFilterData] = useState<any>([]);

  const ChildActivity = async () => {
    let res;
    try {
      res = await getChildJournalDetail(childid, date, date);
      if (res?.success) {
        setJournalData(res?.data);
        toast.success("Data Fetch Successfully");
        console.log(res?.data);
      } else {
        setJournalData([]);
        // toast.error("No Data Fetch !");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const enrolledChildlistlist = async () => {
    let res;
    try {
      res = await childEnrollmetnList("1");
      if (res?.success) {
        let list: any[] = [{ value: "", label: "Select" }];
        console.log(res?.data);
        res?.data?.map((ele: any) => {
          list?.push({
            value: ele?.child_id,
            label: ele?.child?.name,
            classId: ele?.classroom_id,
          });
        });
        // res
        setChildData(list);
      }
      // console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    if (childid && date) {
      ChildActivity();
    }
  }, [childid, date]);

  useEffect(() => {
    if (selectedClass) {
      const filteredList = childData.filter(
        (item: { classId: string }) =>
          Number(item?.classId) === Number(selectedClass)
      );

      setFilterData([{ value: "", label: "Select" }, ...filteredList]);
    }
  }, [selectedClass]);

  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        const classData: any[] = [{ value: "", label: "Select" }];
        res?.data?.list.map(
          (item: { classroomId: number; classroomName: string }) => {
            classData.push({
              value: item.classroomId,
              label: item.classroomName,
            });
          }
        );
        setclassroomData(classData);
      }
    } catch (error) {}
  };

  useLayoutEffect(() => {
    getclassroomlist();
    enrolledChildlistlist();
  }, []);

  function extractFiles(data: any) {
    const allFiles = [];
    console.log(data);

    // Iterate through each activity type
    for (const activityType in data) {
      if (data.hasOwnProperty(activityType)) {
        const activities = data[activityType];
        console.log(activities);

        // Iterate through each activity within the activity type
        for (const activity of activities) {
          const { files, note, createdAt } = activity;

          // if (activity?.files && activity?.files?.length > 0) {
          //   // Add each file URL to the array
          //    allFiles.push({ ...activity?.files });

          // }

          allFiles.push({
            title: activityType,
            fileUrl: files[0],
            note,
            createdAt,
          });
        }
      }
    }

    return allFiles;
  }

  let data: any[] = extractFiles(journalData);

  return (
    <>
      <JournalContainer>
        <JournalHeading>Journal</JournalHeading>
        <Filter
          setDate={setDate}
          date={date}
          childData={selectedClass ? filterData : childData}
          setChildId={setChildId}
          childId={childid}
          classroomData={classroomData}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        {data?.length > 0 ? (
          <div className="col-span-4 flex-wrap flex m-2 p-2">
            {data?.map((ele: any, ind: any) => {
              return (
                <JournalBox
                  key={ind}
                  style={{ margin: "10px", padding: "10px" }}
                >
                  <ImgContainer>
                    <Image
                      src={ele.fileUrl ? ele.fileUrl : facebook}
                      width={240}
                      height={160}
                      alt="daily activity image"
                      className="fixed-size-image"
                    />
                  </ImgContainer>
                  <NameTimeDetails>
                    <span className="text-[#000000] font-[DM_Sans] text-[14px] font-medium">
                      {ele.title}
                    </span>
                    <span className="text-[#00000066] font-[DM_Sans] text-[10px] font-medium">
                      {getTimeFormat(ele.createdAt)}
                    </span>
                  </NameTimeDetails>
                  <Description>
                    <p className="text-[#000000CC] font-[DM_Sans] text-[12px] font-normal">
                      {ele.note}
                    </p>
                  </Description>
                  <SocialIcons>
                    <Link
                      href={`https://www.facebook.com/share.php?u=${
                        ele.fileUrl ? ele.fileUrl : facebook
                      }`}
                    >
                      <Image
                        className="mr-1 mt-2"
                        src={facebook}
                        alt="facebook group icon"
                      />
                    </Link>
                    <Link
                      //https://www.instagram.com/?url=${encodeURIComponent(ele.fileUrl ? ele.fileUrl : 'https://example.com')}
                      href={`https://www.instagram.com/?url=${
                        ele.fileUrl ? encodeURIComponent(ele.fileUrl) : facebook
                      }`}
                    >
                      <Image
                        className="mr-1 mt-2"
                        src={instagram}
                        alt="instagram group icon"
                      />
                    </Link>
                    <Link
                      //https://twitter.com/intent/post?url={}&text={}&hashtags={}
                      href={`https://twitter.com/intent/post?url=${
                        ele.fileUrl ? ele.fileUrl : facebook
                      }&text=Hey i found this journal&hashtags=cooddle`}
                    >
                      <Image
                        className="mr-1 mt-2"
                        src={twitter}
                        alt="twitter group icon"
                      />
                    </Link>
                  </SocialIcons>
                </JournalBox>
              );
            })}
          </div>
        ) : (
          <div>
            <div>
              <span> Please select Children and Date</span>
            </div>
          </div>
        )}
        <ToastContainer />
      </JournalContainer>
    </>
  );
}
