import { Card, Stack, Text, Heading } from "@sanity/ui";
import type { ReactNode } from "react";

// Pannello statico usato come prima voce delle cartelle "Pagine del Sito" e
// "Contenuti" nella sidebar: spiega in linguaggio semplice la differenza tra
// le due sezioni per chi non è tecnico (vedi structure.ts).
function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card padding={4} radius={2} tone="primary" margin={2}>
      <Stack space={3}>
        <Heading size={1}>{title}</Heading>
        <Text size={2} style={{ lineHeight: 1.6 }}>
          {children}
        </Text>
      </Stack>
    </Card>
  );
}

export function PagesInfoPanel() {
  return (
    <InfoPanel title="ℹ️ Cosa sono le Pagine del Sito">
      Ogni voce qui è UNICA: rappresenta una pagina fissa del sito (la Home, il Blog, i Video...).
      Qui modifichi il testo introduttivo, le immagini e la SEO di quella pagina specifica — non se
      ne possono creare o eliminare, ne esiste sempre e solo una per tipo.
    </InfoPanel>
  );
}

export function ContentInfoPanel() {
  return (
    <InfoPanel title="ℹ️ Cosa sono i Contenuti">
      Qui gestisci elenchi di elementi che si ripetono nel tempo: tanti articoli del Blog, tanti
      Servizi, tanti Video, tante Recensioni... Ogni voce è un documento separato che puoi
      aggiungere, modificare o eliminare liberamente, senza toccare gli altri.
    </InfoPanel>
  );
}
