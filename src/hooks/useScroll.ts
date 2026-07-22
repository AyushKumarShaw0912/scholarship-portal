"use client";

import { useEffect, useState } from "react";

interface UseScrollOptions {
  readonly threshold?: number;
}

export function useScroll({ threshold = 10 }: UseScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return {
    isScrolled,
  };
}
