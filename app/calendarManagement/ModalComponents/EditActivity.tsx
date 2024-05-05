import React, { useState } from "react";
import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";

import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import { TwoInputContainer } from "@/app/reports/Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import { DOMAIN_CONSTANT } from "@/utils/constants";
import { UpdateActivityPlanning } from "@/services/CalendarManagementServices";
import { toast } from "react-toastify";
import Image from "next/image";
const EditActivity: React.FC<any> = ({
  closeModal,
  editData,
  reloadData,
  parentModalClose,
}) => {
  const [Activity, setActivity] = useState<string>(editData?.activity_name);
  const [domain, setDomain] = useState<string>(editData?.domain);
  const [desc, setDesc] = useState<string>(editData?.description);
  const [material, setMaterial] = useState<string>(
    editData?.materials_used?.toString()
  );
  const [instruction, setInstruction] = useState<string>(
    editData?.instructions?.toString()
  );
  const [extra, setExtra] = useState<string>(editData?.extra_details);
  const [devlopment, setDevlopment] = useState<string>(
    editData?.development_skill
  );

  const submitForm = async () => {
    let body = {
      classRoomCategory: editData?.classroom_category,
      activityName: Activity,
      domain: domain,
      description: desc,
      materialsUsed: material?.split("," || " " || ", " || ", "),
      instructions: instruction?.split("," || " " || ", " || ", "),
      developmentSkill: devlopment,
      extraDetails: extra,
      date: editData?.date,
      ispublic: false,
    };
    let res;
    try {
      res = await UpdateActivityPlanning(body, editData?.id);
      if (res?.success) {
        toast?.success("Activity updated successfully");
        reloadData();
        closeModal();
        parentModalClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalDetailsContainer>
      <HeaderContainer>
      <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
          Update Activity
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
      <FormContainer>
        <TwoInputContainer>
          <CustomInput
            label=""
            type="text"
            placeholder="Activity Name & Title"
            name=""
            className="w-full"
            onChange={(e: any) => setActivity(e?.target?.value)}
            value={Activity}
          />
          <CustomSelect
            name="ageRange"
            label="Domain/Learning Area"
            options={DOMAIN_CONSTANT}
            onChange={(e: any) => setDomain(e?.target?.value)}
            value={domain}
          />
        </TwoInputContainer>
        <TwoInputContainer>
          {/* <DatePickerComponent name="" label=" Date"  /> */}
        </TwoInputContainer>
        <CustomInput
          label=""
          type="text"
          placeholder="Description"
          name=""
          className="w-full"
          onChange={(e: any) => setDesc(e?.target?.value)}
          value={desc}
        />
        <CustomInput
          label=""
          type="text"
          placeholder="Materials To Be Used"
          name=""
          className="w-full"
          onChange={(e: any) => setMaterial(e?.target?.value)}
          value={material}
        />
        <CustomInput
          label=""
          type="text"
          placeholder="Instructions(Step by Step)"
          name=""
          className="w-full"
          onChange={(e: any) => setInstruction(e?.target?.value)}
          value={instruction}
        />
        <TwoInputContainer>
          <CustomInput
            label=""
            type="text"
            placeholder="Extra Details"
            name=""
            className="w-full"
            onChange={(e: any) => setExtra(e?.target?.value)}
            value={extra}
          />
          <CustomSelect
            name="ageRange"
            label="Tag a Development Skill"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              // Add more options as needed
            ]}
            onChange={(e: any) => setDevlopment(e?.target?.value)}
            value={devlopment}
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
              {" "}
              Add
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
    </ModalDetailsContainer>
  );
};

export default EditActivity;
