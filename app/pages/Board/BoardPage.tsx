import BoardColumn from "components/ui/BoardColumn";
import Ticket from "components/ui/Ticket";
import { Plus } from "iconoir-react";
import { createContext, useId } from "react";

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
  const openID = useId();
  const inprogressID = useId();

  const dropOver = (e: any , divID : string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("ticketID");
    const draggedDiv = document.getElementById(id);
    e.currentTarget.querySelector(`#${divID}`).appendChild(draggedDiv);
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="filters">
        <button className="filter-btn btn-success">Create Task</button>
      </div>
      <div className="board-container flex no-wrap gap-[20px]">

        <BoardColumn
          title="Open"
          divID={openID}
          dragOver={(e) => dragOver(e)}
          dropOver={(e) => dropOver(e , openID)}
        >
          <TicketContext.Provider value={user}>
            <Ticket />
          </TicketContext.Provider>
        </BoardColumn>

         <BoardColumn
          title="In-progress"
          divID={inprogressID}
          dragOver={(e) => dragOver(e)}
          dropOver={(e) => dropOver(e , inprogressID)}
        />
         
      </div>
    </div>
  );
};

export default BoardPage;
