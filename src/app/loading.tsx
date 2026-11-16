export default function Loading() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />

      <div className="container-custom relative z-10 text-center px-4">
        {/* Animated spinner ring */}
        <div className="flex justify-center mb-10">
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <span
              className="absolute inset-0 rounded-full border-2 border-border"
              aria-hidden="true"
            />
            {/* Spinning arc */}
            <span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"
              aria-hidden="true"
            />
            {/* Inner pulse dot */}
            <span
              className="absolute inset-[22px] rounded-full bg-primary animate-pulse"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Skeleton heading */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="h-8 w-56 rounded-xl bg-surface animate-pulse" />
          <div className="h-4 w-80 rounded-lg bg-surface animate-pulse" />
          <div className="h-4 w-64 rounded-lg bg-surface animate-pulse" />
        </div>

        {/* Skeleton buttons */}
        <div className="flex justify-center gap-4">
          <div className="h-11 w-36 rounded-xl bg-surface animate-pulse" />
          <div className="h-11 w-36 rounded-xl bg-surface animate-pulse" />
        </div>

        {/* Screen reader text */}
        <p className="sr-only">Loading page content, please wait…</p>
      </div>
    </section>
  );
}
