import {
  Accessibility,
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  BusFront,
  CalendarDays,
  ChevronDown,
  CircleGauge,
  CreditCard,
  GraduationCap,
  MapPin,
  Pause,
  Phone,
  Play,
  Plug,
  School,
  ShieldCheck,
  Snowflake,
  Ticket,
  UserRound,
  Wifi,
  Wrench,
} from 'lucide-react';

// Keep the existing names so ticket and home page data can share one icon map.
const icons = {
  arrow: ArrowRight,
  pin: MapPin,
  college: GraduationCap,
  school: School,
  event: Ticket,
  calendar: CalendarDays,
  person: UserRound,
  chevron: ChevronDown,
  swap: ArrowLeftRight,
  phone: Phone,
  card: CreditCard,
  pause: Pause,
  wheel: CircleGauge,
  wrench: Wrench,
  snowflake: Snowflake,
  wifi: Wifi,
  plug: Plug,
  accessible: Accessibility,
  shield: ShieldCheck,
  badge: BadgeCheck,
  play: Play,
  bus: BusFront,
};

export default function SiteIcon({ name, ...props }) {
  const Icon = icons[name];
  return Icon ? <Icon size={22} strokeWidth={1.7} aria-hidden="true" {...props} /> : null;
}
