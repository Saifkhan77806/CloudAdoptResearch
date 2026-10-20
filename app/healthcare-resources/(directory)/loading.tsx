export default function HealthcareResourcesLoading() {
  return (
    <main aria-busy="true" aria-label="Loading healthcare resources" className="mx-auto min-h-screen max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
      <div className="mt-3 h-9 w-72 max-w-full animate-pulse rounded bg-secondary" />
      <div className="mt-3 h-5 max-w-2xl animate-pulse rounded bg-secondary" />
      <div className="mt-8 grid gap-4 rounded-2xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-secondary" />
            <div className="h-12 animate-pulse rounded bg-secondary" />
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-44 animate-pulse rounded-2xl border bg-card" />
        ))}
      </div>
      <p className="sr-only" role="status">Loading healthcare resources…</p>
    </main>
  );
}
