import arcjet, { shield } from "@arcjet/next";

// Client Arcjet condiviso. Regola base: shield (attacchi comuni).
// Le regole specifiche (bot, rate limit, email) si aggiungono con withRule()
// nel punto d'uso. Se ARCJET_KEY non è impostata, protect() va in errore e il
// codice chiamante procede comunque (fail open) — il form resta funzionante,
// solo senza protezione, finché non aggiungi la chiave.
export const aj = arcjet({
  key: process.env.ARCJET_KEY ?? "",
  rules: [shield({ mode: "LIVE" })],
});
