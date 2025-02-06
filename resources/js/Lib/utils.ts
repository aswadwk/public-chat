import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// toYearMonthDayHourMinute // YYYY-MM-DD HH:mm
export function toYearMonthDayHourMinute(date: any) {
  if (!date) return '-';

  date = new Date(date);

  return moment(date).format('YYYY-MM-DD HH:mm');
}

// toYearMonthDay // YYYY-MM
export function toYearMonth(date: any) {
  date = new Date(date);

  return moment(date).format('YYYY-MM');
}

// toYearMonthDay // YYYY-MM-DD
export function toYearMonthDay(date: any) {
  if (!date) return '';

  date = new Date(date);

  //check if date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  return moment(date).format('YYYY-MM-DD');
}

export function toIDR(number: any) {
  if (isNaN(number)) return "IDR 0,00";

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(number).replace("Rp", "IDR");
}

export function getLastNDays(n = 7) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - n + 1);
  return startDate.toISOString().split('T')[0];
}

export function getLastNMonths(n = 3) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(currentDate.getMonth() - n);
  return startDate.toISOString().split('T')[0];
}

export function yearOptions() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, index) => currentYear - index);

  return years.map(year => ({ label: year.toString(), value: year.toString() }));
}

export function isPdf(file: any) {
  return file.type === 'application/pdf';
}

export function diffDayNow(date: any) {
  // moment
  const dateMoment = moment(date);

  return dateMoment.diff(moment(), 'days');
}

export function formatDateBetter(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    // If the date is today, return only the time.
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    // Otherwise, return the full date and time.
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
}
