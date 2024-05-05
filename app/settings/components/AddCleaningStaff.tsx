"use client";
import { FormButton, FormContainer } from "@/app/feesManagement/ModalComponent/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import {
  createcomplianceStaff,
  updatecomplianceStaff,
} from "@/services/dayCareSetting";
import { Select } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { cleaningStaffValidation } from "./addcleaningStaffValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

const AddCleaningStaff: React.FC<any> = ({
  closeModal,
  reloadTable,
  IsEdit,
  editData,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue
  } = useForm<any>({ resolver: yupResolver(cleaningStaffValidation) });
  useEffect(() => {
    setValue("staff_name", editData?.staff_name);
    setValue("status", editData?.status);
  }, [editData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    let res;
    try {
      if (IsEdit) {
        res = await updatecomplianceStaff(data, editData?.id);
      } else {
        res = await createcomplianceStaff(data);
      }
      if (res?.success) {
        reloadTable();
        toast.success(res?.message);
        closeModal();
      }
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-4/6 h-4/5 mx-auto my-6">
          <div className=" flex flex-row  gap-y-5 gap-x-4 my-3 pb-2">
            <div className="w-1/2">
              <CustomInput
                type="text"
                name="staff_name"
                placeholder="Staff Name"
                required={true}
                error={errors?.staff_name}
                control={control}
                register={register}

              />
            </div>
            <div className="w-1/2">
              <CustomSelect
                control={control}
                register={register}
                name="status"
                label="Status"
                options={[
                  { value: "", label: "Select" },
                  { value: 1, label: "Active" },
                  { value: 0, label: "Inactive" },
                ]}
                error={errors?.status}
                required={true}
              />
            </div>
          </div>

        </div>
        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
              <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
              <AddButton type="submit">{"Save"}</AddButton>
            </div>
          </FormContainer>
        </FormButton>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddCleaningStaff;
