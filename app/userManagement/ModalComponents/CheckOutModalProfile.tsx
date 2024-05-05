import React, { useEffect } from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "../../feesManagement/ModalComponent/Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import Image from "next/image";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";
import FormModal from "@/components/common/FormModal";
import { CheckOutCheckInValidationSchema } from "@/app/daycareManagement/educatorManagement/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  compareCheckinAndCheckoutDate,
  getCurrentTime,
} from "@/utils/utilityFunctions";
import { educatorCheckinCheckout } from "../userManagementApi";
import { ToastContainer, toast } from "react-toastify";
interface ModalDetailsProps {
  closeModal: any;
  modalopen?: any;
  staffId?: any;
  getUserDetailsData?: any;
  attendanceId?: any;
  userData?: any;
}

const CheckOutModalProfile: React.FC<ModalDetailsProps> = ({
  closeModal,

  modalopen,
  staffId,
  getUserDetailsData,
  attendanceId,
  userData,
}) => {
  let validationschema: any = CheckOutCheckInValidationSchema[1];

  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(validationschema),
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
  const onformCheckInSubmit = async (data: any) => {
    try {
      const checkin = userData[userData.length - 1].check_in;
      const checkout = compareCheckinAndCheckoutDate(checkin, data.checkOut);
      if (checkout) {
        toast.error("Check Out time should be after the Check In time");
        return;
      }
      let body = {
        staffId: staffId,
        actionType: "checkout",
        Time: data.checkOut,
        attendanceId: attendanceId,
      };

      let res = await educatorCheckinCheckout(body);
      if (res.success) {
        getUserDetailsData();
        closeModal();
        // console.log("res succes", res);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error", error);
    }
  };
  useEffect(() => {
    setValue("checkOut", getCurrentTime());
  }, []);

  return (
    <>
      {" "}
      <FormModal
        modalOpen={modalopen}
        cancelText={"Cancel"}
        AddText={"Add"}
        closeModal={closeModal}
        modalName={"AddDiscountModal"}
        handleSubmit={handleSubmit}
        onformsubmit={onformCheckInSubmit}
      >
        <ModalDetailsContainer>
          <HeaderContainer>
            <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
              Check Out
            </div>

            <button
              type="button"
              className="flex self-end"
              onClick={closeModal}
            >
              {" "}
              <Image
                src={"/svgs/close-icon.svg"}
                alt=""
                width={18}
                height={18}
              />
            </button>
          </HeaderContainer>
          <FormContainer>
            <TwoInputContainer>
              <CustomInput
                label="Check Out Time"
                type="time"
                // placeholder="Notes"
                name="checkOut"
                control={control}
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.checkOut}
              />
              {/* <CustomInput
              label=""
              type="text"
              placeholder="Subsidy Provider"
              name="subsidyProvider"
              control={control}
              className="w-full"
              required
              register={register}
              error={errors.subsidyName}
            /> */}
            </TwoInputContainer>

            {/* <CustomInput
            label=""
            type="text"
            placeholder="Provider Agency ID"
            name="subsidyProviderId"
            control={control}
            className="w-full"
            register={register}
            required
            error={errors.subsidyName}
          />
          <CustomInput
            label=""
            type="text"
            placeholder="Description"
            name="Description"
            control={control}
            className="w-full"
            register={register}
            required
            error={errors.subsidyName}
          /> */}

            <div className="flex justify-end self-end items-centern gap-[16px]">
              <CancelButton type="button" onClick={closeModal}>
                Cancel
              </CancelButton>
              <AddButton type="submit">Add</AddButton>
            </div>
          </FormContainer>
        </ModalDetailsContainer>
      </FormModal>
      <ToastContainer />
    </>
  );
};

export default CheckOutModalProfile;
