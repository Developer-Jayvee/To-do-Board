import type { ModalContentActions } from "types/globalTypes";


export default function TicketModalFooter ({
  isUpdate,
  closeModal,
  submitModal,
}: ModalContentActions) {
  return (
    <>
      <div className="flex gap-2">
            <button className="btn-default border border-gray-300" onClick={closeModal}>
            Cancel
            </button>
            <button className="btn-primary " onClick={submitModal}>
            {isUpdate ? "Update" : "Save"}{" "}
            </button>
        </div>
    </>
  );
};