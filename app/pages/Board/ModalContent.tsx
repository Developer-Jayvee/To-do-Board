import TicketModalBody from "components/module/Board/TicketModalBody";
import "./modalContent.css";
import Modal from "components/ui/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BasicTicketForm } from "src/constants/initialStates";
import { type AppDispatch } from "store";
import { createTicket, updateTicket } from "store/tickets/TicketSlice";
import type {
  ModalContentProps,
  TicketForm,
  ListTypes,
} from "types/globalTypes";
import TicketModalHeader from "components/module/Board/TicketModalHeader";
import { defaultDateFormat } from "utils/utilities";


const ModalContent = ({
  currentID,
  categoryID,
  isModalOpen,
  modalDetails,
  setModalOpen,
  labelList,
  categoryList,
}: ModalContentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [optionLabel, setOptionLabel] = useState<ListTypes[]>([]);
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
      setFormData({
        title: modalDetails.title,
        description: modalDetails.description,
        label_id: modalDetails.label_id,
        category_id: modalDetails.category_id,
        expiration_date: defaultDateFormat(modalDetails.expiration_date),
      });
    }
  }, [modalDetails]);

  useEffect(() => {
    setOptionLabel(
      labelList.map((val: any) => {
        return {
          key: val.id,
          value: val.title,
          style: {
            background: val.bgColor,
            color: val.textColor,
          },
        };
      }),
    );
  }, [labelList, categoryList]);

  return (
    <Modal
      size="XL"
      isModalOpen={isModalOpen}
      closeState={setModalOpen}
      header={(<TicketModalHeader closeModal={closeModal} submitModal={handleSubmit}/>)}
      body={
        <TicketModalBody
          formData={formData}
          handleInput={handleInputs}
          labelOptions={optionLabel}
        />
      }
    />
  );
};

export default ModalContent;
