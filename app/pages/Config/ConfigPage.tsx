import ModalForm from "components/module/Config/ModalForm";
import TableCategories from "components/module/Config/TableCategories";
import TableLabels from "components/module/Config/TableLabels";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialLabelFormState,
  inititalCategoryFormState,
} from "src/constants/initialStates";
import { useConfigHandlers } from "src/hooks/useConfigHandlers";
import { type AppDispatch, type RootState } from "store";
import { fetchTickets } from "store/tickets/TicketSlice";
import type { ConfigType } from "types/globalTypes";

export default function ConfigPage() {
  const {
    createData,
    handleSubmit,
    handleDelete,
    openModalOnUpdate,
    retrieveAllList,
    isModalOpen,
    setModalOpen,
    categoryList,
    labelList,
    modalTitle,
    setModalTitle,
    configType,
    formData,
    setFormData,
    canSubmit,
    setCanSubmit
  } = useConfigHandlers();

  const dispatch = useDispatch<AppDispatch>();

  
  useEffect(() =>{
    dispatch(fetchTickets());
  },[dispatch])


  useEffect(() => {
    retrieveAllList();
  }, []);

  useEffect( () => {
    setCanSubmit(
      formData.title.trim() !== ""
    );
  },[formData])
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
            canSubmit={canSubmit}
            title={modalTitle}
            setToOpen={setModalOpen}
            setFormInputs={setFormData}
            formInput={formData}
            onButtonSubmit={(e: SubmitEvent) => handleSubmit(e)}
          />
        }
      />
      <Loader/>
    </>
  );
}
