import type { CategoryReturnForm } from "types/globalTypes";

export const BasicTicketForm = {
  title: "",
  description: "",
  label_id: 0,
  category_id:0,
  expiration_date: "",
  created_by: 1
};
export const inititalCategoryReturnState: CategoryReturnForm[] = [
  {
    id: 0,
    code: "",
    title: "",
    sort: 0,
    tickets:[],
    created_by: 0,
    created_at: "",
    updated_at: "",
  },
];
export const inititalCategoryFormState = {
  title: "",
};
export const initialLabelReturnState = inititalCategoryReturnState;
export const initialLabelFormState = inititalCategoryFormState;
