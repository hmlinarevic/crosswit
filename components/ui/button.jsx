"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hint:
          "min-h-[32px] min-w-[96px] rounded-lg border-2 border-rose/10 bg-rose/10 font-roboto tracking-wide text-rose hover:border-rose hover:font-bold hover:bg-rose/80 hover:text-black hover:border-foam hover:bg-foam/10 hover:text-foam",
        pine:
          "rounded-lg bg-pine/90 py-2 text-text shadow-lg shadow-pine/20 transition-all duration-200 hover:bg-pine hover:shadow-pine/30 disabled:opacity-50",
        iris:
          "rounded-lg bg-iris/90 py-2 text-text shadow-lg shadow-iris/20 transition-all duration-200 hover:bg-iris hover:shadow-iris/30 disabled:opacity-50",
        muted:
          "border border-subtle/40 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-subtle/70 hover:bg-overlay/30 hover:text-subtle",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
