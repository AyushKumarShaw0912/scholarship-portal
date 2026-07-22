import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplyButtonProps {
  readonly href: string;
  readonly className?: string;
}

export function ApplyButton({ href, className }: ApplyButtonProps) {
  return (
    <Button className={cn(className)}>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        Apply Now
        <ArrowUpRight className="ml-2 size-4" />
      </Link>
    </Button>
  );
}
