import { useState } from "react";
import { configApi } from "services/modules/configApi";
import {
  inititalCategoryFormState,
  inititalCategoryReturnState,
} from "src/constants/initialStates";
import type { CategoryReturnForm, ConfigType } from "types/globalTypes";

export function useConfigHandlers() {
  let { category } = configApi;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryReturnForm[]>(
    inititalCategoryReturnState,
  );
  const [modalTitle, setModalTitle] = useState<string>("Category");
  const [configType, setConfigType] = useState<ConfigType>();
  const [formData, setFormData] = useState(inititalCategoryFormState);
  const [initialState, setInitialState] = useState<any>({});
  const [currentID, setCurrentID] = useState<number | null>(null);

  const createData = (type: ConfigType) => {
    setConfigType(type);
    setModalOpen(true);

    if (type == "C") {
      setInitialState(inititalCategoryFormState);
    }
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    let response;
    if (configType === "C") {
      if (currentID) {
        response = await handleUpdate();
      } else response = category.create(formData);

      resetAll();
    }
  };
  const handleUpdate = async () => {
    if (!currentID) return;

    if (configType === "C") {
      const response = await category.update(currentID, formData);
      resetAll();
      return response?.data;
    }
  };
  const handleDelete = async (id: number, type: ConfigType) => {
    const action = confirm("Are you sure you want to delete this category?");
    if (!action) return;
    if (!id) return;

    if (type === "C") {
      const response = await category.delete(id);
      resetAll();
    }
  };
  const openModalOnUpdate = (id: number, type: ConfigType) => {
    const info = categoryList.find((val: any) => val?.id === id);
    if (!info) return;
    setConfigType(type);
    setModalOpen(true);
    setCurrentID(id);
    setFormData({
      title: info.title,
    });
  };

  const fetchList = async () => {
    const response = await category.all();
    setCategoryList(response);
  };

  const resetAll = () => {
    fetchList();
    setFormData(inititalCategoryFormState);
    setCurrentID(null);
    setConfigType("");
    setModalOpen(false);
  };

  return {
    createData,
    handleSubmit,
    handleUpdate,
    handleDelete,
    openModalOnUpdate,
    fetchList,
    resetAll,
    isModalOpen,
    setModalOpen,
    categoryList,
    setCategoryList,
    modalTitle,
    setModalTitle,
    configType,
    setConfigType,
    formData,
    setFormData,
    initialState,
    setInitialState,
    currentID,
    setCurrentID
  };
}
