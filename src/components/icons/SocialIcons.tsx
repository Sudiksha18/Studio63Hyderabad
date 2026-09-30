type Props = { size?: number; className?: string; strokeWidth?: number };

// Minimal line-style social glyphs (lucide-react no longer ships brand icons).
export function InstagramIcon({ size = 20, className, strokeWidth = 1.5 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, className, strokeWidth = 1.5 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5 15 12l-4.5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
