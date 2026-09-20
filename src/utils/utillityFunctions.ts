import { toEnglishDigits } from "./numberConversions";

export default function validateNationalCode(
  code: number | string,
): boolean | undefined {
  const eCode = toEnglishDigits(code);

  if (eCode === undefined) return undefined;
  if (eCode.length !== 10) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(eCode[i]) * (10 - i);
  }

  const remainder = sum % 11;
  const checkDigit = Number(eCode[9]);

  return remainder < 2
    ? checkDigit === remainder
    : checkDigit === 11 - remainder;
}
