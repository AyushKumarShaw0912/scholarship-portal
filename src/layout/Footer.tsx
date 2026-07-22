import Link from "next/link";
import { Mail } from "lucide-react";

import { navigation, siteConfig } from "@/config";

import { Button } from "@/components/ui/button";

import { Brand } from "./Brand";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          {/* Brand */}
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
                Apply Now
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>

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

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-sm text-muted-foreground md:flex-row">
          <p>{siteConfig.copyright}</p>

          <p>Made with ❤️ in India</p>
        </div>
      </Container>
    </footer>
  );
}
