"use client"
import { FormContainer, HeaderContainer, ModalDetailsContainer, TwoInputContainer } from '@/app/reports/Common.styled'
import CustomInput from '@/components/common/CustomInput'
import { AddButton, CancelButton, ModalButton } from '@/components/common/Modal/Modal.styled'
import { childOtherInfoEdit } from '@/services/childrenActionServices'
import { classRoomACtionCreate } from '@/services/classroomActionServices'
import { getCurrentTime } from '@/utils/utilityFunctions'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckInModalChild: React.FC<any> = ({ data, id, closeModal, getChildData, enrollment_id }) => {
    let currentDate = getCurrentTime();
    const [isDiperUse, setIsDyperuse] = useState<boolean>()
    const [details, setDetails] = useState<string>('')
    const [checkInTime, setCheckInTime] = useState<any>(currentDate)

    console.log('data-------->', data)
    useEffect(() => {
        setIsDyperuse(false)
        setDetails('')
    }, [])
    const submitForm = async () => {
        let childDetails = [{ "childId": id, "enrollmentId": enrollment_id }]
        let formbody = new FormData()
        formbody.append('childDetails', JSON.stringify(childDetails))
        formbody.append('checkIn', checkInTime,)
        formbody.append('checkInNote', '')
        let res;
        try {
            res = await classRoomACtionCreate('1', formbody)
            if (res?.success) {
                toast.success(res?.data?.message)
                getChildData()
                closeModal()
                toast.success(res?.message)
            } else {
                closeModal()
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            // console.log(error?.response?.data?.error)

        }
    }

    return (
        <ModalDetailsContainer>
            <ModalDetailsContainer>
                <HeaderContainer>
                    <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
                        Check In
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
                            label="Check In Time"
                            type="time"
                            name="checkIn"
                            required
                            className="rounded-[20px] bg-[#F5F5F5] p-2"
                            value={checkInTime}
                        />
                    </TwoInputContainer>
                </FormContainer>
            </ModalDetailsContainer>
            <ModalButton>
                <CancelButton onClick={closeModal}>
                    {'Cancel'}
                </CancelButton>
                <AddButton type="button" onClick={submitForm}>{"Add"}</AddButton>
            </ModalButton>
            <ToastContainer />
        </ModalDetailsContainer>
    )
}

export default CheckInModalChild