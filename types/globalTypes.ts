import { type ChangeEvent, type InputHTMLAttributes } from "react";
export type RegisterFormDataTypes = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
export type RegisterFormErrorsTypes = {
    name: string | string[];
    email: string | string[];
    username: string | string[];
    password: string | string[];
    confirmPassword: string | string[];  
}
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
export interface FloatingInputErrors{
    hasError?: boolean;
    errors?: string | string[];
}
export interface FloatingLabelTypes
  extends FloatingInputTypes, FloatingInputAttr , FloatingInputErrors{
  label: string;
  isPassword?: boolean;
  customClassName?: string;
}

export interface TicketFormTypes  {
    title : string;
    description : string;
    label_id: number;
    expiration_date: string;
}

export interface TicketForm {
  id: number;
  code: string;
  title: string;
  description: string;
  expiration_date: string;
  label_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}