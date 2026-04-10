import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(353,42%,32%,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Large ghost number */}
      <div className="relative select-none mb-2">
        <span
          className="font-black leading-none tracking-tighter"
          style={{
            fontSize: "clamp(120px, 22vw, 120px)",
            color: "transparent",
            WebkitTextStroke: "2px hsl(0,0%,90%)",
          }}
        >
          404
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-[28px] md:text-[36px] font-bold text-center mb-3 leading-tight"
        style={{ color: "var(--eerie-black)" }}
      >
        Page not found
      </h1>

      {/* Sub-copy */}
      <p className="text-center text-gray-500 max-w-sm mb-10 text-[15px] leading-relaxed">
        The page you're looking for
        doesn't exist or may have been moved.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <Link
          href="/"
          className="btn btn-primary flex items-center justify-center gap-2 px-10"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="btn btn-outline flex items-center justify-center gap-2 px-10"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
