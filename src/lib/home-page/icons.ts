import {
  Building2,
  GraduationCap,
  Headphones,
  ImageIcon,
  Landmark,
  MonitorPlay,
  School,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const HOME_ICONS: Record<string, LucideIcon> = {
  school: School,
  graduation: GraduationCap,
  building: Building2,
  landmark: Landmark,
  image: ImageIcon,
  monitor: MonitorPlay,
  wrench: Wrench,
  headphones: Headphones,
  truck: Truck,
  shield: ShieldCheck,
};

export function getHomeIcon(name: string): LucideIcon {
  return HOME_ICONS[name] ?? School;
}

export const HOME_ICON_OPTIONS = Object.keys(HOME_ICONS);
