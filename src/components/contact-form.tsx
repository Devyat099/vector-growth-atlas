import { useState, type FormEvent } from "react";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { participationSchema } from "@/lib/participation";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = participationSchema.safeParse({
      ...Object.fromEntries(form),
      consent: form.get("consent") === "on",
    });
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
        ),
      );
      return;
    }
    setErrors({});
    setComplete(true);
  }
  if (complete)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={44} />
        <h3>Проверка пройдена</h3>
        <p>
          Это демонстрационная форма. Данные не отправлены и не сохранены. Реальная отправка будет
          доступна после подключения приёма заявок.
        </p>
        <Button variant="outline" onClick={() => setComplete(false)}>
          Заполнить ещё раз
        </Button>
      </div>
    );
  return (
    <form onSubmit={submit} noValidate>
      <div className="demo-note">
        Демонстрационный режим — данные не отправляются и не сохраняются.
      </div>
      <div className="form-grid">
        {(
          [
            ["enterprise", "Название предприятия", "Например, название вашей компании"],
            ["region", "Регион", "Область, край или республика"],
            ["person", "Контактное лицо", "Ваше имя"],
            ["contact", "Телефон или электронная почта", "+7 или email"],
            [
              "description",
              "Краткое описание предприятия",
              "Что вы производите? Чем гордится ваша команда?",
            ],
            ["comment", "Комментарий (необязательно)", "Что ещё нам стоит знать?"],
          ] as const
        ).map(([name, label, placeholder]) => (
          <div
            className={`form-field ${name === "description" || name === "comment" ? "full" : ""}`}
            key={name}
          >
            <label htmlFor={`form-${name}`}>{label}</label>
            {name === "description" || name === "comment" ? (
              <textarea
                id={`form-${name}`}
                name={name}
                placeholder={placeholder}
                maxLength={name === "comment" ? 2000 : 3000}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `error-${name}` : undefined}
              />
            ) : (
              <input
                id={`form-${name}`}
                name={name}
                placeholder={placeholder}
                maxLength={255}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `error-${name}` : undefined}
              />
            )}
            {errors[name] && (
              <span className="field-error" id={`error-${name}`} role="alert">
                {errors[name]}
              </span>
            )}
          </div>
        ))}
      </div>
      <label className="consent-label">
        <input type="checkbox" name="consent" />Я согласен на обработку персональных данных для
        рассмотрения заявки на участие в проекте. В демонстрационном режиме обработка и передача не
        выполняются.
      </label>
      {errors["consent"] && (
        <p className="field-error" role="alert">
          {errors["consent"]}
        </p>
      )}
      <Button type="submit" size="hero" variant="hero">
        Проверить заявку <ArrowUpRight />
      </Button>
    </form>
  );
}
