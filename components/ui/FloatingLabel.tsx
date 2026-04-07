import { Eye, EyeClosed } from "iconoir-react";
import "../../src/styles/floatingLabel.css";
import { useEffect, useState, type ChangeEvent } from "react";
import type { FloatingLabelTypes, FloatingInputAttr } from "types/globalTypes";

export default function FloatingLabel({
  label,
  currentValue,
  isPassword = false,
  customClassName = "",
  inputName,
  setInputValue,
  validateInput,
  attr,
  hasError = false,
  errors = "",
}: FloatingLabelTypes) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  if (isPassword) {
    return (
      <div
        className={`input--wrapper flex flex-col relative ${customClassName}`}
      >
        <label>&nbsp;</label>

        <input
          type={isEyeOpen ? "text" : "password"}
          placeholder=" "
          name={inputName}
          value={currentValue ?? ""}
          onChange={(e) => {
            setInputValue?.(e);
            validateInput?.(e.target.value);
          }}
          {...attr}
        />

        <label className="font-light text-sm absolute">{label}</label>

        <EyeClosed
          onClick={() => setIsEyeOpen(true)}
          className={`z-3 absolute cursor-pointer bottom-0 right-0 ${isEyeOpen ? "hidden" : "block"}`}
        />

        <Eye
          onClick={() => setIsEyeOpen(false)}
          className={`z-3 absolute cursor-pointer bottom-0 right-0 ${isEyeOpen ? "block" : "hidden"}`}
        />
        {hasError && (
          <span className="text-red-500 text-sm mt-1">
            {typeof errors === "string" ? errors : errors.join(",")}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className={`input--wrapper flex flex-col relative ${customClassName}`}>
      <label>&nbsp;</label>

      <input
        type="text"
        placeholder=" "
        name={inputName}
        value={currentValue ?? ""}
        onChange={(e) => {
          setInputValue?.(e);
          validateInput?.(e.target.value);
        }}
        {...attr}
      />

      <label className="font-light text-sm absolute">{label}</label>
       {hasError && (
          <span className="text-red-500 text-sm mt-1">
            {typeof errors === "string" ? errors : errors.join(", ")}
          </span>
        )}
    </div>
  );
}
