const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${year}-${month}-${day}`;
};

export const getCurrentDate = (baseDate?: Date): string => {
  return formatDate(baseDate || new Date());
};

export const getTomorrowDate = (baseDate?: Date): string => {
  const date = new Date(baseDate || new Date());
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};
