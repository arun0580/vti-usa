import {
  GraduationCap,
  Hand,
  Layers,
  Megaphone,
  PenTool,
  Settings,
  ShieldCheck,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  hand: Hand,
  pen: PenTool,
  wifi: Wifi,
  users: Users,
  shield: ShieldCheck,
  graduation: GraduationCap,
  megaphone: Megaphone,
  layers: Layers,
  settings: Settings,
};

export function getCapabilityIcon(name: string): LucideIcon {
  return CAPABILITY_ICONS[name] ?? Hand;
}
