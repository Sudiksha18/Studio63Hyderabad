import { useState } from "react";
import { Camera } from "lucide-react";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: string;
};

/**
 * Renders a real photograph when `src` resolves, otherwise falls back to an
 * elegant placeholder that works in both light and dark modes.
 * Drop real images into /public/images/... and point src at the path.
 */
export default function PlaceholderImage({
  src,
  alt,
  label,
  className = "",
  aspect = "aspect-[4/5]",
}: Props) {
  const [errored, setErrored] = useState(!src);

  if (errored || !src) {
    return (
      <div
        className={`relative overflow-hidden ${aspect} ${className}`}
        style={{
          background:
            "linear-gradient(135deg, #1E1A15 0%, #2A231B 50%, #1A1510 100%)",
        }}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
          <Camera size={28} strokeWidth={1.25} />
          {label && (
            <span className="font-sans text-[10px] tracking-wide text-center px-6 opacity-60 leading-snug">
              {label}
            </span>
          )}
        </div>
        {/* Subtle inner border */}
        <div className="absolute inset-0 border border-white/5" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`object-cover w-full h-full ${aspect} ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
