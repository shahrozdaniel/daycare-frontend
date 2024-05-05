"use client";
import React, { useState } from "react";
import {
  ActivityContainer,
  ActivityDetails,
  ActivityInfo,
  ButtonInfo,
  CalendarContainer,
  DailyReportContainer,
  Description,
  FormContainer,
  FormDetails,
  HeaderBar,
  IconContainer,
  ImgContainer,
  InfoContainer,
  NameTimeDetails,
  ProfileButtons,
  ProfileContainer,
  ProfileDescription,
  ProfileDetails,
  ProfileInfo,
  ProfileName,
  TagContainer,
} from "./dailyReport.styled";
import Image from "next/image";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import Activity from "./ModalComponents/Activity";
import Note from "./ModalComponents/Note";
import Meal from "./ModalComponents/Meal";
import Sleep from "./ModalComponents/Sleep";
import Loo from "./ModalComponents/Loo";
import Mood from "./ModalComponents/Mood";
import Medication from "./ModalComponents/Medication";
import Medical from "./ModalComponents/Medical";
import Photo from "./ModalComponents/Photo";

const Page: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Perform any actions with the submitted form data
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [activity, setActivity] = useState(false);
  const [note, setNote] = useState(false);
  const [meal, setMeal] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [loo, setLoo] = useState(false);
  const [mood, setMood] = useState(false);
  const [medication, setMedication] = useState(false);
  const [medical, setMedical] = useState(false);
  const [photo, setPhoto] = useState(false);

  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "ActivityModal") {
      setActivity(true);
    }
    if (modalValue === "NoteModal") {
      setNote(true);
    }
    if (modalValue === "MealModal") {
      setMeal(true);
    }
    if (modalValue === "SleepModal") {
      setSleep(true);
    }
    if (modalValue === "LooModal") {
      setLoo(true);
    }
    if (modalValue === "MoodModal") {
      setMood(true);
    }
    if (modalValue === "MedicationModal") {
      setMedication(true);
    }
    if (modalValue === "MedicalModal") {
      setMedical(true);
    }
    if (modalValue === "PhotoModal") {
      setPhoto(true);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "ActivityModal") {
      setActivity(false);
    }
    if (modalValue === "NoteModal") {
      setNote(false);
    }
    if (modalValue === "MealModal") {
      setMeal(false);
    }
    if (modalValue === "SleepModal") {
      setSleep(false);
    }
    if (modalValue === "LooModal") {
      setLoo(false);
    }
    if (modalValue === "MoodModal") {
      setMood(false);
    }
    if (modalValue === "MedicationModal") {
      setMedication(false);
    }
    if (modalValue === "MedicalModal") {
      setMedical(false);
    }
    if (modalValue === "PhotoModal") {
      setPhoto(false);
    }
    setModalOpen(false);
  };

  return (
    <>
      <DailyReportContainer>
        <ProfileContainer>
          <ProfileDetails>
            <ImgContainer>
              <Image
                src={"/images/profile-picture.png"}
                width={204}
                height={204}
                alt="coodle image"
              />
            </ImgContainer>
            <ProfileInfo>
              <p className="text-[#000000] font-sans text-[24px] font-medium mt-2">
                Charles Warner
              </p>
              <TagContainer>
                <div className="bg-[#FFF2EE] rounded-e-sm text-[#EC2D30] font-sans text-[12px] font-medium p-2 cursor-pointer	">
                  Any Allergy
                </div>
                <div className="bg-[#FFF2EE] rounded-e-sm text-[#EC2D30] font-sans text-[12px] font-medium p-2 cursor-pointer	">
                  Important Info
                </div>
              </TagContainer>
              <ProfileName>
                <p className="text-[#00000080] font-sans text-[14px] font-medium">
                  Classroom
                </p>
                <p className="text-[#000000] font-sans text-[20px] font-medium">
                  Toddler
                </p>
              </ProfileName>
            </ProfileInfo>
            <ProfileButtons>
              <ButtonInfo>
                <IconContainer>
                  <Image
                    src={"/svgs/eye-icon.svg"}
                    width={16}
                    height={16}
                    alt="eye image"
                  />
                </IconContainer>
                <p className="text-[#3A70E2] font-sans text-[16px] font-normal">
                  View Profile
                </p>
              </ButtonInfo>

              <ButtonInfo>
                <IconContainer>
                  {" "}
                  <Image
                    src={"/svgs/right-arrow.svg"}
                    width={16}
                    height={16}
                    alt="right arrow image"
                  />
                </IconContainer>
                <p className="text-[#3A70E2] font-sans text-[16px] font-normal">
                  Move
                </p>
              </ButtonInfo>

              <ButtonInfo>
                <IconContainer>
                  {" "}
                  <Image
                    src={"/svgs/right-arrow.svg"}
                    width={16}
                    height={16}
                    alt="right arrow image"
                  />
                </IconContainer>
                <p className="text-[#3A70E2] font-sans text-[16px] font-normal">
                  Check-in
                </p>
              </ButtonInfo>
            </ProfileButtons>
          </ProfileDetails>
        </ProfileContainer>
        <ProfileDescription>
          <CalendarContainer>
            {" "}
            <DatePickerComponent
              label=""
              name="DailyReport"
              control={control}
            />
          </CalendarContainer>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Activities
                </p>
                <p
                  onClick={() => openModal("ActivityModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Activity
                </p>
              </HeaderBar>
              <ActivityInfo>
                <ActivityContainer>
                  <ImgContainer>
                    <Image
                      src={"/svgs/daily-activity.svg"}
                      width={240}
                      height={160}
                      alt="daily activity image"
                    />
                  </ImgContainer>
                  <ActivityDetails>
                    <NameTimeDetails>
                      <p className="text-[#000000] font-sans text-[14px] font-medium">
                        Activity Name
                      </p>
                      <p className="text-[#00000066] font-sans text-[10px] font-medium">
                        12:30 AM
                      </p>
                    </NameTimeDetails>
                    <Description>
                      <p className="text-[#000000CC] font-sans text-[12px] font-normal">
                        - Any notes given by the caretaker
                      </p>
                    </Description>
                  </ActivityDetails>
                </ActivityContainer>

                <ActivityContainer>
                  <ImgContainer>
                    <Image
                      src={"/svgs/daily-activity.svg"}
                      width={240}
                      height={160}
                      alt="daily activity image"
                    />
                  </ImgContainer>
                  <ActivityDetails>
                    <NameTimeDetails>
                      <p className="text-[#000000] font-sans text-[14px] font-medium">
                        Activity Name
                      </p>
                      <p className="text-[#00000066] font-sans text-[10px] font-medium">
                        12:30 AM
                      </p>
                    </NameTimeDetails>
                    <Description>
                      <p className="text-[#000000CC] font-sans text-[12px] font-normal">
                        - Any notes given by the caretaker
                      </p>
                    </Description>
                  </ActivityDetails>
                </ActivityContainer>

                <ActivityContainer>
                  <ImgContainer>
                    <Image
                      src={"/svgs/daily-activity.svg"}
                      width={240}
                      height={160}
                      alt="daily activity image"
                    />
                  </ImgContainer>
                  <ActivityDetails>
                    <NameTimeDetails>
                      <p className="text-[#000000] font-sans text-[14px] font-medium">
                        Activity Name
                      </p>
                      <p className="text-[#00000066] font-sans text-[10px] font-medium">
                        12:30 AM
                      </p>
                    </NameTimeDetails>
                    <Description>
                      <p className="text-[#000000CC] font-sans text-[12px] font-normal">
                        - Any notes given by the caretaker
                      </p>
                    </Description>
                  </ActivityDetails>
                </ActivityContainer>
              </ActivityInfo>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Notes
                </p>
                <p
                  onClick={() => openModal("NoteModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Notes
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  Notes
                </p>
                <p className="text-[#000000] font-sans text-[18px] font-medium ">
                  Did a really great job sharing with the other kids today!
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Meals
                </p>
                <p
                  onClick={() => openModal("MealModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Meals
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  Breakfast
                </p>
                <p className="text-[#000000] font-sans text-[18px] font-medium ">
                  Fruits
                </p>
                <p className="text-[#000000CC] font-sans text-[14px] font-normal ">
                  -Ate all fruits
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Sleep Time
                </p>
                <p
                  onClick={() => openModal("SleepModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Sleep Time
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  10:30 AM to 11:15 AM
                </p>
                <p className="text-[#000000] font-sans text-[18px] font-medium ">
                  45 mins
                </p>
                <p className="text-[#000000CC] font-sans text-[14px] font-normal ">
                  -Any note
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Loo Breaks
                </p>
                <p
                  onClick={() => openModal("LooModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add loo break
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  11:45 AM
                </p>
                <p className="text-[#000000CC] font-sans text-[14px] font-normal ">
                  -Any note
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Mood
                </p>
                <p
                  onClick={() => openModal("MoodModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Mood
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  Happy
                </p>
                <p className="text-[#000000CC] font-sans text-[14px] font-normal ">
                  -Any note
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Medication
                </p>
                <p
                  onClick={() => openModal("MedicationModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Medication
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  12:15 PM - 25 mg
                </p>
                <p className="text-[#000000CC] font-sans text-[14px] font-normal ">
                  -Any note
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Medical Condition
                </p>
                <p
                  onClick={() => openModal("MedicalModal")}
                  className="text-[#3a70e2] font-[DM_Sans] font-normal cursor-pointer text-sm"
                >
                  + Add Medical Condition
                </p>
              </HeaderBar>

              <InfoContainer>
                <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                  Feeling Feverish
                </p>
                <p className="text-[#000000CC] font-sans text-[14px] font-normal ">
                  -Any note
                </p>
              </InfoContainer>
            </FormDetails>

            <FormDetails>
              <HeaderBar>
                <p className="text-[#00000099] font-sans text-[18px] font-medium">
                  Activities
                </p>
                <p className="text-[#3a70e2] font-sans text-[16px] font-normal cursor-pointer">
                  + Activity
                </p>
              </HeaderBar>
              <ActivityInfo>
                <ActivityContainer>
                  <ImgContainer>
                    <Image
                      src={"/svgs/daily-activity.svg"}
                      width={240}
                      height={160}
                      alt="daily activity image"
                    />
                  </ImgContainer>
                  <ActivityDetails>
                    <NameTimeDetails>
                      <p className="text-[#000000] font-sans text-[14px] font-medium">
                        Activity Name
                      </p>
                      <p className="text-[#00000066] font-sans text-[10px] font-medium">
                        12:30 AM
                      </p>
                    </NameTimeDetails>
                    <Description>
                      <p className="text-[#000000CC] font-sans text-[12px] font-normal">
                        - Any notes given by the caretaker
                      </p>
                    </Description>
                  </ActivityDetails>
                </ActivityContainer>

                <ActivityContainer>
                  <ImgContainer>
                    <Image
                      src={"/svgs/daily-activity.svg"}
                      width={240}
                      height={160}
                      alt="daily activity image"
                    />
                  </ImgContainer>
                  <ActivityDetails>
                    <NameTimeDetails>
                      <p className="text-[#000000] font-sans text-[14px] font-medium">
                        Activity Name
                      </p>
                      <p className="text-[#00000066] font-sans text-[10px] font-medium">
                        12:30 AM
                      </p>
                    </NameTimeDetails>
                    <Description>
                      <p className="text-[#000000CC] font-sans text-[12px] font-normal">
                        - Any notes given by the caretaker
                      </p>
                    </Description>
                  </ActivityDetails>
                </ActivityContainer>

                <ActivityContainer>
                  <ImgContainer>
                    <Image
                      src={"/svgs/daily-activity.svg"}
                      width={240}
                      height={160}
                      alt="daily activity image"
                    />
                  </ImgContainer>
                  <ActivityDetails>
                    <NameTimeDetails>
                      <p className="text-[#000000] font-sans text-[14px] font-medium">
                        Activity Name
                      </p>
                      <p className="text-[#00000066] font-sans text-[10px] font-medium">
                        12:30 AM
                      </p>
                    </NameTimeDetails>
                    <Description>
                      <p className="text-[#000000CC] font-sans text-[12px] font-normal">
                        - Any notes given by the caretaker
                      </p>
                    </Description>
                  </ActivityDetails>
                </ActivityContainer>
              </ActivityInfo>
            </FormDetails>
          </FormContainer>
        </ProfileDescription>
      </DailyReportContainer>
      {modalOpen && activity && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"ActivityModal"}
          >
            <Activity control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && note && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"NoteModal"}
          >
            <Note control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && meal && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"MealModal"}
          >
            <Meal control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && sleep && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"SleepModal"}
          >
            <Sleep control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && loo && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"LooModal"}
          >
            <Loo control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && mood && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"MoodModal"}
          >
            <Mood control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && medication && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"MedicationModal"}
          >
            <Medication control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && medical && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"MedicalModal"}
          >
            <Medical control={control} />
          </Modal>
        </div>
      )}

      {modalOpen && photo && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"PhotoModal"}
          >
            <Photo control={control} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Page;
