import S from 'string';

const calculateDays = (startDate) => {
  const startDateSplitted = S(startDate).splitLeft('/');
  const start = new Date(startDateSplitted[2], startDateSplitted[1] - 1, startDateSplitted[0]);
  const today = new Date();
  return Math.ceil((today - start + 1) / 86400000);
};

export {
  calculateDays
};