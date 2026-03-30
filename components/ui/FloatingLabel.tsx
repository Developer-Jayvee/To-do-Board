import { Eye , EyeClosed } from "iconoir-react";
import "../../src/styles/floatingLabel.css"
import { useEffect, useState, type ChangeEvent } from "react";
import type { FloatingLabelTypes } from "types/globalTypes";

export default function FloatingLabel({
    label, isPassword = false , customClassName = "", inputName, setInputValue
} : FloatingLabelTypes) {

    const [isEyeOpen, setIsEyeOpen] = useState(false);
    if(isPassword){
        return (
             <div className={`input--wrapper flex flex-col relative ${customClassName}`}>
                <label>&nbsp;</label>
                <input type={isEyeOpen ? "text" : "password"} placeholder=" " name={inputName}  onChange={(e) => setInputValue?.(e)} />
                <label className="font-light text-sm absolute">{label}</label>
                <EyeClosed onClick={() => setIsEyeOpen(true) } className={`z-3 absolute cursor-pointer bottom-0 right-0 ${isEyeOpen ? 'hidden' : 'block'}`} />
                <Eye onClick={() => setIsEyeOpen(false) } className={`z-3 absolute cursor-pointer bottom-0 right-0 ${isEyeOpen ? 'block' : 'hidden'}`} />
            </div>
        )
    }
    return (
        <div className={`input--wrapper flex flex-col relative ${customClassName}`}>
            <label>&nbsp;</label>
            <input type="text" placeholder=" " name={inputName}  onChange={(e) => setInputValue?.(e)} />
            <label className="font-light text-sm absolute">{label}</label>
        </div>
    )
}