import { levels } from "src/constants";

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

export const validatePassword = (query : string) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    return regex.test(query);
}

export function checkPasswordStrength(query : string) {
    const checks = [
        /[a-z]/,     // Lowercase
        /[A-Z]/,     // Uppercase
        /\d/,        // Digit
        /[@.#$!%^&*.?]/ // Special character
    ];
    let score = checks.reduce((acc, rgx : RegExp) => acc + Number(rgx.test(query)), 0);
    return score;
}

export function checkDayGap(dateToCheck: string, gap: number = 5): number {
  const diffInMs = new Date(dateToCheck).getTime() - new Date().getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}