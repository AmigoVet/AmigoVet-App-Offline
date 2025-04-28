export const calculatePartoDate = (startDate: Date, gestationDays: number = 280): Date => {
    const partoDate = new Date(startDate);
    partoDate.setDate(partoDate.getDate() + gestationDays);
    return partoDate;
  };