import dayjs from './dayjs';

export function formatDateTime(date: Date | string | number, format = 'YYYY-MM-DD HH:mm') {
  return dayjs(date).format(format);
}

export function formatTime(date: Date | string | number) {
  return dayjs(date).format('HH:mm');
}

export function nowISO() {
  return new Date().toISOString();
}
