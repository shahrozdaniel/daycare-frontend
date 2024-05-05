'use client'
import React, { useEffect, useState } from "react";
import { User, columns } from "./columns";
import AllergyTable from "./AlleryTable";
import { CircularProgress } from "@/components/common/ProgressRounded";
import { RightStatTitle } from "@/app/feesManagement/feesManagement.styles";
import { allergyOfChild } from "@/services/report";
import { alargeyColoum } from "./alargyColoum";
import { Button } from "@/components/ui/button";


const Allergies: React.FC<any> = ({ selectedOption, selectedReport }) => {
  const [alergyData, setAlergyData] = useState<any>([])
  const [childAllergy, setChildAllergy] = useState<any>([])
  const [show, setShow] = useState<boolean>(false)
  const [exportData, SetExportData] = useState<any>([])
  const getChildAllergyDetails = async () => {
    let res;
    try {
      res = await allergyOfChild()
      if (res?.success) {
        let alergeyArr: any = []
        let exportArr: any = []
        let data = res?.data
        data?.map((ele: any) => {
          alergeyArr?.push({ name: ele?.first_name + ele?.last_name,classroom_name:ele?.classroom_name, alergeyName: ele?.allergy_details?.allergies, setShow: setShow, setChildAllergy: setChildAllergy , totalData:ele })
          exportArr?.push({Name: ele?.first_name + ele?.last_name,'Classroom':ele?.classroom_name, "Allergy Name": ele?.allergy_details?.allergies,})
        })
        setAlergyData(alergeyArr)
        SetExportData(exportArr)

      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getChildAllergyDetails()
  }, [])


  return (
    <>
      {/* <RightStatTitle>
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
        </div> */}
      {/* </RightStatTitle> */}

      <div className="flex justify-between gap-[24px] flex-wrap my-5">
        <div className="flex-col gap-2  w-[262px] max-w-full shadow-tablelayoutshadow text-center justify-center align-items-center">
          <div className="text-[#4b4b4b] font-sans text-[12px] font-medium">
            Total number of children
          </div>
          <div className="text-[#4b4b4b] font-sans text-[40px] font-medium">
            {alergyData?.length}
          </div>
        </div>
      </div>

      {/* {show && <Button onClick={() => setShow(!show)}>
        {' <- back'}
      </Button>} */}
      <AllergyTable columns={alargeyColoum} data={alergyData} dataToExport={alargeyColoum} selectedOption={selectedOption} selectedReport={selectedReport} show={show} />
      {/* < AllergyTable columns={alargeyColoum} data={alergyData} dataToExport={exportData} selectedOption={selectedOption} selectedReport={selectedReport} show={show} /> */}
    </>
  );
};

export default Allergies;
