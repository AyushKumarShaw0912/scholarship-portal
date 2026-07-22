import Link from "next/link";

import type { NavigationItem } from "@/types/";

import { cn } from "@/lib/utils";

interface DesktopNavProps {
  readonly pathname: string;
  readonly items: readonly NavigationItem[];
}

export function DesktopNav({ pathname, items }: DesktopNavProps) {
  return (
    <nav
      className="hidden items-center gap-1 lg:flex"
      aria-label="Primary Navigation"
    >
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
