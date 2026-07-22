"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import type { NavigationItem } from "@/types";

import { ApplyButton } from "@/components/actions/ApplyButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <SheetTrigger>
          <Button variant="ghost" size="icon" aria-label="Open Navigation Menu">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col">
          <nav className="mt-10 flex flex-col gap-2">
            {items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <SheetClose key={item.href}>
                  <Button
                    variant={active ? "secondary" : "ghost"}
                    className="justify-start"
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </Button>
                </SheetClose>
              );
            })}
          </nav>

          <div className="mt-auto pt-6">
            <SheetClose>
              <div>
                <ApplyButton href={applyUrl} className="w-full" />
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
