import { Sketch } from "@uiw/react-color";
import ColorPicker from "components/ui/ColorPicker";
import { Xmark } from "iconoir-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { inititalCategoryFormState } from "src/constants/initialStates";
import useInputHandler from "src/hooks/useInputHandler";

interface ModalFormHandlers {
  setToOpen: Dispatch<SetStateAction<boolean>>;
  onButtonSubmit?: (e: SubmitEvent) => void;
}
interface ModalFormProps<T> extends ModalFormHandlers {
  title: string;
  canSubmit?:boolean;
  hasColorPicker ?:boolean;
  setFormInputs: Dispatch<SetStateAction<T>>;
  formInput:T;
}
export default function ModalForm<T>({
  title,
  canSubmit = false,
  hasColorPicker = false,
  setToOpen,
  setFormInputs,
  formInput,
  onButtonSubmit,
}: ModalFormProps<T>) {
  const { handleInput } = useInputHandler<T>({
    setState: setFormInputs,
  });
  
  return (
    <div className="grid grid-cols-1">
      <div className=" header border-b border-gray-300 pb-2 flex justify-between items-center">
        <p className="text-lg font-semibold">Create New {title}</p>
        <Xmark className="cursor-pointer" onClick={() => setToOpen(false)} />
      </div>
      <form className=" grid grid-cols-2 gap-x-2  gap-y-2 mt-4 px-2" onSubmit={(e) => onButtonSubmit?.(e)}>
        <div className="input--wrapper col-span-2">
          <label className="font-medium block mb-2 ">Title</label>
          <input
            type="text"
            className="border w-full py-1"
            name="title"
            placeholder="Input description"
            onChange={handleInput}
            value={formInput?.title}
          />
        </div>
        <div className={`input--wrapper col-span-2  ${hasColorPicker ? '' : 'hidden'}`}>
            <ColorPicker label={formInput?.title} defaultColors={{bgColor: formInput.bgColor , textColor: formInput.textColor}} handleChange={(val) => {
               setFormInputs((prev) => ({
                  ...prev,
                  title:val.title,
                  bgColor:val.bgColor,
                  textColor:val.textColor
               }));
            } }/>
        </div>
       
        <button
          className="col-span-2 bg-blue-700 text-white my-2 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={!canSubmit}
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}
