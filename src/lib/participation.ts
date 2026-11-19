import { z } from "zod";

export const participationSchema = z.object({
  enterprise: z.string().trim().min(2, "Укажите название предприятия").max(200),
  region: z.string().trim().min(2, "Укажите регион").max(120),
  person: z.string().trim().min(2, "Укажите контактное лицо").max(120),
  contact: z
    .string()
    .trim()
    .max(255)
    .refine(
      (value) =>
        z.string().email().safeParse(value).success || /^\+?[\d\s()\-]{10,22}$/.test(value),
      "Введите корректный телефон или email",
    ),
  description: z.string().trim().min(10, "Расскажите о предприятии: минимум 10 символов").max(3000),
  comment: z.string().trim().max(2000),
  consent: z.boolean().refine(Boolean, "Подтвердите согласие"),
});
