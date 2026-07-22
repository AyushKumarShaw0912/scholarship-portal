"use client";

import { usePathname } from "next/navigation";

import { navigation, siteConfig } from "@/config";

import { ApplyButton } from "@/components/actions/ApplyButton";
import { Container, Brand } from "@/layout";
import { useScroll } from "@/hooks";
import { cn } from "@/lib/utils";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const pathname = usePathname();

  const { isScrolled } = useScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/90 shadow-sm backdrop-blur-xl"
          : "bg-background/75 backdrop-blur-lg",
      )}
    >
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between">
          <Brand />

          <DesktopNav pathname={pathname} items={navigation} />

          <div className="flex items-center gap-3">
            <ApplyButton
              href={siteConfig.applyUrl}
              className="hidden lg:inline-flex"
            />

            <MobileNav
              pathname={pathname}
              items={navigation}
              applyUrl={siteConfig.applyUrl}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
