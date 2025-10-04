export function getCurrentMonthName() {
  return new Date().toLocaleString('default', { month: 'long' });
}

export function getFormattedDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yy = String(date.getFullYear());

  return `${mm}-${dd}-${yy}`;
}