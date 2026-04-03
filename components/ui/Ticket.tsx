import { ChatLines } from "iconoir-react";
import { useId, type ChangeEvent } from "react";
import type { TicketForm } from "types/globalTypes";

interface TicketHandlers {
  onOpen?: (id: number) => void;
}
interface TicketProps extends TicketHandlers {
  id: number;
  details : TicketForm;
}
export default function Ticket({
  id,
  details,
  onOpen,
}: TicketProps) {
  const divID = useId();
  const { title , description , category_id } = details
  const startDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("ticketID", divID);
    e.dataTransfer.setData("ticketInfo",JSON.stringify(details))
  };
  return (
    <div
      id={divID}
      className="ticket-card opacity-100 bg-white border-2 p-2 flex flex-col gap-2 cursor-pointer rounded-lg"
      draggable="true"
      onDragStart={(e) => {
        startDrag(e);
      }}
      onClick={() => onOpen?.(id)}
    >
      <div className="ticket-header flex ">
        <span className="ticket-title flex-1 text-xl font-medium">{title}</span>
        <span className="ticket-type bg-green-500 text-white px-4 py-1 rounded-2xl font-semibold text-sm">
          Bug
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
