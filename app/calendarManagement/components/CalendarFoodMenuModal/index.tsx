import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
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
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";

import { MEAL_TYPE, MENU_TYPE, NON_VEG_TYPE } from "@/utils/constants";

import { ModalButton } from "@/components/common/Modal/Modal.styled";
interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
  showfoodmenu: boolean;
  setShowFoodMenu: Dispatch<SetStateAction<boolean>>;
  register: any;
  errors: any;
  closeModal: any;
  watch: any;
  classroomcategory: any;
  selected: any;
  setSelected: any;
  selectedDate: any;
  setValue: any;
  selectedSchool?: any;
}

const FoodMenuModal: React.FC<any> = ({
  register,
  classroomcategory,
  errors,
  watch,
  closeModal,
  control,
  showfoodmenu,
  setShowFoodMenu,
  selected,
  setSelected,
  selectedDate,
  setValue,
  selectedSchool,
}) => {
  useEffect(() => {
    setValue("fromdate", selectedDate);
    setValue("todate", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setValue("classRoomCategory", selectedSchool);
  }, [selectedSchool]);

  const [foodItems, setFoodItems] = useState<number[]>([1]);
  const [val, setVal] = useState<boolean>(false);
  const handleAddField = () => {
    setFoodItems((prevSections) => [...prevSections, prevSections.length + 1]);
  };

  const handleRemoveField = (index: number, fieldName: string) => {
    let filter = watch(fieldName).filter((item: any, id: number) => {
      return id !== index;
    });

    setValue(fieldName, filter);
    let removeItems = [...foodItems];
    removeItems.splice(index, 1);
    setFoodItems(removeItems);
  };

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
            Add Food Menu
          </div>

          <button type="button" className="" onClick={closeModal}>
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
                  name="menuName"
                  control={control}
                  className="w-full"
                  register={register}
                  error={errors?.menuName}
                  required
                />
              </div>
              <div className="w-full">
                {" "}
                <CustomSelect
                  name="classRoomCategory"
                  label="Classroom Category"
                  options={classroomcategory}
                  disabled
                  // control={control}
                  // register={register}
                  value={selectedSchool}
                  // error={errors?.classRoomCategory}
                  required
                />
              </div>
            </TwoInputContainer>
            <TwoInputContainer>
              <div className="w-full flex flex-col gap-2">
                <CustomSelect
                  name="menuType"
                  label="Menu Type"
                  options={MENU_TYPE}
                  control={control}
                  register={register}
                  error={errors?.menuType}
                  required
                />
                {watch("menuType") === "Non-Veg" && (
                  <CustomSelect
                    name="menuSubType"
                    label="Sub Menu Type"
                    options={NON_VEG_TYPE}
                    control={control}
                    register={register}
                  />
                )}
              </div>
              <div className="w-full">
                <CustomSelect
                  name="mealType"
                  label="Meal Type"
                  options={MEAL_TYPE}
                  control={control}
                  register={register}
                  error={errors?.mealType}
                  required
                />
              </div>
            </TwoInputContainer>
            <TwoInputContainer>
              <div className="w-4/5 mt-1">
                <div className="flex w-2/3 ml-2 justify-between mb-1">
                  <h2 className="text-black-b1">
                    Copy food menu for future date{" "}
                  </h2>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={(e: any) => setVal(e?.target?.checked)}
                      checked={val}
                      className="slider-checkbox"
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <></>
            </TwoInputContainer>
            {val && (
              <TwoInputContainer>
                <CustomInput
                  label=""
                  type="date"
                  placeholder="From Date"
                  name="fromdate"
                  control={control}
                  register={register}
                  className="w-full my-2"
                  error={errors?.date}
                  // disabled={true}
          
                />
                <CustomInput
                  label=""
                  type="date"
                  placeholder="To Date"
                  name="todate"
                  control={control}
                  register={register}
                  className="w-full"
                  // error={errors?.date}
                  // disabled={true}
                />
              </TwoInputContainer>
            )}
            {!val && (
              <TwoInputContainer>
                <CustomInput
                  label=""
                  type="date"
                  placeholder="Date"
                  name="fromdate"
                  control={control}
                  register={register}
                  className="w-full my-2"
                  error={errors?.date}
                  // disabled={true}
                  required
                />
              </TwoInputContainer>
            )}

            <TwoInputContainer>
              <div className="w-full">
                {foodItems?.map((item: any, index: number) => {
                  const fieldName = `foodItems[${index}]`;
                  return (
                    <div className="flex flex-col my-2" key={index}>
                      <CustomInput
                        label=""
                        type="text"
                        placeholder="Food Menu"
                        name={fieldName}
                        control={control}
                        register={register}
                        error={
                          errors?.foodItems ? errors.foodItems[index] : null
                        }
                        // error={errors?.endTime}
                        required
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
                            onClick={() =>
                              handleRemoveField(index, "foodItems")
                            }
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
            <div className="flex justify-end self-end items-end gap-[16px]">
              <CancelButton type="button" onClick={closeModal}>
                Cancel
              </CancelButton>
              <AddButton type="submit">{"Save"}</AddButton>
            </div>
          </FormContainer>
        </FormButton>
      </ModalDetailsContainer>
    </>
  );
};

export default FoodMenuModal;
