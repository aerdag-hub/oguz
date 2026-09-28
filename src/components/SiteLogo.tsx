"use client";

import { useState } from "react";

export default function SiteLogo({ siteName }: { siteName: string }) {
  const [hasLogo, setHasLogo] = useState(true);
  return (
    <span className="flex items-center gap-2">
      {hasLogo && (
        <img
          src="/logo.png"
          alt={siteName + " logosu"}
          className="h-14 w-auto object-contain md:h-16"
          onError={() => setHasLogo(false)}
        />
      )}
      {!hasLogo && (
        <>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 font-bold text-slate-900">
            B
          </span>
          <span className="text-lg font-bold text-slate-900">{siteName}</span>
        </>
      )}
    </span>
  );
}
