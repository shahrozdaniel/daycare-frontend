"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";

import { useGlobalContext } from "../context/store";
import { roleList } from "@/services/authpermission";
import AddRole from "./components/AddRole";
import ViewComponent from "./components/ViewComponent";
import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { capitalizeFirstLetter } from "@/utils/utilityFunctions";
const Page = () => {
  const { IsAdmin, globalSettings } = useGlobalContext();

  const [add, setAdd] = useState<boolean>(true);
  const [editId, setEditId] = useState<string>("");
  // const [isDelete, setIsDelete] = useState<boolean>(false)
  // const [deleteId, setDeleteId] = useState<string>('')

  const [roleName, setRoleName] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState({
    id: "",
  });
  const [roleData, setRoleData] = useState<any>([]);
  const getRole = async () => {
    let res;
    try {
      res = await roleList();
      let data: any = [];
      if (res?.success) {
        let rolenameList = res?.roles?.reverse();
        rolenameList?.map((ele: any, ind: string) => {
          data?.push({ id: ele?.id, name: ele?.name });
        });
        setRoleData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRole();
  }, []);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleAddRoleClick = () => {
    setAdd(true);
    setEditId("");
    setSelectedOption({ id: "" });
    setRoleName("");
  };

  const renderSettingComponent = () => {
    if (editId) {
      return (
        <AddRole
          roleId={editId}
          setSelectedOption={setSelectedOption}
          setEditId={setEditId}
          setAdd={setAdd}
          setRoleName={setRoleName}
          roleName={roleName}
        />
      );
    } else if (add) {
      return (
        <AddRole
          setAdd={setAdd}
          setEditId={setEditId}
          getRole={getRole}
          setSelectedOption={setSelectedOption}
          setRoleName={setRoleName}
          roleName={roleName}
        />
      );
    } else {
      return (
        <ViewComponent
          id={selectedOption.id}
          setEditId={setEditId}
          reloadTable={getRole}
          setAdd={setAdd}
        />
      );
    }
  };

  return (
    <div
      style={{ backgroundColor: globalSettings?.backgroundColour || "#ECF2F4" }}
    >
      <section
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
        }}
        className={`grid grid-cols-5 gap-4 min-h-[89%] h-full w-full lg:p-4 md:p-2 fixed`}
      >
        <div
          className=" col-span-1 flex flex-col h-[42rem] w-full border border-[#C6C6C6]
         bg-white rounded-2xl"
        >
          <div className="flex justify-center items-center align-middle bg-[#F7F7F7] py-4  w-full rounded-t-2xl text-[#4b4b4b] text-[18px] font-medium">
            Roles
          </div>
          <ul className="flex flex-col overflow-y-scroll h-11/12 hide-scroll gap-3 items-center   px-4 pb-10">
            <li
              key="addRole"
              className={`flex flex-col justify-center items-center  cursor-pointer w-full mx-auto`}
            >
              <div className="flex flex-col relative">
                <span
                  className={`text-[#00858e]  flex items-center justify-start gap-1 font-sans text-sm md:text-center font-medium px-4 py-4`}
                  onClick={handleAddRoleClick}
                >
                  <Plus size={20} />
                  <p>Add New Role</p>
                </span>
              </div>

              <hr className=" w-full bg-[#C6C6C6]" />
            </li>
            {roleData.map((role: any, index: any) => (
              <>
                <li
                  key={index}
                  className={`flex items-center h-fit relative cursor-pointer mx-2 ${
                    selectedOption.id === role.id ? "selected flex-col" : ""
                  }`}
                >
                  <span
                    className={`text-${
                      selectedOption.id === role.id
                        ? "button-color bg-blue-b3"
                        : "black-b1"
                    } w-full font-sans lg:text-[18px] md:text-[12px] md:text-center font-normal capitalize`}
                    onClick={() => {
                      handleOptionClick(role);
                      setAdd(false);
                      setEditId("");
                    }}
                  >
                    {capitalizeFirstLetter(role?.name)}
                  </span>

                  {index < roleData.length - 1 &&
                    selectedOption.id == role.id && (
                      <div className="border-b-[2px] border-solid border-button-color w-[90%] mx-auto self-center"></div>
                    )}
                </li>
                <hr className=" w-full bg-[#C6C6C6]" />
              </>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col col-span-4 overflow-y-scroll h-[42rem] hide-scroll
          bg-white rounded-2xl 
      "
        >
          {renderSettingComponent()}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Page;
