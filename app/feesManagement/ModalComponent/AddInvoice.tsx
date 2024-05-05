import React, { useState, useEffect } from "react";
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
import { getDiscountList } from "@/services/discountManagementServices";
import { toast } from "react-toastify";
import { tutionPlanList } from "@/services/feeManagement";
import { planTypeMapping } from "@/utils/constants";
interface ModalDetailsProps {
  register: any;
  control: any; // or use proper type for control based on your setup
  errors: any;
  closeModal?: any;
  discountlist: { value: number | string; label: string }[];
  childenrolldata: { value: number | string; label: string }[];
  subsidyprogramlist: { value: number | string; label: string }[];
  watch?: any;
  setValue?: any;
}

const AddInvoice: React.FC<ModalDetailsProps> = ({
  register,
  control,
  errors,
  closeModal,
  discountlist,
  childenrolldata,
  subsidyprogramlist,
  watch,
  setValue,
}) => {
  const [plandata, setPlanData] = useState<any[]>([]);
  const [planamount, setPlanAmount] = useState<any[]>([]);
  const planList = async () => {
    setPlanData([]);
    let res;
    try {
      res = await tutionPlanList();
      if (res?.success) {
        let resarray = res?.data[
          planTypeMapping[Number(watch("planType"))]
        ]?.map((item: any) => {
          return {
            value: item.planDetails?.planName,
            label: item.planDetails?.planName,
          };
        });
        setPlanData([{ value: "", label: "Select Plan Name" }, ...resarray]);
        // setPlanAmount(res?.data[
        //   planTypeMapping[Number(watch("planType"))])

        setPlanAmount(
          res?.data[planTypeMapping[Number(watch("planType"))]]?.map(
            (item: any) => {
              return item.planDetails;
            }
          )
        );
        // let plan: any = []
        // res?.data?.AGE_GROUP_BASED?.map((ele: any) => {
        //   console.log(ele)
        //   plan.push({ id: ele?.id, plantype: ele?.planType, amount: ele?.planDetails?.feesDetails?.amount, classroomId: ele?.planDetails?.classroomId, classroomName: "", taxAmount: ele?.planDetails?.taxAmount, reloadtable: planList, status: ele?.status, planName: ele?.planDetails?.planName, maxAge: ele?.planDetails?.maxAge, minAge: ele?.planDetails?.minAge, totalData: ele, setEditDta: setEditDta, helperModalOpen: setAgeGroup, modalOpen: setModalOpen })
        // })
        // setData(plan)
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    planList();
  }, [watch("planType")]);

  useEffect(() => {
    if (watch("planName")) {
      let filteramount: any[] = planamount.filter((item) => {
        return item.planName === watch("planName");
      });

      setValue("amount", filteramount[0]?.feesDetails?.amount);
    }
  }, [watch("planName")]);

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Add Invoice
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <div className="w-full">
              {" "}
              <CustomSelect
                name="invoiceFor"
                label="Invoice for"
                required
                options={[
                  { value: "", label: "Select Option" },
                  { value: "Tuition", label: "Tuition" },
                  { value: "Others", label: "Others" },
                  // Add more options as needed
                ]}
                control={control}
                register={register}
                error={errors?.invoiceFor}
              />
            </div>

            <div className="w-full">
              <CustomInput
                label=""
                type="text"
                placeholder="Amount"
                name="amount"
                required
                control={control}
                className="w-full"
                register={register}
                error={errors?.amount}
              />
            </div>
          </TwoInputContainer>
          {watch("invoiceFor") === "Tuition" && (
            <TwoInputContainer>
              <div className="w-full">
                {watch("invoiceFor") === "Tuition" && (
                  <div className="w-full">
                    <CustomSelect
                      name="planType"
                      label="Tution Plan Type"
                      required
                      options={[
                        { value: "", label: "Select Option" },
                        { value: 2, label: "CLASSROOM BASED" },
                        { value: 4, label: "AGE GROUP BASED" },
                        // Add more options as needed
                      ]}
                      control={control}
                      register={register}
                    />
                  </div>
                )}
              </div>
              <div className="w-full">
                {watch("planType") && watch("invoiceFor") === "Tuition" && (
                  <div className="w-full">
                    <CustomSelect
                      name="planName"
                      label="Tution Plan Name"
                      required
                      options={plandata}
                      control={control}
                      register={register}
                    />
                  </div>
                )}
              </div>
            </TwoInputContainer>
          )}
          <TwoInputContainer>
            <div className="w-full">
              {discountlist && (
                <CustomSelect
                  name="discountId"
                  label="Discount"
                  options={discountlist}
                  control={control}
                  register={register}
                  error={errors?.discountId}
                />
              )}
            </div>
            <div className="w-full">
              {childenrolldata && (
                <CustomSelect
                  name="enrollmentId"
                  label="Enrollment"
                  options={childenrolldata}
                  control={control}
                  required
                  register={register}
                  error={errors?.enrollmentId}
                />
              )}
            </div>
          </TwoInputContainer>
          <TwoInputContainer>
            <div className="w-full">
              {" "}
              {subsidyprogramlist && (
                <CustomSelect
                  name="subsidyId"
                  label="SubsidyId"
                  options={subsidyprogramlist}
                  control={control}
                  register={register}
                  error={errors?.subsidyId}
                />
              )}{" "}
            </div>
            <div className="w-full">
              <CustomInput
                label=""
                type="text"
                placeholder="Notes"
                name="notes"
                control={control}
                className="w-full"
                register={register}
                error={errors?.notes}
                required
              />
            </div>
          </TwoInputContainer>

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

export default AddInvoice;
