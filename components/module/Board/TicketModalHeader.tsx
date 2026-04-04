import type { ModalContentActions } from "types/globalTypes";


export default function TicketModalHeader ({
  isUpdate,
  closeModal,
  submitModal,
}: ModalContentActions) {
  return (
    <>
      <div className="flex">
        <button className="btn-default" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn-primary" onClick={submitModal}>
          {isUpdate ? "Update" : "Save"}{" "}
        </button>
      </div>
    </>
  );
};