import BoardColumn from "components/ui/BoardColumn";
import Ticket from "components/ui/Ticket";
import {
  createContext,
  useEffect,
  useId,
  useState,
} from "react";
import ModalContent from "./ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, getAllTickets } from "store/tickets/TicketSlice";
import { type AppDispatch } from "store";
import type { TicketForm, TicketFormPartial, TicketFormTypes } from "types/globalTypes";
import { BasicTicketForm } from "src/constants/initialStates";

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
  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector(getAllTickets);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData , setFormData] = useState<TicketFormTypes>(BasicTicketForm)
  const user = {};
  const openID = useId();
  const inprogressID = useId();

  const handleTicketOpen = (id : number) => {
    const details = tickets.find( (val:any) => val.id === id);
    if(!details) return;
    
    setFormData({
      title:details.title,
      description: details.description,
      label_id:details.label_id,
      expiration_date: details.expiration_date
    })
    setModalOpen(true)
  }

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect( () => {
    console.log(isModalOpen);
    
  } ,[isModalOpen])
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
      <div className="board-container flex no-wrap gap-[20px]">
        <BoardColumn
          title="Open"
          divID={openID}
          // dragOver={(e) => dragOver(e)}
          // dropOver={(e) => dropOver(e, openID)}
        >
          <TicketContext.Provider value={user}>
            {tickets.map((data, keyIndex) => (
              <Ticket
                id={data?.id}
                onOpen={ () => handleTicketOpen(data?.id)}
                key={keyIndex}
                title={data.title}
                description={data.description}
              />
            ))}
          </TicketContext.Provider>
        </BoardColumn>

        <BoardColumn
          title="In-progress"
          divID={inprogressID}
          // dragOver={(e) => dragOver(e)}
          // dropOver={(e) => dropOver(e, inprogressID)}
        />
      </div>
      <ModalContent setModalOpen={setModalOpen} isModalOpen={isModalOpen} modalDetails={formData} />
    </div>
  );
};
export default BoardPage;
