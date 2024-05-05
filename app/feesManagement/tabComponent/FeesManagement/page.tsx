"use client";
import React, { useState } from "react";
import {
  DropdownContainer,
  FeesDetails,
  FeesManagementContainer,
  LeftStatTitle,
  LoaderFeesContainer,
  RightStatTitle,
} from "../../feesManagement.styles";
import SwitchFees from "@/components/common/SwitchFees";
import CustomSelect from "@/components/common/CustomSelect";
import { Progress } from "@/components/common/Progress";
import { CircularProgress } from "@/components/common/ProgressRounded";
import { useForm } from "react-hook-form";
import Image from "next/image";

const FeesManagement: React.FC = () => {
  const { control } = useForm<FormData>();

  return (
    <>
      <FeesManagementContainer>
        <FeesDetails>
          <DropdownContainer>
            <CustomSelect
              className=" placeholder:text-[black]"
              name="Novembar"
              label=" Novembar"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </DropdownContainer>
          <div className="flex flex-wrap gap-5 m-3 mb-4">
            <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#E4F2FF] ">
              <div className="flex flex-col items-center ">
                <div className="w-[24px] h-[24px] rounded-full bg-blue-500 flex items-center justify-center">
                  <Image
                    src={"/svgs/info-icon.svg"}
                    width={14}
                    height={14}
                    alt=""
                  />
                </div>
                <p className="text-blue-500 text-center font-dm-sans text-xs font-medium">
                  Stat 01
                </p>
              </div>
              <div className="border-[2px] border-solid border-[#3B82F6] h-full"></div>
              <p className="text-blue-500 text-center font-sans text-4xl font-medium leading-[38px]">
                50
              </p>
            </div>

            <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#E5F5EC] ">
              <div className="flex flex-col items-center ">
                <div className="w-[24px] h-[24px] rounded-full bg-[#47B881] flex items-center justify-center">
                  <Image
                    src={"/svgs/success-icon.svg"}
                    width={14}
                    height={14}
                    alt=""
                  />
                </div>
                <p className="text-[#47B881] text-center font-dm-sans text-xs font-medium">
                  Stat 02
                </p>
              </div>
              <div className="border-[2px] border-solid border-[#47B881] h-full"></div>
              <p className="text-[#47B881] text-center font-sans text-4xl font-medium leading-[38px]">
                50
              </p>
            </div>

            <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#FFF7E1] ">
              <div className="flex flex-col items-center ">
                <div className="w-[24px] h-[24px] rounded-full bg-[#FFAD0D] flex items-center justify-center">
                  <Image
                    src={"/svgs/time-icon.svg"}
                    width={14}
                    height={14}
                    alt=""
                  />
                </div>
                <p className="text-[#FFAD0D] text-center font-dm-sans text-xs font-medium">
                  Stat 03
                </p>
              </div>
              <div className="border-[2px] border-solid border-[#FFAD0D] h-full"></div>
              <p className="text-[#FFAD0D] text-center font-sans text-4xl font-medium leading-[38px]">
                50
              </p>
            </div>

            <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#FFEBEE] ">
              <div className="flex flex-col items-center ">
                <div className="w-[24px] h-[24px] rounded-full bg-[#FFEBEE] flex items-center justify-center">
                  <Image
                    src={"/svgs/time-icon-pink.svg"}
                    width={14}
                    height={14}
                    alt=""
                  />
                </div>
                <p className="text-[#f64c4c] text-center font-dm-sans text-xs font-medium">
                  Stat 03
                </p>
              </div>
              <div className="border-[2px] border-solid border-[#f64c4c] h-full"></div>
              <p className="text-[#f64c4c] text-center font-sans text-4xl font-medium leading-[38px]">
                50
              </p>
            </div>

            <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#FFEBEE] ">
              <div className="flex flex-col items-center ">
                <div className="w-[24px] h-[24px] rounded-full bg-[#FFEBEE] flex items-center justify-center">
                  <Image
                    src={"/svgs/time-icon-pink.svg"}
                    width={14}
                    height={14}
                    alt=""
                  />
                </div>
                <p className="text-[#f64c4c] text-center font-dm-sans text-xs font-medium">
                  Stat 03
                </p>
              </div>
              <div className="border-[2px] border-solid border-[#f64c4c] h-full"></div>
              <p className="text-[#f64c4c] text-center font-sans text-4xl font-medium leading-[38px]">
                50
              </p>
            </div>
          </div>
          <LoaderFeesContainer>
            <LeftStatTitle>
              <div className="text-[#000] font-sans text-[22px] font-medium">
                Stat Title
              </div>
              <div>
                <div>Stat</div>
                <Progress indicatorColor="bg-[#FFB200]" value={33} />
              </div>
              <div>
                <div>Stat</div>
                <Progress indicatorColor="bg-[#4339F2]" value={93} />
              </div>
              <div>
                <div>Stat</div>
                <Progress indicatorColor="bg-[#02A0FC]" value={43} />
              </div>
              <div>
                <div>Stat</div>
                <Progress indicatorColor="bg-[#FF3A29]" value={13} />
              </div>
            </LeftStatTitle>
            <RightStatTitle>
              <div className="text-[#000] font-sans text-[22px] font-medium">
                Stat Title
              </div>
              <div className="flex gap-[8px] justify-between">
                <div>
                  <div>Stat</div>
                  <CircularProgress indicatorColor="#FFB200" value={33} />
                </div>
                <div>
                  <div>Stat</div>
                  <CircularProgress indicatorColor="#4339F2" value={63} />
                </div>
                <div>
                  <div>Stat</div>
                  <CircularProgress indicatorColor="#02A0FC" value={23} />
                </div>
                <div>
                  <div>Stat</div>
                  <CircularProgress indicatorColor="#FF3A29" value={18} />
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </div>
            </RightStatTitle>
          </LoaderFeesContainer>
        </FeesDetails>
      </FeesManagementContainer>
    </>
  );
};

export default FeesManagement;
