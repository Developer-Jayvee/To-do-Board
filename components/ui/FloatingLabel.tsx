import { Eye , EyeClosed } from "iconoir-react";
import "../../src/styles/floatingLabel.css"
import { useEffect, useState } from "react";


interface FloatingLabelTypes {
    label:string;
    isPassword?:boolean;
}
export default function FloatingLabel({
    label, isPassword = false
} : FloatingLabelTypes) {

    const [isEyeOpen, setIsEyeOpen] = useState(false);
    if(isPassword){
        return (
             <div className="input--wrapper flex flex-col relative">
                <label>&nbsp;</label>
                <input type={isEyeOpen ? "text" : "password"} placeholder=" " />
                <label className="font-light text-sm absolute">{label}</label>
                <EyeClosed onClick={() => setIsEyeOpen(true) } className={`absolute cursor-pointer bottom-0 right-0 ${isEyeOpen ? 'hidden' : 'block'}`} />
                <Eye onClick={() => setIsEyeOpen(false) } className={`absolute cursor-pointer bottom-0 right-0 ${isEyeOpen ? 'block' : 'hidden'}`} />
            </div>
        )
    }
    return (
        <div className="input--wrapper flex flex-col relative">
            <label>&nbsp;</label>
            <input type="text" placeholder=" " />
            <label className="font-light text-sm absolute">{label}</label>
        </div>
    )
}