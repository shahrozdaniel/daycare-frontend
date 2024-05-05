"use client";

import {
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { XIcon } from "lucide-react";

interface props {
  closeModal?: any;
  data?: any;
}

const Popup: React.FC<props> = ({ closeModal, data }) => {
  return (
    <>
      <div>
        <div className="mt-5 flex justify-end mr-[15%]">
          <XIcon size="24" color="#000" onClick={closeModal} />
        </div>
        <div className="flex flex-row flex-wrap  w-[80%] mx-auto gap-4 my-5">
          {data?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex flex-col">
                <div>
                  {" "}
                  <Image
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={item.photo ? item.photo : "/svgs/no-image.svg"} // put item.photo
                    alt="user"
                    width={50}
                    height={50}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[0.95rem] text-[#4B4B4B] font-medium font-sans capitalize py-2">
                    {item?.name.split(" ")[0] || null}
                  </span>
                  {item?.certifications?.certifications?.length > 0 && (
                    <span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="capitalize text-center font-sans text-[#B42505] bg-[#FFD39F] text-[11px] font-normal leading-4  px-3 py-1 rounded-lg">
                              {item?.certifications?.certifications?.length} C
                            </p>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#FFD39F] px-3 py-2 rounded">
                            {item?.certifications?.certifications?.length ===
                            0 ? null : (
                              <div
                                className="flex flex-row gap-2 items-center "
                                key={index}
                              >
                                {item?.certifications?.certifications?.map(
                                  (item: any, index: any) => {
                                    return (
                                      <div
                                        className="bg-white text-[#4B4B4B] px-2 py-1 border rounded-lg"
                                        key={index}
                                      >
                                        {item?.certificationTypes ||
                                          item?.documentType}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Popup;
