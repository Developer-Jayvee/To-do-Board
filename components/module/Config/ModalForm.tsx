import { Sketch } from "@uiw/react-color";
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
  setFormInputs: Dispatch<SetStateAction<T>>;
  formInput:T;
}
export default function ModalForm<T>({
  title,
  canSubmit = false,
  setToOpen,
  setFormInputs,
  formInput,
  onButtonSubmit,
}: ModalFormProps<T>) {
  const { handleInput } = useInputHandler<T>({
    setState: setFormInputs,
  });

  return (
    <div className="flex flex-col">
      <div className="header border-b border-gray-300 pb-2 flex justify-between items-center">
        <p className="text-lg font-semibold">Create New {title}</p>
        <Xmark className="cursor-pointer" onClick={() => setToOpen(false)} />
      </div>
      <form className="mt-4 px-2" onSubmit={(e) => onButtonSubmit?.(e)}>
        <div className="input--wrapper ">
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
        <div className="input--wrapper ">
          <label className="font-medium block mb-2 ">Color</label>
        </div>
        <button
          className=" bg-blue-700 text-white my-2 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={!canSubmit}
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}
