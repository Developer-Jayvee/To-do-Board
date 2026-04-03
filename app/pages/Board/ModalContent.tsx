import "./modalContent.css";
import Modal from "components/ui/Modal";
import SelectComponent from "components/ui/Select";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BasicTicketForm } from "src/constants/initialStates";
import { type AppDispatch, type RootState } from "store";
import { createTicket, updateTicket } from "store/tickets/TicketSlice";
import type {
  ModalContentActions,
  ModalContentProps,
  InputHandler,
  TicketForm,
  EventTarget,
} from "types/globalTypes";

interface ModalBodyProps {
  handleInput: (name: string, value: string) => void;
  formData: TicketForm;
  labelOptions: { key: string; value: string }[];
}
export const ModalHeader = ({
  isUpdate,
  closeModal,
  submitModal,
}: ModalContentActions) => {
  return (
    <>
      <div className="flex">
        <button className="btn-default" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn-primary" onClick={submitModal}>
          {isUpdate ? "Update" : "Save"}{" "}
        </button>
      </div>
    </>
  );
};
export const ModalBody = ({
  formData,
  handleInput,
  labelOptions,
}: ModalBodyProps) => {
  return (
    <div className="grid grid-cols-2 p-2">
      <div className="inline--input col-span-2">
        <input
          value={formData.title}
          type="text"
          className="border-0  outline-0 text-2xl"
          placeholder="Title"
          name="title"
          onChange={(e) => handleInput("title", e.target.value)}
        />
      </div>
      <div className="inline--input">
        <label>Expiration Date</label>
        <input
          type="date"
          value={formData.expiration_date}
          onChange={(e) => handleInput("expiration_date", e.target.value)}
          name="expiration_date"
        />
      </div>
      <div className="inline--input">
        <label>Status</label>
        <input
          type="text"
          value="In-progress"
          className="ml-[10px] pl-3 bg-yellow-300 outline-0"
          readOnly
        />
      </div>
      <div className="inline--input"> &nbsp; </div>
      <div className="inline--input ">
        <label>Label</label>
        <SelectComponent
          list={labelOptions}
          defaultKey={formData.label_id}
          defaultVal="Choose a label"
          onChange={(name: string, value: string) => handleInput(name, value)}
        />
      </div>

      <div className="inline--input col-span-2 flex flex-col">
        <label className="mb-2">Description</label>
        <textarea
          className=" border border-gray-300"
          name="description"
          onChange={(e) => handleInput("description", e.target.value)}
          rows={10}
          value={formData.description}
        ></textarea>
      </div>
    </div>
  );
};

const ModalContent = ({
  currentID,
  categoryID,
  isModalOpen,
  modalDetails,
  setModalOpen,
  labelList,
}: ModalContentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [optionLabel, setOptionLabel] = useState<
  Array<{ key: string; value: string }>
  >([]);
  const [formData, setFormData] = useState<TicketForm>(BasicTicketForm);
  const handleSubmit = async () => {
    const action = confirm("Are you sure you want to proceed?");
    if (!action) return;
    const dispatchAction = currentID
      ? dispatch(updateTicket({ id: currentID, data: formData }))
      : dispatch(createTicket(formData));

    dispatchAction
      .unwrap()
      .then((result) => {
        setModalOpen(false);
      })
      .catch((error) => {
        alert("Failed to save.");
      });
  };
  const handleInputs = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const closeModal = () => {
    setModalOpen(false);
    setFormData(BasicTicketForm);
  };
  useEffect(() => {
    if (modalDetails) {
      const date = new Date(modalDetails.expiration_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setFormData({
        title: modalDetails.title,
        description: modalDetails.description,
        label_id: modalDetails.label_id,
        category_id: categoryID ,
        expiration_date: `${year}-${month}-${day}`,
      });
    }
  }, [modalDetails,categoryID]);
  useEffect(() => {
    setOptionLabel(
      labelList.map((val: any) => {
        return {
          key: val.id,
          value: val.title,
          customClass:`${val.inlineCSS} py-1 px-[25px]`
        };
      }),
    );
  }, [labelList]);
  return (
    <Modal
      size="XL"
      isModalOpen={isModalOpen}
      closeState={setModalOpen}
      header={
        <ModalHeader closeModal={closeModal} submitModal={handleSubmit} />
      }
      body={ModalBody({
        formData: formData,
        handleInput: handleInputs,
        labelOptions: optionLabel,
      })}
    />
  );
};

export default ModalContent;
