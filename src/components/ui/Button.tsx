import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "default" | "sm";
  target?: string;
  rel?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-normal transition-colors touch-manipulation",
    variant === "primary" && "bg-white text-[#141414] hover:bg-white/90",
    variant === "ghost" && "text-muted hover:text-white",
    variant === "outline" &&
      "border border-[#454545] bg-transparent text-white hover:border-[#666] hover:bg-[#252525]",
    size === "default" && "h-10 w-full px-5 sm:w-auto sm:px-8 text-base",
    size === "sm" && "h-[29px] px-3 sm:px-4 text-sm",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className,
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
