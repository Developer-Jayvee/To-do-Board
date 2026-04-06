import TicketModalBody from "components/module/Board/TicketModalBody";
import "./modalContent.css"
import Modal from "components/ui/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BasicTicketForm } from "src/constants/initialStates";
import { type AppDispatch } from "store";
import { createTicket, fetchTickets, getAllTickets, updateTicket } from "store/tickets/TicketSlice";
import type {
  ModalContentProps,
  TicketForm,
  ListTypes,
} from "types/globalTypes";
import { defaultDateFormat } from "utils/utilities";
import TicketModalFooter from "components/module/Board/TicketModalFooter";
import { setLoading } from "store/module/ModuleSlice";

export default function TicketModal({
  currentID,
  isModalOpen,
  modalDetails,
  setModalOpen,
  labelList,
  categoryList,
}: ModalContentProps){
  const dispatch = useDispatch<AppDispatch>();
  const [optionLabel, setOptionLabel] = useState<ListTypes[]>([]);
  const [optionCategory, setOptionCategory] = useState<ListTypes[]>([]);
  const [formData, setFormData] = useState<TicketForm>(BasicTicketForm);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleSubmit = async () => {
    const action = confirm("Are you sure you want to proceed?");
    if (!action) return;
  
    dispatch(setLoading(true))
    const dispatchAction = currentID
      ? dispatch(updateTicket({ id: currentID, data: formData }))
      : dispatch(createTicket(formData));

    dispatchAction
      .unwrap()
      .then((result) => {
        setModalOpen(false);
        setFormData(BasicTicketForm);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        
        alert("Failed to save.");
      });
  };
  
  const handleInputs = (name: string, value: string | number) => {
    if(name === "category_id"){
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(BasicTicketForm);
  };

  
  useEffect( () => {
    const copiedData = {...formData};
    delete copiedData.id;
    setCanSubmit(
      Object.values( copiedData).find( (val : any) => val === "" || val === 0) === undefined
    ) 
  
  },[formData])

  useEffect(() => {
    if (modalDetails) {
      setFormData({
        id: modalDetails.id,
        title: modalDetails.title,
        description: modalDetails.description,
        label_id: modalDetails.label_id,
        category_id: modalDetails.category_id,
        expiration_date: defaultDateFormat(modalDetails.expiration_date),
      });
    }else setCanSubmit(true)
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
    setOptionCategory(
      categoryList.map((val: any) => {
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
      size="L"
      isModalOpen={isModalOpen}
      closeState={setModalOpen}
      header={modalDetails?.title !== "" ? ( 
        <div className="flex justify-start ">
            <p className="font-medium text-2xl py-2 pl-2">{modalDetails?.title}</p>
        </div>
      ) : null}
      footer={(<TicketModalFooter canSubmit={canSubmit} closeModal={closeModal} submitModal={handleSubmit}/>)}
      body={
        <TicketModalBody
          formData={formData}
          handleInput={handleInputs}
          labelOptions={optionLabel}
          categoryOptions={optionCategory}
        />
      }
    />
  );
};
