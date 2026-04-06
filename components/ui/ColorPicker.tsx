import { Chrome, Compact, Sketch } from "@uiw/react-color";
import { ArrowDown, NavArrowDown } from "iconoir-react";
import { use, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { LabelForm } from "types/globalTypes";

interface ColorsTypes {
  bgColor: string;
    textColor: string;
}
interface ColorPickerProps {
  label?: string;
  defaultColors?: ColorsTypes;
  handleChange: (e: LabelForm) => void;
}
export default function ColorPicker({
  label,
  defaultColors = { bgColor: "#ffffff", textColor: "#000000" },
  handleChange,
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<Record <keyof ColorsTypes , string>>( defaultColors);
  useEffect(() => {
    handleChange({
      title: label ?? "",
      bgColor: selectedColor.bgColor,
      textColor: selectedColor.textColor,
    });

    
  }, [selectedColor]);
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="color-picker--wrapper grid grid-cols-1 gap-y-2 relative">
        <div className="color-display grid grid-cols-2 gap-3 ">
          <span
            className="rounded-full border-0 flex items-center justify-center"
            style={{
              backgroundColor: selectedColor.bgColor,
              color: selectedColor.textColor,
            }}
          >
            {label}
          </span>
          <div className="custom-input cursor-pointer">
            <span className="inline-block">{selectedColor.bgColor}</span>
            <NavArrowDown className="float-right" />
          </div>
        </div>
        <div className={`picker flex items-center justify-center`}>
          <Sketch
            className="flex-1"
            color={selectedColor.bgColor}
            onChange={(color) =>
              setSelectedColor((prev) => ({ ...prev, bgColor: color.hex }))
            }
          />
        </div>
      </div>
      <div className="color-picker--wrapper flex flex-col gap-y-2 relative">
        <div className="color-display grid grid-cols-2 gap-3 ">
          <span
            className="rounded-full border-0 flex items-center justify-center wrap-anywhere"
            style={{
              backgroundColor: selectedColor.bgColor,
              color: selectedColor.textColor,
            }}
          >
            {label}
          </span>
          <div className="custom-input cursor-pointer">
            <span className="inline-block">{selectedColor.textColor}</span>
            <NavArrowDown className="float-right" />
          </div>
        </div>
        <div className={`picker flex items-center justify-center `}>
          <Sketch
            className="flex-1"
            color={selectedColor.textColor}
            onChange={(color) =>
              setSelectedColor((prev) => ({ ...prev, textColor: color.hex }))
            }
          />
        </div>
      </div>
    </div>
  );
}
