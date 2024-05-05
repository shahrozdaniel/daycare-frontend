"use client"
import { FormContainer, HeaderContainer, ModalDetailsContainer, TwoInputContainer } from '@/app/reports/Common.styled'
import CustomInput from '@/components/common/CustomInput'
import CustomSelect from '@/components/common/CustomSelect'
import { AddButton, CancelButton, ModalButton } from '@/components/common/Modal/Modal.styled'
import { get_Country_State_city } from '@/services/UtilityApis'
import { childDoctorInfoEdit } from '@/services/childrenActionServices'
import { formatPhoneNumber } from '@/utils/utilityFunctions'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DoctorInfo: React.FC<any> = ({ data, id, closeModal,getChildData }) => {
    const [docFirstName, setDocFirstName] = useState<string>('')
    const [docLastName, setDocLastName] = useState<string>('')
    const [docPrefreedName, setDocPrefredName] = useState<string>('')
    const [docPhoneNo, setDocPhoneNo] = useState<any>()
    const [docEmail, setDocEmail] = useState<string>('')
    const [countryId, setCountryId] = useState<string>()
    const [cityId, setCityId] = useState<string>()
    const [stateId, setStateId] = useState<string>()
    const [postalCode, setPostalCode] = useState<string>()
    const [docStrret, setDocStrret] = useState<string>()
    const [addressId, setAddressId] = useState<number>()

    const [countryList, setCountryList] = useState<any>()
    const [stateList, setStateList] = useState<any>()
    const [cityList, setCityList] = useState<any>()

    console.log("data , id -------->", data, id)

    useEffect(() => {
        let doctor = data?.emergency_doctors?.[0]
        let doctorAddress = data?.emergency_doctors?.[0]?.address
        setAddressId(doctor?.address_id)
        setDocFirstName(doctor?.first_name)
        setDocLastName(doctor?.last_name)
        setDocEmail(doctor?.email)
        setDocPhoneNo(formatPhoneNumber(doctor?.phone_no))
        setDocPrefredName(doctor?.preferred_name)

        setCountryId(doctorAddress?.country)
        setStateId(doctorAddress?.state)
        setCityId(doctorAddress?.city)
        setPostalCode(doctorAddress?.postal_code)


    }, [])
    // get country Data 
    const getCountryList = async () => {
        let body = {
            country: "",
            state: ""
        }
        let res;
        try {
            res = await get_Country_State_city(body)
            let listArr: any = [{ value: "", label: "Country" }]
            if (res?.success) {
                let list = res?.data?.result
                list?.map((ele: any, id: any) => {
                    listArr?.push({ value: ele?.id, label: ele?.name })
                })
            }
            setCountryList(listArr)
        } catch (error) {

        }
    }

    // get State Data
    const getStateList = async () => {
        let body = {
            country: countryId,
            state: ""
        }
        let res;
        try {
            res = await get_Country_State_city(body)
            let listArr: any = [{ value: "", label: "Province" }]
            if (res?.success) {
                let list = res?.data?.result
                list?.map((ele: any, id: any) => {
                    listArr?.push({ value: ele?.id, label: ele?.name })
                })
            }
            setStateList(listArr)
        } catch (error) {

        }
    }

    // get City Data 
    const getCityList = async () => {
        let body = {
            country: countryId,
            state: stateId
        }
        let res;
        try {
            res = await get_Country_State_city(body)
            let listArr: any = [{ value: "", label: "City" }]
            if (res?.success) {
                let list = res?.data?.result
                list?.map((ele: any, id: any) => {
                    listArr?.push({ value: ele?.id, label: ele?.name })
                })
            }
            setCityList(listArr)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCountryList()
    }, [])
    useEffect(() => {
        if (countryId) {
            getStateList()
        }
    }, [countryId])
    useEffect(() => {
        if (stateId) {
            getCityList()
        }
    }, [stateId])

    //  submit Edit Form 
    const submitForm = async () => {
        let body = {
            "doctorFistName": docFirstName,
            "doctorLastName": docLastName,
            "doctorPreferredName": docPrefreedName,
            "doctorPhoneNumber": docPhoneNo?.replace(/\D/g, ""),
            "doctorEmail": docEmail,
            "street": docStrret,
            "city": cityId,
            "state": stateId,
            "country": countryId,
            "pincode": postalCode,
            "addressId": addressId ? addressId : ''
        }
        let res;
        try {
            res = await childDoctorInfoEdit(id, body)
            if (res?.success) {
                toast.success(res?.messgae)
                getChildData()
                closeModal()
            } else {
                toast.error(res?.messgae)
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
                        Child Doctor Details
                    </div>
                </HeaderContainer>
                <FormContainer>
                    {/* doctor Personal Details */}
                    <TwoInputContainer>
                        <CustomInput
                            label=""
                            type="text"
                            placeholder="First Name"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setDocFirstName(e?.target?.value)}
                            value={docFirstName}
                        />
                        <CustomInput
                            label=""
                            type="text"
                            placeholder="Last Name"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setDocLastName(e?.target?.value)}
                            value={docLastName}
                        />
                    </TwoInputContainer>
                    <TwoInputContainer>
                        <CustomInput
                            label=""
                            type="text"
                            placeholder="Preferred Name"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setDocPrefredName(e?.target?.value)}
                            value={docPrefreedName}
                        />
                        <CustomInput
                            label=""
                            type="tel"
                            placeholder="Phone Number"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setDocPhoneNo(formatPhoneNumber(e?.target?.value))}
                            value={docPhoneNo}
                        />
                    </TwoInputContainer>
                    <TwoInputContainer>
                        <CustomInput
                            label=""
                            type="email"
                            placeholder="Email"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setDocEmail(e?.target?.value)}
                            value={docEmail}
                        />
                        <CustomInput
                            label=""
                            type="tel"
                            placeholder="Street"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setDocStrret(e?.target?.value)}
                            value={docStrret}
                        />
                    </TwoInputContainer>
                    {/* Address  */}
                    <TwoInputContainer>
                        <CustomSelect
                            name=""
                            label="Country"
                            options={countryList}
                            onChange={(e: any) => setCountryId(e?.target?.value)}
                            value={countryId}
                        />
                        <CustomSelect
                            name=""
                            label="Province"
                            options={stateList}
                            onChange={(e: any) => setStateId(e?.target?.value)}
                            value={stateId}
                            disabled={countryId ? false : true}
                        />
                    </TwoInputContainer>
                    <TwoInputContainer>
                        <CustomSelect
                            name=""
                            label="City"
                            options={cityList}
                            onChange={(e: any) => setCityId(e?.target?.value)}
                            value={cityId}
                            disabled={stateId ? false : true}
                        />
                        <CustomInput
                            label=""
                            type="text"
                            placeholder="Postal Code"
                            name=""
                            // control={control}
                            className="w-full"
                            onChange={(e: any) => setPostalCode(e?.target?.value)}
                            value={postalCode}
                        />
                    </TwoInputContainer>
                </FormContainer>
                <ModalButton>
                    <CancelButton onClick={closeModal}>
                        {'Cancel'}
                    </CancelButton>
                    <AddButton type="button" onClick={submitForm}>{"Add"}</AddButton>
                </ModalButton>
            </ModalDetailsContainer>
        </>
    )
}

export default DoctorInfo