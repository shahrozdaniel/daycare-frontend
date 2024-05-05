import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

interface DocumentUploadProps {
  name: string;
  label: string;
  className?: string;
  handleChange?: any;
  value?: any;
  required?: boolean;
}

const Document: React.FC<DocumentUploadProps> = ({
  name,
  label,
  className,
  handleChange,
  value,
  required
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<any>();
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const selectedImage = event.target.files[0];
      let allowFile = selectedImage?.type === "application/pdf";

      if (allowFile) {
        if (selectedImage) {
          setFileName(selectedImage);
          handleChange && handleChange(selectedImage);
        }
      } else {
        toast.error("Please select a pdf file");
      }
    }
  };

  return (
    <>
      <div className={` ${className} flex items-center gap-2`}>
        <div className=" py-3  flex justify-start border  border-[#C5C5C5] bg-[#F4FBFB] rounded-md ">
          <label className="pr-10 pl-2 text-base font-medium text-[#00858E] leading-6">
            {fileName && fileName.name ? fileName.name : label}
            {required && <span style={{ color: "red" }}> *</span>}
          </label>
        </div>
        <button
          type="button"
          className="border border-[#00858E] text-[16px] font-medium leading-6 px-3 rounded-md py-3 text-[#00858E] cursor-pointer"
          onClick={handleButtonClick}
        >
          Browse Files
        </button>

        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          ref={(e) => {
            fileInputRef.current = e;
          }}
          className="hidden z-10"
        />
        <br />

      </div>
      <div className="text-left">
        <span style={{ color: "black" }}>Please select a pdf file</span>
      </div>
      <ToastContainer />
    </>
  );
};

export default Document;
