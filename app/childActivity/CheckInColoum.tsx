import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const CheckIn: ColumnDef<any>[] = [
  {
    accessorKey: "CheckInTime",
    header: "Check In Time",
  },
  {
    accessorKey: "CheckInNote",
    header: "Check In Note",
  },

  // {
  //     id: "actions",
  //     header: "Action",
  //     cell: ({ row }) => {
  //         let docs = row?.original?.totalData?.files

  //         return (
  //             <>
  //                 {docs ? <div className="flex items-center">
  //                     <Link href={docs ?docs : ''}  >
  //                         <EyeIcon className="text-grey-g1 cursor-pointer ml-5" />
  //                     </Link>
  //                 </div> : '--'}
  //             </>
  //         );
  //     },
  // },
];

export const Screen: ColumnDef<any>[] = [
  {
    accessorKey: "questionNumber",
    header: "Q.no",
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }: { row: any }) => {
      const doc = row.original;
      return (
        <>
          <div className="flex items-center justify-center">
            <p>
              {doc.question}
              {doc.required === true ? (
                <span className="text-[red] text-[18px]">*</span>
              ) : (
                ""
              )}
            </p>
          </div>
        </>
      );
    },
  },
  {
    header: "Educator",
    cell: ({ row }: { row: any }) => {
      const doc = row.original;
      const uniqueId = `educator${doc.questionNumber}`;
      return (
        <>
          <div className="flex items-center justify-center pl-5 pr-10">
            <div className="flex flex-row gap-5">
              <div className="flex items-center gap-2">
                <input
                  className="radio_input"
                  id={`Yes${uniqueId}`}
                  type="radio"
                  name={`radioOption${uniqueId}`}
                  value={"yes"}
                  disabled={true}
                  defaultChecked={doc?.answer === "yes"}

                />
                <label htmlFor={`Yes${uniqueId}`}>Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="radio_input"
                  id={`No${uniqueId}`}
                  type="radio"
                  name={`radioOption${uniqueId}`}
                  value={"no"}
                  disabled={true}
                  defaultChecked={doc?.answer === "no"}
                />
                <label htmlFor={`No${uniqueId}`}>No</label>
              </div>
            </div>
          </div>

        </>
      );
    },
  },
  {
    header: "Parent",
    cell: ({ row }: { row: any }) => {
      const doc = row.original;
      const uniqueId = `parent${doc.questionNumber}`;

      return (
        <>
          <div className="flex items-center pl-5 justify-center">
            <div className="flex flex-row gap-5">
              <div className="flex items-center gap-2">
                <input
                  id={`Yes${uniqueId}`}
                  type="radio"
                  name={`${uniqueId}`}
                  value={"yes"}
                  disabled={true}
                // onChange={(e: any) => handleData(e, id)}
                />
                <label htmlFor={`Yes${uniqueId}`}>Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id={`No${uniqueId}`}
                  type="radio"
                  name={`${uniqueId}`}
                  value={"no"}
                  disabled={true}
                // onChange={(e: any) => handleData(e, id)}
                />
                <label htmlFor={`No${uniqueId}`}>No</label>
              </div>
            </div>
          </div>
        </>
      );
    },
  },
];
