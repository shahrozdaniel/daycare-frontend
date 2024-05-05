import React, { useState } from "react";
interface TableSwitchType {
  activeTab: string;
  handleTabClick: (value: string) => void;
}
const TableSwitch: React.FC<TableSwitchType> = ({
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className=" bg-white rounded-tr-2xl rounded-tl-2xl ">
      <div className=" flex justify-between gap-3 py-3 w-full px-10">
        <div
          className={`w-[30%] flex flex-row justify-between items-center pl-2 rounded-lg  ${
            activeTab === "pending"
              ? " border-2 border-[#00858E] "
              : "border-2 border-[#E1E1E1] "
          }`}
          onClick={() => handleTabClick("pending")}
        >
          <div className={`flex w-2/5 px-4 justify-center items-center self-stretch border-r text-xl  ${
              activeTab === "pending" ? "border-[#00858E]" : "border-[#E1E1E1]"
            }`}>
            <span className="font-dm-sans text-base font-[500] text-center text-[#00858E]">
              Registered
            </span>
          </div>
          <div
            className={`flex w-3/5 justify-evenly items-center text-[12px]  rounded ${
              activeTab === "pending" ? "bg-[#EEFCFC]" : "bg-[#F5F5F5]"
            }`}
          >
            <div className="flex flex-col justify-center items-center px-4 py-1 w-[7em]">
              <div className="text-[#555353] font-[500]">Notified</div>
              <div className="text-[#00858E] font-[500]">0</div>
            </div>
            <div className={`text-2xl h-[90%] ${ activeTab === "pending"?"text-[#00858E]":"text-[#E1E1E1]"} `}>|</div>
            <div className="flex flex-col justify-center items-center px-4 py-1 w-[7em]">
              <div className="text-[#555353] font-[500]">Total</div>
              <div className="text-[#00858E] font-[500]">20</div>
            </div>
          </div>
        </div>

        <div
          className={`w-[30%] pl-2 rounded-lg flex flex-row justify-between items-center ${
            activeTab === "waitlist"
              ? " border-2 border-[#00858E] "
              : "border-2 border-[#E1E1E1]"
          }`}
          onClick={() => handleTabClick("waitlist")}
        >
          <div className={`flex w-2/5 px-4 justify-center items-center self-stretch border-r text-xl  ${
              activeTab === "waitlist" ? "border-[#00858E]" : "border-[#E1E1E1]"
            }`}>
            <span className="font-dm-sans text-base font-[500] text-center text-[#00858E]">
              Waitlist
            </span>
          </div>
          <div
            className={`flex w-3/5 justify-evenly items-center text-[12px]  rounded ${
              activeTab === "waitlist" ? "bg-[#EEFCFC]" : "bg-[#F5F5F5]"
            }`}
          >
            <div className="flex flex-col justify-center items-center px-4 py-1 w-[7em]">
              <div className="text-[#555353] font-[500]">Notified</div>
              <div className="text-[#00858E] font-[500]">0</div>
            </div>
            <div className={`text-2xl h-[90%] ${ activeTab === "waitlist"?"text-[#00858E]":"text-[#E1E1E1]"} `}>|</div>
            <div className="flex flex-col justify-center items-center px-4 py-1 w-[7em]">
              <div className="text-[#555353] font-[500]">Total</div>
              <div className="text-[#00858E] font-[500]">20</div>
            </div>
          </div>
        </div>

        <div
          className={`w-[30%] pl-2 rounded-lg flex flex-row justify-between items-center ${
            activeTab === "enrolled"
              ? " border-2 border-[#00858E] "
              : "border-2 border-[#E1E1E1]"
          }`}
          onClick={() => handleTabClick("enrolled")}
        >
          <div className={`flex w-2/5 px-4 justify-center items-center self-stretch border-r text-xl  ${
              activeTab === "enrolled" ? "border-[#00858E]" : "border-[#E1E1E1]"
            }`}>
            <span className="font-dm-sans text-base font-[500] text-center text-[#00858E]">
              Enrolled
            </span>
          </div>
          <div
            className={`flex w-3/5 justify-evenly items-center text-[12px]  rounded ${
              activeTab === "enrolled" ? "bg-[#EEFCFC]" : "bg-[#F5F5F5]"
            }`}
          >
            <div className="flex flex-col justify-center items-center px-4 py-1 w-[7em]">
              <div className="text-[#555353] font-[500]">Notified</div>
              <div className="text-[#00858E] font-[500]">0</div>
            </div>
            <div className={`text-2xl h-[90%] ${ activeTab === "enrolled"?"text-[#00858E]":"text-[#E1E1E1]"} `}>|</div>
            <div className="flex flex-col justify-center items-center px-4 py-1 w-[7em]">
              <div className="text-[#555353] font-[500]">Total</div>
              <div className="text-[#00858E] font-[500]">20</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col  w-4/12 relative my-2">
        <div
          className={`flex items-center justify-start cursor-pointer h-20  bg-white  text-2xl font-medium leading-7  border-top rounded-lg text-[#FE632F]`}
          onClick={() => handleTabClick("waitlist")}
        >
          <div className="flex flex-row justify-between items-center w-full mx-2">
            <div className="w-[33%] mb-2">
              {" "}
              <>
                <span className="px-5">Waitlist</span>
                {activeTab === "waitlist" && (
                  <hr className="absolute w-[25%]  border-2 border-[#FE632F] ml-2 mt-2" />
                )}
              </>
            </div>

            <div className="w-[67%]  rounded-[6px] border-2 border-[#EFE6C5] ">
              <div className="flex h-[52px] flex-row w-full bg-[#FFF9E4]  rounded-[6px]">
                <div className="text-center w-1/2">
                  <p className="text-[#FE632F] text-lg font-medium">0</p>
                  <p className="text-[#555353] text-sm font-bold  font-[Mulish]">
                    Parameter 1
                  </p>
                </div>
                <div className=" text-[#C5C7EF] text-2xl mt-2">|</div>
                <div className="text-center w-1/2">
                  <p className="text-[#FE632F] text-lg font-medium">20</p>
                  <p className="text-[#555353] text-sm font-bold  font-[Mulish]">
                    Parameter 2
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="flex flex-col w-4/12 relative my-2">
        <div
          className={` flex items-center justify-start cursor-pointer h-20  bg-white  text-2xl font-medium leading-7 px-3 border-top rounded-lg text-[#00858D]`}
          onClick={() => handleTabClick("enrolled")}
        >
          <div className="flex flex-row justify-between items-center w-full">
            <div className="w-2/5 mb-2">
              <>
                <span className="px-5">Enrolled</span>
                {activeTab === "enrolled" && (
                  <hr className="absolute w-[30%] ml-1 border-2 border-[#00858D] mt-2" />
                )}
              </>
            </div>

            <div className="w-3/5 h-14  rounded-[6px] border-2 border-[#C5EFD3] ">
              <div className="flex h-[52px] flex-row w-full bg-[#E4FFF0]  rounded-[6px]">
                <div className="text-center w-1/2">
                  <p className="text-[#00858D] text-lg font-medium">0</p>
                  <p className="text-[#555353] text-sm font-bold  font-[Mulish]">
                    Parameter 1
                  </p>
                </div>
                <div className=" text-[#C5C7EF] text-2xl mt-2">|</div>
                <div className="text-center w-1/2">
                  <p className="text-[#00858D] text-lg font-medium">20</p>
                  <p className="text-[#555353] text-sm font-bold  font-[Mulish]">
                    Parameter 2
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        className={`w-4/12  flex items-center justify-start cursor-pointer font-medium  bg-white ${
          activeTab === "waitlist"
            ? "border-b-2 border-solid border-[#FE632F] "
            : ""
        } my-2 text-2xl font-medium leading-7 px-5 rounded-lg text-[#FE632F]`}
        onClick={() => handleTabClick("waitlist")}
      >
        Waitlist
      </div> */}
      {/* <div
        className={`w-4/12 my-2  flex items-center justify-start cursor-pointer bg-white ${
          activeTab === "enrolled"
            ? "border-b-2 border-solid border-[#00858D]"
            : ""
        } my-2 text-2xl font-medium leading-7 px-5 rounded-lg text-[#00858D]`}
        onClick={() => handleTabClick("enrolled")}
      >
        Enrolled
      </div> */}
    </div>
  );
};

export default TableSwitch;
