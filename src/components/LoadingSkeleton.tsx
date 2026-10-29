export default function LoadingSkeleton({ form = false }: { form?: boolean }) {
  return (
    <div role="status" aria-label={form ? "Loading booking form" : "Loading page"}
      className={form ? "max-w-5xl mx-auto p-6 md:p-10" : "mx-auto max-w-7xl px-6 md:px-14 pt-32 pb-28"}>
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true" className="space-y-6">
        <div className="skeleton h-3 w-32 mx-auto" />
        <div className="skeleton h-14 w-3/4 max-w-xl mx-auto" />
        <div className="skeleton h-4 w-2/3 mx-auto" />
        <div className={`grid gap-6 pt-8 ${form ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {Array.from({ length: form ? 4 : 3 }, (_, i) => (
            <div key={i} className={`skeleton ${form ? "h-20" : "aspect-[4/5]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
