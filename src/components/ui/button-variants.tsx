import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "./button";

const heroButtonVariants = cva(
    "hover:cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                hero: "bg-gradient-primary text-primary-foreground hover:opacity-90 glow",
                outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                ghost: "text-primary hover:bg-primary/10",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "hero",
            size: "default",
        },
    }
);

interface HeroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "hero" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <Button
                className={cn(heroButtonVariants({ variant, size, className }))}
                variant={"none"}
                ref={ref}
                {...props}
            />
        );
    }
);

HeroButton.displayName = "HeroButton";

export { HeroButton, heroButtonVariants };