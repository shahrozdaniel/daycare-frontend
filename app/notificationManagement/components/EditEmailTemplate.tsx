"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import RadioInput from "@/components/common/RadioInput";
import CircularSwitch from "@/components/common/CircularSwicth";
import DocumentUpload from "@/components/common/DocumentUpload";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import { TRIGGER } from "@/app/Dropdowns";
import {
  AddEmaiTemplate,
  updateEmaiTemplate,
} from "@/services/notificationManagemt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { ModalButton } from "@/components/common/Modal/Modal.styled";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";
interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const EditEmailTemplate: React.FC<any> = ({
  closeModal,
  editData,
  isEdit,
  emailtemplateList,
}) => {
  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormData>();
  const [data, setData] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [cc, setCc] = useState<string>("");
  const [Bcc, setBcc] = useState<any>("");
  const [status, setStatus] = useState<number>(1);
  const [reminder, setReminder] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [trigger, setTrigger] = useState<string>("");

  useEffect(() => {
    setTemplateName(editData?.totalData?.name);
    setData(editData?.totalData?.message);
    setSubject(editData?.totalData?.subject);
    setTrigger(editData?.totalData?.trigger);
    setStatus(editData?.totalData?.status);
  }, [editData]);

  const submitForm = async () => {
    let body = {
      template_name: templateName,
      subject: subject,
      message: `${data}`,
      // "cc": cc,
      // "bcc": [Bcc],
      status: status,
      // "reminder": reminder,
      // "frequency": frequency,
      trigger: trigger,
    };
    let res;
    if (templateName === "" || subject === "" || data === "") {
      toast.error("Please fill required field");
    } else {
      try {
        if (isEdit) {
          res = await updateEmaiTemplate(body, editData?.totalData?.id);
        } else {
          res = await AddEmaiTemplate(body);
        }
        if (res?.success) {
          toast.success(res?.message);
          closeModal();
          emailtemplateList();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      }
    }
  };

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
      matchVisual: false,
    },
  };

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
  return (
    <ModalDetailsContainer>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Email Template</h1>
      <hr /> */}
      <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
          Email Template
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
          <div className="w-full relative my-1 gap-y-5">
            <div className="my-10">
              <div className="my-[1.25rem]">
                <TwoInputContainer>
                  <CustomInput
                    type="text"
                    label=""
                    name=""
                    control={control}
                    placeholder="Email Template Name"
                    onChange={(e: any) => setTemplateName(e?.target?.value)}
                    value={templateName}
                    required
                  />
                  <CustomInput
                    type="text"
                    label=""
                    name=""
                    control={control}
                    placeholder="Subject"
                    onChange={(e: any) => setSubject(e?.target?.value)}
                    value={subject}
                    required
                  />
                </TwoInputContainer>
              </div>
              <TwoInputContainer>
                <CustomSelect
                  options={[
                    { value: 1, label: "Active" },
                    { value: 0, label: "Inactive" },
                  ]}
                  label="Status"
                  control={control}
                  name=""
                  className="mt-1"
                  onChange={(e: any) => setStatus(e?.target?.value)}
                  value={trigger}
                  required
                />
                <CustomSelect
                  options={TRIGGER}
                  label="Trigger"
                  control={control}
                  name=""
                  className="mt-1"
                  onChange={(e: any) => setTrigger(e?.target?.value)}
                  value={trigger}
                  required
                />
                {/* <CustomInput type="text" label="" name="" control={control} placeholder="Reminder" onChange={(e: any) => setReminder(e?.target?.value)} value={reminder} /> */}
                {/* <CustomInput type="text" label="" name="" control={control} placeholder="Frequency" onChange={(e: any) => setFrequency(e?.target?.value)} value={frequency} /> */}
              </TwoInputContainer>
              <TwoInputContainer>
                {/* <CustomInput type="email" label="" name="" control={control} placeholder="cc" onChange={(e: any) => setCc(e?.target?.value)} value={cc} /> */}
                {/* <CustomInput type="email" label="" name="" control={control} placeholder="Bcc" onChange={(e: any) => setBcc(e?.target?.value)} value={Bcc} /> */}
              </TwoInputContainer>
              <span style={{ color: "black" }}>
                {" "}
                Template body <span style={{ color: "red" }}>*</span>{" "}
              </span>
              <div style={{ color: "black" }}>
                {trigger && <span>Avilable Tags : </span>}
                {trigger === "Child Register Mail" && (
                  <span>
                    {" "}
                    `
                    {`{{childname}},
            {{classname}},
            {{registrationdate}},
            {{daycarename}}`}
                    `
                  </span>
                )}

                {trigger === "Safe Arrival Notification" && (
                  <span>
                    {" "}
                    `
                    {`{{childname}},
            {{daycarename}},
            {{classname}}
           ,{{dateandtime}},`}
                    `
                  </span>
                )}

                {trigger === "Account Activate" && (
                  <span>
                    {" "}
                    `
                    {`
            {{daycarename}},`}
                    `
                  </span>
                )}

                {trigger === "Account Deactivate Notification" && (
                  <span>
                    {" "}
                    `
                    {`
            {{daycarename}},`}
                    `
                  </span>
                )}
              </div>
              <div className="my-2" style={{ minHeight: "320px" }}>
                <ReactQuill
                  value={data}
                  onChange={setData}
                  modules={modules}
                  formats={formats}
                  className="my-editor"
                />
              </div>
              {/* <div className="flex gap-4 md:mx-auto lg:mr-[8%] w-fit my-10 mb-6">
          <Button
            type="button"
            form="white"
            className="bg-whit hover:text-white hover:border-none text-[#00858e] border border-[#00858e] rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </Button>
          {
            <>
              <Button
                type="submit"
                form="blue"
                className="bg-[#00858e]"
                onClick={submitForm}
              >
                Save
              </Button>
            </>
          }
        </div> */}
              {/* <div className="flex justify-center"><DocumentUpload name="uploadDoc" label="Upload Document" control={control} /></div> */}
              <ToastContainer />
            </div>
          </div>
        </FormContainer>
      </ScrollableFormContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton onClick={closeModal} form="white">
              Cancel
            </CancelButton>
            <AddButton type="submit" form="bule" onClick={submitForm}>
              Save
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
    </ModalDetailsContainer>
  );
};

export default EditEmailTemplate;
