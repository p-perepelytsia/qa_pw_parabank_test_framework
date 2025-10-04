export function amountFormatStr(amount) {
  const num = Number(amount);
  const formatted = Math.abs(num).toFixed(2);
  return num < 0 ? `-$${formatted}` : `$${formatted}`;
}
