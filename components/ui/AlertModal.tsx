import {
  CheckCircle,
  InfoCircle,
  WarningCircle,
  WarningTriangle,
} from "iconoir-react";
import Modal from "./Modal";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Size, AlertType } from "../../types/globalTypes"


type MessageType = {
  message: string;
  type: AlertType;
};
type ButtonTypes = {
    hasProceed : Dispatch<SetStateAction<boolean>>;
}
interface AlertModalProps {
  type: AlertType;
  isPopup: boolean;
  message: string;
  size : Size;
  setStatus : Dispatch<SetStateAction<boolean>>;
}

export function AlertBody({ message, type }: MessageType) {
  let typeIcon;

  if (type == "warning") typeIcon = (<> <WarningTriangle className="text-yellow-500" /> <p className="">Warning : </p> </>);
  else if (type == "info") typeIcon =(<> <InfoCircle className="text-blue-400" /> <p>Info</p> </>);
  else if (type == "success") typeIcon = (<><CheckCircle className="text-green-700" /> <p>Success</p></>);
  return (
    <div className="flex gap-2 items-center">
      {typeIcon}
    
      <span className="font-medium text-md ml-1">
        {message}
      </span>
    </div>
  );
}
export function AlertFooter({ hasProceed } : ButtonTypes) {
    const handleButton = (action : boolean) => {
        console.log(action);
        
        hasProceed(action)
    }
  return (
    <div className="flex gap-2">
      <button className="cursor-pointer hover:outline hover:outline-gray-400 " onClick={() => handleButton(false)}>
        Cancel
      </button>
      <button className="bg-blue-700 text-white cursor-pointer hover:bg-blue-900"  onClick={() => handleButton(true)}>
        Proceed
      </button>
    </div>
  );
}
export default function AlertModal({
  type,
  isPopup,
  message,
  size ="AUTO",
  setStatus
}: AlertModalProps) {

  return (
    <Modal
      size={size}
      isModalOpen={isPopup}
      body={<AlertBody message={message} type={type} />}
      footer={<AlertFooter  hasProceed={setStatus} />}
    />
  )
  
}
