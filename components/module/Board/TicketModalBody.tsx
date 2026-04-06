import InputDate from "components/ui/InputDate";
import SelectComponent from "components/ui/Select";
import type { ModalBodyProps } from "types/globalTypes";
export default function TicketModalBody({
  formData,
  handleInput,
  labelOptions,
  categoryOptions,
}: ModalBodyProps) {
  return (
    <div className="grid grid-cols-2 p-2 gap-x-5">
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
      <div className="inline--input">
        <label>Expiration Date </label>
        <InputDate
          dateInput={formData.expiration_date}
          readOnly={!!formData.id}
          key={formData.id}
          onChange={(val: string) => handleInput("expiration_date", val)}
        />
      </div>
      <div className="inline--input">
        <label>Status</label>
        <SelectComponent
          list={categoryOptions}
          defaultKey={formData.category_id}
          readOnly={false}
          key={formData.id}
          defaultVal="Choose a category"
          onChange={(value: string) => handleInput('category_id', value)}
        />
      </div>
      <div className="inline--input ">
        <label>Label</label>
        <SelectComponent
          list={labelOptions}
          defaultKey={formData.label_id}
          readOnly={!!formData.id}
          key={formData.id}
          defaultVal="Choose a label"
          onChange={(value: string) => handleInput('label_id', value)}
        />
      </div>
      <div className="inline--input"> &nbsp; </div>

      <div className="inline--input col-span-2 flex flex-col">
        <label className="mb-2">Description</label>
        <textarea
          readOnly={!!formData.id}
          className=" border border-gray-300"
          name="description"
          onChange={(e) => handleInput("description", e.target.value)}
          rows={5}
          value={formData.description}
          placeholder="Enter a description"
        ></textarea>
      </div>
    </div>
  );
}
