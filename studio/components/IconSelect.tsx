import { useCallback } from "react";
import { set, unset, type StringInputProps } from "sanity";
import { Card, Grid, Stack, Text } from "@sanity/ui";
import {
  Check,
  Clock,
  Zap,
  Layers,
  Monitor,
  Shield,
  Award,
  Activity,
  GraduationCap,
  FileText,
  CreditCard,
  Volume2,
  Users,
  HeartPulse,
  Baby,
  Sparkles,
  Smile,
  Crown,
  Syringe,
  AlignCenter,
  Scissors,
  Sun,
  RefreshCw,
  Droplets,
  Wind,
  type LucideIcon,
} from "lucide-react";

// Mappa nome icona -> componente lucide. Deve restare allineata con
// iconOptions (studio/schemaTypes/shared/icons.ts) e con la mappa del sito
// (components/home/icon-map.ts) così l'anteprima nello Studio coincide con
// ciò che viene mostrato sul sito.
const icons: Record<string, LucideIcon> = {
  check: Check,
  clock: Clock,
  zap: Zap,
  layers: Layers,
  monitor: Monitor,
  shield: Shield,
  award: Award,
  activity: Activity,
  "graduation-cap": GraduationCap,
  "file-text": FileText,
  "credit-card": CreditCard,
  "volume-2": Volume2,
  users: Users,
  "heart-pulse": HeartPulse,
  baby: Baby,
  sparkles: Sparkles,
  smile: Smile,
  crown: Crown,
  syringe: Syringe,
  "align-center": AlignCenter,
  scissors: Scissors,
  sun: Sun,
  "refresh-cw": RefreshCw,
  droplets: Droplets,
  wind: Wind,
};

// Input custom: mostra le opzioni icona come griglia di anteprime cliccabili
// (icona vera + nome), invece del semplice menu a tendina testuale.
export function IconSelect(props: StringInputProps) {
  const { value, onChange, schemaType } = props;
  const options =
    ((schemaType.options as { list?: string[] } | undefined)?.list ?? []) as string[];

  const handleClick = useCallback(
    (name: string) => onChange(name === value ? unset() : set(name)),
    [onChange, value],
  );

  return (
    <Grid columns={[3, 4, 6]} gap={2}>
      {options.map((name) => {
        const Icon = icons[name];
        const selected = value === name;
        return (
          <Card
            key={name}
            as="button"
            type="button"
            padding={3}
            radius={2}
            border
            tone={selected ? "primary" : "default"}
            onClick={() => handleClick(name)}
            style={{ cursor: "pointer" }}
          >
            <Stack space={2} style={{ alignItems: "center" }}>
              {Icon ? <Icon size={22} aria-hidden /> : <Text size={1}>?</Text>}
              <Text size={0} muted style={{ textAlign: "center" }}>
                {name}
              </Text>
            </Stack>
          </Card>
        );
      })}
    </Grid>
  );
}
