"use client";
import { detailsOfAllergy } from "@/services/report";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export const alargeyColoum: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    // header: "Child Name",
    header: () => {
      return (
        <div className="flex justify-start">
          <div className="self-start pl-4">Child Name</div>
        </div>
      );
    },
    cell: ({ row }) => {
      let childObject: any = row?.original?.totalData;
      console.log(childObject);
      return (
        <div className="flex justify-start items-center  pl-5">
          {childObject ? (
            <>
              <Image
                className="w-[51px] h-[51px] rounded-full object-cover"
                src={
                  childObject.photo ? childObject.photo : "/svgs/no-image.svg"
                }
                alt="user"
                width={50}
                height={50}
              />
              {/* {console.log("row--->", row)} */}
              <div className=" font-sans  capitalize px-2 text-[#323232] text-sm">
                {childObject.first_name} {childObject.last_name}
              </div>
            </>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "classroom_name",
    header: "Classroom Name",
  },
  {
    accessorKey: "alergeyName",
    header: "Allergy Name",
  },
  // {
  //     accessorKey: "Action",
  //     header: "View More",
  //     cell: ({ row }) => {
  //         let name = row?.original?.name
  //         let setChildAllergy = row?.original?.setChildAllergy
  //         let setShow = row?.original?.setShow
  //         const getAllergyDetailsByName = async (allergyName: string) => {
  //             console.log('hello')
  //             let res;
  //             try {
  //                 res = await detailsOfAllergy(allergyName)
  //                 if (res?.success) {
  //                     let data = res?.data
  //                     let dataArr: any = []
  //                     data?.map((ele: any) => {
  //                         dataArr?.push({
  //                             id: ele?.id,
  //                             child_id: ele?.child_id,
  //                             childName: `${ele?.first_name} ${ele?.last_name}`,
  //                             associatedClass: ele?.classroom_name || null,
  //                             ageRange: ele?.dob,
  //                             allergies: name,
  //                         },)
  //                     })
  //                     setChildAllergy(dataArr)
  //                     setShow(true)
  //                 }
  //             } catch (error) {
  //                 console.log(error)
  //             }
  //         }

  //         return (
  //             <div onClick={() => getAllergyDetailsByName(name)} style={{cursor:'pointer'}}>
  //                 <span className="curser-pointer">View More</span>
  //             </div>

  //         );
  //     },
  // },
  {
    accessorKey: "viewProfile",
    header: "View Profile",
    cell: ({ row }) => {
      let totalData = row?.original?.totalData;
      console.log(totalData);
      return (
        <div className="cursur-pointer">
          <Link
            href={`/childManagement/childProfile?child_id=${totalData?.id}&enrollment_id=${totalData?.child_id}`}
          >
            <span> View Profile</span>
          </Link>
        </div>
      );
    },
  },
];
