'use client'

// import { Rolecolumns } from './columns'
// import RoleTable from "./components/RoleTable"
import { roleList } from '@/services/authpermission';
import { authuserList } from '@/services/authpermission'
import React, { useEffect, useState } from 'react'
import UserTable from './UserTable';
import { usercolumns } from './userColoum';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/common/Modal/Modal';
import AssignModal from './AssignModal';

const ManageRole = () => {
    const [userData, setuserData] = useState<any>([])
    const [roleData, setRoleData] = useState<any>([])
    const [editData, setEditData] = useState<any>()
    const [edit, setEdit] = useState<boolean>(false)

    const getusetRole = async () => {
        let res;
        try {
            res = await authuserList()
            let data: any = []
            if (res?.success) {
                console.log(res?.data)
                res?.data?.map((ele: any) => {
                    data?.push({ id: ele?.id, fristname: ele?.first_name, lastname: ele?.last_name, email: ele?.email, phone: ele?.phone_no, username: ele?.username, rolename: ele?.role_name, totalData: ele, setEditData: setEditData, setEdit: setEdit, edit: edit, reloadTable: getusetRole })
                })
                setuserData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getusetRole()
    }, [])

    const getRole = async () => {
        let res;
        try {
            res = await roleList()
            let data: any = []
            if (res?.success) {
                res?.roles?.map((ele: any, ind: string) => {
                    data?.push({ value: ele?.id, label: ele?.name, })
                })
                setRoleData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRole()
    }, [])
    return (
        <div>
            <div className="flex md:flex-col lg:flex-row justify-between">
                <div className="flex items-center md:py-2 lg:py-4">
                    <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
                        <Link href={'/roleManagement'}>
                            <span className="md:text-sm lg:text-xl rounded-sm border-blue-b1">Back</span>
                        </Link>
                    </div>
                </div>
                <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">

                    <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
                        <Image src={"/images/Plus.png"} alt="plus" width={15} height={15} />
                        <Link href={'/roleManagement/addRole'}>
                            <span className="md:text-sm lg:text-xl rounded-sm border-blue-b1">Add Role</span>
                        </Link>
                    </div>


                    <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
                        <Image src={"/images/export.png"} alt="export" width={15} height={15} />
                        <span className="md:text-sm lg:text-xl">Export</span>
                    </div>
                </div>
            </div>
            <UserTable data={userData} columns={usercolumns} />

            {edit}

            {edit && (
                <div style={{ width: "300px" }}>
                    <Modal
                        modalOpen={edit}
                        cancelText={"Cancel"}
                        AddText={"Add"}
                        closeModal={() => setEdit(false)}
                        modalName={"Assign Role"}
                    >
                        <AssignModal closeModal={() => setEdit(false)} editData={editData} roleData={roleData} reloadTabl={getusetRole} />
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default ManageRole