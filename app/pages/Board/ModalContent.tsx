import "./modalContent.css"
import Modal from "components/ui/Modal"
import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { boardApi } from "services/modules/boardApi";
import { type AppDispatch } from "store";
import { fetchTickets } from "store/tickets/TicketSlice";
import type { TicketFormTypes } from "types/globalTypes";


interface ModalContentActions {
    closeModal : Dispatch<SetStateAction<boolean>>;
    submitModal ?: (e : FormEvent) => void;
}
interface ModalContentProps extends ModalContentActions{
    isModalOpen : boolean;
}
type InputHandler = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
export const ModalHeader = ({
    closeModal,
    submitModal
} : ModalContentActions) => {
    return (
        <>
            <div className="flex">
                <button className="btn-default" onClick={() => closeModal(true)}>Cancel</button>
                <button className="btn-primary" onClick={submitModal}>Save</button>
            </div>
        </>
    )
}
export const ModalBody = (handleInput : InputHandler) => {
    return (
        <div className="grid grid-cols-2 p-2">
            <div className="inline--input col-span-2">
                <input type="text" className="border-0  outline-0 text-2xl" placeholder="Title" name="title" onChange={handleInput}/>
            </div>
            <div className="inline--input">
                <label>Expiration Date</label>
                <input type="date"  onChange={handleInput} name="expiration_date"/>
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
                    <option value={1}>Bug</option>
                </select>
            </div>

            <div className="inline--input col-span-2 flex flex-col">
                <label className="mb-2">Description</label>
                <textarea className=" border border-gray-300" name="description" onChange={handleInput} rows={10}></textarea>
            </div>
        </div>
    )
}

const ModalContent = ({
    isModalOpen,
    closeModal
}: ModalContentProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData , setFormData]  = useState<TicketFormTypes>({
        title : "",
        description : "",
        label_id:1,
        expiration_date: "",
    })
    const handleSubmit = async () => {
        const action = confirm("Are you sure you want to proceed?");
        if(!action) return;
        const response = await boardApi.create(formData);
        if(response){
            dispatch(fetchTickets());
            closeModal(true);
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
    return <Modal
            size="XL"
            isModalOpen={isModalOpen}
            closeState={closeModal}
            header={<ModalHeader closeModal={closeModal} submitModal={handleSubmit}/>}
            body={ModalBody(handleInputs)}
            />
}



export default ModalContent;