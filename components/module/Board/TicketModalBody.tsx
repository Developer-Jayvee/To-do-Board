import InputDate from "components/ui/InputDate";
import SelectComponent from "components/ui/Select";
import { CheckCircle } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import { ClockLoader } from "react-spinners";
import type { TicketForm,  ModalBodyProps } from "types/globalTypes";
export default function TicketModalBody({
  formData,
  isSubmitClosed,
  handleInput,
  labelOptions,
  categoryOptions,
  isModalOpen
}: ModalBodyProps) {
  const inputRef = useRef<TicketForm | null>(null);
  const [isLoading, setLoading ] = useState<boolean>(false);
  useEffect( () => {
    if(isModalOpen) setLoading(true)
  },[isModalOpen])

  if(!isLoading){
    return <ClockLoader color="black" size={30}/>
  }
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-2 gap-x-5">
      <div
        className={`inline--input col-span-2 ${formData.id ? "hidden" : ""} `}
      >
        <input
          readOnly={!!formData.id}
          value={formData.title}
          type="text"
          className=" w-full outline-0 text-2xl border-0"
          placeholder="Title"
          name="title"
          onChange={(e) => handleInput("title", e.target.value)}
        />
      </div>
      <div className="inline--input col-span-2 sm:col-span-1">
        <label>Expiration Date </label>
        <InputDate
          dateInput={formData.id ? formData.expiration_date : undefined }
          readOnly={!!formData.id}
          key={formData.id}
          onChange={(val: string) => handleInput("expiration_date", val)}
        />
      </div>
      <div className="inline--input  col-span-2 sm:col-span-1">
        <label>Status</label>
        <SelectComponent
          list={categoryOptions}
          defaultKey={formData.category_id}
          readOnly={isSubmitClosed}
          key={formData.id}
          defaultVal="Choose a category"
          onChange={(value: string) => handleInput("category_id", value)}
        />
      </div>
      <div className="inline--input  col-span-2 sm:col-span-1">
        <label>Label</label>
        <SelectComponent
          list={labelOptions}
          defaultKey={formData.label_id}
          readOnly={!!formData.id}
          key={formData.id}
          defaultVal="Choose a label"
          onChange={(value: string) => handleInput("label_id", value)}
        />
      </div>
      <div className="inline--input  col-span-2 sm:col-span-1"> &nbsp; </div>

      <div className="inline--input col-span-2 flex flex-col">
        <label className="mb-2">Description</label>
        <textarea
          className=" border border-gray-300"
          name="description"
          onChange={(e) => handleInput("description", e.target.value)}
          rows={5}
          value={formData.description}
          readOnly={isSubmitClosed}
          placeholder="Enter a description"
        ></textarea>
        <p
          className={`  text-xs flex justify-end mt-1 gap-2 text-gray-500 
                        transition-opacity duration-200 ease-in-out
                        ${formData.description == "" && formData.id == undefined || isSubmitClosed ? "hidden opacity-0" : "opacity-100"}`}
        >
          <CheckCircle />
          Save as draft
        </p>
      </div>
    </div>
  );
}
