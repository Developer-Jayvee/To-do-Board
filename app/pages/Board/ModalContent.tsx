import "./modalContent.css"
import Modal from "components/ui/Modal"
import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { boardApi } from "services/modules/boardApi";
import { BasicTicketForm } from "src/constants/initialStates";
import { type AppDispatch } from "store";
import { fetchTickets } from "store/tickets/TicketSlice";
import type { TicketFormTypes } from "types/globalTypes";


interface ModalContentActions {
    submitModal ?: (e : FormEvent) => void;
    closeModal ?: () => void;
}
interface ModalContentProps extends ModalContentActions{
    isModalOpen : boolean;
    modalDetails? : TicketFormTypes;
    setModalOpen : Dispatch<SetStateAction<boolean>>;
}
type InputHandler = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
export const ModalHeader = ({
    closeModal,
    submitModal
} : ModalContentActions) => {
    return (
        <>
            <div className="flex">
                <button className="btn-default" onClick={closeModal}>Cancel</button>
                <button className="btn-primary" onClick={submitModal}>Save</button>
            </div>
        </>
    )
}
export const ModalBody = (handleInput : InputHandler,formData : TicketFormTypes) => {
    return (
        <div className="grid grid-cols-2 p-2">
            <div className="inline--input col-span-2">
                <input value={formData.title} type="text" className="border-0  outline-0 text-2xl" placeholder="Title" name="title" onChange={handleInput}/>
            </div>
            <div className="inline--input">
                <label>Expiration Date</label>
                <input type="date" value={formData.expiration_date} onChange={handleInput} name="expiration_date"/>
            </div>
            <div className="inline--input">
                <label>Status</label>
                <input type="text" value="In-progress"  className="ml-[10px] pl-3 bg-yellow-300 outline-0" readOnly/>
            </div>
            <div className="inline--input">  &nbsp;  </div>
            <div className="inline--input ">
                <label>Tag</label>
                <select name="label_id" onChange={handleInput} required>
                    <option>Select tag</option>
                    <option value={1} selected={formData.label_id === 1}>Bug</option>
                </select>
            </div>

            <div className="inline--input col-span-2 flex flex-col">
                <label className="mb-2">Description</label>
                <textarea className=" border border-gray-300" name="description" onChange={handleInput} rows={10} value={formData.description}></textarea>
            </div>
        </div>
    )
}

const ModalContent = ({
    isModalOpen,
    modalDetails,
    setModalOpen
}: ModalContentProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData , setFormData]  = useState<TicketFormTypes>(BasicTicketForm)
    const handleSubmit = async () => {
        const action = confirm("Are you sure you want to proceed?");
        if(!action) return;
        const response = await boardApi.create(formData);
        if(response){
            dispatch(fetchTickets());
            setModalOpen(false);
        }
    }
    const handleInputs = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
        const { name , value } = e.target;
        setFormData(
            (prev) => ({
                ...prev,
                [name]:value
            })
        )
    }
    const closeModal = () => {
        setModalOpen(false);
        setFormData(BasicTicketForm);
    }
    useEffect( () => {
        if(modalDetails){
            setFormData({
                title: modalDetails.title,
                description: modalDetails.description,
                label_id:modalDetails.label_id,
                expiration_date: modalDetails.expiration_date
            });
        }
    },[modalDetails])
    return <Modal
            size="XL"
            isModalOpen={isModalOpen}
            closeState={setModalOpen}
            header={<ModalHeader closeModal={closeModal} submitModal={handleSubmit}/>}
            body={ModalBody(handleInputs,formData)}
            />
}



export default ModalContent;