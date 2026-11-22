import { z } from "zod";

/** Full Russian phone number: country code + 10 digits. */
export const PHONE_MAX_DIGITS = 11;
export const PHONE_PLACEHOLDER = "+7 (999) 123-45-67";
/** Completed mask: +7 (XXX) XXX-XX-XX */
export const PHONE_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

/**
 * Keeps only the leading digits of a Russian phone number and normalizes the
 * country code: an optional 8/7 prefix becomes 7, so 9991234567 -> 79991234567.
 */
export function phoneDigits(input: string): string {
  const digits = input.replace(/\D/g, "").replace(/^8/, "7");
  if (!digits) return "";
  return (digits.startsWith("7") ? digits : `7${digits}`).slice(0, PHONE_MAX_DIGITS);
}

/** Formats digits as +7 (XXX) XXX-XX-XX, showing only the part already typed. */
export function formatPhone(input: string): string {
  const digits = phoneDigits(input);
  if (!digits) return "";
  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

/**
 * Caret offset inside the formatted value that keeps the given number of its
 * digits (the leading country-code 7 included) to the left of the caret.
 */
export function caretForPhone(digits: string, digitsBefore: number): number {
  const formatted = formatPhone(digits);
  if (digitsBefore <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    const char = formatted.charAt(i);
    if (char >= "0" && char <= "9") {
      seen += 1;
      if (seen === digitsBefore) return i + 1;
    }
  }
  return formatted.length;
}

export const participationSchema = z.object({
  enterprise: z.string().trim().min(2, "Укажите название предприятия").max(200),
  region: z.string().trim().min(2, "Укажите регион").max(120),
  person: z.string().trim().min(2, "Укажите контактное лицо").max(120),
  contact: z
    .string()
    .trim()
    .max(255)
    .refine(
      (value) => PHONE_PATTERN.test(value),
      "Введите телефон в формате +7 (XXX) XXX-XX-XX",
    ),
  description: z.string().trim().min(10, "Расскажите о предприятии: минимум 10 символов").max(3000),
  comment: z.string().trim().max(2000),
  consent: z.boolean().refine(Boolean, "Подтвердите согласие"),
});
