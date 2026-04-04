
export const nonCaseSensitiveSearch = (query : string ,text : string ) => {
    return query.toLowerCase().includes(text.toLowerCase());
}
export const caseSensitiveSearch = (query : string ,text : string ) => {
    let regex =  new RegExp(query , 'i') ;
    return regex.test(text);
}

export const defaultDateFormat = (value : string) => {
    const date = new Date(value);
    const dateDetailed = {
        year : date.getFullYear(),
        month : String(date.getMonth() + 1).padStart(2, "0"),
        day : String(date.getDate()).padStart(2, "0")
    }
    return `${dateDetailed.year}-${dateDetailed.month}-${dateDetailed.day}`;
}

export const getAllDaysInMonth = (year : number , month : number) : Date[] => {
  const date = new Date(year, month, 1);
  const dates : Date[] = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}