import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";

import Image from "next/image";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";
import { DOMAIN_CONSTANT } from "@/utils/constants";
import { ModalButton } from "@/components/common/Modal/Modal.styled";

import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
  showactivity: boolean;
  setShowActivity: Dispatch<SetStateAction<boolean>>;
  closeModal: any;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  classroomCategory: any;
  selectedDate?: any;
  selectedSchool?: any;
  val?:any;
  setVal?:any;
}

const AddActivityModal: React.FC<ModalDetailsProps> = ({
  control,
  showactivity,
  setShowActivity,
  closeModal,
  register,
  errors,
  watch,
  setValue,
  classroomCategory,
  selectedDate,
  selectedSchool,
  val,
  setVal,
}) => {
  const [materialused, setMaterialUsed] = useState<number[]>([1]);

  const [instructions, setInstructions] = useState<number[]>([1]);

  const handleAddField = (fieldname: string) => {
    if (fieldname === "materialUsed") {
      setMaterialUsed((prevSections) => [
        ...prevSections,
        prevSections.length + 1,
      ]);
    } else {
      setInstructions((prevSections) => [
        ...prevSections,
        prevSections.length + 1,
      ]);
    }
  };

  const handleRemoveField = (index: number, fieldName: string) => {
    let filtercontact = watch(fieldName).filter((item: any, id: number) => {
      return id !== index;
    });

    setValue(fieldName, filtercontact);

    if (fieldName === "materialUsed") {
      let removeItems = [...materialused];
      removeItems.splice(index, 1);
      setMaterialUsed(removeItems);
    } else {
      let removeItems = [...instructions];
      removeItems.splice(index, 1);
      setInstructions(removeItems);
    }
  };

  useEffect(() => {
    setValue("fromdate", selectedDate);
    setValue("todate", selectedDate);
  }, [selectedDate]);
  useEffect(() => {
    setValue("classRoomCategory", selectedSchool);
  }, [selectedSchool]);

  return (
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
          Add Activity
        </div>

        <button type="button" className="" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <ScrollableFormContainer>
        <FormContainer>
          <TwoInputContainer>
            {" "}
            <CustomInput
              label=""
              type="text"
              placeholder="Activity Name & Title"
              name="activityName"
              control={control}
              register={register}
              className="w-full"
              required
              error={errors?.activityName}
            />
            <CustomSelect
              name="domain"
              register={register}
              label="Domain/Learning Area"
              options={DOMAIN_CONSTANT}
              control={control}
              required
              error={errors?.domain}
            />
          </TwoInputContainer>
          {/* <TwoInputContainer>
          <div className="w-4/5 mt-1">
            <div className="flex w-2/3 ml-2 justify-between mb-1">
              <h2 className="text-black-b1">Copy Activity For Future Date </h2>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e: any) => setVal(e?.target?.checked)}
                  checked={val}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <></>
        </TwoInputContainer> */}
             <TwoInputContainer>
            <div className="w-4/5 mt-1">
              <div className="flex w-2/3 ml-2 justify-between mb-1">
                <h2 className="text-black-b1">Copy activity for future date </h2>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e: any) => setVal(e?.target?.checked)}
                    checked={val}
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
              />
            </TwoInputContainer>
          )}
          <TwoInputContainer>
            <div className="w-full">
              <CustomSelect
                name="classRoomCategory"
                label="Classroom Category"
                options={classroomCategory}
                value={selectedSchool}
                disabled
                // control={control}
                // register={register}
                // error={errors?.classRoomCategory}
                required
              />
            </div>
          </TwoInputContainer>
          <CustomInput
            required
            label=""
            type="text"
            placeholder="Description"
            name="description"
            control={control}
            className="w-full mb-4"
            register={register}
            error={errors?.description}
          />
          {/* <TwoInputContainer>
          <div className="w-full">
            <CustomSelect
              name="domain"
              register={register}
              label="Domain/Learning Area"
              options={DOMAIN_CONSTANT}
              control={control}
              required
              error={errors?.domain}
            />
          </div>
        </TwoInputContainer> */}
     
          {/* {val && (
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
            />
          </TwoInputContainer>
        )} */}
          {/* <TwoInputContainer>
          <div className="w-full">
            <CustomSelect
              name="classRoomCategory"
              label="Classroom Category"
              options={classroomCategory}
              value={selectedSchool}
              disabled
              // control={control}
              // register={register}
              // error={errors?.classRoomCategory}
              required
            />
          </div>
        </TwoInputContainer> */}
          {/* <div className="w-full">
          <CustomInput
            required
            label=""
            type="text"
            placeholder="Description"
            name="description"
            control={control}
            className="w-full mb-4"
            register={register}
            error={errors?.description}
          />
        </div> */}
          <div className="w-full">
            <div className="handle">
              {materialused?.map((item: any, index: number) => {
                const fieldName = `materialUsed[${index}]`;

                return (
                  <div key={index} className="mt-2">
                    <div className="handle">
                      <div className="flex flex-col">
                        <CustomInput
                          className="w-full p-3"
                          label=""
                          type="text"
                          placeholder="Materials To Be Used"
                          name={`${fieldName}.material`}
                          control={control}
                          register={register}
                          required
                          errorClassName="ml-[15%] mt-[2px]"
                          error={
                            errors?.materialUsed
                              ? errors.materialUsed[index]?.material
                              : null
                          }
                        />

                        <div className="flex justify-between items-center">
                          <button
                            className="text-blue-b1 text-sm"
                            type="button"
                            onClick={() => handleAddField("materialUsed")}
                          >
                            + Add another
                          </button>

                          {index > 0 && (
                            <button
                              className="text-blue-b1 text-sm"
                              type="button"
                              onClick={() =>
                                handleRemoveField(index, "materialUsed")
                              }
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            {instructions?.map((item: any, index: number) => {
              const fieldName = `instructions[${index}]`;

              return (
                <div className="flex flex-col mt-2" key={index}>
                  <CustomInput
                    className="w-full p-3"
                    label=""
                    type="text"
                    placeholder="Instructions(Step by Step)"
                    name={`${fieldName}.step`}
                    control={control}
                    register={register}
                    required
                    errorClassName="ml-[15%] mt-[2px]"
                    error={
                      errors?.instructions
                        ? errors.instructions[index]?.step
                        : null
                    }
                  />

                  <div className="flex justify-between items-center ">
                    <button
                      className="text-blue-b1 text-sm"
                      type="button"
                      onClick={() => handleAddField("instructions")}
                    >
                      + Add another
                    </button>

                    {index > 0 && (
                      <button
                        className="text-blue-b1 text-sm"
                        type="button"
                        onClick={() => handleRemoveField(index, "instructions")}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <TwoInputContainer>
            <div className="w-full">
              <CustomInput
                label=""
                type="text"
                placeholder="Extra Details"
                name="extraDetails"
                register={register}
                control={control}
                className="w-full"
                error={errors?.extraDetails}
                required
              />
            </div>
            <div className="w-full">
              <CustomSelect
                name="developmentSkill"
                register={register}
                label="Tag a Development Skill"
                options={[
                  { value: "", label: "Select Development Skill" },
                  { value: "sample1", label: "Sample 1" },
                  { value: "sample2", label: "Sample 2" },
                  { value: "sample3", label: "Sample 3" },
                  { value: "sample4", label: "Sample 4" },
                  { value: "sample5", label: "Sample 5" },
                ]}
                control={control}
                error={errors?.developmentSkill}
                required
              />
            </div>
          </TwoInputContainer>
          {/* <div className="w-full overflow-scroll h-[400px] relative my-1">
          <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6 ">
            <div className="w-full flex flex-col items-center justify-center gap-2">
        
            </div>
          </div>
        </div> */}
        </FormContainer>
      </ScrollableFormContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="submit">{"Save"}</AddButton>
          </div>
        </FormContainer>
      </FormButton>
    </ModalDetailsContainer>
  );
};

export default AddActivityModal;
