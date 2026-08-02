"use client";

import { usePathname } from "next/navigation";

import type { NavigationItem, SiteSettings } from "@/types";

import { ApplyButton } from "@/components/actions/ApplyButton";
import { ThemeToggle } from "@/components/actions/ThemeToggle";
import { Container, Brand } from "@/layout";
import { useScroll } from "@/hooks";
import { cn } from "@/lib/utils";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

interface NavbarProps {
  readonly site: SiteSettings;
  readonly navigation: readonly NavigationItem[];
}

export function Navbar({ site, navigation }: NavbarProps) {
  const pathname = usePathname();
  const { isScrolled } = useScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/85 shadow-sm backdrop-blur-xl"
          : "bg-background/70 backdrop-blur-lg",
      )}
    >
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between">
          <Brand
            shortName={site.shortName}
            tagline={site.tagline}
            logoUrl={site.logoUrl}
          />

          <DesktopNav pathname={pathname} items={navigation} />

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <ApplyButton className="hidden lg:inline-flex" />

            <MobileNav
              pathname={pathname}
              items={navigation}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
