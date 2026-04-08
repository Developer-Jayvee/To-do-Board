import TicketModalBody from "components/module/Board/TicketModalBody";
import "./modalContent.css";
import Modal from "components/ui/Modal";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BasicTicketForm } from "src/constants/initialStates";
import { type AppDispatch, type RootState } from "store";
import {
  createTicket,
  fetchTickets,
  getAllTickets,
  updateTicket,
} from "store/tickets/TicketSlice";
import type {
  ModalContentProps,
  TicketForm,
  ListTypes,
} from "types/globalTypes";
import { defaultDateFormat } from "utils/utilities";
import TicketModalFooter from "components/module/Board/TicketModalFooter";
import Swal from "sweetalert2";
import { DESCRIPTION_NAME } from "src/constants";
export default function TicketModal({
  currentID,
  isModalOpen,
  modalDetails,
  setModalOpen,
  labelList,
  categoryList,
}: ModalContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.ticket);
  const [optionLabel, setOptionLabel] = useState<ListTypes[]>([]);
  const [optionCategory, setOptionCategory] = useState<ListTypes[]>([]);
  const [formData, setFormData] = useState<TicketForm>(BasicTicketForm);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleSubmit = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to proceed",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dispatchAction = currentID
          ? dispatch(updateTicket({ id: currentID, data: formData }))
          : dispatch(createTicket(formData));

        Swal.fire({
          icon: "success",
          title: "Successfully saved",
          timer: 1000,
        }).then(() => {
         
          dispatchAction
            .unwrap()
            .then(() => {
              setModalOpen(false);
              removeFromStorage()
              setFormData(BasicTicketForm);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error occured while saving",
              });
            });
        });
      }
    });
  };

  const handleInputs = (name: string, value: string | number) => {
    if (name === "category_id") {
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    if (
      formData.category_id ||
      formData.description !== "" ||
      formData.label_id ||
      formData.title !== ""
    ) {
      Swal.fire({
        title: "Are you sure you want to leave?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          setModalOpen(false);
          setFormData(BasicTicketForm);
          removeFromStorage();
        }
      });
    } else {
      setModalOpen(false);
      setFormData(BasicTicketForm);
      removeFromStorage();
    }
    
  };
  const saveToStorage = () => {
    const localName = currentID || DESCRIPTION_NAME
    if(formData.description === ""){
      return removeFromStorage()
    }
    const desc = formData.description;
    localStorage.setItem(localName as string ,desc);
  }
  const removeFromStorage = () => {
    const localName = currentID || DESCRIPTION_NAME
    if(localStorage.getItem(localName as string)){
      localStorage.removeItem(localName as string);
    }
  }
  useEffect(() => {
    const copiedData = { ...formData };
    delete copiedData.id;
    setCanSubmit(
      Object.values(copiedData).find((val: any) => val === "" || val === 0) ===
        undefined,
    );
      setTimeout( () => {
        saveToStorage();
      },2000)
  }, [formData]);
  
 
 
  useEffect(() => {
    const description =localStorage.getItem(DESCRIPTION_NAME);
    if (modalDetails?.id) {
      setFormData({
        id: modalDetails.id,
        title: modalDetails.title,
        description: description ?? modalDetails.description,
        label_id: modalDetails.label_id,
        category_id: modalDetails.category_id,
        expiration_date: defaultDateFormat(modalDetails.expiration_date),
      });
    } else {
      if(description){
        setFormData( (prev) => ({ ...prev , description: description}))
      }
      setCanSubmit(true);
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
      header={
        modalDetails?.title !== "" ? (
          <div className="flex justify-start ">
            <p className="font-medium text-2xl py-2 pl-2">
              {modalDetails?.title}
            </p>
          </div>
        ) : null
      }
      footer={
        <TicketModalFooter
          canSubmit={canSubmit}
          closeModal={closeModal}
          submitModal={handleSubmit}
        />
      }
      body={
        <TicketModalBody
          isModalOpen={isModalOpen}
          formData={formData}
          handleInput={handleInputs}
          labelOptions={optionLabel}
          categoryOptions={optionCategory}
        />
      }
    />
  );
}
