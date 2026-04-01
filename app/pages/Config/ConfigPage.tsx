import ModalForm from "components/Config/ModalForm";
import TableCategories from "components/Config/TableCategories";
import TableLabels from "components/Config/TableLabels";
import Modal from "components/ui/Modal";
import { useState } from "react";


export default function ConfigPage() {
  const [isModalOpen,setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("Category");
  const createData = (type : string) => {
    setModalTitle(type)
    setModalOpen(true);
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
          <TableCategories onOpenModal={(type : string) => createData(type)} />
          <TableLabels onOpenModal={(type : string) => createData(type)}/>
      </div>
      <Modal 
        size="M"
        isModalOpen={isModalOpen}
        closeState={setModalOpen}
        body={ <ModalForm title={modalTitle} setToOpen={setModalOpen}/>}
      />
    </>
  );
}
