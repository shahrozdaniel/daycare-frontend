"use client";
import React from "react";
import {
  ActivityContainer,
  ActivityInfo,
  HeaderBar,
  HeaderContainer,
  HeaderDetails,
  ModuleContainer,
  ProfileDescription,
  SubscriptionContainer,
  SubscriptionManagementContainer,
} from "./subscriptionManagement.styled";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useGlobalContext } from "../context/store";

interface ChildDetailsProps {
  control: any; // or use proper type for control based on your setup
}

export default function Page() {
  const { control } = useForm<FormData>();
  const { globalHolidayList, globalSettings } = useGlobalContext();

  return (
    <>
      <SubscriptionManagementContainer
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
          margin: 0,
        }}
        className="min-h-[89%] h-full"
      >
        <SubscriptionContainer>
          <HeaderContainer>
            <div className="text-[#000000CC] font-sans text-center text-[30px] font-medium">
              Current Subscription Name
            </div>
            <HeaderDetails>
              <div>
                <div className="text-[#0000004D] font-sans text-center text-[14px] font-medium">
                  Start Date
                </div>
                <div>
                  <DatePickerComponent
                    label=""
                    name="DailyReport"
                    control={control}
                  />
                </div>
              </div>
              <div>
                <div className="text-[#0000004D] font-sans text-center text-[14px] font-medium">
                  End Date
                </div>
                <div>
                  <DatePickerComponent
                    label=""
                    name="DailyReport"
                    control={control}
                  />
                </div>
              </div>
              <div>
                <div className="text-[#0000004D] font-sans text-center text-[14px] font-medium">
                  Days Left
                </div>
                <div>45 days</div>
              </div>
            </HeaderDetails>
          </HeaderContainer>
        </SubscriptionContainer>
        <ProfileDescription className="bg-white rounded-2xl">
          <HeaderBar>
            <p className="text-[#00000099] font-sans text-[18px] font-medium">
              Modules included in subscription
            </p>
          </HeaderBar>
          <ActivityInfo className="bg-white">
            <ActivityContainer>
              <ModuleContainer>
                <Image
                  src={"/svgs/tick-icon.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
                <p className="text-[##000000D9] font-lato text-[14px] font-normal">
                  Include all of the single practice options
                </p>
              </ModuleContainer>
              <ModuleContainer>
                <Image
                  src={"/svgs/tick-icon.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
                <p className="text-[##000000D9] font-lato text-[14px] font-normal">
                  Include all of the single practice options
                </p>
              </ModuleContainer>
              <ModuleContainer>
                <Image
                  src={"/svgs/tick-icon.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
                <p className="text-[##000000D9] font-lato text-[14px] font-normal">
                  Include all of the single practice options
                </p>
              </ModuleContainer>
            </ActivityContainer>
          </ActivityInfo>

          <HeaderBar>
            <p className="text-[#00000099] font-sans text-[18px] font-medium">
              Add Ons
            </p>
          </HeaderBar>
          <ActivityInfo>
            <ActivityContainer>
              <ModuleContainer>
                <Image
                  src={"/svgs/tick-icon.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
                <p className="text-[##000000D9] font-lato text-[14px] font-normal">
                  Include all of the single practice options
                </p>
              </ModuleContainer>
              <ModuleContainer>
                <Image
                  src={"/svgs/tick-icon.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
                <p className="text-[##000000D9] font-lato text-[14px] font-normal">
                  Include all of the single practice options
                </p>
              </ModuleContainer>
              <ModuleContainer>
                <Image
                  src={"/svgs/tick-icon.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
                <p className="text-[##000000D9] font-lato text-[14px] font-normal">
                  Include all of the single practice options
                </p>
              </ModuleContainer>
            </ActivityContainer>
          </ActivityInfo>

          <HeaderBar>
            <p className="text-[#00000099] font-sans text-[18px] font-medium">
              Amount Paid
            </p>
          </HeaderBar>
          <ActivityInfo>
            <ActivityContainer className="text-[#000000] font-sans text-[18px] font-medium">
              $1200
            </ActivityContainer>
          </ActivityInfo>
        </ProfileDescription>
      </SubscriptionManagementContainer>
    </>
  );
}
