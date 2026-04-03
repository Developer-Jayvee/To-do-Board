import { Plus } from "iconoir-react";
import {
  useId,
  type DragEvent,
  type DragEventHandler,
  type ReactNode,
} from "react";
import type { DragAndDropHandlers } from "types/globalTypes";


interface BoardColumnProps extends DragAndDropHandlers {
  title: string;
  divID?: string;
  parentID?: string;
  customClass?: string;
  children?: ReactNode;
}
export default function BoardColumn({
  title,
  divID,
  parentID,
  customClass = "",
  dragOver,
  dropOver,
  dragEnter,
  dragEnd,
  children,
}: BoardColumnProps) {
  return (
    <div
      className="board-column bg-gray-100 w-[300px] flex flex-col rounded-lg border-t-0 "
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOver?.(e)}
      onDrop={(e: DragEvent<HTMLDivElement>) => dropOver?.(e)}
      onDragEnter={(e : DragEvent<HTMLDivElement>) => dragEnter?.(e)}
      onDragEnd={(e : DragEvent<HTMLDivElement>) => dragEnd?.(e)}
    >
      <div className="board-header flex justify-between border-b-2 p-2">
        <h2 className="column-title rounded-lg ">{title}</h2>
        {/* <Plus className="cursor-pointer" /> */}
      </div>
      <div
        id={divID || ""}
        className="ticket-list flex flex-col gap-2 px-1 py-2 rounded-2xl"
      >
        {children || ""}
      </div>
      <div className="board-footer  rounded-lg text-center ">
        <button className="add-task-btn w-full">+ Add Task</button>
      </div>
    </div>
  );
}
