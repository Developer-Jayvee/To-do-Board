// temp

import type { ChangeEvent } from "react";


export default function useDragAndDrop<T>(){
  const dropOver = (event:any , divID: string) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("ticketID");
    const draggedDiv = document.getElementById(id);
    event.currentTarget.querySelector(`#${divID}`).appendChild(draggedDiv);
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };

}