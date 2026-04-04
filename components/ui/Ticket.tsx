import { ChatLines } from "iconoir-react";
import { useId, type ChangeEvent } from "react";
import type { TicketForm } from "types/globalTypes";

interface TicketHandlers {
  onOpen?: (id: number) => void;
}
interface TicketProps extends TicketHandlers {
  id: number;
  details: TicketForm;
}
export default function Ticket({ id, details, onOpen }: TicketProps) {
  const divID = useId();
  const { title, label, category } = details;
  const startDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("ticketID", divID);
    e.dataTransfer.setData("ticketInfo", JSON.stringify(details));
  };

  return (
    <div
      id={divID}
      className="ticket-card bg-white shadow-lg p-2 flex flex-col gap-2 cursor-pointer rounded-lg"
      draggable="true"
      onDragStart={(e) => {
        e.currentTarget.classList.add('opacity-1')
        startDrag(e);
      }}
      onClick={() => onOpen?.(id)}
    >
      <div className="ticket-header grid grid-cols-[1fr_70px] ">
        <span className=" text-gray-500 text-sm mb-2"> {category?.title} </span>
        <span
          className={`ticket-type flex items-center justify-center rounded-2xl text-xs text-center font-semibold  `}
          style={{backgroundColor:label?.bgColor , color : label?.textColor}}
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
        <div className="author flex-1">
          <img
            src="https://ui-avatars.com/api/?background=random"
            alt="profile image"
            className="profile-image rounded-full w-6 h-6"
          />
        </div>
        <ChatLines />
      </div>
    </div>
  );
}
