"use client";
import { LOCATION_TYPE } from "@/app/Dropdowns";
import { FormButton, FormContainer } from "@/app/feesManagement/ModalComponent/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { createLoction, updateLocation } from "@/services/dayCareSetting";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddRoomModal: React.FC<any> = ({
  closeModal,
  reloadTable,
  IsEdit,
  editData,
}) => {
  const [name, setName] = useState<string>("");
  const [locationType, setLocationType] = useState<string>("");
  console.log(editData);
  useEffect(() => {
    if (IsEdit && editData) {
      setName(editData?.name);
      setLocationType(editData?.type);
    }
  }, []);

  const submitForm = async () => {
    let res;
    if (name == "" || locationType == "") {
      toast.error("Please fill the required field");
    } else {
      let data = { room_name: name, room_type: locationType };
      try {
        if (IsEdit) {
          res = await updateLocation(data, editData?.id);
        } else {
          res = await createLoction(data);
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
    }
  };
  
  return (
    <>
      <div className="w-4/6 h-4/5 mx-auto my-4">
        <div className=" flex flex-row  gap-y-5 gap-x-4 my-3 p-2">
          <div className="w-1/2">
            <CustomInput
              type="text"
              name=""
              placeholder="Room Name"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              required={true}
            />
          </div>
          <div className="w-1/2">
            <CustomSelect
              options={LOCATION_TYPE.sort(((a, b) => {
                let idx: number = 0;
                if (a.value !== "Other") {
                  idx = a.value.localeCompare(b.value);
                }
                return idx;
              })
                )}
              name=""
              label="Room Type"
              required={true}
              value={locationType}
              onChange={(e: any) => setLocationType(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <FormButton>
          <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
        <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
        <AddButton onClick={submitForm}>{"Save"}</AddButton>
      </div>
      </FormContainer>
      </FormButton>
      <ToastContainer />
    </>
  );
};

export default AddRoomModal;
