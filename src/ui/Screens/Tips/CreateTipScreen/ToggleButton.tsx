"use client";

import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button"; // Exemplo: se você já tiver um variant para botões

// Exemplo de criação de variantes; você pode ajustar conforme seu design.
const toggleButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-gray-200 hover:bg-gray-300",
        outline: "border border-gray-300 hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-4 text-base",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleButtonVariants> {
  pressed?: boolean;
  onPressedChange?: () => void;
  children: React.ReactNode;
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    { children, pressed = false, onPressedChange, variant, size, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onPressedChange}
        aria-pressed={pressed}
        className={toggleButtonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleButton.displayName = "ToggleButton";
