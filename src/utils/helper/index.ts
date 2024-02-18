
export const convertDateFormat = (dateString:string)=>{
    const [day, month, year] = dateString.split('-');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

export const getFreePlanStartDate = ()=>{
    const freePlanStartDateObject = new Date();
    freePlanStartDateObject.setMonth(freePlanStartDateObject.getMonth() - 2);
    const freePlanStartDateString = `
        ${freePlanStartDateObject.getFullYear()}-
        ${freePlanStartDateObject.getMonth()}-
        ${freePlanStartDateObject.getDate()}
    `;
    return {freePlanStartDateString,freePlanStartDateObject};
}

export const isDateInFreePlanAccessPeriod = (date: any) => {
    const inputDateObject = new Date(date);
    const {freePlanStartDateObject} = getFreePlanStartDate();
    return inputDateObject <= freePlanStartDateObject;
};

export const compareTime = (startDate:string, endDate:string):boolean=>{
    const currentDate = new Date();
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    if (date1.getTime() >= date2.getTime() && currentDate >= date1) {
        return true;
    }
    return false;
}