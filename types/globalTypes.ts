import { type ChangeEvent } from "react";
export type RegisterFormDataTypes = {  
    fullName : string;
    username : string;
    password : string;
    confirmPassword : string;
}

export interface FloatingInputTypes {
    inputName:string;
    setInputValue?:( e :ChangeEvent<HTMLInputElement>) => void;
}
export interface FloatingLabelTypes extends FloatingInputTypes{
    label:string;
    isPassword?:boolean;
    customClassName?: string;
    
}