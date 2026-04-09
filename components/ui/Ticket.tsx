import { ChatLines, OpenInWindow } from "iconoir-react";
import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { TICKET_STATUS_LEVEL } from "src/constants";
import type { TicketForm } from "types/globalTypes";
import { checkDayGap, defaultDateFormat } from "utils/utilities";

interface TicketHandlers {
  onOpen?: (id: number) => void;
}
interface TicketProps extends TicketHandlers {
  id: number;
  details: TicketForm;
}
export default function Ticket({ id, details, onOpen }: TicketProps) {
  const divID = useId();
  const { title, label, category, expiration_date } = details;
  const startDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("ticketID", divID);
    e.dataTransfer.setData("ticketInfo", JSON.stringify(details));
  };
  const [ticketStatus , setTicketStatus] = useState("bg-green-500");
  const dateStatus = useRef(checkDayGap(expiration_date));
  const ticketRef = useRef(null)

  const handleTicketStatus = ( dateStatus : number) : string => {
    
    if(dateStatus <= 5 && dateStatus >= 3) return TICKET_STATUS_LEVEL[5];
    if(dateStatus <= 2 && dateStatus >= 1) return TICKET_STATUS_LEVEL[2];
    if(dateStatus === 0) return TICKET_STATUS_LEVEL[0];
    
    if(dateStatus > 5 ) return TICKET_STATUS_LEVEL['default'];
    if(dateStatus < 0)  return TICKET_STATUS_LEVEL['closed'];
    else return "";
  }
 
  useEffect( () => {
    if(expiration_date){
      
      setTicketStatus(handleTicketStatus(checkDayGap(expiration_date)))
    }
  }, [expiration_date])
  return (
    <div
      ref={ticketRef}
      id={divID}
      className="ticket-card bg-white shadow-lg p-2 flex flex-col gap-2 cursor-grab rounded-lg hover:scale-105 transition-transform delay-150"
      draggable="true"
      onDragStart={(e) => {
        e.currentTarget.classList.add("opacity-1");
        startDrag(e);
      }}
    >
      <div className="ticket-header grid grid-cols-[1fr_70px] ">
        <span className=" text-gray-500 text-sm mb-2 flex items-center gap-2">
          {" "}
          <div className={`w-3 h-3  rounded-full ${ticketStatus}`}></div>{" "}
          {category?.title}{" "}
        </span>
        <span
          className={`ticket-type flex items-center justify-center rounded-2xl text-xs text-center font-semibold  `}
          style={{ backgroundColor: label?.bgColor, color: label?.textColor }}
        >
          {label?.title}
        </span>
        <span className="ticket-title col-span-2  text-xl font-medium">
          {title}
        </span>
      </div>
      <div className="ticket-body">
        {/* <p className="ticket-desc text-gray-500">{description || ""}</p> */}
      </div>
      <div className="ticket-footer flex mt-2">
        <div className="author flex-1 flex items-end">
          <span className="text-sm text-gray-500 ">
            {defaultDateFormat(expiration_date)}
          </span>
        </div>
        <OpenInWindow
          onClick={() => onOpen?.(id)}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
}
