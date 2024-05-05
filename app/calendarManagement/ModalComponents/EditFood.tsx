"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";
import { MEAL_TYPE, MENU_TYPE, NON_VEG_TYPE } from "@/utils/constants";
import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";

import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import { UpdateFoodmenu } from "@/services/CalendarManagementServices";
import { toast } from "react-toastify";

const EditFood: React.FC<any> = ({
  closeModal,
  data,
  setValue,
  reloadData,
  parentModalClose,
}) => {
  const [menuName, setMenuName] = useState<string>("");
  const [subMenu, setsubMenu] = useState<string>("");
  const [mealType, setmealtype] = useState<string>("");
  const [menuType, setmenType] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [menuItems, setMenuItems] = useState<string[]>([]);

  useEffect(() => {
    setMenuName(data?.menu_name);
    setsubMenu(data?.menu_subtype);
    setmealtype(data?.meal_type);
    setmenType(data?.menu_type);
    // setStartTime(data?.start_time);
    // setEndTime(data?.end_time);
    setMenuItems(data?.food_items ?? []);
  }, []);

  const handleAddField = () => {
    setMenuItems((prevItems) => [...prevItems, ""]);
  };

  const handleRemoveField = (index: number) => {
    setMenuItems((prevItems) => prevItems.filter((item, idx) => idx !== index));
  };

  const handleMenuItemChange = (index: number, value: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item, idx) => (idx === index ? value : item))
    ); // Update the specific item's value
  };

  const submitFoem = async () => {
    let body = {
      classRoomCategory: data?.classroom_category,
      menuName: menuName,
      menuType: menuType,
      mealType: mealType,
      // startTime: startTime,
      // endTime: endTime,
      foodItems: menuItems,
      date: data?.date,
    };
    let res;
    try {
      res = await UpdateFoodmenu(body, data?.id);
      if (res?.success) {
        toast.success("Food Menu updated successfully");
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
          Update Food Menu
        </div>

        <button type="button" className="flex self-end" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>

      <ScrollableFormContainer>
        <FormContainer>
          <TwoInputContainer>
            <div className="w-full">
              {" "}
              <CustomInput
                label=""
                type="text"
                placeholder="Food menu name"
                name=""
                className="w-full"
                onChange={(e: any) => setMenuName(e?.target?.value)}
                value={menuName}
              />
            </div>
          </TwoInputContainer>
          <TwoInputContainer>
            <div className="w-full flex flex-col gap-y-5 gap-x-4">
              <CustomSelect
                name=""
                label="Menu Type"
                options={MENU_TYPE}
                onChange={(e: any) => setmenType(e?.tareget?.value)}
                value={menuType}
              />
              {data?.menu_subtype && (
                <CustomSelect
                  name=""
                  label="Sub Menu Type"
                  options={NON_VEG_TYPE}
                  onChange={(e: any) => setsubMenu(e?.tareget?.value)}
                  value={subMenu}
                />
              )}
            </div>
            <div className="w-full">
              <CustomSelect
                name="mealType"
                label="Meal Type"
                options={MEAL_TYPE}
                onChange={(e: any) => setmealtype(e?.tareget?.value)}
                value={mealType}
              />
            </div>
          </TwoInputContainer>

          <TwoInputContainer>
            <div className="w-full">
              {menuItems?.map((item: any, index: number) => {
                const fieldName = `foodItems[${index}]`;
                return (
                  <div className="flex flex-col mb-2" key={index}>
                    <CustomInput
                      label=""
                      type="text"
                      placeholder="Food Menu"
                      name={fieldName}
                      onChange={(e) =>
                        handleMenuItemChange(index, e.target.value)
                      }
                      value={item}
                    />
                    <div className="flex justify-between items-center">
                      <button
                        className="text-blue-b1 text-sm"
                        type="button"
                        onClick={() => handleAddField()}
                      >
                        + Add another
                      </button>

                      {index > 0 && (
                        <button
                          className="text-blue-b1 text-sm"
                          type="button"
                          onClick={() => handleRemoveField(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TwoInputContainer>
        </FormContainer>
      </ScrollableFormContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="button" onClick={submitFoem}>
              Add
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
    </ModalDetailsContainer>
  );
};

export default EditFood;
