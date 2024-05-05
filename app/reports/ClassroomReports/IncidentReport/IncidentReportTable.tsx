"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import Modal from "@/components/common/Modal/Modal";
import { Plus } from "lucide-react";
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import IncidentModal from "./IncidentModal";
import { useForm } from "react-hook-form";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import ViewIncidentModal from "./ViewIncidentModal";
import { Button } from "@/components/ui/button";
import { handleExport } from "@/utils/utilityFunctions";
import { useSearchParams } from "next/navigation";
import moment from "moment";

interface IncidentReportTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getChildrenIncident: any;
  openViewModal: any;
  closeViewModal: any;
  viewModalOpen: any;
  incidentId: number | string;
  openEditModal: any;
  closeEditModal: any;
  editModalOpen: any;
  exportdata: any;
}

export function IncidentReportTable<TData, TValue>({
  columns,
  data,
  getChildrenIncident,
  openViewModal,
  closeViewModal,
  viewModalOpen,
  incidentId,
  openEditModal,
  closeEditModal,
  editModalOpen,
  exportdata,
}: IncidentReportTableProps<TData, TValue>) {
  const { control } = useForm<FormData>();
  const [modalOpen, setModalOpen] = useState(false);
  const [incident, setIncident] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [date, setDate] = useState<Date>();
  const [classRoomData, setClassRoomData] = useState<any>([]);
  const params = useSearchParams();
  const tab:any = params?.get("tab");


  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      if (fromDate && toDate) {
        const itemDate = moment(item.dateIncident).format("YYYY-MM-DD");
        return itemDate >= fromDate && itemDate <= toDate;
      } else if (fromDate || toDate) {
        return moment(item.dateIncident).format("YYYY-MM-DD") === (fromDate || toDate);
      } else {
        return true; // Include all items if no date range specified
      }
    });
  }, [data, fromDate, toDate]);

  const table = useReactTable({
    data:filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(()=>{
    const isModalOpen = tab.split('?')[1]; 
    if(isModalOpen){
      setIncident(true);
      setModalOpen(true);
    }
  },[])

  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "IncidentModal") {
      setIncident(true);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "IncidentModal") {
      setIncident(false);
    }
    setModalOpen(false);
  };

  const classRoomList = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        let resarray = res?.data?.list.map((item: any) => {
          return {
            label: item.classroomName,
            value: item.classroomId,
          };
        });
        setClassRoomData([
          { value: "", label: "Select Classroom" },
          ...resarray,
        ]);
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
    <>
      {/* Filtering------------------------------------------------------------------------ */}
      <div className="flex md:flex-col lg:flex-row justify-between">
        <div className="flex  md:py-2 lg:py-4">
          <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-20">
            Filter By:{" "}
          </span>
          <div className="flex flex-row flex-wrap">
            <div className="relative">
              <Input
                placeholder="Child Name"
                value={
                  (table.getColumn("childName")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("childName")
                    ?.setFilterValue(event.target.value)
                }
                className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
              <Image
                src={"/images/search.png"}
                alt="search"
                width="15"
                height="15"
                className="absolute top-3 right-2"
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Associated Class"
                value={
                  (table
                    .getColumn("associatedClass")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("associatedClass")
                    ?.setFilterValue(event.target.value)
                }
                className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
              <Image
                src={"/images/search.png"}
                alt="search"
                width="15"
                height="15"
                className="absolute top-3 right-2"
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Notified Parent"
                value={
                  (table
                    .getColumn("notifiedName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("notifiedName")
                    ?.setFilterValue(event.target.value)
                }
                className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
              <Image
                src={"/images/search.png"}
                alt="search"
                width="15"
                height="15"
                className="absolute top-3 right-2"
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Incident Type"
                value={
                  (table
                    .getColumn("incidentType")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("incidentType")
                    ?.setFilterValue(event.target.value)
                }
                className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
              <Image
                src={"/images/search.png"}
                alt="search"
                width="15"
                height="15"
                className="absolute top-3 right-2"
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Present Staff"
                value={
                  (table
                    .getColumn("staffPresent")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("staffPresent")
                    ?.setFilterValue(event.target.value)
                }
                className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
              <Image
                src={"/images/search.png"}
                alt="search"
                width="15"
                height="15"
                className="absolute top-3 right-2"
              />
            </div>

            <div className="relative flex items-center py-2">
                  <Input
                    type="date"
                    placeholder="From Date : "
                    value={fromDate}
                    onChange={(event) => setFromDate(event.target.value)}
                    className="md:w-[160px] lg:w-[260px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
                  />
                </div>
                <div className="relative flex items-center">
                  <Input
                    type="date"
                    placeholder="To Date : "
                    value={toDate}
                    onChange={(event) => setToDate(event.target.value)}
                    className="md:w-[160px] lg:w-[240px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
                  />
                </div>
          </div>
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          <Button
            variant="ghost"
            className="outline-none"
            onClick={() => openModal("IncidentModal")}
          >
            <span className="text-sm pl-2">+ Add Incident</span>
          </Button>
          <div
            className="border-[1px] cursor-pointer flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1"
            onClick={() => handleExport(data)}
          >
            <Image
              src={"/images/export.png"}
              alt="export"
              width={15}
              height={15}
            />
            <span className="text-sm">Export</span>
          </div>
        </div>
      </div>
      <DataTable data={data} columns={columns} table={table} className="border-2 border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[60px] px-2" />
      {modalOpen && incident && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"IncidentModal"}
          >
            <IncidentModal
              control={control}
              classroomData={classRoomData}
              closeModal={closeModal}
              getChildrenIncident={getChildrenIncident}
            />
          </Modal>
        </div>
      )}

      {viewModalOpen && (
        <div>
          <Modal
            modalOpen={viewModalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeViewModal}
            modalName={"IncidentModal"}
          >
            <ViewIncidentModal
              control={control}
              classroomData={classRoomData}
              closeModal={closeViewModal}
              getChildrenIncident={getChildrenIncident}
              incidentId={incidentId}
            />
          </Modal>
        </div>
      )}

      {editModalOpen && (
        <div>
          <Modal
            modalOpen={editModalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeEditModal}
            modalName={"IncidentModal"}
          >
            <IncidentModal
              control={control}
              classroomData={classRoomData}
              closeModal={closeEditModal}
              getChildrenIncident={getChildrenIncident}
              incidentId={incidentId}
            />
          </Modal>
        </div>
      )}
    </>
  );
}

export default IncidentReportTable;
