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
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import { AddButton, CancelButton, ModalButton } from "@/components/common/FormModal/formModal.styled";
import { CreateFeePlan, UpdateFeePlan } from "@/services/feeManagement";
import { toast } from "react-toastify";
import { FEE_PLAN_STATUS } from "@/app/Dropdowns";
import { calculateTotalFromPercentage } from "@/utils/utilityFunctions";

interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
}

const AddRegistrationFees: React.FC<any> = ({ control, cancelText, AddText, closeModal, reloadTable, editData, setEdit, edit }) => {
  const [classroom, setClassRoom] = useState<string>('')
  const [dec, setDesc] = useState<string>('')
  const [amount, setAmount] = useState<number>()
  const [status, setStatus] = useState<number>()
  const [classRoomData, setClassRoomData] = useState<any>([]);
  const [taxamount, settaxAmount] = useState<number>()
  const [total, setTotal] = useState<number>()
  const [planId, setPlanId] = useState<string>('')
  // const [planName, setPlanName] = useState<string>('')
  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        const newArray = res?.data?.list.map((item: any, index: number) => ({
          label: item.classroomName,
          value: item.classroomId,
        }));
        const newArrayWithSelect = [
          { value: "", label: "Select classroom" },
          ...newArray,
        ];

        setClassRoomData(newArrayWithSelect);
        // setclassroomData(res?.data?.list);
        // setPgination(res?.['data']?.['pagination'])
      }
      // console.log(res);
    } catch (error) { }
  };

  useEffect(() => {
    getclassroomlist();
  }, []);

  useEffect(() => {
    if (amount && taxamount) {
      let total = calculateTotalFromPercentage(taxamount, amount)
      setTotal(total)
    }
  }, [amount, taxamount])

  useEffect(() => {
    console.log(editData)
    setClassRoom(editData?.planDetails?.classroomId)
    setDesc(editData?.description)
    setAmount(editData?.planDetails?.amount)
    setStatus(editData?.status)
    settaxAmount(editData?.planDetails?.taxAmount)
    setPlanId(editData?.id)
    if (Object.keys(editData).length > 0) {
      setEdit(true)
    } else {
      setEdit(false)
    }
  }, [editData])

  const submitForm = async () => {
    let body = {
      planType: 1,
      taxAmount: taxamount,
      amount: amount,
      status: status,
      description: dec,
      classroomId: classroom,
      // planName: planName
    }
    let res;
    try {
      if (edit) {
        res = await UpdateFeePlan(planId, body)
      } else {
        res = await CreateFeePlan(body)
      }
      if (res?.success) {
        toast.success(res?.message)
        reloadTable()
        closeModal()
      } else {
        toast.error('')
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Registration Fees
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomSelect
              name="classroom"
              label=" Classroom"
              options={classRoomData}
              control={control}
              onChange={(e: any) => setClassRoom(e?.target?.value)}
              value={classroom}
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
              value={dec}
              required
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="number"
              placeholder="Amount"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setAmount(e?.target?.value)}
              value={amount}
              required
            />
            <CustomInput
              label=""
              type="number"
              placeholder="Tax amount in ( % )"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => settaxAmount(e?.target?.value)}
              value={taxamount}
              required
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="number"
              placeholder="Total"
              name=""
              control={control}
              className="w-full"
              // onChange={(e: any) => setAmount(e?.target?.value)}
              value={total}
              disabled={true}
            />
            <CustomSelect
              name=""
              label="Status"
              options={FEE_PLAN_STATUS}
              control={control}
              onChange={(e: any) => setStatus(e?.target?.value)}
              value={status}
              required 
            />
          </TwoInputContainer>
          <TwoInputContainer>
            {/* <CustomInput
              label=""
              type="number"
              placeholder="Plan Name"
              name=""
              control={control}
              className="w-full"
              onChange={(e: any) => setPlanName(e?.target?.value)}
              value={planName}
            // disabled={true}
            /> */}
          </TwoInputContainer>
        </FormContainer>
        <ModalButton>
          <CancelButton onClick={closeModal}>
            {cancelText}
          </CancelButton>
          <AddButton type="button" onClick={submitForm}>{AddText}</AddButton>
        </ModalButton>
      </ModalDetailsContainer>
    </>
  );
};

export default AddRegistrationFees;
