import moment from 'moment';
import { LogApp } from './utilities';

export const getTimeDuration = ({
  startTime,
  endTime,
  separator = ' - ',
  format = 'MM/DD/YYYY',
  noEnd,
}: {
  startTime?: number | string;
  endTime?: number | string;
  separator?: string;
  format?: string;
  noEnd?: boolean;
}) => {
  if (!startTime && !endTime) return;
  const timeS = moment(Number(startTime)).format(format);
  const timeE = noEnd ? 'Forever' : moment(Number(endTime)).format(format);
  const duration = timeS.concat(separator, timeE);
  return duration;
};

export const getValueFromDateTimeString = ({
  date,
  time,
  preFormat = ['DD-MM-YYYY', 'HH:mm:ss'],
}: {
  date?: string;
  time?: string;
  preFormat?: [string, string];
  // format?: string;
}) => {
  if (!date) return moment().valueOf();
  if (!time) return moment(date, preFormat[0]).valueOf();
  const dateTime = date + time;
  const dateTimeValue = moment(dateTime, preFormat[0] + preFormat[1]).valueOf();
  return dateTimeValue;
};

export const daysRemaining = (date: number | string, type?: 'days' | 'months') => {
  const eventdate = moment(date).startOf('day');
  const todaysdate = moment().startOf('day');
  return eventdate.diff(todaysdate, type || 'days');
};

export const daysRemainingUntilBirthday = (date: number | string, type?: 'days' | 'months') => {
  const todaysdate = moment().startOf('day');
  const eventdate = moment(date).startOf('day');
  const bDate = eventdate.year(todaysdate.year());
  LogApp('e2', eventdate);
  LogApp('day', bDate);
  // bDate.fromNow();

  const remaining = bDate.diff(todaysdate, type || 'days');
  if (remaining > 0) {
    return remaining;
  } else if (remaining < 0) {
    const birthdayInNextYear = bDate.year(todaysdate.year() + 1);
    LogApp('birthdayInNextYear', birthdayInNextYear);
    return birthdayInNextYear.diff(todaysdate, type || 'days');
  } else {
    LogApp('remaining', String(remaining));
    return 'birthday';
  }
};
