import { Xmark } from "iconoir-react";
import type { Dispatch, SetStateAction } from "react";

interface ModalFormHandlers {
    setToOpen: Dispatch<SetStateAction<boolean>>;
}
interface ModalFormProps extends ModalFormHandlers {
    title: string;
}
export default function ModalForm({
    title , setToOpen
} : ModalFormProps){
    return (
        <div className="flex flex-col">
            <div className="header border-b border-gray-300 pb-2 flex justify-between items-center">
                <p className="text-lg font-semibold">Create New {title}</p>
                <Xmark className="cursor-pointer" onClick={() => setToOpen(false)}/>
            </div>
            <form className="mt-4 px-2">
                <div className="input--wrapper ">
                    <label className="font-medium block mb-2 ">Description</label>
                    <input type="text" className="border w-full py-1" placeholder="Input description" />
                </div>
                <button className="btn-primary my-2 w-full"> Submit </button>
            </form>

        </div>
    )
}