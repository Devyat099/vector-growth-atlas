import { useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { PHONE_PLACEHOLDER, caretForPhone, formatPhone, phoneDigits } from "@/lib/participation";

const PHONE_MAX_LENGTH = 18; // "+7 (999) 123-45-67"

type PhoneInputProps = {
  id: string;
  name: string;
  invalid: boolean;
  describedBy?: string | undefined;
};

/**
 * Controlled phone field that always shows the +7 (XXX) XXX-XX-XX mask while
 * the user types, pastes or deletes.
 */
export function PhoneInput({ id, name, invalid, describedBy }: PhoneInputProps) {
  const [digits, setDigits] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const caret = useRef<number | null>(null);
  const value = formatPhone(digits);

  useLayoutEffect(() => {
    if (caret.current !== null && ref.current) {
      ref.current.setSelectionRange(caret.current, caret.current);
      caret.current = null;
    }
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    const typed = phoneDigits(raw);
    const inputType = (event.nativeEvent as InputEvent).inputType ?? "";
    // Deleting a separator must not look like a no-op: drop one typed digit.
    const next = inputType.startsWith("delete")
      ? typed.length < digits.length
        ? typed
        : digits.slice(0, -1)
      : typed;
    const caretBefore = event.target.selectionStart ?? raw.length;
    const rawDigits = raw.replace(/\D/g, "");
    const typedBefore = raw.slice(0, caretBefore).replace(/\D/g, "").length;
    // The mask always leads with the 7 country code; typed text that does not
    // carry it sits one digit further right in the formatted value.
    const shifted = rawDigits !== "" && !/^[78]/.test(rawDigits);
    setDigits(next);
    caret.current = caretForPhone(next, typedBefore + (shifted ? 1 : 0));
  }

  // Tabbing in parks the caret inside the fixed "+7" prefix; typing there would
  // push every digit right, so start at the end of what is already filled in.
  function onFocus() {
    const el = ref.current;
    if (!el || el.value.length === 0) return;
    if (el.selectionStart !== null && el.selectionStart < 2) {
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }

  return (
    <input
      ref={ref}
      id={id}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={PHONE_PLACEHOLDER}
      value={value}
      maxLength={PHONE_MAX_LENGTH}
      onChange={onChange}
      onFocus={onFocus}
      aria-invalid={invalid}
      aria-describedby={describedBy}
    />
  );
}
