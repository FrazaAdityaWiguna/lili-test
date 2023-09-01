/**
 * Format a number value in Rupiah currency format (IDR)
 * @param amount - A number value to be formatted
 * @returns A string representing the given value in Rupiah currency format (IDR)
 */
export const formatRupiah = (amount: number, prefix?: boolean) => {
  const currency = "Rp";

  const formatted = amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  return prefix ? currency + formatted : formatted;
};
