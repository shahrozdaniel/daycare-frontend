import { ModalDetailsContainer, TwoInputContainer } from '@/app/reports/Common.styled'
import { AddButton, CancelButton, ModalButton } from '@/components/common/Modal/Modal.styled'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { HeaderContainer } from '../addRole/addRole.styled'
import CustomSelect from '@/components/common/CustomSelect'
import CustomInput from '@/components/common/CustomInput'
import { AssignRoles } from '@/services/authpermission'
import 'react-toastify/dist/ReactToastify.css';

const AssignModal: React.FC<any> = ({ closeModal, roleData, editData ,reloadTabl }) => {

    const [roleid, setRoleid] = useState<string>(editData?.role_id)
    const submitForm = async () => {
        //
        let body = {
            userId: editData?.id,
            roleId: roleid
        }
        let res;
        try {
            res = await AssignRoles(body)
            if (res?.success) {
                toast.success('Role assign successfully')
                reloadTabl()
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <>
                <ModalDetailsContainer>
                    <HeaderContainer>
                        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
                            Assign Role
                        </div>

                    </HeaderContainer>
                    <hr />
                    <section className="w-full">
                        <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
                            <div className="w-full flex flex-col items-center justify-center gap-2">
                                <div className="flex gap-3 w-full">
                                    <CustomInput
                                        className="w-full p-3"
                                        label=""
                                        type="text"
                                        placeholder="User Name"
                                        name="user Name"
                                        divclass="w-full"
                                        value={`${editData?.first_name} ${editData?.last_name}`}
                                        disabled
                                    />
                                    <CustomSelect
                                        name=""
                                        label="Role Name"
                                        options={roleData}
                                        onChange={(e: any) => setRoleid(e?.target.value)}
                                        value={ roleid}
                                    // register={register}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <ModalButton>
                        <AddButton type="button" onClick={submitForm}>
                            {"Save"}
                        </AddButton>
                        <CancelButton onClick={closeModal} type="button">
                            {"Cancel"}
                        </CancelButton>
                    </ModalButton>
                </ModalDetailsContainer>
                <ToastContainer />
            </>
        </div>
    )
}

export default AssignModal