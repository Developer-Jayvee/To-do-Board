import { EditPencil, Plus, Trash } from "iconoir-react";
import { useEffect, useState } from "react";
import { initialLabelReturnState } from "src/constants/initialStates";
import type {
  LabelReturnForm,
  ConfigType,
  TableLabelsProps,
} from "types/globalTypes";

export default function TableLabels({
  onOpenModal,
  onUpdate,
  onDelete,
  configList,
}: TableLabelsProps) {
  const [tableList, setTableList] = useState<LabelReturnForm[]>(
    initialLabelReturnState,
  );

  useEffect( () => {
    setTableList(configList)
  },[configList])
  return (
    <div className="w-full border border-gray-300 outline-0grid grid-col-1 gap-[10px]">
      <div className="col-span-1 border-b border-gray-300 p-2">
        <span className="font-semibold">Manage Labels</span>
      </div>
      <div className="content  p-3 ">
        <div className="filter">
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => onOpenModal?.("L")}
          >
            <span>
              <Plus />
            </span>
            Add Label
          </button>
        </div>
        <div className=" py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center italic text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  tableList.map((val: any) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {val?.title}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-yellow-300 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Active</span>
                        </span>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => onUpdate?.(val?.id, "L")}
                          type="button"
                          className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          <EditPencil />
                        </button>
                        <button
                          onClick={() => onDelete?.(val?.id, "L")}
                          type="button"
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
