import React, { ChangeEvent, useRef } from "react";
import { useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import path from "path";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface DocumentUploadProps {
  name: string;
  label: string;
  control: any;
  className?: string;
  handleChange?: any;
}

const ImmunisationDocument: React.FC<DocumentUploadProps> = ({
  name,
  label,
  control,
  className,
  handleChange,
}) => {
  const {
    field: { onBlur, ref, onChange, value },
  } = useController({
    name,
    control,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    console.log("selectedImage?.type", selectedImage);
    let allowFile =
      selectedImage?.type === "application/pdf" ||
      selectedImage?.name.includes("docx");
    if (allowFile) {
      if (selectedImage) {
        onChange(selectedImage);
        handleChange && handleChange(selectedImage);
      }
    } else {
      toast.error("Please select a pdf or doc file");
    }
  };
  console.log(path)
  return (
    <div className={` ${className} flex items-center gap-2`}>
      <div className=" py-2  flex justify-start border  border-[#C5C5C5] bg-[#F4FBFB] rounded-md ">
        {/* <Image
          src={"/images/txt.png"}
          width={30}
          height={30}
          alt="Upload Document"
        /> */}
        <label className="pr-10 pl-2 text-base font-medium text-[#00858E] leading-6">
          {value?.name ? value?.name : value ? path.basename(decodeURIComponent(value)) : label}
        </label>
      </div>
      <button
        className="border border-[#00858E] text-[16px] font-medium leading-6 px-3 rounded-md py-2 text-[#00858E] cursor-pointer"
        type="button"
        onClick={handleButtonClick}
      >
        Browse Files
      </button>

      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        onBlur={onBlur}
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        className="hidden z-10"
      />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ImmunisationDocument;