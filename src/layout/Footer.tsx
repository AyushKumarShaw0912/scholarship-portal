import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

import type { NavigationItem, SiteSettings } from "@/types";

import { uiCopy } from "@/data";
import { ApplyButton } from "@/components/actions/ApplyButton";

import { Brand } from "./Brand";
import { Container } from "./Container";

interface FooterProps {
  readonly site: SiteSettings;
  readonly navigation: readonly NavigationItem[];
}

export function Footer({ site, navigation }: FooterProps) {
  return (
    <footer className="mt-12 border-t bg-muted/40 backdrop-blur-[2px]">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-3">
          <div className="space-y-4">
            <Brand
              shortName={site.shortName}
              tagline={site.tagline}
              logoUrl={site.logoUrl}
            />

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              {site.description}
            </p>

            <ApplyButton />
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{uiCopy.quickLinks}</h3>

            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{uiCopy.contact}</h3>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4" />
                {site.email}
              </a>

              <a
                href={`https://wa.me/${site.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-5 text-sm text-muted-foreground md:flex-row">
          <p>{site.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
