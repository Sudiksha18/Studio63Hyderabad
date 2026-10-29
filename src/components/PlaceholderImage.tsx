import { useState } from "react";
import { Camera } from "lucide-react";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: string;
  loading?: "lazy" | "eager";
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
  loading = "lazy",
}: Props) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const [loadedSrc, setLoadedSrc] = useState<string>();
  const loaded = loadedSrc === src;

  if (failedSrc === src || !src) {
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
    <div className={`relative overflow-hidden w-full h-full ${aspect} ${className}`} aria-busy={!loaded}>
      {!loaded && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      <img
        key={src}
        ref={(image) => {
          if (image?.complete && image.naturalWidth > 0) setLoadedSrc(src);
        }}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={loading === "eager" ? "high" : "auto"}
        className={`object-cover w-full h-full ${aspect} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
      />
    </div>
  );
}
