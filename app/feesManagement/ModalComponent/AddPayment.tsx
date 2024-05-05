import React from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "./Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import Image from "next/image";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";
interface ModalDetailsProps {
  register: any;
  control: any; // or use proper type for control based on your setup
  errors: any;
  closeModal?: any;
}

const AddPayment: React.FC<ModalDetailsProps> = ({
  control,
  register,
  errors,
  closeModal,
}) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Add Payment
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Invoice no."
              name="paymentInvoiceId"
              control={control}
              className="w-full"
              disabled
              register={register}
              error={errors?.invoiceId}
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Amount"
              name="amount"
              control={control}
              className="w-full"
              register={register}
              required
              error={errors?.amount}
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Payment Method"
              name="paymentMethod"
              control={control}
              className="w-full"
              register={register}
              required
              error={errors?.paymentMethod}
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Payment Reference No."
              name="referenceNumber"
              control={control}
              className="w-full"
              register={register}
              required
              error={errors?.referenceNumber}
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="date"
              placeholder="Payment Date"
              name="paymentDate"
              control={control}
              register={register}
              className="w-full"
              required
              error={errors?.paymentDate}
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Description/Note"
              name="note"
              control={control}
              className="w-full"
              register={register}
              error={errors?.note}
            />
          </TwoInputContainer>
          {/* <CustomInput
            label=""
            type="text"
            placeholder="Internal Note"
            name=""
            control={control}
            className="w-full"
          /> */}
          <div className="flex justify-end self-end items-centern gap-[16px]">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="submit">Add</AddButton>
          </div>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default AddPayment;
