import { describe, it, expect } from "vitest";
import { participationSchema } from "@/lib/participation";
const valid = {
  enterprise: "Тестовое предприятие",
  region: "Свердловская область",
  person: "Иван",
  contact: "test@example.com",
  description: "Производство промышленного оборудования",
  comment: "",
  consent: true,
};
describe("Participation validation", () => {
  it("requires consent to process personal data", () => {
    expect(participationSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
  it("accepts a phone or email", () => {
    expect(participationSchema.safeParse(valid).success).toBe(true);
    expect(participationSchema.safeParse({ ...valid, contact: "+7 (999) 123-45-67" }).success).toBe(
      true,
    );
    expect(participationSchema.safeParse({ ...valid, contact: "incorrect" }).success).toBe(false);
  });
  it("requires the enterprise, region, contact person and description", () => {
    for (const key of ["enterprise", "region", "person", "description"])
      expect(participationSchema.safeParse({ ...valid, [key]: "" }).success).toBe(false);
  });
});
