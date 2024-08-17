export const getDateTimeUTC3 = (value = '') => {
  if (!value) return value;
  const data = new Date(value);
  data.setHours(data.getHours() + 3);
  const dateString = data.toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return dateString.replace(',', '');
};
