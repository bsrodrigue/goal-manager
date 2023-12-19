import moment from "moment";

export function getDuration(date1: string, date2: string) {
  if (new Date(date1) >= new Date(date2)) return 0;
  const start = moment(date1);
  const end = moment(date2);

  return end.diff(start, 'days');
}
