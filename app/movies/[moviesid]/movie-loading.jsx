"use client";
import { useState, useEffect } from "react";

export default function MovieLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Stimulating Loading Behaviour
    const timer = setTimeout(() => setIsLoading(false, 1500));

    return () => clearTimeout(timer);
  });

  return (
    <div className="text-center text-amber-700">
      {isLoading ? "Movie Loading Complete " : "Movie Loading Complete"}
    </div>
  );
}
