// temp
  const dropOver = (e: any, divID: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("ticketID");
    const draggedDiv = document.getElementById(id);
    e.currentTarget.querySelector(`#${divID}`).appendChild(draggedDiv);
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };