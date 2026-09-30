/**
 * GrainOverlay — adds a subtle analog film grain texture
 * Wrap any section with className="grain-overlay" for the CSS-based version,
 * OR use this component as a positioned child inside a relative container.
 */
export default function GrainOverlay({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
}
