import { type ChangeEvent, type InputHTMLAttributes } from "react";
export type RegisterFormDataTypes = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
export interface LoginFormData {
  username: string;
  password: string;
}

export interface FloatingInputTypes {
  inputName: string;
  setInputValue?: (e: ChangeEvent<HTMLInputElement>) => void;
  validateInput?: (value: string) => boolean;
}
export interface FloatingInputAttr {
  attr?: InputHTMLAttributes<HTMLInputElement>;
}
export interface FloatingLabelTypes
  extends FloatingInputTypes, FloatingInputAttr {
  label: string;
  isPassword?: boolean;
  customClassName?: string;
}
