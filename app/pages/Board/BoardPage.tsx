import BoardColumn from "components/ui/BoardColumn";
import Ticket from "components/ui/Ticket";
import { createContext, useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  getAllTickets,
  updateTicketProgress,
} from "store/tickets/TicketSlice";
import { type AppDispatch, type RootState } from "store";
import type { AlertStatusProps, AlertType, TicketFormTypes } from "types/globalTypes";
import { BasicTicketForm } from "src/constants/initialStates";
import { useConfigHandlers } from "src/hooks/useConfigHandlers";
import TicketModal from "components/module/Board/TicketModal";
import { ClipLoader, ClockLoader, SyncLoader } from "react-spinners";
import { setLoading } from "store/module/ModuleSlice";
import Loader from "components/ui/Loader";
import AlertModal from "components/ui/AlertModal";
import { toast, ToastContainer } from "react-toastify";
import { notif } from "utils/toast.util";
import { turnOffNotif } from "store/auth/AuthSlice";


export const TicketContext = createContext(null);
export const ModalContentContext = createContext(null);
const BoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(getAllTickets);
  const auth = useSelector( (state : RootState) => state.auth);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [formData, setFormData] = useState<TicketFormTypes>(BasicTicketForm);
  const [currentID, setCurrentID] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const { getAllList, labelList, categoryList } = useConfigHandlers();
  const [provider, setProvider] = useState({
    category: {},
  });
  const boardRed = useRef(null)
  const hasNotifAlready = useRef<boolean | null>(null);
  const handleTicketOpen = (id: number, catID: number) => {
    const ticketDetails = categories
      .find((category: any) => category.id === catID)
      ?.tickets.find((ticket: any) => ticket.id === id);
    if (!ticketDetails) return;
    setCurrentID(id);
    setCurrentCategory(catID);
    setFormData({
      id: ticketDetails.id,
      title: ticketDetails.title,
      description: ticketDetails.description,
      label_id: ticketDetails.label_id,
      category_id: ticketDetails.category_id,
      expiration_date: ticketDetails.expiration_date,
    });
    setModalOpen(true);
  };
  const dropOver = (event: any, parentDivID: string, catID: number) => {
    try {
      event.preventDefault();
      const id = event.dataTransfer.getData("ticketID");
      const ticketInfo = JSON.parse(event.dataTransfer.getData("ticketInfo"));
  
      const dropOff = event.target.parentNode.querySelector(".ticket-list");
      const draggedDiv = document.getElementById(id);
      if (!draggedDiv || ticketInfo.category_id === catID){
        return;
      }
      draggedDiv.style.opacity = "1";
      dispatch(setLoading(true));
      
      if (!dropOff) {
        event.currentTarget.querySelector(".ticket-list").appendChild(draggedDiv);
      } else {
        event.currentTarget
        .querySelector(`#${parentDivID}`)
        .appendChild(draggedDiv);
      }
      dispatch(
        updateTicketProgress({
          id: ticketInfo.id,
          formData: {
            previous: ticketInfo.category_id,
            next: catID,
          },
        }),
      ).finally(() => dispatch(setLoading(false)));
    } catch (error) {
      alert('Error occured while moving ticket')
    }
  };
  const dragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const dragEnd = (e: any , catID : number) => {
    const parentNode = e.currentTarget.querySelector(".ticket-list");
    const childrenNode = parentNode.querySelectorAll(".ticket-card");
    childrenNode.forEach((child) => child.classList.remove("opacity-1"));
  };
  const ticketExpirationNotif = () => {
    if(hasNotifAlready.current) return;
     if(auth.notif && auth.hasNotif){
      if(auth.notif.soon) notif.info(`${auth.notif.soon} Ticket will expire soon `)
      if(auth.notif.today) notif.error(`${auth.notif.today} Ticket will expire today`);
        dispatch(turnOffNotif());
    }
    hasNotifAlready.current = true;
  }
  useEffect(() => {
    dispatch(fetchTickets()).finally(() => setLoaded(true)); 
  }, [dispatch]);
 
  useEffect(() => {
    getAllList(false).finally(() => {
      setProvider((prev) => ({
        ...prev,
        category: categoryList,
        label: labelList,
      }));
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentID(null);
    }
  }, [isModalOpen]);
  ticketExpirationNotif()
  return (
    <>
      <div className="grid grid-cols-1 gap-4 relative" ref={boardRed}>
        <div className="filters">
          <button
            className="filter-btn btn-success cursor-pointer"
            onClick={() => {
              setModalOpen(true);
              setFormData(BasicTicketForm);
            }}
          >
            Create Ticket
          </button>
        </div>
        <div className="board-container flex no-wrap gap-5">
          {!isLoaded ? (
              <div className="flex flex-1 justify-center">
                  <SyncLoader 
                    color="black"
                  />
              </div>
          ) : (
            <TicketContext.Provider value={provider}>
              {categories.map((parentVal: any, parentIndex: number) => (
                <BoardColumn
                  divID={`d${parentIndex}`}
                  key={parentIndex}
                  categoryDetails={parentVal}
                  title={parentVal?.title}
                  dragOver={(e) => dragOver(e)}
                  dropOver={(e) => dropOver(e, `d${parentIndex}`, parentVal.id)}
                  dragEnd={(e) => dragEnd(e , parentVal.id)}
                >
                  {parentVal?.tickets?.map(
                    (childVal: any, childIndex: number) => (
                      <Ticket
                        id={childVal?.id}
                        onOpen={() =>
                          handleTicketOpen(childVal?.id, parentVal?.id)
                        }
                        key={childIndex}
                        details={childVal}
                      />
                    ),
                  )}
                </BoardColumn>
              ))}
            </TicketContext.Provider>
          )}
        </div>
        <TicketModal
          labelList={labelList}
          categoryList={categoryList}
          currentID={currentID}
          categoryID={currentCategory}
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          modalDetails={formData}
        />
      </div>
      <Loader />
    
    </>
  );
};
export default BoardPage;
