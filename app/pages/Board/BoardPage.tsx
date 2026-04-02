import BoardColumn from "components/ui/BoardColumn";
import Ticket from "components/ui/Ticket";
import { createContext, useEffect, useId, useState } from "react";
import ModalContent from "./ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, getAllTickets } from "store/tickets/TicketSlice";
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
  const { setConfigType, fetchConfigList, categoryList, configType } = useConfigHandlers();

  const handleTicketOpen = (id: number, catID: number) => {
    const category = categories
      .find((category: any) => category.id === catID)
      ?.tickets.find((ticket: any) => ticket.id === id);
    if (!category) return;
    setCurrentID(id);
    setFormData({
      title: category.title,
      description: category.description,
      label_id: category.label_id,
      category_id:0,
      expiration_date: category.expiration_date,
    });
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    setConfigType("C");
  }, []);

  useEffect(() => {
    fetchConfigList();
  }, [configType]);

  useEffect( () => {
    console.log(categories);
    
  },[categories]);
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
              key={parentIndex}
              title={parentVal?.title}
              // dragOver={(e) => dragOver(e)}
              // dropOver={(e) => dropOver(e, openID)}
            >
              {parentVal?.tickets?.map((childVal: any, childIndex: number) => (
                <Ticket
                  id={childVal?.id}
                  onOpen={() => handleTicketOpen(childVal?.id, parentVal?.id)}
                  key={childIndex}
                  title={childVal.title}
                  description={childVal.description}
                />
              ))}
            </BoardColumn>
          ))}
        </TicketContext.Provider>
      </div>
      <ModalContent
        currentID={currentID}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        modalDetails={formData}
      />
    </div>
  );
};
export default BoardPage;
