import React, { useEffect, useRef, useState } from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import ImageUpload from "@/components/common/ImageUpload";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import Textarea from "@/components/common/Textarea";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import Image from "next/image";
import RegisterRadioInput from "@/components/common/RegisterRadioInput";
import Select from "react-select";
import { useForm } from "react-hook-form";
import {
  childListbyclass,
  classroomDetailsById,
  classroomDetailsByIdPresentStaff,
} from "@/services/classroomActionServices";
import SignaturePad from "react-signature-canvas";
import {
  createIncidentChildren,
  getChildrenIncidentView,
  updateIncidentChildren,
} from "@/services/incidentManagement";
import { useRouter } from "next/navigation";
import {
  base64toFile,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { IncidentValidationSchema } from "./incidentValidationSchema";
import { IncidentOptions } from "@/utils/constants";
import { FormButton } from "@/app/feesManagement/ModalComponent/Common.styled";
import { FormField } from "@/components/ui/form";
interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
  classroomData: any;
  closeModal: any;
  getChildrenIncident: any;
  incidentId?: string | number;
}

const IncidentModal: React.FC<ModalDetailsProps> = ({
  classroomData,
  closeModal,
  getChildrenIncident,
  incidentId,
}) => {
  const [educatorData, setEducatorData] = useState<
    { value: number | string; label: string }[]
  >([]);
  const [trimmedDataURL, setTrimmedDataURL] = useState<any>(null);
  const sigPadRef = useRef<any | null>(null);
  const parentSigPadRef = useRef<any | null>(null);
  const [childrenlist, setChildrenList] = useState<any[]>([]);
  const [children, setChildren] = useState<any>([]);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signaturepic, setSignaturPic] = useState<string>("");
  const [parentsignaturepic, setParentSignaturPic] = useState<string>("");
  const [parentsignatureFile, setParentSignatureFile] = useState<File | null>(
    null
  );
  const [isDisable, setIsdisbale] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)

  let router = useRouter();

  const clear = () => {
    sigPadRef?.current?.clear();
    setSignatureFile(null);
  };

  const trim = () => {
    setTrimmedDataURL(
      sigPadRef?.current?.getTrimmedCanvas().toDataURL("image/png")
    );
    const base64String = sigPadRef?.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    const fileName = "signature.png";
    const mimeType = "image/png";

    const file = base64toFile(base64String, fileName, mimeType);

    setSignatureFile(file);
    toast.success('Staff sign uploaded')
    setIsdisbale(false)
  };

  const clearparentsig = () => {
    parentSigPadRef?.current?.clear();
    setParentSignatureFile(null);
  };

  const trimparentsig = () => {
    const base64String = parentSigPadRef?.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    const fileName = "signature.png";
    const mimeType = "image/png";

    const file = base64toFile(base64String, fileName, mimeType);

    setParentSignatureFile(file);
    toast.success('Parent sign uploaded')
  };
  // let validationschema: any = modalopen
  //   ? CheckOutCheckInValidationSchema[0]
  //   : checkoutmodalopen
  //   ? CheckOutCheckInValidationSchema[1]
  //   : null;
  // let router = useRouter();
  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(IncidentValidationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = methods;
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    // Add more options as needed
  ];

  const getClassroomdetails = async (id: string | number) => {
    try {
      let res = await classroomDetailsByIdPresentStaff(id);
      if (res?.success) {
        let resarray = res.data.present_educators
          ? res?.data.present_educators.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
            };
          })
          : res?.data.total_educators.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
            };
          });

        setEducatorData([
          { value: "", label: "Select Educator Data" },
          ...resarray,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChildByClassroom = async (id: any) => {
    let res;
    try {
      res = await childListbyclass(id);
      // console.log('res======>',res)
      if (res?.success) {
        // setChildrenList(res?.data?.childrenList);
        let checkdInchild = res.data.childrenList.filter((ele: any) => {
          return ele?.check_in !== null
        })

        let resarray = checkdInchild?.map((item: any) => {
          return {
            value: { enrollmentid: item.enrollmentid, childid: item.childid },
            label: `${item.childfirstname} ${item.childlastname}`,
          };
        });
        setChildrenList(resarray);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('signatureFile',signatureFile,'parentsignatureFile',parentsignatureFile)
  const onFormSubmit = async (data: any) => {
    setLoader(true)
    try {
      if (children.length === 0) {
        toast.error("select child");
      } else {
        let formdata = new FormData();
        let tempData = {
          classroomId: data.classroomId,
          notifyParent: data.notifyParent === "yes" ? true : false,
          childId: children.value.childid,
          enrollmentId: children.value.enrollmentid,
          presentStaffId: data.presentStaffId,
          incidentType: data?.incidentType,
          natureofIncident: data.natureofIncident,
          actionTaken: data.actionTaken,
          photo: data.photo,
          signaturePhoto: signatureFile,
          parentSignaturePhoto: parentsignatureFile,
        };

        Object.entries(tempData).map((key: any) => {
          formdata.append(key[0], key[1]);
        });
        let res;
        if (incidentId) {
          res = await updateIncidentChildren(formdata, incidentId);
        } else {
          res = await createIncidentChildren(formdata);
        }

        if (res.success) {
          closeModal();
          getChildrenIncident();
          toast.success(res.message);
        }
      }
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(error?.response?.data?.message);
    }
    setLoader(false)

  };

  const getChildrenDetails = async (id: string | number) => {
    try {
      let result = await getChildrenIncidentView(id);

      if (result.success) {
        setValue("photo", result.data.photo);
        setValue("classroomId", result.data.classroom_id);
        setSignaturPic(result.data.signature);
        setParentSignaturPic(result?.data?.parent_signature);
        setValue("notifyParent", result.data.notify_parent ? "yes" : "no");
        let childrenfilter = childrenlist.filter(
          (item) => item.value.enrollmentid === result.data.enrollment_id
        );
        setChildren(childrenfilter[0]);
        setValue("presentStaffId", Number(result.data.present_staff_id));
        setValue("incidentType", result.data.incident_type);
        setValue("natureofIncident", result.data.nature);
        setValue("actionTaken", result.data.action_taken);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (watch("classroomId")) {
      getClassroomdetails(watch("classroomId"));
      getChildByClassroom(watch("classroomId"));
    }
  }, [watch("classroomId")]);

  useEffect(() => {
    if (incidentId && childrenlist) {
      getChildrenDetails(incidentId);
    }
  }, [incidentId, childrenlist]);
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Add Incident
          </div>
          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <ScrollableFormContainer>
          <FormContainer>
            <div className="mx-auto w-fit flex flex-col items-center justify-center my-8">
              <ImageUpload control={control} name="photo" />
            </div>
            <TwoInputContainer>
              <CustomSelect
                name="classroomId"
                label="Classroom Name"
                options={classroomData}
                control={control}
                register={register}
                required
                error={errors?.classroomId}
              />

              <div className="text-black-b1 flex items-center w-full gap-3">
                <h2 className="">Notify to Parent</h2>
                <RegisterRadioInput
                  options={options}
                  control={control}
                  // register={register}
                  name={`notifyParent`}
                />
              </div>
            </TwoInputContainer>
            <div className="w-full text-black-b1 flex items-start justify-start self-start">
              <Select
                placeholder="Select child"
                options={childrenlist}
                className="basic-multi-select w-full"
                classNamePrefix="select"
                onChange={(e: any) => setChildren(e)}
                value={children}
              />
            </div>

            <TwoInputContainer>
              <CustomSelect
                name="presentStaffId"
                label="Staff Present (associated with classroom)"
                options={educatorData}
                control={control}
                register={register}
                required
                error={errors?.presentStaffId}
              />
              <CustomSelect
                name="incidentType"
                label="Incident Type"
                options={IncidentOptions}
                control={control}
                register={register}
                required
                error={errors?.incidentType}
              />
            </TwoInputContainer>
            <TwoInputContainer>
              <CustomInput
                label=""
                type="text"
                placeholder="Nature of Incident"
                name="natureofIncident"
                control={control}
                className="w-full"
                register={register}
                required
                error={errors?.natureofIncident}
              />
            </TwoInputContainer>
            <TwoInputContainer>
              <CustomInput
                label=""
                type="text"
                placeholder="Action Taken"
                name="actionTaken"
                control={control}
                className="w-full"
                register={register}
                required
                error={errors?.actionTaken}
              />
            </TwoInputContainer>
            <div className="flex items-center justify-center gap-4">
              {incidentId ? (
                <div className="flex flex-col items-center">
                  <p className="text-[#000]  font-[DM_Sans] text-[18px] font-medium">
                    Staff Signature
                  </p>

                  {signaturepic ? (
                    <Image
                      src={signaturepic}
                      alt="Preview"
                      width={50}
                      height={50}
                      className="w-full  max-w-[50px] h-full  max-h-[50px] object-fit rounded-full"
                    />
                  ) : (
                    <>
                      <Image
                        src={"/svgs/no-image.svg"}
                        alt="Logo"
                        width={50}
                        height={50}
                        className="w-full max-w-[50px] h-full  max-h-[50px] object-contain mb-2 "
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-[#000]  font-[DM_Sans] text-[18px] font-medium">
                    Staff Signature
                  </p>
                  <p className="text-[#000]  font-[DM_Sans] text-base font-medium">
                    click on save button first to save your signature
                  </p>
                  <div className="w-full h-[200px] top-10 left-10 text-black-b1 mb-4">
                    <div className="w-full h-full mx-auto bg-white border-b1 border-2">
                      <SignaturePad
                        canvasProps={{ className: "w-full h-full" }}
                        ref={sigPadRef}
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-center mt-2">
                      <CancelButton
                        className="w-full h-10"
                        onClick={clear}
                        type="button"
                      >
                        Clear
                      </CancelButton>
                      <AddButton
                        className="w-full h-10"
                        type="button"
                        onClick={trim}
                      >
                        Save
                      </AddButton>
                    </div>
                  </div>
                </div>
              )}
              {incidentId ? (
                <div className="flex flex-col items-center">
                  <p className="text-[#000]  font-[DM_Sans] text-[18px] font-medium">
                    Parent Signature
                  </p>

                  {parentsignaturepic ? (
                    <Image
                      src={parentsignaturepic}
                      alt="Preview"
                      width={50}
                      height={50}
                      className="w-full  max-w-[50px] h-full  max-h-[50px] object-fit rounded-full"
                    />
                  ) : (
                    <>
                      <Image
                        src={"/svgs/no-image.svg"}
                        alt="Logo"
                        width={50}
                        height={50}
                        className="w-full max-w-[50px] h-full  max-h-[50px] object-contain mb-2 "
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-[#000]  font-[DM_Sans] text-[18px] font-medium">
                    Parent Signature
                  </p>
                  <p className="text-[#000]  font-[DM_Sans] text-base font-medium">
                    click on save button first to save your signature
                  </p>
                  <div className="w-full h-[200px] top-10 left-10 text-black-b1 mb-4">
                    <div className="w-full h-full mx-auto bg-white border-b1 border-2">
                      <SignaturePad
                        canvasProps={{ className: "w-full h-full" }}
                        ref={parentSigPadRef}
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-center mt-2">
                      <CancelButton
                        className="w-full h-10"
                        onClick={clearparentsig}
                        type="button"
                      >
                        Clear
                      </CancelButton>
                      <AddButton
                        className="w-full h-10"
                        type="button"
                        onClick={trimparentsig}
                      >
                        Save
                      </AddButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FormContainer>
        </ScrollableFormContainer>

        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
              <CancelButton type="button" onClick={closeModal}>
                {"Cancel"}
              </CancelButton>
              {loader ? <button className="loader"></button> : <AddButton type="submit" disabled={isDisable}>{incidentId ? "Save" : "Add"}</AddButton>}
            </div>
          </FormContainer>
        </FormButton>
      </ModalDetailsContainer>
    </form>
  );
};

export default IncidentModal;
