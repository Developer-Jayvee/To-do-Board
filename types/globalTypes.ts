import { type ChangeEvent, type Dispatch, type DragEvent, type FormEvent, type InputHTMLAttributes, type SetStateAction } from "react";
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
export interface TimeStamps {
  created_at ?:string;
  updated_at?:string;
}

export interface TicketFormTypes  {
    id ?: number;
    code ?: string;
    title : string;
    description : string;
    label_id: number;
    category_id ?: number;
    expiration_date: string;
    created_by ?: number;
}
export interface TicketForm extends TimeStamps {
  id ?: number;
  code ?: string;
  title: string;
  description: string;
  expiration_date: string;
  label_id: number;
  label?: LabelReturnForm;
  category?: CategoryReturnForm;
  category_id ?: number;
  created_by ?: number;
}
export interface CategoryReturnForm extends TimeStamps {
  id:number;
  code:string;
  title:string;
  sort:number;
  created_by:number;
  tickets: TicketForm[]
}

export type TicketFormPartial = Partial<TicketFormTypes>


export interface ModalContentActions {
    isUpdate? : boolean;
    submitModal ?: (e : FormEvent) => void;
    closeModal ?: () => void;
}
export interface ModalContentProps extends ModalContentActions{
    currentID ?: number | null;
    categoryID ?: number;
    isModalOpen : boolean;
    modalDetails? : TicketFormTypes;
    labelList : LabelReturnForm[];
    categoryList : CategoryReturnForm[];
    setModalOpen : Dispatch<SetStateAction<boolean>>;
}
export type InputHandler = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;


export interface CategoryReturnForm extends Partial<TimeStamps> {
  id:number;
  code : string;
  title: string;
  sort: number;
  bgColor?: string;
  textColor?: string;
  created_by:number;
}
export interface CategoryForm {
  title: string;
  bgColor?:string;
  textColor?: string;
}
export type ConfigType = "C" | "L" | "";

export type LabelReturnForm = CategoryReturnForm;
export type LabelForm = CategoryForm;


export interface TableCategoriesHandlers {
    onOpenModal?: (type: ConfigType) => void;
    create?: (data: CategoryForm) => void;
    onUpdate?: (id: number , type : ConfigType) => void;
    onDelete?: (id: number , type : ConfigType) => void;
}
export interface TableCategoriesProps extends TableCategoriesHandlers {
    configList: CategoryReturnForm[];
}

export type TableLabelHandlers = TableCategoriesHandlers;
export type TableLabelsProps = TableCategoriesProps
export interface ProgressProps {
  previous:number;
  next: number;
}
export type ProgressFormData = {
  formData : ProgressProps;
  id: number;
}
export interface DragAndDropHandlers{
    dragOver?: (e: DragEvent<HTMLDivElement>) => void;
    dropOver?: (e: DragEvent<HTMLDivElement>) => void;
    dragEnter?: (e: DragEvent<HTMLDivElement>) => void;
    dragEnd?: (e: DragEvent<HTMLDivElement>) => void;
    dragLeave?: (e: DragEvent<HTMLDivElement>) => void;
}
export type EventTarget = {
    name:string;
    value:string;
}

export type ListTypes = {
  key: string;
  value: string;
  style: {
    background: string;
    color: string;
  };
};

export interface ModalBodyProps {
  handleInput: (name: string, value: string) => void;
  formData: TicketForm;
  labelOptions: { key: string; value: string }[];
  categoryOptions: { key: string; value: string }[];
}