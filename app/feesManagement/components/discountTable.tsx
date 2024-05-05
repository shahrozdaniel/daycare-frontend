"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import { useForm } from "react-hook-form";
import AddDiscount from "../ModalComponent/AddDiscount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FormModal from "@/components/common/FormModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddDiscountValidationSchema } from "../ModalComponent/validationSchema";
import {
  createDiscount,
  getDiscountList,
} from "@/services/discountManagementServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DiscountTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  modalOpen: any;
  openModal: () => void;
  closeModal: () => void;
  router: any;
  handleSubmit: any;
  control: any;
  register: any;
  errors: any;
  getDiscountListData: any;
}

export function DiscountTable<TData, TValue>({
  columns,
  data,
  openModal,
  closeModal,
  modalOpen,
  router,
  handleSubmit,
  control,
  register,
  errors,
  getDiscountListData,
}: DiscountTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [date, setDate] = useState<Date>();
  const table = useReactTable({
    data,
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

  // const [modalOpen, setModalOpen] = useState(false);
  // const [discount, setDiscount] = useState(false);
  const [discountlist, setDiscountList] = useState([]);

  // handle next page
  //  handles form submission for adding a new discount
  const onAddDiscountFormSubmit = async (data: {
    name: string;
    discountType: string;
    description: string;
    value: number;
  }) => {
    try {
      let body = {
        name: data.name,
        discountType: data.discountType,
        description: data.description,
        value: data.value,
      };
      let result = await createDiscount(body);
      if (result.success) {
        toast.success(result.message);
        getDiscountListData();
        closeModal();
      } else {
        toast.error(result.message);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-between gap-3">
          <div className="flex items-center md:py-2 lg:py-4">
            <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max">
              Filter By:{" "}
            </span>
            <Select
              defaultValue={
                (table.getColumn("discountType")?.getFilterValue() as string) ??
                ""
              }
              onValueChange={(value) =>
                table.getColumn("discountType")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
                <SelectValue placeholder="Discount Type" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="flex items-center gap-5">
            <div
              onClick={() => openModal()}
              className="text-[#3a70e2] cursor-pointer font-sans text-[16px] font-medium "
            >
              + Add Discount
            </div>
            <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-1 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
              <Image
                src={"/images/export.png"}
                alt="export"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-xl">Export</span>
            </div>
          </div> */}

          <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
            <Button
              variant="ghost"
              className="outline-none"
              onClick={() => openModal()}
            >
              <Image
                src={"/images/Plus.png"}
                alt="plus"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-md pl-2">Add Discount</span>
            </Button>
            <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
              <Image
                src={"/images/export.png"}
                alt="export"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-md">Export</span>
            </div>
          </div>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        table={table}
        className="border-none"
      />

      {modalOpen && (
        <div>
          <FormModal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onAddDiscountFormSubmit}
          >
            <AddDiscount
              control={control}
              closeModal={closeModal}
              register={register}
              errors={errors}
            />
          </FormModal>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default DiscountTable;
