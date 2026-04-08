import {
  ArrowLeft,
  ArrowRight,
  NavArrowLeft,
  NavArrowRight,
} from "iconoir-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DAY_LIST, MONTH_LIST } from "src/constants";
import { defaultDateFormat, getAllDaysInMonth } from "utils/utilities";

interface DateDetails {
  month: number;
  year: number;
  date: number;
}
interface InputDateProps {
  dateInput: string | undefined;
  readOnly: boolean;
  onChange?: (val: string) => void;
}
const initDateDetails = (now: Date) => {
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    date: now.getDate(),
  };
};
export default function InputDate({
  dateInput,
  readOnly = false,
  onChange,
}: InputDateProps) {
  const now = new Date();
  
  const dateListCallBack = useCallback(
    (year: number, month: number) => getAllDaysInMonth(year, month),
    [],
  );

  const [dateDetails, setDateDetails] = useState<DateDetails>(
    initDateDetails(now),
  );
  const [selectedDate, setSelectedDate] = useState<DateDetails>(
    initDateDetails(now),
  );
  const [isReadOnly, setReadOnly] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleDateState = (data: Partial<DateDetails>) => {
    setDateDetails((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const dateList = useMemo(() => {
    return dateListCallBack(dateDetails.year, dateDetails.month);
  }, [dateDetails]);

  const moveNextMonth = (isAppend = true) => {
    if (isAppend) {
      if (dateDetails.month < 11)
        handleDateState({ month: dateDetails.month + 1 });
      else handleDateState({ year: dateDetails.year + 1, month: 0 });
      return;
    }
    if (dateDetails.month > 0)
      handleDateState({ month: dateDetails.month - 1 });
    else handleDateState({ year: dateDetails.year - 1, month: 11 });
  };
  const resetAll = () => {
    setDateDetails({
      month: now.getMonth(),
      year: now.getFullYear(),
      date: now.getDate(),
    });
  };
  useEffect(() => {
    
    if (dateInput) {
      const dateGiven = new Date(dateInput);
      setDateDetails({
        month: dateGiven.getMonth(),
        year: dateGiven.getFullYear(),
        date: dateGiven.getDate(),
      });
       setSelectedDate({
        month: dateGiven.getMonth() + 1,
        year: dateGiven.getFullYear(),
        date: dateGiven.getDate(),
      });
    }
    setReadOnly(readOnly);
  }, [dateInput, readOnly]);

  useEffect(() => {
    if (!isOpen) {
      resetAll();
    } else {
      onChange?.(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
    }
  }, [isOpen]);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <div
        className="w-full border custom-input"
        onClick={() => (isReadOnly ? undefined : setOpen(!isOpen))}
      >
        <div
          className={`input-display ${isReadOnly ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <p>
            {selectedDate.month }/{selectedDate.date}/{selectedDate.year}
          </p>
        </div>
      </div>
      <div
        className={`${isOpen ? "" : "hidden"} date-picker border border-gray-400 shadow-gray-300 shadow-xs border-t-0 flex flex-col bg-white z-99 absolute left-0 right-0 pt-2 px-2`}
      >
        <div className="flex justify-between px-2 items-center">
          <button type="button" onClick={() => moveNextMonth(false)}>
            <NavArrowLeft className="cursor-pointer" />
          </button>
          <p>
            {MONTH_LIST[dateDetails.month]} {dateDetails.year}
          </p>
          <button type="button" onClick={() => moveNextMonth(true)}>
            <NavArrowRight className="cursor-pointer" />
          </button>
        </div>
        <div className="dates-container mt-3 grid grid-cols-1 gap-y-2 pb-2">
          <div className="week-list flex justify-around border-b border-gray-200 ">
            {DAY_LIST.map((val: string , index : number) => (
              <span key={index} className="font-extralight text-gray-500">{val}</span>
            ))}
          </div>
          <div className="date-list grid grid-cols-7 gap-x-1 gap-y-1">
            {dateList.map((val: Date , index : number) => {
              return (
                <span
                key={index}
                  className={`
                    ${selectedDate.month == val.getMonth() + 1 && selectedDate.date == val.getDate() && selectedDate.year == val.getFullYear() ? "bg-gray-200 font-medium" : ""}
                    text-center cursor-pointer hover:outline-1 hover:outline-gray-400
                `}
                  onClick={() => {
                    setSelectedDate({
                      month: val.getMonth() + 1,
                      year: val.getFullYear(),
                      date: val.getDate(),
                    });
                    setOpen(false);
                    onChange?.(
                      `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}`,
                    );
                  }}
                >
                  {val.getDate()}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
