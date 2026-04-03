
export const nonCaseSensitiveSearch = (query : string ,text : string ) => {
    return query.toLowerCase().includes(text.toLowerCase());
}
export const caseSensitiveSearch = (query : string ,text : string ) => {
    let regex =  new RegExp(query , 'i') ;
    return regex.test(text);
}