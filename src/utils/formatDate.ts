import { parseISO, format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(parseISO(date.toLocaleString('pt-br')), "dd/MM/yy HH:mm:ss");
};
