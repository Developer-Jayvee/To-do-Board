import { useState } from "react";
import type { ModalContentActions } from "types/globalTypes";


export default function TicketModalFooter ({
  isUpdate,
  removeSubmit,
  canSubmit ,
  closeModal,
  submitModal,
}: ModalContentActions) {
 
  return (
    <>
      <div className="flex gap-2">
            <button className="btn-default border cursor-pointer border-gray-300" onClick={closeModal}>
            Cancel
            </button>
            <button hidden={removeSubmit} className="bg-blue-700 cursor-pointer text-white disabled:bg-blue-300 disabled:cursor-not-allowed " onClick={submitModal} disabled={!canSubmit}>
            {isUpdate ? "Update" : "Save"}{" "}
            </button>
        </div>
    </>
  );
};