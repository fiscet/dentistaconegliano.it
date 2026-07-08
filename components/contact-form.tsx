"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Send, CircleCheck } from "lucide-react";
import { submitContact, type ContactState } from "@/lib/actions/contact";

const treatments = [
  "Implantologia a Carico Immediato (Denti in 24h)",
  "Impianto Singolo",
  "Protesi Fissa su Impianti (All-on-4 / All-on-6)",
  "Implantologia Computer Guidata",
  "Altro Servizio / Visita Generale",
];

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium";

const labelClasses = "text-xs font-bold text-muted-foreground uppercase tracking-wider";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-12">
        <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-primary">
          <CircleCheck className="w-8 h-8" aria-hidden="true" />
        </div>
        <p className="font-heading text-lg font-bold text-foreground">
          Richiesta inviata con successo!
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Ti ricontatteremo al più presto per fissare la tua consulenza personalizzata.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot anti-bot: nascosto agli umani, i bot tendono a compilarlo. */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label>
          Non compilare
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className={labelClasses}>
            Nome e Cognome *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Es. Mario Rossi"
            className={inputClasses}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className={labelClasses}>
            Telefono *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="Es. 340 1234567"
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className={labelClasses}>
          Indirizzo Email *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="mario.rossi@esempio.it"
          className={inputClasses}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-treatment" className={labelClasses}>
          Seleziona Trattamento d&apos;Interesse
        </label>
        <select id="contact-treatment" name="treatment" className={inputClasses}>
          {treatments.map((treatment) => (
            <option key={treatment} value={treatment}>
              {treatment}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className={labelClasses}>
          Note o Messaggio
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Descrivi brevemente la tua situazione o richiedi un giorno preferito per la visita..."
          className={inputClasses}
        />
      </div>

      <div className="flex items-start gap-2.5 mt-2">
        <input
          id="contact-privacy"
          name="privacy"
          type="checkbox"
          className="mt-1 rounded border-border text-primary focus:ring-primary"
          required
        />
        <label htmlFor="contact-privacy" className="text-xs text-muted-foreground leading-normal">
          Acconsento al trattamento dei miei dati personali per finalità di contatto secondo la{" "}
          <Link
            href="https://www.iubenda.com/privacy-policy/29730377"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Privacy Policy
          </Link>
          .
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
        {pending ? "Invio in corso…" : "Invia Richiesta e Prenota"}
      </button>
    </form>
  );
}
