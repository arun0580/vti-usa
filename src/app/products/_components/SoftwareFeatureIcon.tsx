/* Icon paths from Lucide (v0.460) — ISC, https://lucide.dev */

type SoftwareFeatureIconName = "hand" | "pen" | "wifi" | "users";

function SvgFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconHand({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </SvgFrame>
  );
}

function IconPen({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </SvgFrame>
  );
}

function IconWifi({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </SvgFrame>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </SvgFrame>
  );
}

const ICONS: Record<SoftwareFeatureIconName, (p: { className?: string }) => React.JSX.Element> =
  {
    hand: IconHand,
    pen: IconPen,
    wifi: IconWifi,
    users: IconUsers,
  };

export function SoftwareFeatureIcon({
  name,
  className,
}: {
  name: SoftwareFeatureIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}

