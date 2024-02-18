
export const convertDateFormat = (dateString:string)=>{
    const [day, month, year] = dateString.split('-');
    const dateObject = `${year}-${month}-${day}`;
    return dateObject;
};