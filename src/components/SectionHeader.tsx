import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  className?: string;
};

export const SectionHeader = ({ eyebrow, title, subtitle, align = "center", className }: Props) => (
  <div
    className={cn(
      "mx-auto max-w-3xl",
      align === "center" ? "text-center" : "text-start",
      className
    )}
  >
    {eyebrow && (
      <span className="mb-3 inline-block rounded-full border border-border bg-highlight px-3 py-1 text-xs font-semibold uppercase tracking-wider text-highlight-foreground">
        {eyebrow}
      </span>
    )}
    {title && (
      <h2 className="text-balance text-3xl font-bold leading-tight text-primary md:text-5xl">
        {title}
      </h2>
    )}
    {subtitle && (
      <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">{subtitle}</p>
    )}
  </div>
);
