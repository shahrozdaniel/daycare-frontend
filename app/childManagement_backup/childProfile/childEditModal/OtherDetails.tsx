"use client"
import { FormContainer, HeaderContainer, ModalDetailsContainer, TwoInputContainer } from '@/app/reports/Common.styled'
import { AddButton, CancelButton, ModalButton } from '@/components/common/Modal/Modal.styled'
import { childOtherInfoEdit } from '@/services/childrenActionServices'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtherDetails: React.FC<any> = ({ data, id, closeModal ,getChildData }) => {
    const [isDiperUse, setIsDyperuse] = useState<boolean>()
    const [details, setDetails] = useState<string>('')

    useEffect(() => {
        setIsDyperuse(false)
        setDetails('')
    }, [])
    const submitForm = async () => {
        let body = {
            "otherDetails": {
                "child_use_diapers": isDiperUse,
                "other_details": details
            }
        }
        let res;
        try {
            res = await childOtherInfoEdit(id, body)
            if (res?.success) {
                toast.success(res?.data?.message)
                getChildData()
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ModalDetailsContainer>
            <HeaderContainer>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
                    Child Other Details
                </div>
            </HeaderContainer>
            <FormContainer>
                <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-8 mt-4">
                    <h2>Does child use diaper ? </h2>
                    <div className="flex flex-row gap-5">
                        <input
                            type="radio"
                            name=""
                            onChange={() => setIsDyperuse(true)}
                        />
                        <label>Yes</label>
                        <input
                            type="radio"
                            name=""
                            onChange={() => setIsDyperuse(false)}
                        />
                        <label>No</label>
                    </div>
                </div>
                <TwoInputContainer>
                    <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder='Other Details'
                        onChange={(e: any) => setDetails(e?.target?.value)}
                        value={details}
                    />
                </TwoInputContainer>

            </FormContainer>
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

export default OtherDetails