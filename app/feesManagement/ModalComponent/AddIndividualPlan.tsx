
"use client"
import React, { useEffect, useState } from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "./Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { ModalButton } from "@/components/common/Modal/Modal.styled";
import { AddButton, CancelButton } from "@/components/common/FormModal/formModal.styled";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import { FEE_BILLING, FEE_PLAN_STATUS, FEE_PLAN_TYPE, TUTION_FEE_TYPE } from "@/app/Dropdowns";
import { CreateFeePlan, UpdateFeePlan } from "@/services/feeManagement";
import WeekComponet from "@/components/common/WeekComponet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { childEnrollmetnList } from "@/services/childrenActionServices";
interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
}

const AddIndividualPlan: React.FC<any> = ({ control, cancelText, AddText, closeModal, reloadTable, edit, setEdit, editData }) => {
  const [ChildData, setChildData] = useState<any>([]);
  const [planName, setPlanName] = useState<any>()
  const [ChildId, setChildId] = useState<any>()
  const [billling, setBilling] = useState<any>()
  const [feeType, setFeeType] = useState<any>()
  const [amount, setAmount] = useState<any>()
  const [taxAmount, setTaxAount] = useState<any>()
  const [childSchedule, setChildSchedule] = useState<any>([])
  const [halfDayFee, sethalfDayFee] = useState<any>()
  const [fullDayFee, setFullDayFee] = useState<any>()
  const [min, setMin] = useState<any>()
  const [max, setmax] = useState<any>()
  const [amountPerDay, setAmountPerDay] = useState<any>()
  const [desc, setDesc] = useState<any>()
  const [status, setStatus] = useState<any>()
  const [planId, setPlanId] = useState<any>()

  useEffect(() => {
    setPlanId(editData?.id)
    setPlanName(editData?.planDetails?.planName)
    setBilling(editData?.planDetails?.billingSchedule)
    setFeeType(editData?.planDetails?.feesType)
    setAmount(editData?.planDetails?.amount)
    setTaxAount(editData?.planDetails?.taxAmount)
    sethalfDayFee(editData?.planDetails?.feesDetails?.halfDayFees)
    setFullDayFee(editData?.planDetails?.feesDetails?.fullDayFees)
    setMin(editData?.planDetails?.minAge)
    setmax(editData?.planDetails?.maxAge)
    setAmountPerDay(editData?.planDetails?.feesDetails?.fullDayFees)
    setDesc(editData?.description)
    setStatus(editData?.planDetails?.status)
    setChildSchedule(editData?.planDetails?.feesDetails?.childSchedule)
    if (Object.keys(editData).length > 0) {
      setEdit(true)
    } else {
      setEdit(false)
    }
  }, [editData])

  const enrolledChildlistlist = async () => {
    let res;
    try {
      // res = await childEnrollmetnList();
      // if (res?.success) {
      //   console.log(res?.data)
      //   const newArray = res?.data?.map((item: any, index: number) => ({
      //     label: item.child?.name,
      //     value: item.child_id,
      //   }));
      //   const newArrayWithSelect = [
      //     { value: "", label: "Select classroom" },
      //     ...newArray,
      //   ];

      //   setChildData(newArrayWithSelect);
      // }
      // console.log(res);
    } catch (error) { }
  };

  useEffect(() => {
    enrolledChildlistlist()
  }, []);
  const submitForm = async () => {
    let body = {
      planType: 3,
      childId: ChildId,
      amount: amount,
      taxAmount: taxAmount,
      planName: planName,
      description: desc,
      status: status,
      billingSchedule: billling,
      feesType: feeType,
      childSchedule: childSchedule,
      halfDayFees: halfDayFee,
      fullDayFees: fullDayFee,
      minAge:min,
      maxAge:max
    }
    let res;
    let childScheduleData = {
      childSchedule: childSchedule
    }
    if (feeType === 'fee-tier') {
      body = { ...body, ...childScheduleData }
    }
    try {
      if (edit) {
        res = await UpdateFeePlan(planId, body)
      } else {
        res = await CreateFeePlan(body)
      }
      if (res?.success) {
        toast.success(res?.data)
        reloadTable()
        closeModal()
      } else {
        toast.error(res?.response?.data?.error?.map)
        toast.error('something went wrong')

        // console.log(res?.response?.data);
      }
    } catch (error: any) {
      console.log('error', error)

    }
  }
  const handleDaysChange = (days: any) => {
    setChildSchedule(days);
  };

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Individual Tuition Plan
          </div>
        </HeaderContainer>
        <FormContainer>

          <TwoInputContainer>
            <CustomSelect
              name="classroom"
              label=" Child"
              options={ChildData}
              control={control}
              onChange={(e: any) => setChildId(e?.target?.value)}
              value={ChildId}
              required
            />
            <CustomSelect
              name="mealType"
              label="Billing Schedule"
              options={FEE_BILLING}
              control={control}
              onChange={(e: any) => setBilling(e?.target?.value)}
              value={billling}
              required
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomSelect
              name="mealType"
              label="Tuition Fees Type"
              options={TUTION_FEE_TYPE}
              control={control}
              onChange={(e: any) => setFeeType(e?.target?.value)}
              value={feeType}
              required
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Description"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setDesc(e?.target?.value)}
              value={desc}
              required
            />
          </TwoInputContainer>
          <TwoInputContainer>
            {feeType === ('daily-rate') && <CustomInput
              label=""
              type="number"
              placeholder="Amount per day"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setAmountPerDay(e?.target?.value)}
              value={amountPerDay}
              required
            />}
            {feeType === 'flat-rate' && <CustomInput
              label=""
              type="number"
              placeholder="Amount"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setAmount(e?.target?.value)}
              value={amount}
              required
            />}
            {(feeType === 'flat-rate' || feeType === 'daily-rate') && <CustomInput
              label=""
              type="number"
              placeholder="Tax Amount"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setTaxAount(e?.target?.value)}
              value={taxAmount}
              required
            />}
          </TwoInputContainer>
          {feeType === 'fee-tier' && <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Full Day Fees"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setFullDayFee(e?.target?.value)}
              value={fullDayFee}
              required
            />
          </TwoInputContainer>}
          {feeType === 'fee-tier' && <TwoInputContainer>
            <WeekComponet selectedDays={childSchedule} onChange={handleDaysChange} />
          </TwoInputContainer>}
          {feeType === 'fee-tier' && <TwoInputContainer>
            <CustomInput
              label=""
              type="number"
              placeholder="Half Day Fees(Optional)"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => sethalfDayFee(e?.target?.value)}
              value={halfDayFee}
            />
            <CustomInput
              label=""
              type="number"
              placeholder="Tax Amount"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setTaxAount(e?.target?.value)}
              value={taxAmount}
              required
            />
          </TwoInputContainer>}
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Plan Name"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setPlanName(e?.target?.value)}
              value={planName}
              required
            />
            <CustomSelect
              name="classroom"
              label="Status"
              options={FEE_PLAN_STATUS}
              control={control}
              onChange={(e: any) => setStatus(e?.target?.value)}
              value={status}
              required
            />
          </TwoInputContainer>
        </FormContainer>
        <ModalButton>
          <CancelButton onClick={closeModal}>
            {'Cancel'}
          </CancelButton>
          <AddButton type="button" onClick={submitForm}>{"Save"}</AddButton>
        </ModalButton>
      </ModalDetailsContainer>
      <ToastContainer />
    </>
  );
};

export default AddIndividualPlan;

