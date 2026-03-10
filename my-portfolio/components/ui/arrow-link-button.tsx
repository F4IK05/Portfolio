"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";
import { TextSlideHover } from "./text-slide-hover";
import { cn } from "@/lib/utils";

interface ArrowLinkButtonProps {
    href: string;
    text: string;
    className?: string;
    textSize?: string;
}

const ArrowLinkButton = forwardRef<HTMLAnchorElement, ArrowLinkButtonProps>(
    ({ href, text, className, textSize = "text-[30px]" }, ref) => {
        return (
            <Link
                target="_blank"
                ref={ref}
                href={href}
                className={cn(
                    "w-fit flex items-center justify-between bg-black text-white rounded-full p-1",
                    className
                )}
            >
                <TextSlideHover
                    className={cn("uppercase tracking-tighter p-1", textSize)}
                    text={text}
                />
                <div className="bg-white p-2 rounded-full">
                    <ArrowRight color="black" className="w-7 h-7" />
                </div>
            </Link>
        );
    }
);

ArrowLinkButton.displayName = "ArrowLinkButton";

export default ArrowLinkButton;
