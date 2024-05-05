"use client";
import React, { useEffect, useState } from "react";
import { TableContainer } from "../../Common.styled";
import { ColumnDef } from "@tanstack/react-table";
import UserTable from "../../components/UserTable";
import { User, columns } from "./columns";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import AddDiscount from "../../ModalComponent/AddDiscount";
import DiscountTable from "../../components/discountTable";
import {
  getDiscountDetails,
  getDiscountList,
  updateDiscount,
} from "@/services/discountManagementServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddDiscountValidationSchema } from "../../ModalComponent/validationSchema";
import FormModal from "@/components/common/FormModal";
import EditDiscount from "../../ModalComponent/EditDiscount";
interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function DiscountManagement() {
  // const data: User[] = [
  //   {
  //     id: "1",
  //     discountName: "Discount Name",
  //     discountType: "Percentage",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     discountName: "Discount Name",
  //     discountType: "Percentage",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     discountName: "Discount Name",
  //     discountType: "Percentage",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     discountName: "Discount Name",
  //     discountType: "Percentage",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     discountName: "Discount Name",
  //     discountType: "Percentage",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  // ];

  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(AddDiscountValidationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = methods;
  const [discountlist, setDiscountList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalopen, setEditModalOpen] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [pagestate, setPageState] = useState({
    page: 1,
    pageSize: 7,
  });

  let router = useRouter();

  //this function will open the add modal
  const openModal = () => {
    setDiscount(true);

    setModalOpen(true);
  };

  // this function will close the add modal
  const closeModal = () => {
    setDiscount(false);
    reset();
    setModalOpen(false);
  };

  // this function will open the edit discount modal
  const openEditModal = (data: any) => {
    let editdata = {
      name: data.discountName,
      discountType: data.discountType,
      value: data.amount,
      description: data.description,
      id: data.id,
    };
    Object.entries(editdata).map((key: any) => {
      setValue(key[0], key[1]);
    });

    setEditModalOpen(true);
  };

  const onEditFormSubmit = async (data: any) => {
    try {
      let body = {
        name: data.name,
        discountType: data.discountType,
        description: data.description,
        value: data.value,
      };
      let result = await updateDiscount(body, data.id);
      if (result.success) {
        toast.success(result.message);
        getDiscountListData();
        closeEditModal();
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
  // this function will close the edit modal
  const closeEditModal = () => {
    reset();
    setEditModalOpen(false);
  };

  // handle next page

  const getDiscountListData = async () => {
    try {
      let result = await getDiscountList();

      if (result.success) {
        let resultarr = result.data.list.map((item: any, index: number) => {
          return {
            id: item.DiscountId,
            discountName: item.DiscountName,
            discountType: item.DiscountType,
            description: item.Description,
            amount: item.value,
            openEditModal: openEditModal,
          };
        });
        setDiscountList(resultarr);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getDiscountListData();
  }, []);

  return (
    <>
      {/* <UserTable columns={columns} data={data} />

      {modalOpen && discount && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddDiscountModal"}
          >
            <AddDiscount control={control} />
          </Modal>
        </div>
      )} */}
      <DiscountTable
        columns={columns}
        data={discountlist}
        openModal={openModal}
        closeModal={closeModal}
        modalOpen={modalOpen}
        router={router}
        handleSubmit={handleSubmit}
        control={control}
        register={register}
        errors={errors}
        getDiscountListData={getDiscountListData}
      />

      {editmodalopen && (
        <div>
          <FormModal
            modalOpen={editmodalopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeEditModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onEditFormSubmit}
          >
            <EditDiscount
              control={control}
              closeModal={closeEditModal}
              register={register}
              errors={errors}
            />
          </FormModal>
        </div>
      )}
    </>
  );
}
