"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronRight, Sparkles } from "lucide-react";

import type { NavigationItem } from "@/types";

import { ApplyButton } from "@/components/actions/ApplyButton";
import { ThemeToggle } from "@/components/actions/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { uiCopy } from "@/data";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  readonly pathname: string;
  readonly items: readonly NavigationItem[];
  readonly applyUrl: string;
}

export function MobileNav({ pathname, items, applyUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={uiCopy.openNavMenu}
            />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>

        <SheetContent side="right" className="w-[340px] p-0 sm:w-[380px]">
          <div className="flex h-full flex-col">
            <div className="border-b px-6 py-6 pr-14">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Scholarship Portal</h2>
                <ThemeToggle />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore pages and discover opportunities.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
              {items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} />}
                  >
                    <div
                      className={cn(
                        "group flex h-12 items-center justify-between rounded-xl px-4 transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span className="font-medium">{item.title}</span>

                      <ChevronRight
                        className={cn(
                          "size-4 transition-transform duration-200",
                          active ? "" : "group-hover:translate-x-1",
                        )}
                      />
                    </div>
                  </SheetClose>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div className="border-t p-5">
              <div className="rounded-2xl border bg-muted/50 p-5 backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Sparkles className="size-4 text-primary" />
                  </div>

                  <h3 className="font-semibold">Ready to apply?</h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Start your scholarship journey today and discover
                  opportunities tailored for you.
                </p>

                <div className="mt-5">
                  <SheetClose render={<div className="w-full" />}>
                    <ApplyButton
                      href={applyUrl}
                      className="w-full justify-center"
                    />
                  </SheetClose>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
