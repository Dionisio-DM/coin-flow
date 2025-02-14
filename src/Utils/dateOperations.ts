export const fromDate = (months: number): Date => {
  const today = new Date().getTime();
  const rollbackInMonths = 2629800000 * months;

  const newDate = new Date(today - rollbackInMonths);

  return newDate;
};

export const formatDate = (date: Date): string => {
  const stringDate = date.toISOString();
  return stringDate.substring(0, stringDate.indexOf("T"));
};
