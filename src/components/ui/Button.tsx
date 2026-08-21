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
    "inline-flex items-center justify-center rounded-full font-normal cursor-pointer select-none whitespace-nowrap leading-none",
    "transition-[color,background-color,border-color,opacity,box-shadow] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]",
    "active:opacity-90 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    variant === "primary" && "bg-white text-[#141414] hover:bg-white/90",
    variant === "ghost" && "text-muted hover:text-white",
    variant === "outline" &&
      "border border-[#3f3f3f] bg-transparent text-white hover:border-[#666] hover:bg-[#1f1f1f]",
    size === "default" && "h-11 w-full px-5 sm:w-auto sm:px-8 text-base",
    size === "sm" && "h-9 px-4 sm:px-5 text-sm",
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
