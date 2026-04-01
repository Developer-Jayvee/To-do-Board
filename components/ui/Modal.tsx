import {
  ArrowEmailForward,
  MoreHoriz,
  Xmark,
  XmarkSquare,
} from "iconoir-react";
import {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Size = "S" | "M" | "L" | "XL";

interface ModalStates {
  closeState: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}
interface ModalProps extends ModalStates {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  size?: Size;
}
export default function Modal({
  header,
  body,
  footer,
  size,
  isModalOpen = false,
  closeState,
}: ModalProps) {
  const [modalSize, setModalSize] = useState<string>("w-[300px]");

  useEffect(() => {
    if (size === "S") setModalSize("w-[300px]");
    else if (size === "M") setModalSize("w-[500px]");
    else if (size === "L") setModalSize("w-[700px]");
    else if (size === "XL") setModalSize("w-[800px]");
  }, [size]);

  return (
    <div
      className={`modal--wrapper bg-black/50 inset-0 fixed flex justify-center items-center ${isModalOpen ? "" : "hidden"}`}
    >
      <div
        className={`modal-container bg-white py-2  rounded-[5px] ${modalSize}  flex flex-col `}
      >
        <div className="modal-header px-2 py-1 border-b border-gray-300 flex items-center justify-end gap-3 ">
          {header || (
            <>
                <ArrowEmailForward className="cursor-pointer" />
                <MoreHoriz className="cursor-pointer" />
                <Xmark
                  className="cursor-pointer"
                  onClick={() => closeState(false)}
                />
            </>
          )}
        </div>
        <div className="modal-body p-2">{body || ""}</div>
        <div
          className={`modal-footer px-2 border-t border-gray-300 ${footer ? "" : "hidden"}`}
        >
          {footer || ""}
        </div>
      </div>
    </div>
  );
}
