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

type DebounceFunction = (...args: any[]) => void;

export const debounce = <F extends DebounceFunction>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
