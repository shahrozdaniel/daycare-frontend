import * as React from "react";
import { SketchPicker, ColorResult, RGBColor } from "react-color";
import Modal from "./Modal";
import Button from "@/components/common/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

interface ColorSelectionModalProps {
  open: boolean;
  handleClose: () => void;
  handleSelection: () => void;
  setSketchPickerColor: (color: RGBColor) => void;
  sketchPickerColor: RGBColor;
}
const ColorSelectionModal: React.FC<ColorSelectionModalProps> = ({
  open,
  handleClose,
  handleSelection,
  setSketchPickerColor,
  sketchPickerColor,
}) => {
  return (
    <Modal modalOpen={open} closeModal={handleClose} modalName={"ColorPicker"} className>
      <p className="my-4 text-center">Color Picker:</p>
      <SketchPicker
        onChangeComplete={(color: ColorResult) => {
          setSketchPickerColor(color.rgb);
        }}
        className="w-full mx-auto"
        color={sketchPickerColor}
      />
      <div className="flex gap-4 mx-auto w-fit mt-10 mb-4">
        <Button type="button" form="white" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="button" form="blue" onClick={handleSelection}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default ColorSelectionModal;
