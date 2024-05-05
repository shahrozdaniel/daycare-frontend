import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";
import React, { useState } from "react";
import { TwoInputContainer } from "@/app/reports/Common.styled";

import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";
// import { UpdateFoodmenu } from '@/services/CalendarManagementServices'
import { toast } from "react-toastify";
import {
  UpdateFoodmenu,
  createActivityPlanning,
  createFoodMenu,
} from "@/services/CalendarManagementServices";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";

const CopyEvent: React.FC<any> = ({
  closeModal,
  data,
  reloadData,
  name,
  parentModalClose,
}) => {
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  console.log(data);
  const submitForm = async () => {
    let res;
    let body;
    try {
      if (name === "food") {
        let formbody = {
          endTime: data?.start_time,
          startTime: data?.end_time,
          menuType: data?.menu_type,
          classRoomCategory: data?.classroom_category,
          menuName: data?.menu_name,
          mealType: data?.menu_type,
          fromdate: fromDate,
          todate: toDate,
          foodMenu: data?.menu_name,
          foodItems: data?.food_items,
          menuSubType: data?.menu_subtype,
        };

        res = await createFoodMenu(formbody);
      }
      if (name === "activity") {
        let formbody = {
          menuName: "",
          classRoomCategory: data?.classroom_category,
          menuType: "",
          mealType: "",
          startTime: "",
          endTime: "",
          fromdate: fromDate,
          todate: toDate,
          foodMenu: "",
          // "date": "2024-02-02",
          ispublic: false,
          activityName: data?.activity_name,
          domain: data?.domain,
          description: data?.description,
          materialUsed: data?.materials_used,
          instructions: data?.instructions,
          extraDetails: "test",
          developmentSkill: data?.development_skill,
          materialsUsed: data?.materials_used,
        };
        res = await createActivityPlanning(formbody);
      }
      if (res?.success) {
        toast.success("Event copied successfully");
        reloadData();
        closeModal();
        parentModalClose();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log(error);
    }
  };

  return (
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
          Copy Event
        </div>

        <button
          type="button"
          className="flex self-end mb-3"
          onClick={closeModal}
        >
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <FormContainer >
        <TwoInputContainer>
          <CustomInput
            label=""
            type="date"
            placeholder="From Date:"
            name=""
            onChange={(e: any) => setFromDate(e?.target?.value)}
            value={fromDate}
          />
          <CustomInput
            label=""
            type="date"
            placeholder="To Date"
            name=""
            onChange={(e: any) => setToDate(e?.target?.value)}
            value={toDate}
          />
        </TwoInputContainer>
      </FormContainer>

      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="button" onClick={submitForm}>
              Add
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      {/* <div className="flex justify-end self-end items-centern gap-[16px] mt-5">
                <CancelButton type="button" onClick={closeModal}>
                    Cancel
                </CancelButton>
                <AddButton type="button" onClick={submitForm}>Add</AddButton>
            </div> */}
    </ModalDetailsContainer>
  );
};

export default CopyEvent;
