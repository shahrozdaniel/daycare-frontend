import React, { ChangeEvent, useRef } from "react";
import { useController } from "react-hook-form";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";

interface ImageUploadProps {
  control?: any;
  name: string;
  disabled?: boolean;
  onSelect?: any;
  error?: any;
  editButton?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  control,
  name,
  disabled,
  onSelect,
  error,
  editButton,
}) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });
  const fileInputRef = useRef<any>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedImage = event.target.files[0];
    let allowImage =
      selectedImage?.type == "image/png" || selectedImage?.type == "image/jpeg";
    if (allowImage) {
      if (selectedImage) {
        onChange(selectedImage);
        onSelect && onSelect(selectedImage);
      }
    } else {
      toast.error("Please select a png or JPEG file ");
      onChange(null);
    }
  };

console.log('fileInputRef',fileInputRef?.current?.value)
  return (
    <label className="flex flex-col justify-center items-center text-center" >
      <input
        type="file"
        onChange={handleImageChange}
        onBlur={onBlur}
        accept=".png, .jpg, .jpeg"
        className="hidden"
        disabled={disabled}
        ref={fileInputRef}
        />
      <div
        className={`w-[8.75rem] h-[8.75rem] rounded-full bg-[#F4FBFB] flex flex-col items-center justify-center border-[1px] border-[solid] border-[#D3E4E6] cursor-pointer ${
          error ? "border-[red]" : "border-[#D3E4E6]"
        }`}
      >
        {/* Display logo */}

        {/* Label */}
        {/* Display uploaded image */}

        {value ? (
          <Image
            src={typeof value !== "string" ? URL.createObjectURL(value) : value}
            alt="Preview"
            width={100}
            height={100}
            className="w-full h-full object-fit rounded-full"
          />
        ) : (
          <>
            <Image
              src={"/svgs/User.svg"}
              alt="Logo"
              width={30}
              height={30}
              className="w-[1.5rem] h-[1.5rem] object-contain mb-2 "
            />
            <span className="text-center font-dm-sans text-[#00858E] text-[0.75rem] font-medium">
              Upload Picture
            </span>
          </>
        )}
      </div>
      <div>
        <span style={{ color: "black", fontSize: "10px" }}>
          File type should be PNG & JPEG
        </span>
        <br />
        <span style={{ color: "black", fontSize: "10px" }}>
          File size should not be more than 1 MB
        </span>
      </div>

      {error && (
        <p className="text-red-500 text-sm  mt-3">{error.message || error}</p>
      )}
      {editButton && value && (
        <div className="flex gap-3 py-2">
          <Button
            type="button"
          
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >Edit</Button>
          <Button
            type="button"
           
            onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
              event.preventDefault(); // Prevent event from propagating
              onChange(null);
              // fileInputRef?.current?.value?.reset();
              fileInputRef.current.value = null;
            }}
          >Remove</Button>
        </div>
      )}

      <ToastContainer />
    </label>
  );
};

export default ImageUpload;
