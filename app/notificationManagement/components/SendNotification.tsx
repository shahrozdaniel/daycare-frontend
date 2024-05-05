"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  Addnotificationtemplate,
  EmaiTemplate,
} from "@/services/notificationManagemt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { childEnrollmetnList } from "@/services/childrenActionServices";
import { educatorManagementListApi } from "@/app/daycareManagement/components/educatorManagementApi";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Image from "next/image";
import { ModalButton } from "@/components/common/Modal/Modal.styled";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";

const SendNotification: React.FC<any> = ({ closeModal, NotificationList }) => {
  const [value, setValue] = useState<string>("");
  const [sendTo, setSendTo] = useState<string>("child");
  console.log(value);
  const [emailTemplate, setEmailtemplate] = useState<any>([]);
  const [name, setname] = useState<any>("");
  const [subject, setSubject] = useState<string>("");
  const [filterData, setFilterData] = useState<any>([]);
  const [templateALl, setTemplateALl] = useState<any>([]);
  const [childEnrollData, setChildEnrollData] = useState<any>([]);
  const [educatorList, setEducatorList] = useState<any>([]);
  const [sendToId, setSendToId] = useState<any>([]);
  const animatedComponents = makeAnimated();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  console.log("sendToId", sendToId);
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  const getEducatorManagementlist = async () => {
    let res;
    try {
      res = await educatorManagementListApi();
      if (res?.success) {
        let arrdata: any = [{ value: "", label: "Select" }];
        const dataArr = res?.data?.filter(
          (user: any) => user.rolename.trim().toLowerCase() === "staff"
        );
        dataArr.map((item: any) => {
          arrdata.push({
            value: item.id,
            label: item?.name,
          });
        });
        setEducatorList(arrdata);
      } else {
      }
      // console.log(res);
    } catch (err: any) {
      console.log("error", err);

      toast.error(err.response.data.message || err.response.data.error);
    }
  };
  const enrolledChildlistlist = async () => {
    let res;
    try {
      let status = "1";
      res = await childEnrollmetnList(status);
      if (res?.success) {
        let list: any = [{ value: "", label: "Select" }];
        // console.log('response Data',res?.data)
        res?.data?.map((ele: any) => {
          list?.push({ value: ele?.child_id, label: ele?.child?.name });
        });
        setChildEnrollData(list);
      }
      // console.log(res);
    } catch (error) {}
  };

  const emailtemplateList = async () => {
    let res;
    try {
      res = await EmaiTemplate();
      let list: any = [{ value: "", label: "Select" }];
      if (res?.success) {
        setTemplateALl(res?.data);
        console.log(res?.data);
        res?.data?.map((e: any) => {
          list.push({ value: e.name, label: e?.name });
        });
      }
      setEmailtemplate(list);
    } catch (error) {}
  };

  useEffect(() => {
    enrolledChildlistlist();
    emailtemplateList();
    getEducatorManagementlist();
  }, []);

  useEffect(() => {
    let data = templateALl?.filter((templateALl: any) => {
      return templateALl?.name === name;
    });
    setFilterData(data?.[0]);
    setSubject(data?.[0]?.subject);
    setValue(data?.[0]?.message);
  }, [name]);

  const [check, setChecked] = useState<boolean>(true);
  const submitForm = async () => {
    let ids: any = [];
    sendToId.map((ele: any) => {
      ids?.push(ele?.value);
    });
    let child = {
      template_name: name,
      subject: subject,
      sendTo: sendTo,
      childId: ids,
      message: value,
    };
    let staff = {
      template_name: name,
      subject: subject,
      sendTo: sendTo,
      staffId: ids,
      message: value,
    };

    let res;
    try {
      if (
        name == "" ||
        subject == "" ||
        sendTo == "" ||
        ids == "" ||
        value == ""
      ) {
        toast.error("Please fill required field");
      } else {
        if (sendTo === "child") {
          res = await Addnotificationtemplate(child);
        } else {
          res = await Addnotificationtemplate(staff);
        }
        if (res?.success) {
          toast.success("Notification Send Successfully !");
          NotificationList();
          closeModal();
        }
      }
    } catch (error: any) {
      toast.error(error?.respponse?.data?.error);
      // console.log(error?.response?.data?.error)
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <ModalDetailsContainer>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">
        Send Notification Template
      </h1> */}
      <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
          Send Notification Template
        </div>
        <button
          type="button"
          className="flex self-end mb-2"
          onClick={closeModal}
        >
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <ScrollableFormContainer>
        <FormContainer>
          <div className="w-full relative my-1">
            <form>
              <div className="my-6">
                <div className="mb-4">
                  <span style={{ color: "black" }} className="m-2">
                    Existing Template
                  </span>
                  <input
                    type="checkbox"
                    onChange={(e: any) => setChecked(!check)}
                    checked={check}
                  />
                  <TwoInputContainer>
                    {check ? (
                      <CustomSelect
                        label="Name"
                        name=""
                        options={emailTemplate}
                        value={name}
                        onChange={(e: any) => setname(e?.target?.value)}
                        required
                      />
                    ) : (
                      <CustomInput
                        label=""
                        type="text"
                        placeholder="Name"
                        name=""
                        value={name}
                        onChange={(e: any) => setname(e?.target?.value)}
                        required
                      />
                    )}
                    <CustomInput
                      label=""
                      type="text"
                      placeholder="Subject"
                      name=""
                      value={subject}
                      onChange={(e: any) => setSubject(e?.target?.value)}
                      required
                    />
                  </TwoInputContainer>
                </div>
                <div className="mb-4">
                  <TwoInputContainer>
                    <CustomSelect
                      label="Send To"
                      name=""
                      onChange={(e) => setSendTo(e?.target?.value)}
                      value={sendTo}
                      options={[
                        { value: "", label: "Select" },
                        { value: "child", label: "Child" },
                        { value: "staff", label: "Staff" },
                      ]}
                      required
                    />
                    <div className="w-9/12">
                      {/* <div style={{ color: "black"}}>{sendTo == 'child' ? "Child List" : "Staff List"}</div> */}
                      <Select
                        isMulti
                        options={
                          sendTo == "child" ? childEnrollData : educatorList
                        }
                        className="basic-multi-select"
                        onChange={setSendToId}
                        required
                        // placeholder={sendTo == 'child' ? "Child List" : "Staff List"}
                        // placeholder="Select options"
                      />
                    </div>
                  </TwoInputContainer>
                </div>
                <span style={{ color: "black" }}>
                  Template body <span style={{ color: "red" }}>*</span>
                </span>
                <div>
                  <ReactQuill
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    className="my-editor"
                  />
                </div>
              </div>
              <div>{value}</div>
            </form>
          </div>
        </FormContainer>
      </ScrollableFormContainer>
      {/* <div className="flex gap-4 md:mx-auto lg:mr-[8%] w-fit mt-20">
          <>
            <Button
              type="button"
              form="white"
              className="bg-whit hover:text-white hover:border-none text-[#00858e] border border-[#00858e] rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="button"
              form="white"
              className="bg-whit hover:text-white hover:border-none text-[#00858e] border border-[#00858e] rounded-lg"
            >
              Schedule
            </Button>
            <Button
              type="submit"
              form="blue"
              className="bg-[#00858e]"
              onClick={submitForm}
            >
              Send Now
            </Button>
          </>
        </div> */}
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton onClick={closeModal} form="white">
              Cancel
            </CancelButton>
            <CancelButton form="white">Schedule</CancelButton>
            <AddButton
              className="w-[120px]"
              type="submit"
              form="bule"
              onClick={submitForm}
            >
              Send Now
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      <ToastContainer />
    </ModalDetailsContainer>
  );
};

export default SendNotification;
