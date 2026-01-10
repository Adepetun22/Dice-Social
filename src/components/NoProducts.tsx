// components/empty-states/NoProducts.tsx
import React from "react";
import { Link } from "react-router-dom";

type NoProductsProps = {
  title?: string;
  subtitle?: string;
  onClearFilters?: () => void;
  onReload?: () => void;
  backTo?: string;            // e.g. "/categories"
  backLabel?: string;         // e.g. "Back to Categories"
  className?: string;
};

const NoProducts: React.FC<NoProductsProps> = ({
  title = "No products found",
  subtitle = "Try adjusting your filters or search terms.",
  onClearFilters,
  onReload,
  backTo,
  backLabel = "Back to categories",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white/60 backdrop-blur-sm shadow-sm dark:bg-neutral-900/60
      ${className}`}
    >
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-200 to-amber-400 opacity-20 blur-3xl" />

      <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
        {/* Illustration */}
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center shadow-sm">
          {/* Simple open-box SVG */}
          <svg
            className="h-10 w-10 text-gray-400 dark:text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
            <path d="M3.3 7.3 12 12l8.7-4.7" />
            <path d="M12 22V12" />
          </svg>
        </div>

        {/* Text */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
          {subtitle}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100 hover:-translate-y-0.5 transition"
            >
              {/* sliders icon */}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
                <path d="M1 14h6M9 8h6M17 16h6" />
              </svg>
              Clear filters
            </button>
          )}
          {onReload && (
            <button
              onClick={onReload}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5 transition dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-200"
            >
              {/* refresh icon */}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7" />
              </svg>
              Reload
            </button>
          )}
          {backTo && (
            <Link
              to={backTo}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black hover:-translate-y-0.5 transition dark:bg-white dark:text-black"
            >
              {/* arrow-left icon */}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              {backLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoProducts;
