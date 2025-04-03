import React from "react";

export default function logo({ className = "w-8 h-8" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="200"
      height="200"
      className={className}
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="gray"
        stroke="black"
        stroke-width="5"
      />

      <circle
        cx="100"
        cy="100"
        r="40"
        fill="black"
        stroke="white"
        stroke-width="3"
      />

      <circle cx="100" cy="20" r="10" fill="black" />
      <circle cx="100" cy="180" r="10" fill="black" />
      <circle cx="20" cy="100" r="10" fill="black" />
      <circle cx="180" cy="100" r="10" fill="black" />
      <circle cx="40" cy="40" r="10" fill="black" />
      <circle cx="160" cy="40" r="10" fill="black" />
      <circle cx="40" cy="160" r="10" fill="black" />
      <circle cx="160" cy="160" r="10" fill="black" />
    </svg>
  );
}
