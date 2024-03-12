export const normalizeDate = value => {
  let date = new Date(value);
  let day = value.slice(0, 10).split('-').reverse().join('.');
  let time = `${date.getHours()}:${date.getMinutes()}`;
  return { day, time };
};
