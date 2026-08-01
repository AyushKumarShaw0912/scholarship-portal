import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

import { navigation, siteConfig } from "@/config";
import { uiCopy } from "@/data";

import { Button } from "@/components/ui/button";

import { Brand } from "./Brand";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/40 backdrop-blur-[2px]">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <div className="space-y-4">
            <Brand />

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              {siteConfig.description}
            </p>

            <Button>
              <Link
                href={siteConfig.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uiCopy.applyNow}
              </Link>
            </Button>
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
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4" />
                {siteConfig.email}
              </a>

              <a
                href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-sm text-muted-foreground md:flex-row">
          <p>{siteConfig.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
