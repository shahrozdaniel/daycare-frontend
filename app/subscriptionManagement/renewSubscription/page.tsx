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
} from "../subscriptionManagement.styled";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ChildDetailsProps {
  control: any; // or use proper type for control based on your setup
}

export default function Page() {
  const { control } = useForm<FormData>();

  return (
    <>
      <SubscriptionManagementContainer>
        <ProfileDescription>
          <HeaderBar>
            <p className="text-[#00000099] font-sans text-[18px] font-medium">
              Modules with plan
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
              Add On Included
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
              Add on
            </p>
          </HeaderBar>
          <ActivityInfo>
            <ActivityContainer>
              <div className="flex items-center space-x-2 p-4 bg-input_bg rounded-[20px] mb-4">
                <div className="flex-shrink-0">
                  <Checkbox id="terms" />
                </div>
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                >
                  Outpatient Workflows​
                </label>
              </div>

              <div className="flex items-center space-x-2 p-4 bg-input_bg rounded-[20px] mb-4">
                <div className="flex-shrink-0">
                  <Checkbox id="terms" />
                </div>
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                >
                  Outpatient Workflows​
                </label>
              </div>

              <div className="flex items-center space-x-2 p-4 bg-input_bg rounded-[20px] mb-4">
                <div className="flex-shrink-0">
                  <Checkbox id="terms" />
                </div>
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                >
                  Outpatient Workflows​
                </label>
              </div>
            </ActivityContainer>
          </ActivityInfo>
        </ProfileDescription>
        <SubscriptionContainer>
          <HeaderContainer>
            <div className="text-[#000000CC] font-sans text-center text-[30px] font-medium">
              Amount
            </div>
            <HeaderDetails>
              <div className="text-center">
                <div className="text-[#0000004D] font-sans text-center text-[14px] font-medium">
                  Add on Amount
                </div>
                <div>$1200</div>
              </div>

              <div className="text-center">
                <div className="text-[#0000004D] font-sans text-center text-[14px] font-medium">
                  Sub Total
                </div>
                <div>$1200</div>
              </div>

              <div className="text-center">
                <div className="text-[#0000004D] font-sans text-center text-[14px] font-medium">
                  Tax
                </div>
                <div>$1200</div>
              </div>

              <div className="text-center">
                <div className="text-[#0000004D] font-sans text-center text-[18px] font-medium">
                  Total Amount
                </div>
                <div>$1200</div>
              </div>

              <Button className="bg-[#00858E]">Pay & Renew</Button>
            </HeaderDetails>
          </HeaderContainer>
        </SubscriptionContainer>
      </SubscriptionManagementContainer>
    </>
  );
}
