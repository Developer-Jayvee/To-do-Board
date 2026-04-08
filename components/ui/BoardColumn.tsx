import {
  useId,
  type DragEvent,
  type ReactNode,
} from "react";
import type { CategoryReturnForm, DragAndDropHandlers } from "types/globalTypes";


interface BoardColumnProps extends DragAndDropHandlers {
  categoryDetails:CategoryReturnForm;
  title: string;
  divID?: string;
  parentID?: string;
  customClass?: string;
  children?: ReactNode;
}
export default function BoardColumn({
  title,
  categoryDetails,
  divID,
  parentID,
  customClass = "",
  dragOver,
  dropOver,
  dragEnter,
  dragEnd,
  dragLeave,
  children,
}: BoardColumnProps) {
  const { bgColor } = categoryDetails;
  return (
    <div
      className="board-column bg-gray-200 w-[300px] flex flex-col rounded-xl  border-t-0 shadow-xl pb-4 px-1"
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOver?.(e)}
      onDrop={(e: DragEvent<HTMLDivElement>) => dropOver?.(e)}
      onDragEnter={(e : DragEvent<HTMLDivElement>) => dragEnter?.(e)}
      onDragEnd={(e : DragEvent<HTMLDivElement>) => dragEnd?.(e)}
      onDragLeave={(e : DragEvent<HTMLDivElement>) => dragLeave?.(e)}
    >
      <div className={`board-header flex justify-between border border-0 border-b-2 border-gray-300 mb-4  `}>
        <h2 className={`column-title   p-2   font-semibold   rounded-t-2xl w-full  ${bgColor}`}>{title}</h2>
      </div>
      <div
        id={divID || ""}
        className="ticket-list flex flex-col gap-5 px-2 rounded-2xl"
      >
        {children || ""}
      </div>
      <div className="board-footer  rounded-lg text-center ">
        {/* <button className="add-task-btn w-full">+ Add Task</button> */}
      </div>
    </div>
  );
}
