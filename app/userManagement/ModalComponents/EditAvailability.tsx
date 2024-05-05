import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import DaysComponent from "../../daycareManagement/components/DaysComponent/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalButton } from "@/components/common/Modal/Modal.styled";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";
import {
  Date_formator_YYYY_MM_DD,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import { EdituserMangementavailability } from "@/services/User-management-API";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { HeaderContainer } from "@/app/reports/Common.styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormButton, FormContainer,ModalDetailsContainer } from "@/app/feesManagement/ModalComponent/Common.styled";
interface EducatorAvailabilityProps {
  control: any;
  // or use proper type for control based on your setup
  //   register: any;
}

const EditAvailability: React.FC<any> = ({
  control,
  getUserDetailsData,
  closeModal,
  userData,
}) => {
  const [availabilityval, setAvailabilityValue] = useState<any>([]);
  const [error, setError] = useState<any>({});
  let router = useRouter();
  let userId = userData?.usersDetails?.userId;
  const [startDate, setstartDate] = useState<any>("");
  const [empType, setEmpType] = useState<any>("");

  const [availability, setAvailability] = useState<any>({
    Monday: ["10:00 AM", "6:00 PM"],
    Tuesday: ["10:00 AM", "6:00 PM"],
    Wednesday: ["10:00 AM", "6:00 PM"],
    Thursday: ["10:00 AM", "6:00 PM"],
    Friday: ["10:00 AM", "6:00 PM"],
  });
  const submitForm = async () => {
    let res;
    let body = {
      availability: empType == 1 ? availability : availabilityval,
      startDate: startDate,
      employmentType: empType,
    };
    setError({}); // Reset errors at the beginning
    let updatedError: any = {};
    if (empType === 2) {
      Object.keys(availabilityval).forEach((key) => {
        const value = availabilityval[key];

        if (updatedError[key]) {
          if (value.some((time: string) => time.includes("AM"))) {
            updatedError[key].push(1);
          }
          if (value.some((time: string) => time.includes("PM"))) {
            updatedError[key].push(2);
          }
        } else {
          updatedError[key] = [];
          if (!value[0]) {
            updatedError[key].push("start-error");
          }
          if (!value[1]) {
            updatedError[key]?.push("end-error");
          }
          if (value.length === 2 && value[0] !== "" && value[1] !== "") {
            delete updatedError[key];
          }
        }
      });
    }

    setError(updatedError);

    if (Object.keys(updatedError).length === 0) {
      try {
        res = await EdituserMangementavailability(userId, body);
        if (res?.success) {
          toast.success(res?.message);
          getUserDetailsData();
          closeModal();
        } else {
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          handleUnauthorizedError(router);
        }
        if (error.response.data.error) {
          toast.error(error.response?.data?.error);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };

  useEffect(() => {
    setstartDate(moment(userData?.otherInfo?.start_date).format("YYYY-MM-DD"));
    setEmpType(userData?.otherInfo?.employment_type);
    setAvailabilityValue(userData?.otherInfo?.availability);
  }, []);

  return (
    <>
      <ModalDetailsContainer>
        {/* <h1 className="text-center  border-b-[2px] w-full py-2 mb-2  mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
       
        </h1> */}
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Educator Availability
          </div>

          <button type="button" className="" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <hr />
        <FormContainer>
        <section className="w-full my-2">
          <div className="flex-col w-full max-w-[826px] mx-auto items-center justify-center gap-6">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <div className="flex gap-3 w-full">
                <CustomInput
                  className="w-full p-3"
                  label=""
                  type="date"
                  placeholder="Start date"
                  name="startDate"
                  control={control}
                  divclass="w-full"
                  // register={register }
                  onChange={(e: any) => setstartDate(e?.target.value)}
                  value={startDate}
                />
                <CustomSelect
                  name="employeetype"
                  label="Employee Type"
                  options={[
                    { value: "", label: "Employement type" },
                    { value: "1", label: "Full Time" },
                    { value: "2", label: "Part time" },
                    // Add more options as needed
                  ]}
                  control={control}
                  onChange={(e: any) => setEmpType(e?.target.value)}
                  value={empType}
                  // register={register}
                />
              </div>

              {empType == 2 && (
                <div className="w-full flex flex-col items-left">
                  <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                    Available days and time :
                  </div>
                  <DaysComponent
                    control={control}
                    setValue={setAvailabilityValue}
                    value={availabilityval}
                    error={error}
                    setError={setError}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        </FormContainer>
        {/* <Button>Next</Button> */}
        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
          <CancelButton onClick={closeModal} type="button">
            {"Cancel"}
          </CancelButton>
          <AddButton type="button" onClick={submitForm}>
            {"Save"}
          </AddButton>
            </div>
            </FormContainer>
            </FormButton>
        <ToastContainer />
      </ModalDetailsContainer>
    </>
  );
};

export default EditAvailability;
