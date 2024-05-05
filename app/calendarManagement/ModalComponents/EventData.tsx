"use client";
import React, { useState } from "react";
import { TwoInputContainer } from "./Common.styled";
import Image from "next/image";
import { Date_formator_YYYY_MM_DD, formatDateWithUTC } from "@/utils/utilityFunctions";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/Modal/Modal";
import { Copy } from "lucide-react";
import EditActivity from "./EditActivity";
import EditFood from "./EditFood";
import CopyEvent from "./CopyEvent";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";
import { Scroll } from "lucide-react";
import { useGlobalContext } from "@/app/context/store";

const EventData: React.FC<any> = ({ closeModal, eventData, reloadData }) => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [foodModal, setfoodModal] = useState<boolean>(false);
  const [copyModal, setCopymodal] = useState<boolean>(false);
  const [name, setname] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [editData, setEditData] = useState<any[]>([]);
  const [foodEdit, setFoodEdit] = useState<any[]>([]);
  let activity = eventData?.item?.activity;
  let menu = eventData?.item?.menu;
  const handleEdit = (e: any) => {
    setEditData(e);
    setModalOpen(true);
  };
  const handleEditFood = (e: any) => {
    setFoodEdit(e);
    setfoodModal(true);
  };
  const copyEvent = (e: any, name: any) => {
    // console.log(e)
    setname(name);
    setData(e);
    setCopymodal(true);
  };

  const getFoodMenuItems=(menu:any)=>{
    const items=menu?.food_items?.join(", ");
    return items;
  };

  return (
    <ModalDetailsContainer>
      {/* <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
          Event Details
        </div>

        <button type="button" className="flex self-end" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer> */}

      <HeaderContainer>
        <div className="text-[#4b4b4b] font-sans text-[20px] font-medium mx-auto">
          Event Details
        </div>

        <button
          type="button"
          className="flex self-end mb-3"
          onClick={closeModal}
        >
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <ScrollableFormContainer>
      <FormContainer>
      {/* <div className="w-full overflow-scroll hide-scroll h-[300px] relative my-1 flex flex-col justify-center items-center"> */}
        <p className="text-[#00000099] font-sans text-[23px] font-medium flex justify-center mt-2">
          Menu Details
        </p>

        {menu ? (
          <>
            {" "}
            {menu?.map((menu: any, ind: any) => {
              return (
                <div
                  className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 "
                  key={ind}
                >
                  <div className="flex justify-end self-end mr-[2%] gap-3">
                     {(IsAdmin || userPermission?.setting?.add_edit)&&
                       <Image
                       src={"/svgs/edit-icon.svg"}
                       width={24}
                       height={24}
                       alt="edit image"
                       className="cursor-pointer"
                       onClick={() => handleEditFood(menu)}
                     />
                      }
                      <Copy className="text-blue-b1 cursor-pointer text-sm" onClick={() => copyEvent(menu, "food")}/>

                  </div>
                  <div className="grid grid-cols-3 gap-[20px] p-10 ">
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {" Food Menu Name"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {menu?.menu_name}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Meal type"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {menu?.meal_type}
                      </p>
                    </div>
                    {menu?.menu_subtype && (
                      <div className="flex flex-col justify-start items-center">
                        <p className="font-sans text-grey-text font-medium text-sm">
                          {"Menu Sub type"}
                        </p>
                        <p className="font-sans text-black text text-lg">
                          {menu?.menu_subtype}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Menu Type"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {menu?.menu_type}
                      </p>
                    </div>
                    {/* <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Start Time"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {menu?.start_time}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"End Time"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {menu?.end_time}
                      </p>
                    </div> */}
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Food Menu"}
                      </p>
                      {getFoodMenuItems(menu)}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <p className="font-sans text-black text text-lg">
              {"No food menu added"}
            </p>
          </div>
        )}
        <hr />
        <p className="text-[#00000099] font-sans text-[23px] font-medium flex justify-center mt-2">
          Activity Details
        </p>

        {activity ? (
          <>
            {activity?.map((activity: any, ind: any) => {
              return (
                <div
                className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 "
                key={ind}
                >
                  <div className="flex justify-end self-end mr-[2%] gap-5">
                  
                     {(IsAdmin || userPermission?.setting?.add_edit)&& 
                      <Image
                      src={"/svgs/edit-icon.svg"}
                      width={24}
                      height={24}
                      alt="edit image"
                      className="cursor-pointer"
                      onClick={() => handleEdit(activity)}
                    />}
                    <Copy className="text-blue-b1 cursor-pointer text-sm"  onClick={() => copyEvent(activity, "activity")}/>
                  
                  </div>
                  <div className="grid grid-cols-3 gap-[61px] p-10 " key={ind}>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Activity Name & Title"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {activity?.activity_name}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Domain/ Learning Area"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {activity?.domain}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Description"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {activity?.description}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Development Skill"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {activity?.development_skill}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Extra Details"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {activity?.extra_details}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Date"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {formatDateWithUTC(activity?.date)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Instructions"}
                      </p>
                      {activity?.instructions?.map((ele: any, ind: any) => {
                        return (
                          <p
                            className="font-sans text-black text text-lg"
                            key={ind}
                          >
                            {ele}
                          </p>
                        );
                      })}
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Material to be used"}
                      </p>
                      {activity?.materials_used?.map((ele: any, ind: any) => {
                        return (
                          <p
                            className="font-sans text-black text text-lg"
                            key={ind}
                          >
                            {ele}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </>
        ) : (
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <p className="font-sans text-black text text-lg">
              {"No activity added"}
            </p>
          </div>
        )}
      {/* </div> */}
      </FormContainer>
      </ScrollableFormContainer>

      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px]">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
          </div>
        </FormContainer>
      </FormButton>

      {/* <ModalButton className="py-2 px-4 z-20">
        <CancelButton onClick={closeModal}>{"cancel"}</CancelButton>
      </ModalButton> */}
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          cancelText={"Cancel"}
          AddText={"Add"}
          closeModal={() => setModalOpen(false)}
        >
          <EditActivity
            closeModal={() => setModalOpen(false)}
            editData={editData}
            reloadData={reloadData}
            parentModalClose={closeModal}
          />
        </Modal>
      )}
      {foodModal && (
        <Modal
          modalOpen={foodModal}
          cancelText={"Cancel"}
          AddText={"Add"}
          closeModal={() => setfoodModal(false)}
        >
          <EditFood
            closeModal={() => setfoodModal(false)}
            data={foodEdit}
            reloadData={reloadData}
            parentModalClose={closeModal}
          />
        </Modal>
      )}

      {copyModal && (
        <Modal
          modalOpen={copyModal}
          cancelText={"Cancel"}
          AddText={"Add"}
          closeModal={() => setCopymodal(false)}
        >
          <CopyEvent
            closeModal={() => setCopymodal(false)}
            data={data}
            reloadData={reloadData}
            name={name}
            parentModalClose={closeModal}
          />
        </Modal>
      )}
    </ModalDetailsContainer>
  );
};

export default EventData;
