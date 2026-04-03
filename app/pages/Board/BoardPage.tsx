import BoardColumn from "components/ui/BoardColumn";
import Ticket from "components/ui/Ticket";
import { createContext, useEffect, useId, useRef, useState } from "react";
import ModalContent from "./ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, getAllTickets, updateTicketProgress } from "store/tickets/TicketSlice";
import { type AppDispatch } from "store";
import type { TicketFormTypes } from "types/globalTypes";
import { BasicTicketForm } from "src/constants/initialStates";
import { useConfigHandlers } from "src/hooks/useConfigHandlers";

// NOTES
/*
STEPS ON CREATING DRAG AND DROP
1. create a unique id for each droping point divs ( useId() )
2.Add drag and drop function on parent div
  onDragOver={(e) => dragOver(e)} -> e.preventDefault()
  onDrop={(e) => dropOver(e)} -> e.preventDefault()

3.useContext for distributing global variables ( optional )
4.in child component , create a unique ID for parent div  ( useId() )
5.add "draggable = true" attribute
6. add inline function onDragStart 
7. onDragStart set e.dataTransfer.setData('key','value') , it will be use to fetch the unique id in the parent div
8. in onDrop , fetch the id using the key e.dataTransfer.getData("key") then use document.getElementById to get the whole div 
9.  e.currentTarget.appendChild(div) to append the drag div

*/
export const TicketContext = createContext();
const BoardPage = () => {
  const user = {};
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(getAllTickets);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TicketFormTypes>(BasicTicketForm);
  const [currentID, setCurrentID] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const { getAllList , labelList , categoryList } = useConfigHandlers();
  const lastDrop = useRef<HTMLDivElement | null>(null);
  const handleTicketOpen = (id: number, catID: number) => {
    const category = categories
      .find((category: any) => category.id === catID)
      ?.tickets.find((ticket: any) => ticket.id === id);
    if (!category) return;
    setCurrentID(id);
    setCurrentCategory(catID);
    setFormData({
      title: category.title,
      description: category.description,
      label_id: category.label_id,
      category_id:0,
      expiration_date: category.expiration_date,
    });
    setModalOpen(true);
  };
   const dropOver = (event:any , parentDivID: string , catID : number) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("ticketID");
    const dropOff = event.target.parentNode.querySelector(".ticket-list");
    const ticketInfo = JSON.parse(event.dataTransfer.getData("ticketInfo"));
    const draggedDiv = document.getElementById(id);
    dispatch(updateTicketProgress({ id: ticketInfo.id , formData: {
      previous:ticketInfo.category_id,
      next: catID
    }}));
    
    if(dropOff){
      setCurrentCategory(catID);
      event.currentTarget.querySelector(`#${parentDivID}`).appendChild(draggedDiv);
    }

      
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };
 

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    getAllList()
  }, []);

  

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentID(null);
    }
  }, [isModalOpen]);
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="filters">
        <button
          className="filter-btn btn-success"
          onClick={() => setModalOpen(true)}
        >
          Create Ticket
        </button>
      </div>
      <div className="board-container flex no-wrap gap-5">
        <TicketContext.Provider value={user}>
          {categories.map((parentVal: any, parentIndex: number) => (
            <BoardColumn
              divID={`d${parentIndex}`}
              key={parentIndex}
              title={parentVal?.title}
              dragOver={(e) => dragOver(e)}
              dropOver={(e) => dropOver(e, `d${parentIndex}` , parentVal.id)}
            >
              {parentVal?.tickets?.map((childVal: any, childIndex: number) => (
                <Ticket
                  id={childVal?.id}
                  onOpen={() => handleTicketOpen(childVal?.id, parentVal?.id)}
                  key={childIndex}
                  details={childVal}
                />
              ))}
            </BoardColumn>
          ))}
        </TicketContext.Provider>
      </div>
      <ModalContent
        labelList={labelList}
        currentID={currentID}
        categoryID={currentCategory}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        modalDetails={formData}
      />
    </div>
  );
};
export default BoardPage;
