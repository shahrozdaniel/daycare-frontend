import React, { ChangeEvent, useRef } from "react";
import { useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DocumentUploadProps {
  name: string;
  label: string;
  control: any;
  className?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  name,
  label,
  control,
  className,
}) => {
  const {
    field: { onBlur, ref, onChange },
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
    let allowFile = selectedImage
    if (selectedImage) {
      onChange(selectedImage);
    }
  };

  return (
    <div className={`p-3 ${className} flex items-center gap-2`}>
      <Image
        src={"/images/txt.png"}
        width={30}
        height={30}
        alt="Upload Document"
        onClick={handleButtonClick}
      />
      <label className="block text-sm font-medium text-blue-b1">{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        onBlur={onBlur}
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        className="hidden"
      />
    </div>
  );
};

export default DocumentUpload;
