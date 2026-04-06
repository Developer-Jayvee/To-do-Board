import { EditPencil, Plus, Trash } from "iconoir-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { inititalCategoryReturnState } from "src/constants/initialStates";
import type { RootState } from "store";
import type {
  CategoryReturnForm,
  TableCategoriesProps,
} from "types/globalTypes";

export default function TableCategories({
  onOpenModal,
  onUpdate,
  onDelete,
  configList,
}: TableCategoriesProps) {
  const [tableList, setTableList] = useState<CategoryReturnForm[]>(
    inititalCategoryReturnState,
  );
  const ticketPerCategory = useSelector( (state: RootState) => state.ticket);
  
  const isUsed =  (id : number) =>  {
      return ticketPerCategory.list.every( (val) => {
        if(val.id === id){
          return val.tickets.length === 0;
        }
        return true;
      });
  }
  
  useEffect(() => {
    setTableList(configList);
  }, [configList]);


  return (
    <div className="w-full border border-gray-300 outline-0grid grid-col-1 gap-[10px]">
      <div className="col-span-1 border-b border-gray-300 p-2">
        <span className="font-semibold">Manage Categories</span>
      </div>
      <div className="content  p-3 ">
        <div className="filter">
          <button
            className="btn-primary flex items-center gap-2 cursor-pointer"
            onClick={() => onOpenModal?.("C")}
          >
            <span>
              <Plus />
            </span>
            Add Category
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
              <tbody >
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
                  tableList.map((val: any , index: number) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap rounded-full ">
                          {val?.title}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0  opacity-50  rounded-full ${!isUsed(val.id) ? 'bg-yellow-300 ':'bg-green-400'}`}
                          ></span>
                          <span className={`font-medium text-black`}>{!isUsed(val.id) ? 'Active' : 'In-active'}</span>
                        </span>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => onUpdate?.(val?.id, "C")}
                          type="button"
                          className="disabled:bg-yellow-300 disabled:cursor-not-allowed cursor-pointer mr-3 text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          disabled={!isUsed(val.id)}
                        >
                          <EditPencil />
                        </button>
                        <button
                          onClick={() => onDelete?.(val?.id, "C")}
                          type="button"
                          className="disabled:bg-red-300 disabled:cursor-not-allowed cursor-pointer text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          disabled={!isUsed(val.id)}
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
