'use client'
import React, { useEffect, useState } from "react";
import {
  HeaderContainer,
  BorderBottomDiv,
  TwoinputCheckBox,
  InputChekBox,
} from "./addRole.styled";
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/common/Button';
import RadioInput from '@/components/common/RadioInput';
import CustomInput from '@/components/common/CustomInput';
import { useRouter, useSearchParams } from "next/navigation";
import { createRoles, roleByid, updateRoles, } from "@/services/authpermission";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRole: React.FC = () => {
  let searchparam = useSearchParams();
  let roleId = searchparam?.get("role_id");

  const [classroomview, setClassroomView] = useState<boolean>(false)
  const [classroomAction, setClassroomAction] = useState<boolean>(false)
  const [childRegview, setChildRegView] = useState<boolean>(false)
  const [childRegAction, setChildRegAction] = useState<boolean>(false)
  const [dashboardView, setdashboardView] = useState<boolean>(false)
  const [staffAction, setstaffAction] = useState<boolean>(false)
  const [settingView, setSettingview] = useState<boolean>(false)
  const [settingAction, setSettingAction] = useState<boolean>(false)
  const [feeView, setFeeView] = useState<boolean>(false)
  const [feeAction, setFeeAction] = useState<boolean>(false)
  const [userview, setUserView] = useState<boolean>(false)
  const [userAction, setUserAction] = useState<boolean>(false)
  const [planingForecasting, setplaningForecasting] = useState<boolean>(false)
  const [planingForecastingAction, setplaningForecastingAction] = useState<boolean>(false)
  const [reportView, setReportView] = useState<boolean>(false)
  const [reportAction, setReportAction] = useState<boolean>(false)
  const [suscriptionView, setSuscriptionView] = useState<boolean>(false)
  const [suscriptionAction, setSuscriptionAction] = useState<boolean>(false)
  const [complincesView, setCompliencesView] = useState<boolean>(false)
  const [complincesAction, setComplincesAction] = useState<boolean>(false)

  const [classrommManagemetView, setClassrommManagemetView] = useState<boolean>(false)
  const [classrommManagemetAction, setClassrommManagemetAction] = useState<boolean>(false)
  const [notificationView, setNotificationView] = useState<boolean>(false)
  const [notificationAction, setNotificationAction] = useState<boolean>(false)


  const [roleName, setRoleName] = useState<string>('')

  const [roleData, setRoleData] = useState<any>([])



  let router = useRouter();


  const getRoleById = async () => {
    let res;
    res = await roleByid(roleId)

    try {
      if (res?.success) {
        setRoleData(res?.data)
        let permission = res?.data?.permissions
        setClassrommManagemetView(permission?.classroom_management?.view)
        setClassrommManagemetAction(permission?.classroom_management?.add_edit)

        setClassroomView(permission?.classroom_action?.view)
        setClassroomAction(permission?.classroom_action?.add_edit)

        setChildRegView(permission?.child_management?.view)
        setChildRegAction(permission?.child_management?.add_edit)

        setdashboardView(permission?.dashboard?.view)
        // setstaffAction(permission?.staff?.add_edit)

        setSettingview(permission?.setting?.view)
        setSettingAction(permission?.setting?.add_edit)

        setFeeView(permission?.fee?.view)
        setFeeAction(permission?.fee?.add_edit)

        setUserView(permission?.user?.view)
        setUserAction(permission?.user?.add_edit)

        setplaningForecasting(permission?.planing_forecasting?.view)
        setplaningForecastingAction(permission?.planing_forecasting?.add_edit)

        setReportView(permission?.report_management?.view)
        setReportAction(permission?.report_management?.add_edit)

        setSuscriptionView(permission?.subscription?.view)
        setSuscriptionAction(permission?.subscription?.add_edit)

        setCompliencesView(permission?.compliance?.view)
        setComplincesAction(permission?.compliance?.add_edit)

        setNotificationView(permission?.notification_management?.view)
        setNotificationAction(permission?.notification_management?.add_edit)

        setRoleName(res?.data?.roleName)
      }
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getRoleById()
  }, [])
  const submitForm = async () => {
    let permission_data = {
      dashboard: {
        // add_edit: staffAction,
        view: dashboardView
      },
      classroom_management: {
        add_edit: classrommManagemetAction,
        view: classrommManagemetAction ? true : classrommManagemetView
      },
      report_management: {
        add_edit: reportAction,
        view: reportAction ? true : reportView
      },
      classroom_action: {
        add_edit: classroomAction,
        view: classroomAction ? true : classroomview
      },
      child_management: {
        add_edit: childRegAction,
        view: childRegAction ? true : childRegview
      },
      setting: {
        add_edit: settingAction,
        view: settingAction ? true : settingView
      },
      fee: {
        add_edit: feeAction,
        view: feeAction ? true : feeView
      },
      user: {
        add_edit: userAction,
        view: userAction ? true : userview
      },
      planing_forecasting: {
        add_edit: planingForecastingAction,
        view: planingForecastingAction ? true : planingForecasting
      },

      subscription: {
        add_edit: suscriptionAction,
        view: suscriptionAction ? true : suscriptionView
      },
      compliance: {
        add_edit: complincesAction,
        view: complincesAction ? true : complincesView
      },
      notification_management: {
        add_edit: notificationAction,
        view: notificationAction ? true : notificationView
      }
    }

    let body = {
      "name": roleName,
      "permissions": permission_data
    }
    let res;
    try {
      if (roleId) {
        res = await updateRoles(roleId, body)
      } else {
        res = await createRoles(body)
      }
      if (res?.success) {
        toast.success(res?.message)
        router.push('/roleManagement')
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <main className="p-4 h-[87.8%]">
      <div
        className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full overflow-auto">
        <HeaderContainer>
          <div className="font-[DM_Sans] text-[16px] font-medium">
            Add Role
          </div>
        </HeaderContainer>

        <div className='flex flex-col items-center justify-center gap-2 pt-8'>
          <div className="w-6/12">
            <div className='flex flex-col gap-2 mb-5'>
              <CustomInput type="text" name="" placeholder="Role Name" onChange={(e: any) => setRoleName(e?.target?.value)} value={roleName} />
            </div>

            <div className='flex text-[#7b7b7b] font-[DM_Sans] text-[16px] font-medium px-4'>
              Permissions :
            </div>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Dashboard: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setdashboardView(e?.target?.checked)} checked={staffAction ? true : dashboardView} />
                  </InputChekBox>

                  {/* <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setstaffAction(e?.target?.checked)} checked={staffAction} />
                  </InputChekBox> */}
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Classroom management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setClassrommManagemetView(e?.target?.checked)} checked={classrommManagemetAction ? true : classrommManagemetView} />
                  </InputChekBox>
                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setClassrommManagemetAction(e?.target?.checked)} checked={classrommManagemetAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Classroom Action: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    {/* <label htmlFor="">View </label> */}
                    {/* <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setClassroomView(e?.target?.checked)} checked={classroomAction ? true : classroomview} /> */}
                  </InputChekBox>
                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setClassroomAction(e?.target?.checked)} checked={classroomAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Child Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setChildRegView(e?.target?.checked)} checked={childRegAction ? true : childRegview} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setChildRegAction(e?.target?.checked)} checked={childRegAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>

            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Daycare Setting: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setSettingview(e?.target?.checked)} checked={settingAction ? true : settingView} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setSettingAction(e?.target?.checked)} checked={settingAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Fees Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setFeeView(e?.target?.checked)} checked={feeAction ? true : feeView} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setFeeAction(e?.target?.checked)} checked={feeAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>User Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setUserView(e?.target?.checked)} checked={userAction ? true : userview} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setUserAction(e?.target?.checked)} checked={userAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Planing & Forecasting: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setplaningForecasting(e?.target?.checked)} checked={planingForecastingAction ? true : planingForecasting} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setplaningForecastingAction(e?.target?.checked)} checked={planingForecastingAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Report Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setReportView(e?.target?.checked)} checked={reportAction ? true : reportView} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setReportAction(e?.target?.checked)} checked={reportAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Subscription Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setSuscriptionView(e?.target?.checked)} checked={suscriptionAction ? true : suscriptionView} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setSuscriptionAction(e?.target?.checked)} checked={suscriptionAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Compliance Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setCompliencesView(e?.target?.checked)} checked={complincesAction ? true : complincesView} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setComplincesAction(e?.target?.checked)} checked={complincesAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <BorderBottomDiv className='flex text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium space-x-48 py-4'>
              <div className="w-6/12 px-4">
                <h3>Notification Management: </h3>
              </div>
              <div className="w-6/12">
                <TwoinputCheckBox >
                  <InputChekBox>
                    <label htmlFor="">View </label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setNotificationView(e?.target?.checked)} checked={notificationAction ? true : notificationView} />
                  </InputChekBox>

                  <InputChekBox>
                    <label htmlFor="">add/edit</label>
                    <input type="checkbox" style={{ margin: "10px" }} onChange={(e: any) => setNotificationAction(e?.target?.checked)} checked={notificationAction} />
                  </InputChekBox>
                </TwoinputCheckBox>
              </div>
            </BorderBottomDiv>
            <div className="flex gap-4 justify-end w-full max-w-[856px] pr-5 mx-auto my-0 mt-2 mb-4 py-6">
              <Button type="button" form="white" className="" onClick={() => router.push('/roleManagement')}>
                back
              </Button>
              <Button type="button" form="blue" className=""
                onClick={submitForm}>
                Save
              </Button>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default AddRole