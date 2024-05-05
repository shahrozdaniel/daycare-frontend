"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import { handleExport } from "@/utils/utilityFunctions";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@/components/common/Modal/Modal";
import AddHoliday from "./components/AddHoliday";
import { classroomlist } from "../classroomManagement/classroomManagentAPI";
import RoomTable from "./components/RoomTable";
import AddRoomModal from "./components/AddRoomModal";
import AddCleaningStaff from "./components/AddCleaningStaff";
import {
  complianceStafflist,
  deleteLocation,
  deletecomplianceStaff,
  locationList,
} from "@/services/dayCareSetting";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";
import { Modal2 } from "@/components/common/Modal/Modal2";

const Rooms = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [staffmodalOpen, setStaffModalOpen] = useState<boolean>(false);
  const [exportData, setExportData] = useState<any>([]);
  const [data, setData] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [userData, setuserData] = useState<any>([]);
  const [staffData, setStaffData] = useState<any>([]);
  const [IsEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>();
  const [allowDelete, setallowDelete] = useState<boolean>(false);
  const [locatiionId, setLocationId] = useState<string>("");

  // const [allowCleaningStaffDelete, setCleaningStaffDelete] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false);
  const [staffId, setStaffId] = useState<string>("");

  const roomList = async () => {
    let res;
    try {
      res = await locationList();
      let data: any = [];
      let locatonArray: any = [];
      if (res?.success) {
        let Response = await classroomlist();
        if (Response?.success) {
          Response?.data?.list?.map((e: any) => {
            data?.push({
              id: e?.classroomId,
              name: e?.classroomName,
              type: e?.classroomType,
            });
          });
        }
        res?.data?.roomdata?.map((e: any) => {
          locatonArray?.push({
            id: e?.id,
            name: e?.room_name,
            type: e?.room_type,
          });
        });
        let finalArray = locatonArray.concat(data);
        setData(finalArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const complianceStaff = async () => {
    let res;
    try {
      res = await complianceStafflist();
      if (res?.success) {
        let data: any = []
        console.log(res?.data);
        res?.data?.map((ele:any)=>{
          data?.push({ created_at:ele?.created_at,daycare_id:ele?.daycare_id,id:ele?.id,staff_name:ele?.staff_name,status:ele?.status?.toString()})
        })
        setStaffData(data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    roomList();
    complianceStaff();
  }, [tab]);

  const handleDeleteLocation = async () => {
    let res = await deleteLocation(locatiionId);
    try {
      if (res?.success) {
        toast.success(res?.message);
        roomList();
        setallowDelete(!allowDelete);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  const handleDeleteStaff = async () => {
    let res;
    try {
      res = await deletecomplianceStaff(staffId);
      if (res?.success) {
        toast.success(res?.message);
        complianceStaff();
        setisDelete(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: () => {
        return <div className="text-left pl-3">Name</div>;
      },
      cell: ({ row }) => {
        return <div className="text-left pl-5">{row?.original?.name}</div>;
      },
    },
    {
      accessorKey: "type",
      header: () => {
        return <div className="text-left pl-3">Classroom Type</div>;
      },
      cell: ({ row }) => {
        return <div className="text-left pl-5">{row?.original?.type}</div>;
      },
    },
    {
      id: "actions",
      header: () => {
        return (IsAdmin || userPermission?.setting?.add_edit)&&<div className="text-left pl-3">Action</div>;
      },
      cell: ({ row }) => {
        const handleEdit = (e: any) => {
          setIsEdit(true);
          setModalOpen(true);
          setEditData(row?.original);
        };
        const handleDelete = (id: any) => {
          setallowDelete(true);
          setLocationId(id);
        };

        return (
          <div className="text-left pl-4">
            {(row?.original?.type === "Kitchen" ||
              row?.original?.type === "Toilet" ||
              row?.original?.type === "Office" ||
              row?.original?.type === "Playground" ||
              row?.original?.type === "Library" ||
              row?.original?.type === "Storage" ||
              row?.original?.type === "Nap Area" ||
              row?.original?.type === "Feeding Area" ||
              row?.original?.type === "Other") && (
                (IsAdmin || userPermission?.setting?.add_edit)?<div className="flex items-center gap-3 justify-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Image
                        src={"/svgs/note.svg"}
                        alt="actions"
                        height={20}
                        width={20}
                        onClick={() => handleEdit(row)}
                        className="cursor-pointer"
                      />
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                  <Trash2
                    onClick={() => handleDelete(row?.original?.id)}
                    className="text-grey-g1 cursor-pointer"
                  />
                </div>:null
              )}
            <ToastContainer />
          </div>
        );
      },
    },
  ];
  const staffColumns: ColumnDef<any>[] = [
    {
      accessorKey: "staff_name",
      header: () => {
        return <div className="text-left pl-3">Name</div>;
      },
      cell: ({ row }) => {
        return <div className="text-left pl-5">{row?.original?.staff_name}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return <div className="text-left pl-3">Status</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="text-left pl-5">
            {row?.original?.status == "1" ? "Active" : "Inactive"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return (IsAdmin || userPermission?.setting?.add_edit)&&<div className="text-left pl-5">Action</div>;
      },
      cell: ({ row }) => {
        const data = row.original;
        const handleEdit = async (data: any) => {
          setStaffModalOpen(true);
          setIsEdit(true);
          setEditData(data);
        };

        const handleDelete = (id: any) => {
          setisDelete(true);
          setStaffId(id);
        };

        return (
          <div className="text-left pl-6">
            {
              (IsAdmin || userPermission?.setting?.add_edit)?<div className="flex justify-start items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image
                      src={"/svgs/note.svg"}
                      alt="actions"
                      height={20}
                      width={20}
                      onClick={() => handleEdit(row?.original)}
                      className="cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                </DropdownMenu>
                <Trash2
                  className="text-grey-g1 cursor-pointer ml-2"
                  onClick={() => handleDelete(data?.id)}
                />
              </div>:null
            }
            <ToastContainer />
          </div>
        );
      },
    },
  ];
  const openModal = (modalValue: string) => {
    setModalOpen(true);
  };

  const closeModal = (modalValue: string) => {
    setModalOpen(false);
  };

  const handleAdd = () => {
    setIsEdit(false);
    setEditData(null);
    setStaffModalOpen(true);
  };
  const hadnleAddRoom = () => {
    setIsEdit(false);
    setEditData(null);
    openModal("Open");
  };

  console.log(editData, IsEdit);

  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Location & Cleaning Staff Setting</h1>
            <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Location & Cleaning Staff Setting
          </h1>
        </div>
      </div>

      <div className="w-4/5 mx-auto mt-6">
        <div className="flex justify-between">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px cursor-pointer">
              <li className="me-2">
                <span
                  className={
                    tab === 1
                      ? " inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 cursur-pointer"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursur-pointer"
                  }
                  onClick={() => setTab(1)}
                >
                  Location{" "}
                </span>
              </li>
              <li className="me-2">
                <span
                  className={
                    tab === 2
                      ? " inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 cursur-pointer"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursur-pointer"
                  }
                  onClick={() => setTab(2)}
                >
                  Cleaning Staff{" "}
                </span>
              </li>
            </ul>
          </div>
          {tab === 1 && (
            (IsAdmin || userPermission?.setting?.add_edit)&& <div className="flex text-blue-b1 cursor-pointer gap-2 items-center">
              <div
                className="flex gap-2 justify-end mb-3 items-center"
                onClick={hadnleAddRoom}
              >
                <Plus className="text-blue-b1" onClick={hadnleAddRoom} />{" "}
                <span className="text-sm">Add Room</span>
              </div>
            </div>
          )}
          {tab === 2 && (
            (IsAdmin || userPermission?.setting?.add_edit)&&<div className="flex text-blue-b1 cursor-pointer gap-2 items-center">
              <div
                className="flex gap-2 justify-end mb-3 items-center"
                onClick={handleAdd}
              >
                <Plus className="text-blue-b1" onClick={handleAdd} />{" "}
                <span className="text-sm">Add Cleaning Staff</span>
              </div>
            </div>
          )}
        </div>
        {tab === 1 && (
          <div>
            <RoomTable data={data} columns={columns} activeTab={tab} />
          </div>
        )}
        {tab === 2 && (
          <div>
            <RoomTable
              data={staffData}
              columns={staffColumns}
              activeTab={tab}
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <div>
          <Modal2
            modalOpen={modalOpen}
            closeModal={closeModal}
            title={IsEdit ? "Update Room" : "Add Room"}
          >
            <AddRoomModal
              closeModal={closeModal}
              reloadTable={roomList}
              IsEdit={IsEdit}
              editData={editData ? editData : ""}
            />
          </Modal2>
        </div>
      )}
      {staffmodalOpen && (
        <div>
          <Modal2
            modalOpen={staffmodalOpen}
            closeModal={() => setStaffModalOpen(false)}
            title={IsEdit ? "Update Staff" : "Add Staff"}
          >
            <AddCleaningStaff
              closeModal={() => setStaffModalOpen(false)}
              reloadTable={complianceStaff}
              IsEdit={IsEdit}
              editData={editData ? editData : ""}
            />
          </Modal2>
        </div>
      )}

      {allowDelete && (
        <ConfirmationModal
          title={"Delete Location "}
          content={"Are you sure you want to delete this location?"}
          modalOpen={allowDelete}
          closeModal={() => setallowDelete(!allowDelete)}
          handleConfirm={handleDeleteLocation}
        />
      )}
      {isDelete && (
        <ConfirmationModal
          title={"Delete Staff "}
          content={"Are you sure you want to delete this staff?"}
          modalOpen={isDelete}
          closeModal={() => setisDelete(false)}
          handleConfirm={handleDeleteStaff}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default Rooms;
