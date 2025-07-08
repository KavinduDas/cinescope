import React from "react";

// Dumb Component
export default function HeroBanner({
  title = "Cinescope Movie Database",
  description = "Sample Description",
}) {
  return (
    <section className="relative overflow-hidden min-h-[70vh] bg-red-500">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0  bg-[url('/images/heroBanner.png')] bg-contain bg-center opacity-60 dark:opacity-30"></div>
      </div>

      <div className="container relative px-4 py-10">
        <h1 className="py-20 text-3xl font-bold text-center text-white">
          {title}
        </h1>
        <p className="text-center text-white">{description}</p>
      </div>
    </section>
  );
}
