// Calcula a data de x (argumento da função) meses atras
export const fromDate = (months: number): Date => {
  const today = new Date().getTime();
  const rollbackInMonths = 2629800000 * months;

  const newDate = new Date(today - rollbackInMonths);

  return newDate;
};

// Formata a data em uma string pronta para ser enviada para a requisição da api
export const formatDate = (date: Date): string => {
  const stringDate = date.toISOString();
  return stringDate.substring(0, stringDate.indexOf("T"));
};
