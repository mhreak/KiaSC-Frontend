export const toPersianDigits = (
  num: number | string | undefined,
): string | undefined => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  if (typeof num === "number")
    return num?.toString().replace(/\d/g, (digit: any) => persianDigits[digit]);
  if (typeof num === "string")
    return num.replace(/\d/g, (digit: any) => persianDigits[digit]);
  return undefined;
};

export const toEnglishDigits = (
  input: string | number | undefined,
): string | undefined => {
  if (typeof input === "number") {
    return input.toString();
  }
  if (input === undefined) return undefined;

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  return input.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persianDigits.indexOf(digit);
    if (persianIndex !== -1) {
      return englishDigits[persianIndex];
    }
    return digit;
  });
};

export const digitDivider = (value: string) => {
  if (!value) return "";

  return Number(value).toLocaleString("en-US");
};

export const removeCommas = (str: string): string => {
  return str?.replaceAll(/[٬,]]/g, "");
};

export const toPersianLetters = (num: number) => {
  const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const tens = [
    "",
    "ده",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const hundreds = [
    "",
    "یکصد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];
  const thousands = ["", "هزار", "میلیون", "میلیارد"];

  if (num === 0) return "صفر";

  let word = "";

  let numStr = num.toString();

  // Processing each 3-digit chunk
  for (let i = 0; i < numStr.length; i += 3) {
    const chunk = Number.parseInt(
      numStr.substring(Math.max(0, numStr.length - 3 - i), numStr.length - i),
      10,
    );

    if (chunk) {
      let chunkWord = "";

      // Hundreds
      chunkWord += hundreds[Math.floor(chunk / 100)];

      // Tens and Ones
      const remainder = chunk % 100;
      if (remainder < 10) {
        chunkWord +=
          (chunkWord && ones[remainder] ? " و " : "") + ones[remainder];
      } else if (remainder < 20) {
        chunkWord += (chunkWord ? " و " : "") + teens[remainder - 10];
      } else {
        chunkWord +=
          (chunkWord ? " و " : "") + tens[Math.floor(remainder / 10)];
        chunkWord += remainder % 10 ? " و " + ones[remainder % 10] : "";
      }

      // Thousands, Millions, etc.
      chunkWord += (chunkWord ? " " : "") + thousands[Math.floor(i / 3)];

      word = chunkWord + (word ? " و " + word : "");
    }
  }

  return word;
};
