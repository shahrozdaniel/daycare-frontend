"use client";
import React, { useEffect, useState } from "react";
import NotificationSwitch from "./components/NotificationSwitch";
import { Notifications, columns } from "./tableColumns/notificationColumns";
import {
  EmailTemplate,
  emailTemplateColumns,
} from "./tableColumns/emailTemplateColumns";
import NotificationTable from "./components/NotificationTable";
import EmailTemplateTable from "./components/EmailTemplateTable";
import TabSwitch from "./components/tabSwitch";
import {
  EmaiTemplate,
  deleteEmaiTemplate,
  getnotificationHistory,
  notificationTemplate,
} from "@/services/notificationManagemt";
import { useGlobalContext } from "../context/store";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";
import { toast } from "react-toastify";
import moment from "moment";

const Page = () => {
  const { globalSettings } = useGlobalContext();
  const [data, setData] = useState<any>([]);
  const emailTemplateData: EmailTemplate[] = [];
  const [emailtemplate, setEmailTemplate] = useState<any>([]);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [notificationHistoryData, setNotificationHistoryData] = useState<any[]>(
    []
  );
  const [activeTab, setActiveTab] = useState("notification"); // Default active tab

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const emailtemplateList = async () => {
    let res;

    try {
      res = await EmaiTemplate();

      let lsit: any = [];

      if (res?.success) {
        res?.data?.map((ele: any) => {
          lsit.push({
            name: ele?.name,
            trigger: ele?.trigger,
            totalData: ele,
            isEdit: isEdit,
            setisEdit: setisEdit,
            setEditData: setEditData,
            openConfirmModal: openConfirmModal,
            editData: editData,
            reloadTable: emailtemplateList,
          });
        });
        setEmailTemplate(lsit);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const NotificationList = async () => {
    let res;
    try {
      res = await notificationTemplate();
      // let notificationlistres = await getnotificationHistory();

      let list: any = [];
      // if (notificationlistres?.success) {
      //   notificationlistres?.data?.map((item: any) => {
      //     list.push({
      //       name: item.notification_content,
      //       sentto: item.recipient_email,
      //       totalData: item,
      //       isEdit: isEdit,
      //       setisEdit: setisEdit,
      //       setEditData: setEditData,
      //       editData: editData,
      //       reloadTable: NotificationList,
      //       date: moment(item.timestamp).format("YYYY-MM-DD"),
      //       time: moment(item.timestamp).format("HH:mm:ss"),
      //     });
      //   });
      // }
      if (res?.success) {
        res?.data?.map((ele: any) => {
          list.push({
            name: ele?.template_name,
            sentto: ele?.send_to,
            totalData: ele,
            isEdit: isEdit,
            setisEdit: setisEdit,
            setEditData: setEditData,
            editData: editData,
            reloadTable: NotificationList,
            date: ele?.created_at.split("T")?.[0],
            time: ele?.created_at?.split("T")?.[1]?.split(".")?.[0],
          });
        });
        setData(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationHistoryList = async () => {
    try {
      let notificationlistres = await getnotificationHistory();

      let list: any = [];
      if (notificationlistres?.success) {
        notificationlistres?.data?.map((item: any) => {
          list.push({
            name: item.notification_content,
            sentto: item.recipient_email,
            totalData: item,
            isEdit: isEdit,
            setisEdit: setisEdit,
            setEditData: setEditData,
            editData: editData,
            reloadTable: NotificationList,
            date: moment(item.timestamp).format("YYYY-MM-DD"),
            time: moment(item.timestamp).format("HH:mm:ss"),
          });
        });

        setNotificationHistoryData(list);
      }
      // if (res?.success) {
      //   res?.data?.map((ele: any) => {
      //     list.push({
      //       name: ele?.template_name,
      //       sentto: ele?.send_to,
      //       totalData: ele,
      //       isEdit: isEdit,
      //       setisEdit: setisEdit,
      //       setEditData: setEditData,
      //       editData: editData,
      //       reloadTable: NotificationList,
      //       date: ele?.created_at.split("T")?.[0],
      //       time: ele?.created_at?.split("T")?.[1]?.split(".")?.[0],
      //     });
      //   });
      //   setData(list);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    emailtemplateList();
    NotificationList();
    getNotificationHistoryList();
  }, [activeTab]);
  console.log("data", data);
  const openConfirmModal = (id: any) => {
    setConfirmModal(true);
    setDeleteId(id);
  };

  const closeConfirmModal = () => {
    setConfirmModal(false);
  };

  const handleDelete = async () => {
    let res;
    try {
      res = await deleteEmaiTemplate(deleteId);
      if (res?.success) {
        toast.success(res?.message);
        emailtemplateList();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log(error);
    }
    setDeleteId(null);
    setConfirmModal(false);
  };

  return (
    <>
      <main
        className="p-4 min-h-[89%] h-full"
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
        }}
      >
        <section
          className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-6 overflow-auto bg-white rounded-2xl
            "
        >
          <div className="flex  lg:flex-row lg:items-center lg:justify-start md:flex-col md:justify-center md:items-center">
            <div className="w-[400px]">
              <TabSwitch
                activeTab={activeTab}
                handleTabClick={handleTabClick}
              />
            </div>
          </div>
          {activeTab === "notificationHistory" && (
            <NotificationTable
              columns={columns}
              data={notificationHistoryData}
              NotificationList={NotificationList}
            />
          )}

          {activeTab === "notification" && (
            <NotificationTable
              columns={columns}
              data={data}
              NotificationList={NotificationList}
            />
          )}
          {activeTab === "emailTemplate" && (
            <EmailTemplateTable
              columns={emailTemplateColumns}
              data={emailtemplate}
              isEdit={isEdit}
              editData={editData}
              setisEdit={setisEdit}
              emailtemplateList={emailtemplateList}
            />
          )}
        </section>
      </main>
      {confirmModal && (
        <div>
          <ConfirmationModal
            title={"Delete"}
            content={`Are you sure you want to Delete Email Template. ?`}
            modalOpen={confirmModal}
            handleConfirm={handleDelete}
            closeModal={closeConfirmModal}
          />
        </div>
      )}
    </>
  );
};

export default Page;
