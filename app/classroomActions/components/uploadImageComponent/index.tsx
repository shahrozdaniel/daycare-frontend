import React, { ChangeEvent } from "react";
import { useController } from "react-hook-form";
import avatar from "../../public/images/avatar.png";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ImageUploadProps {
  control: any; // React Hook Form control object
  name: string; // Name of the form field
}

const UploadImageComponent: React.FC<ImageUploadProps> = ({
  control,
  name,
}) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    let allowFile = selectedImage?.type === 'image/png' || selectedImage?.type === 'image/jpeg'
    console.log(selectedImage?.type, allowFile)
    if (allowFile) {
      if (selectedImage) {
        onChange(selectedImage);
      }
    } else {
      toast.error('please select a png or JPEG file')
      onChange(null);
    }
  };

  return (
    <label className="text-center">
      <input
        type="file"
        onChange={handleImageChange}
        onBlur={onBlur}
        accept="image/*"
        className="hidden"
      />
      {value ? (
        <Image
          src={typeof value !== 'string' ? URL.createObjectURL(value) : value}
          alt="Preview"
          width={140}
          height={140}
          className="object-cover rounded-full mt-2"
        />
      ) : (
        <div className="w-[140px] h-[140px] bg-[linear-gradient(0deg,_#E1E1E1,_#E1E1E1),linear-gradient(0deg,_#F5F5F5,_#F5F5F5)] flex flex-col items-center justify-center border-[1px] border-[solid] border-[#E1E1E1] cursor-pointer">
          {/* Display logo */}
          <Image
            src="/svgs/avatar-icon.svg"
            alt="Logo"
            width={24}
            height={24}
            className="object-contain mb-2 "
          />
          <p className="text-blue-500 text-center font-sans font-medium text-xs leading-5">
            Upload Picture Video/Collage
          </p>
          {/* Label */}
          {/* <span className="text-sm font-semibold">Upload Picture</span> */}
          {/* Display uploaded image */}
        </div>
      )}
      <ToastContainer />
    </label>
  );
};

export default UploadImageComponent;
