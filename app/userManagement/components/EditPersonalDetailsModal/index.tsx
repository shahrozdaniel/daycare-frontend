"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { SubmitHandler, useForm } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import { useParams } from "next/navigation";
import { getUserDetails } from "../../userManagementApi";
import { useRouter } from "next/router";
import path from "path";
import Modal from "@/components/common/Modal/Modal";
import EditPersonalDetail from "../../ModalComponents/EditPersonalDetail";
import EditAvailability from "../../ModalComponents/EditAvailability";
import EditDocument from "../../ModalComponents/EditDocuments";
import EditEmergency from "../../ModalComponents/EditEmergency";
import EditOtherDetails from "../../ModalComponents/EditOtherDetails";
import format from "date-fns/format";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import FormModal from "@/components/common/FormModal";
import { get_Country_State_city } from "@/services/UtilityApis";

type AddressParams = {
  state: string;
  city: string;
  country: string;
  pincode: string;
  street: string;
};

type EditPersonalDetailModalProps = {
  modalOpen?: any;
  closeModal?: any;
  editPersonalDetail?: any;
  userData?: any;
  classroomData?: any;
  setClassroomData?: any;
  getUserDetailsData?: any;
  tab?:string;
};
const EditPersonalDetailModal: React.FC<EditPersonalDetailModalProps> = ({
  modalOpen,
  closeModal,
  editPersonalDetail,
  userData,
  classroomData,
  setClassroomData,
  getUserDetailsData,
  tab
}) => {
  // const currentValidationSchema: any = addEducatorValidationSchema[activeStep];
  const methods = useForm({
    // shouldUnregister: false,
    // resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, isValidating },
  } = methods;

  return (
    <>
      {modalOpen && editPersonalDetail && (
        <div>
          <FormModal
            handleSubmit={handleSubmit}
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"EditPersonalDetailModal"}
          >
            <EditPersonalDetail
              control={control}
              personalDetails={userData}
              classroomData={classroomData}
              setClassroomData={setClassroomData}
              register={register}
              closeModal={closeModal}
              getUserDetailsData={getUserDetailsData}
              tab={tab}
            />
          </FormModal>
        </div>
      )}
    </>
  );
};

export default EditPersonalDetailModal;
