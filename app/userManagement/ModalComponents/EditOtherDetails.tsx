import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import Textarea from "@/components/common/Textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { EdituserMangementotherdetails } from "@/services/User-management-API";
import { HeaderContainer } from "./Common.styled";
import Image from "next/image";
import { FormButton, FormContainer, ModalDetailsContainer, ScrollableFormContainer } from "@/app/feesManagement/ModalComponent/Common.styled";

interface EducatorOtherDetailsProps {
  control: any;
  userData?: any;
  closeModal?: any;
  getUserDetailsData?: any;
  tab?: string;
  // or use proper type for control based on your setup
  //   register: any;
}

const EditOtherDetails: React.FC<EducatorOtherDetailsProps> = ({
  control,
  userData,
  closeModal,
  getUserDetailsData,
  tab,
}) => {
  let id = userData?.otherInfo?.user_id;
  const [otherDetais, setOtherDetails] = useState<any>("");

  useEffect(() => {
    setOtherDetails(userData?.otherInfo?.other_details);
  }, [userData]);
  const submitData = async () => {
    let body = {
      additionalDetails: otherDetais,
    };
    let res;
    try {
      res = await EdituserMangementotherdetails(id, body);
      if (res?.success) {
        toast.success("Other details updated successfully");
        closeModal();
        getUserDetailsData();
      } else {
        toast.error("Some thing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
          {tab ? "User" : " Educator"} Other Details
        </div>

        <button type="button" className="flex self-end" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <ScrollableFormContainer>
      <FormContainer>
        <div className="flex-col w-full mx-auto items-center justify-center gap-6">
          <label>Additional Details</label>
          <textarea
            className="w-full border border-gray-300 rounded-[20px] p-3 focus:ring-accent focus:border-accent bg-input_bg min-h-[180px]"
            placeholder="Additional Details"
            onChange={(e) => setOtherDetails(e?.target?.value)}
            value={otherDetais}
          />
        </div>
      </FormContainer>
      </ScrollableFormContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton type="button" onClick={submitData}>
              {"Add"}
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      <ToastContainer />
      {/* <Button>Next</Button> */}
    </ModalDetailsContainer>
  );
};

export default EditOtherDetails;
