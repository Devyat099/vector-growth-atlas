import { describe, it, expect } from "vitest";
import {
  PHONE_PATTERN,
  caretForPhone,
  formatPhone,
  participationSchema,
  phoneDigits,
} from "@/lib/participation";

const valid = {
  enterprise: "Тестовое предприятие",
  region: "Свердловская область",
  person: "Иван",
  contact: "+7 (999) 123-45-67",
  description: "Производство промышленного оборудования",
  comment: "",
  consent: true,
};

describe("Participation validation", () => {
  it("requires consent to process personal data", () => {
    expect(participationSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
  it("accepts a complete phone in the +7 (XXX) XXX-XX-XX mask", () => {
    expect(participationSchema.safeParse(valid).success).toBe(true);
    expect(PHONE_PATTERN.test("+7 (999) 123-45-67")).toBe(true);
  });
  it("rejects anything that is not a complete phone in the mask", () => {
    for (const contact of [
      "incorrect",
      "",
      "test@example.com",
      "+7 (999) 123-45",
      "+7 (999) 123-45-6",
      "+79991234567",
      "8 (999) 123-45-67",
      "+7 (999) 123-45-678",
    ])
      expect(participationSchema.safeParse({ ...valid, contact }).success).toBe(false);
  });
  it("requires the enterprise, region, contact person and description", () => {
    for (const key of ["enterprise", "region", "person", "description"])
      expect(participationSchema.safeParse({ ...valid, [key]: "" }).success).toBe(false);
  });
});

describe("Phone mask", () => {
  it("normalizes typed text to 11 digits with the 7 country code", () => {
    expect(phoneDigits("9991234567")).toBe("79991234567");
    expect(phoneDigits("89991234567")).toBe("79991234567");
    expect(phoneDigits("+7 (999) 123-45-67")).toBe("79991234567");
    expect(phoneDigits("99912345671234")).toBe("79991234567");
    expect(phoneDigits("abc")).toBe("");
  });
  it("formats only the part the user has typed", () => {
    expect(formatPhone("")).toBe("");
    expect(formatPhone("7")).toBe("+7");
    expect(formatPhone("99")).toBe("+7 (99");
    expect(formatPhone("999")).toBe("+7 (999)");
    expect(formatPhone("999123")).toBe("+7 (999) 123");
    expect(formatPhone("99912345")).toBe("+7 (999) 123-45");
    expect(formatPhone("9991234567")).toBe("+7 (999) 123-45-67");
  });
  it("keeps the caret next to the digits already typed", () => {
    expect(caretForPhone("7999", 4)).toBe(7); // just before the closing bracket
    expect(caretForPhone("79991", 5)).toBe("+7 (999) 1".length);
    expect(caretForPhone("7999", 0)).toBe(0);
    expect(caretForPhone("7999", 9)).toBe("+7 (999)".length);
  });
});
