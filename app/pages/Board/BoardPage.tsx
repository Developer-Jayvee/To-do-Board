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


export const TicketContext = createContext(null);
export const ModalContentContext = createContext(null);
const BoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(getAllTickets);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TicketFormTypes>(BasicTicketForm);
  const [currentID, setCurrentID] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const { getAllList , labelList , categoryList } = useConfigHandlers();
  const [provider , setProvider ] = useState({
    category : {}
  })
  const handleTicketOpen = (id: number, catID: number) => {
    const category = categories
      .find((category: any) => category.id === catID)
      ?.tickets.find((ticket: any) => ticket.id === id);
    if (!category) return;
    setCurrentID(id);
    setCurrentCategory(catID);
    setFormData({
      id : category.id,
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
    const ticketInfo = JSON.parse(event.dataTransfer.getData("ticketInfo"));

    const dropOff = event.target.parentNode.querySelector(".ticket-list");
    const draggedDiv = document.getElementById(id);
    if(!draggedDiv || ticketInfo.category_id === catID) return;
    draggedDiv.style.opacity = "1";
    
    dispatch(updateTicketProgress({ id: ticketInfo.id , formData: {
      previous:ticketInfo.category_id,
      next: catID
    }}));
    if(!dropOff){
      event.currentTarget.querySelector(".ticket-list").appendChild(draggedDiv)
    }else{
      event.currentTarget.querySelector(`#${parentDivID}`).appendChild(draggedDiv);
    }
      
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };
  const dragEnd = (e: any) => {
      const parentNode = e.currentTarget.querySelector('.ticket-list');
      const childrenNode = parentNode.querySelectorAll('.ticket-card');
      childrenNode.forEach(child => child.classList.remove('opacity-1'));
  }

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    getAllList()
    .finally( () => {
      setProvider(
        (prev) => ({
          ...prev,
          category : categoryList,
          label : labelList
        })
      )
    })
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
        <TicketContext.Provider value={provider}>
          {categories.map((parentVal: any, parentIndex: number) => (
            <BoardColumn
              divID={`d${parentIndex}`}
              key={parentIndex}
              categoryDetails={parentVal}
              title={parentVal?.title}
              dragOver={dragOver}
              dropOver={(e) => dropOver(e, `d${parentIndex}` , parentVal.id)}
              dragEnd={(e) => dragEnd(e)}
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
          categoryList={categoryList}
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
