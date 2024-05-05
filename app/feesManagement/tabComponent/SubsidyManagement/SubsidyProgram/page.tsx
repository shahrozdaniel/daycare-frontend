"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, columns } from "./columns";
import { TableContainer } from "@/app/feesManagement/Common.styled";
import UserTable from "@/app/feesManagement/components/UserTable";
import Modal from "@/components/common/Modal/Modal";
import AddNewSubsidy from "@/app/feesManagement/ModalComponent/AddNewSubsidy";
import Image from "next/image";
import { useForm } from "react-hook-form";
import FormModal from "@/components/common/FormModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddSubsidyProgramValidationSchema } from "@/app/feesManagement/ModalComponent/validationSchema";
import {
  createSubsidyProgram,
  getSubsidyProgramList,
  updateSubsidy,
} from "@/services/subsidyManagementServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import SubsidyProgramTable from "@/app/feesManagement/components/SubsidyProgramTable";
import ViewSubsidy from "@/app/feesManagement/ModalComponent/ViewSubsidy";
import EditSubsidy from "@/app/feesManagement/ModalComponent/EditSubsidy";
interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function SubsidyProgram() {
  // const data: User[] = [
  //   {
  //     id: "1",
  //     subsidyName: "Subsidy Name",
  //     subsidyProvider: "Subsidy Provider",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     subsidyName: "Subsidy Name",
  //     subsidyProvider: "Subsidy Provider",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     subsidyName: "Subsidy Name",
  //     subsidyProvider: "Subsidy Provider",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     subsidyName: "Subsidy Name",
  //     subsidyProvider: "Subsidy Provider",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     subsidyName: "Subsidy Name",
  //     subsidyProvider: "Subsidy Provider",
  //     amount: "1200",
  //     description: "dolor sit amet, consectetur adipiscing elit",
  //     action: "string",
  //   },
  // ];

  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(AddSubsidyProgramValidationSchema),
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
  let router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalopen, setEditModalOpen] = useState(false);
  const [viewmodalopen, setViewModalOpen] = useState(false);
  const [newSubsidy, setNewSubsidy] = useState(false);
  const [subsidyprogramlist, setSubsidyProgramlList] = useState([]);
  //this function will open the modal
  const openModal = () => {
    setNewSubsidy(true);

    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = () => {
    setNewSubsidy(false);
    setModalOpen(false);
  };

  // this function will open the edit discount modal
  const openEditModal = (data: any) => {
    let editdata = {
      subsidyName: data.subsidyName,
      subsidyProvider: data.subsidyProvider,
      subsidyProviderId: data.subsidyProviderId,
      Description: data.description,
      id: data.id,
    };
    Object.entries(editdata).map((key: any) => {
      setValue(key[0], key[1]);
    });

    setEditModalOpen(true);
  };

  // this function will close the edit modal
  const closeEditModal = () => {
    reset();
    setEditModalOpen(false);
  };

  // this function will open the view modal
  const openViewModal = (data: any) => {
    let editdata = {
      subsidyName: data.subsidyName,
      subsidyProvider: data.subsidyProvider,
      subsidyProviderId: data.subsidyProviderId,
      Description: data.description,
      id: data.id,
    };
    Object.entries(editdata).map((key: any) => {
      setValue(key[0], key[1]);
    });
    setViewModalOpen(true);
  };

  // this function will close the view modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  // form for creating subsidy
  const onFormSubsidySubmit = async (data: any) => {
    try {
      let result = await createSubsidyProgram(data);
      if (result.success) {
        toast.success(result.message);
        // getDiscountListData();
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

  //form for updating subsidy (
  const onFormSubsidyEdit = async (data: any) => {
    try {
      let body = {
        subsidyName: data.subsidyName,
        subsidyProvider: data.subsidyProvider,
        subsidyProviderId: data.subsidyProviderId,
        Description: data.Description,
      };
      let result = await updateSubsidy(body, data.id);
      if (result.success) {
        toast.success(result.message);
        getSubsidyListData();
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

  const getSubsidyListData = async () => {
    try {
      let result = await getSubsidyProgramList();
      if (result.success) {
        let resultarr = result.data.list.map((item: any, index: number) => {
          return {
            id: item.subsidyId,
            subsidyName: item.subsidyName,
            subsidyProvider: item.subsidyProvider,
            description: item.Description,
            subsidyProviderId: item.subsidyProviderId,
            openEditModal: openEditModal,
            openViewModal: openViewModal,
          };
        });
        setSubsidyProgramlList(resultarr);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getSubsidyListData();
  }, []);
  return (
    <>
      <SubsidyProgramTable
        columns={columns}
        data={subsidyprogramlist}
        openModal={openModal}
      />

      {modalOpen && newSubsidy && (
        <div>
          <FormModal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onFormSubsidySubmit}
          >
            <AddNewSubsidy
              control={control}
              register={register}
              errors={errors}
              closeModal={closeModal}
            />
          </FormModal>
        </div>
      )}

      {editmodalopen && (
        <div>
          <FormModal
            modalOpen={editmodalopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeEditModal}
            modalName={"AddDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onFormSubsidyEdit}
          >
            <EditSubsidy
              control={control}
              register={register}
              errors={errors}
              closeModal={closeEditModal}
            />
          </FormModal>
        </div>
      )}

      {viewmodalopen && (
        <FormModal
          modalOpen={viewmodalopen}
          cancelText={"Cancel"}
          AddText={"Add"}
          closeModal={closeViewModal}
          modalName={"ViewDiscountModal"}
          onformsubmit={onFormSubsidySubmit}
          handleSubmit={handleSubmit}
        >
          <ViewSubsidy
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            closeModal={closeViewModal}
          />
        </FormModal>
      )}
      <ToastContainer />
    </>
  );
}
