'use client';

import type { ReactNode } from "react";
import { trackCTA } from "@/lib/tracking/analytics";
import type { CTAName, EventLocation, Channel } from "@/lib/tracking/types";

interface TrackedLinkProps {
  href: string;
  ctaName: CTAName;
  location: EventLocation;
  channel?: Channel;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

// Thin client-side wrapper so server components (e.g. Footer) can render a
// tracked link without becoming client components themselves.
export default function TrackedLink({ href, ctaName, location, channel, target, rel, className, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => trackCTA({ cta_name: ctaName, location, channel })}
    >
      {children}
    </a>
  );
}
