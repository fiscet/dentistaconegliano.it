import {
  Check,
  Clock,
  Zap,
  Layers,
  Monitor,
  Shield,
  Award,
  Activity,
  type LucideIcon,
} from "lucide-react";

// Mappa i nomi icona salvati in Sanity ai componenti lucide.
// Tenere allineata con iconOptions in studio/schemaTypes/shared/icons.ts.
const iconMap: Record<string, LucideIcon> = {
  check: Check,
  clock: Clock,
  zap: Zap,
  layers: Layers,
  monitor: Monitor,
  shield: Shield,
  award: Award,
  activity: Activity,
};

export function resolveIcon(name: string | null | undefined, fallback: LucideIcon): LucideIcon {
  return (name && iconMap[name]) || fallback;
}
