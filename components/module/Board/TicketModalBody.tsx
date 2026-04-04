import SelectComponent from "components/ui/Select";
import type { ModalBodyProps } from "types/globalTypes";
export default function TicketModalBody({
  formData,
  handleInput,
  labelOptions,
}: ModalBodyProps) {
  return (
    <div className="grid grid-cols-2 p-2">
      <div className="inline--input col-span-2">
        <input
          readOnly={formData.label_id > 0}
          value={formData.title}
          type="text"
          className="border-0  outline-0 text-2xl"
          placeholder="Title"
          name="title"
          onChange={(e) => handleInput("title", e.target.value)}
        />
      </div>
      <div className="inline--input">
        <label>Expiration Date</label>
        <input
          type="date"
          readOnly={formData.label_id > 0}
          value={formData.expiration_date}
          onChange={(e) => handleInput("expiration_date", e.target.value)}
          name="expiration_date"
        />
      </div>
      <div className="inline--input">
        <label>Status</label>
       
      </div>
      <div className="inline--input"> &nbsp; </div>
      <div className="inline--input ">
        <label>Label</label>
        <SelectComponent
          list={labelOptions}
          defaultKey={formData.label_id}
          readOnly={formData.label_id > 0}
          defaultVal="Choose a label"
          onChange={(name: string, value: string) => handleInput(name, value)}
        />
      </div>

      <div className="inline--input col-span-2 flex flex-col">
        <label className="mb-2">Description</label>
        <textarea
          readOnly={formData.label_id > 0}
          className=" border border-gray-300"
          name="description"
          onChange={(e) => handleInput("description", e.target.value)}
          rows={10}
          value={formData.description}
        ></textarea>
      </div>
    </div>
  );
}
