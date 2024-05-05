"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import RadioInput from "@/components/common/RadioInput";
import CircularSwitch from "@/components/common/CircularSwicth";
import { LucideLogOut, Plus, Trash } from "lucide-react";
import {
  dayCareSetting,
  dayCareSettingDetails,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useGlobalContext } from "../context/store";
import DocsTable from "./components/DocsTable";
import Button from "@/components/common/Button";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";
interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const HealthScreening = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
  const [question, setQuestion] = useState<any>([]);
  const [question1, setQuestion1] = useState<string>("");
  const [priority, setPriority] = useState<boolean>(false);
  const [switchValue, setswitchValue] = useState<any>(false);
  const [switchValue1, setswitchValue1] = useState<any>(false);
  const [allQuestion, setAllQuestion] = useState<any>([]);
  const [addQuestion, setAddQuestion] = useState<number[]>([1]);
  const [remove, setRemove] = useState<any>([]);
  const [isDelete, setIsdelete] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const [data, setData] = useState<any>("");
  const [disable, setIsdisable] = useState<boolean>(false);

  const isDisablePermisson = () => {
    if (IsAdmin) {
      setIsdisable(false);
    }
    if (userPermission?.setting?.add_edit === false) {
      setIsdisable(true);
    }
  };
  useEffect(() => {
    isDisablePermisson();
  }, [IsAdmin, permission]);
  useEffect(() => {
    settingDetails();
  }, []);

  useEffect(() => {
    setswitchValue(data?.healthScreen?.enableByParent);
    setswitchValue1(data?.healthScreen?.enableByStaff);
  }, [data]);
  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        const { dayCareSetting } = res;
        setData(dayCareSetting);
        let arr: any = [];
        dayCareSetting?.healthScreen?.questions?.questions.map(
          (item: any, index: number) => {
            arr.push({ ...item, questionNumber: index + 1 });
          }
        );
        setAllQuestion(arr);
        setRemove(dayCareSetting?.healthScreen?.questions?.questions || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    let body = {
      health_screening: {
        enable_by_parent: switchValue ? switchValue : false,
        enable_by_staff: switchValue1 ? switchValue1 : false,
        questions: remove,
        createdBy: data?.dayCareId,
      },
    };

    let res;
    try {
      res = await dayCareSetting("health", body);
      if (res?.success) {
        // setQuestion([]);
        // setAddQuestion([1]);
        toast.success(res?.message);

        settingDetails();
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.error);
    }
  };
  const handleDelete = async (id: any) => {
    setIsdelete(true);
    setId(id);
  };
  const hadnleClick = async () => {
    setRemove(remove.splice(id, 1));
    await submitForm();
    setIsdelete(false);
  };

  const handlePriorityChange = (e: any, index: number) => {
    const value = e.target.checked;
    const questionArr = [...allQuestion];
    questionArr[index].required = value;
    const removeArr = [...remove];
    removeArr[index].required = value;
    setAllQuestion(questionArr);
    setRemove(removeArr);
  };
  const column = [
    {
      accessorKey: "questionNumber",
      header: "Question Number",
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return (
          <div>
            <p>{doc.questionNumber}.</p>
          </div>
        );
      },
    },
    {
      accessorKey: "question",
      header: "Questions",
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return (
          <div className="flex justify-start items-start text-left">{doc.question}</div>
        );
      },
    },
    {
      id: "action",
      header: "Required",
      cell: ({ row }: { row: any }) => {
        const { questionNumber, required } = row.original;

        return (
          <div className="flex justify-center items-center gap-2 font-medium">
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) => handlePriorityChange(e, questionNumber - 1)}
                checked={required}
                disabled={IsAdmin ? false : !userPermission?.setting?.add_edit}
              />
              <span className="slider round"></span>
            </label>
            <div>Mandatory</div>
          </div>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return IsAdmin || userPermission?.setting?.add_edit ? (
          <div
            className="flex justify-center items-center gap-2 cursor-pointer font-medium mx-4"
            onClick={() => handleDelete(doc.questionNumber - 1)}
          >
            <Image
              src={"/svgs/delete-icon.svg"}
              alt="actions"
              height={25}
              width={25}
            />
            <span> Delete</span>
          </div>
        ) : null;
      },
    },
  ];

  const handleAddQuestion = () => {
    if (question1.trim() !== "") {
      setAllQuestion((prev: any) => {
        let arr = [...prev];
        const Question = arr.length + 1;
        arr.push({
          question: question1,
          required: priority,
          questionNumber: Question,
        });
        return arr;
      });
      setRemove((prev: any) => {
        let arr = [...prev];
        arr.push({ question: question1, required: priority });
        return arr;
      });
      setQuestion1("");
      setPriority(false);
    }
  };

  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2"> Health Screening</h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Health Screening
          </h1>
        </div>
      </div>

      <div className="w-4/6 mx-auto mt-6">
        <div className="flex w-2/3 ml-3 justify-between mb-8">
          <h2 className="text-black-b1">Enable health screening with parent</h2>
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e: any) => setswitchValue(e?.target?.checked)}
              checked={switchValue}
              disabled={IsAdmin ? false : !userPermission?.setting?.add_edit}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex w-2/3 ml-3 justify-between mb-8">
          <h2 className="text-black-b1">
            Enable health screening with educator
          </h2>

          <label className="switch">
            <input
              type="checkbox"
              onChange={(e: any) => setswitchValue1(e?.target?.checked)}
              disabled={IsAdmin ? false : !userPermission?.setting?.add_edit}
              checked={switchValue1}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="flex flex-col w-10/12 mx-auto my-3">
        <p className="text-black-b1 font-medium text-sm">Add Question:</p>

        <div className="flex flex-row items-center mt-3 w-full">
          <div className="w-3/5">
            <CustomInput
              placeholder="Question"
              name={`question1`}
              type="text"
              // onChange={(e: any) => handleData(e, id)}
              onChange={(e: any) => {
                setQuestion1(e.target.value);
              }}
              value={question1}
              disabled={disable}
            />
          </div>
          <div className="flex gap-2  mx-auto font-medium">
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e: any) => setPriority(e.target.checked)}
                checked={priority}
                disabled={IsAdmin ? false : !userPermission?.setting?.add_edit}
              />
              <span className="slider round"></span>
            </label>
            <div>Mandatory</div>
          </div>

          {(IsAdmin || userPermission?.setting?.add_edit) && (
            <Button
              type="button"
              form="blue"
              className={`bg-[#00858e] text-sm`}
              onClick={() => question1 !== "" && handleAddQuestion()}
            >
              Add Question
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col w-10/12 mx-auto mt-3">
        <div className="mb-2 text-black-b1  font-medium">Questions List:</div>
        <div>
          <DocsTable
            columns={column}
            data={allQuestion}
            headerClassName="hidden"
            className={"border border-[#C6C6C6] rounded-3xl w-full"}
            cellClassName="h-[60px] border-b-[#D2CFFF]  p-4"
          />
        </div>
      </div>

      <div className="flex gap-4 md:mx-auto lg:mr-[8%] w-fit my-10">
        {(IsAdmin || userPermission?.setting?.add_edit) && (
          <>
            {/* <Button
              type="button"
              form="white"
              className="bg-whit hover:text-white hover:border-none text-[#00858e] border border-[#00858e] rounded-lg"
            >
              Cancel
            </Button> */}
            <Button
              type="submit"
              form="blue"
              className="bg-[#00858e]"
              onClick={submitForm}
            >
              Save
            </Button>
          </>
        )}
      </div>
      <ToastContainer />

      {isDelete && (
        <ConfirmationModal
          title={"Health screening Question"}
          content={"Are you sure you want to delete?"}
          modalOpen={isDelete}
          handleConfirm={hadnleClick}
          closeModal={() => setIsdelete(false)}
        />
      )}
    </>
  );
};

export default HealthScreening;
