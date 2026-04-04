import { useDebounce, useDebouncedCallback } from "use-debounce";
import "../../src/styles/select.css";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { nonCaseSensitiveSearch } from "utils/utilities";
import type { EventTarget, ListTypes } from "types/globalTypes";



interface SelectProps {
  list: ListTypes[];
  defaultVal: string;
  defaultKey: string | number;
  readOnly ?:boolean;
  onChange?: (name: string, value: string) => void;
}
export default function SelectComponent({
  list,
  defaultVal = "Choose an option",
  defaultKey = "",
  readOnly = false,
  onChange,
}: SelectProps) {
  const ref = useRef(null);
  const [isReadOnly ,setIsReadyOnly] = useState<boolean>(readOnly)
  const [isOptionHidden, setOptionHidden] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<ListTypes>({
    key: defaultKey as string,
    value: defaultVal,
    style: { background: "", color: "" },
  });
  const [optionList, setOptionList] = useState<Array<ListTypes>>([
    {
      key: "",
      value: "",
      style: { background: "", color: "" },
    },
  ]);
  const deferredQuery = useDeferredValue(optionList);
  const toggleOptions = () => {
    if(!isReadOnly){
      setOptionHidden(!isOptionHidden)
    }
  };

  const searchOptions = (text: string) => {
    return list.filter((val: ListTypes) =>
      nonCaseSensitiveSearch(val.value, text),
    );
  };
  const handleSearch = useDebouncedCallback((val: string) => {
    setSearchInput(val);
    if (val === "") setOptionList(list);
    else setOptionList(searchOptions(val));
  }, 1000);

  useEffect(() => {
    if (list) {
      setOptionList(list);
    }
    setIsReadyOnly(readOnly)
  }, [list,readOnly]);
  useEffect(() => {
    const defaultOption = list.find((val: any) => val.key === defaultKey);
    if (defaultOption) setSelectedOption(defaultOption);
    else
      setSelectedOption({
        style: { background: "", color: "" },
        key: "",
        value: defaultVal,
      });
  }, [defaultKey]);
  return (
    <div
      className="relative transition-all"
      ref={ref}
      onMouseLeave={() => setOptionHidden(true)}
    >
      <div
        className={`placeholder-container border border-gray-300 bg-white px-2 py-1  z-10 ${isReadOnly ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={toggleOptions}
      >
        <p
          className={`text-gray-600 ml-1  rounded-full font-semibold  text-center py-1 px-[25px] inline-block `}
          style={{
            backgroundColor: selectedOption.style.background,
            color: selectedOption.style.color,
          }}
        >
          {selectedOption.value}
        </p>
      </div>
      <div
        className={`${isOptionHidden ? "hidden" : ""} options-container border border-gray-400 border-t-0 flex flex-col gap-2 overflow-hidden absolute w-full bg-white shadow-gray-300 shadow-xs`}
      >
        <div className="search-field px-2 mt-2">
          <input
            type="search"
            className="border border-gray-500 w-full px-2 py-1 "
            placeholder="Search item..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <ul className="">
          {deferredQuery.map((data: ListTypes, index: number) => {
            if (data.value === "" || data.key === "") return;
            return (
              <li
                key={index}
                className={`${selectedOption.key === data.key ? "bg-gray-200" : ""} cursor-pointer hover:bg-gray-200 py-1`}
                onClick={() => {
                  setSelectedOption({
                    key: data.key,
                    value: data.value,
                    style: data.style,
                  });
                  setOptionHidden(true);
                  onChange?.("label_id", data.key);
                }}
              >
                <span
                  className={`ml-1  rounded-full font-semibold px-[25px] py-1 inline-block`}
                  style={{
                    backgroundColor: data.style.background,
                    color: data.style.color,
                  }}
                >
                  {data.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
