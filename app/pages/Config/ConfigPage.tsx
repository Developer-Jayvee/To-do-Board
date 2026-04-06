import ModalForm from "components/module/Config/ModalForm";
import TableCategories from "components/module/Config/TableCategories";
import TableLabels from "components/module/Config/TableLabels";
import Modal from "components/ui/Modal";
import { useEffect } from "react";
import {
  initialLabelFormState,
  inititalCategoryFormState,
} from "src/constants/initialStates";
import { useConfigHandlers } from "src/hooks/useConfigHandlers";
import type { ConfigType } from "types/globalTypes";

export default function ConfigPage() {
  const {
    createData,
    handleSubmit,
    handleDelete,
    openModalOnUpdate,
    fetchList,
    isModalOpen,
    setModalOpen,
    categoryList,
    labelList,
    modalTitle,
    setModalTitle,
    configType,
    formData,
    setFormData,
  } = useConfigHandlers();

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      const initState =
        configType === "C" ? inititalCategoryFormState : initialLabelFormState;
      setFormData(initState);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setModalTitle(configType == "C" ? "Category" : "Label");
  }, [configType]);

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
        <TableCategories
          onOpenModal={(type: ConfigType) => createData(type)}
          onUpdate={(id: number, type: ConfigType) =>
            openModalOnUpdate(id, type)
          }
          onDelete={(id: number, type: ConfigType) => handleDelete(id, type)}
          configList={categoryList}
        />
        <TableLabels
          onOpenModal={(type: ConfigType) => createData(type)}
          onUpdate={(id: number, type: ConfigType) =>
            openModalOnUpdate(id, type)
          }
          onDelete={(id: number, type: ConfigType) => handleDelete(id, type)}
          configList={labelList}
        />
      </div>
      <Modal
        size="M"
        isModalOpen={isModalOpen}
        closeState={setModalOpen}
        body={
          <ModalForm
            title={modalTitle}
            setToOpen={setModalOpen}
            setFormInputs={setFormData}
            formInput={formData}
            onButtonSubmit={(e: SubmitEvent) => handleSubmit(e)}
          />
        }
      />
    </>
  );
}
