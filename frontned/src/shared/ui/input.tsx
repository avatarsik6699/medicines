import * as React from "react";

import { cn } from "../utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        `flex w-full min-w-0 h-9 px-3 py-1 text-base md:text-sm rounded-md border border-input
          bg-transparent outline-none shadow-xs transition-[color,box-shadow]

          // Selection styles
          selection:bg-primary selection:text-primary-foreground

          // Placeholder styles
          placeholder:text-muted-foreground

          // File input styles
          file:inline-flex
          file:h-7
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          file:text-foreground

          // Focus styles
          focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]

          // Invalid state styles
          aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive

          // Disabled styles
          disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
          `,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
