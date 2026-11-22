export function getDateFromToday(daysToAdd: number): string {
  if (!Number.isInteger(daysToAdd)) {
    throw new Error('daysToAdd must be an integer.');
  }

  const date = new Date();

  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
