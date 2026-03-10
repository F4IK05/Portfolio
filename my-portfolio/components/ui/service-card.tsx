import { ReactNode } from "react";
import ArrowLinkButton from "./arrow-link-button";

interface ServiceCardProps {
    category: string;
    title: string;
    description: string;
    href?: string;
    illustration?: ReactNode;
    className?: string;
}

export default function ServiceCard({
    category,
    title,
    description,
    href = "#",
    illustration,
    className = "",
}: ServiceCardProps) {
    return (
        <div
            className={`relative border border-white/20 flex flex-col bg-[#0a0a0a] rounded-[3.5rem] overflow-hidden select-none ${className}`}
        >
            <div className="relative z-10 flex flex-col items-center pt-10 px-8 lg:pt-14 lg:px-12">
                <span className="px-5 py-2 rounded-full border border-white/20 text-white/90 bg-black/40 backdrop-blur-sm text-xs font-medium tracking-wider uppercase whitespace-nowrap mb-6 lg:mb-8">
                    {category}
                </span>

                <h3 className="text-white text-4xl lg:text-5xl xl:text-[2rem] uppercase leading-none tracking-tighter mb-5 text-center">
                    {title}
                </h3>

                <p className="text-center text-white/50 text-sm lg:text-base leading-relaxed max-w-[90%] font-light">
                    {description}
                </p>
            </div>

            <div className="absolute inset-0 top-[35%] lg:top-[40%] z-0">
                {illustration}
            </div>

            <div className="absolute bottom-10 left-0 w-full flex justify-center z-20">
                <ArrowLinkButton href={href} text="VIEW" textSize="text-lg lg:text-xl font-medium" />
            </div>
        </div>
    );
}