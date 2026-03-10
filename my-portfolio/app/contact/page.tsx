"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import Scales from "@/components/ui/scales";
import { TextSlideHover } from "@/components/ui/text-slide-hover";

const WORD = "CONTACT";

export default function Contact() {
    const hoverRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [animated, setAnimated] = useState(false);

    // Recalculate position on resize so the vertical word stays pinned to the left
    const recalcPosition = useCallback(() => {
        const hero = heroRef.current;
        if (!hero || !animated) return;

        const vw = window.innerWidth;

        // Hide the vertical word on mobile sizes
        if (vw < 768) {
            gsap.set(hero, { autoAlpha: 0 });
            return;
        }

        gsap.set(hero, { autoAlpha: 1 });

        const wordWidth = hero.scrollWidth;
        const lineHeight = hero.scrollHeight;
        const vh = window.innerHeight;
        const finalScale = (vh * 0.9) / wordWidth;
        const visualHalfWidth = (lineHeight * finalScale) / 2;

        gsap.set(hero, {
            x: -(vw / 2) + visualHalfWidth + 24,
            scale: finalScale,
        });
    }, [animated]);

    useEffect(() => {
        if (!animated) return;
        window.addEventListener("resize", recalcPosition);
        return () => window.removeEventListener("resize", recalcPosition);
    }, [animated, recalcPosition]);

    const handleClick = () => {
        if (animated) return;
        setAnimated(true);

        const hover = hoverRef.current;
        const hero = heroRef.current;
        const panel = panelRef.current;
        if (!hover || !hero || !panel) return;

        const vw = window.innerWidth;
        const isMobile = vw < 768;

        const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

        if (isMobile) {
            // Mobile: just fade out title and show panel centered
            tl.to(hover, {
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                ease: "power3.in",
            })
                .set(hover, { display: "none" })
                .set(panel, { display: "flex" })
                .fromTo(
                    panel.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.12,
                    }
                );
            return;
        }

        // Desktop: full animation with vertical word
        const letters = hero.querySelectorAll<HTMLSpanElement>(".letter");
        const wordWidth = hero.offsetWidth;
        const lineHeight = hero.offsetHeight;
        const vh = window.innerHeight;
        // Scale so rotated word fills ~90% of viewport height
        const finalScale = (vh * 0.9) / wordWidth;
        // After rotation, visual width = lineHeight * finalScale
        const visualHalfWidth = (lineHeight * finalScale) / 2;

        // 0. Seamless swap: hide TextSlideHover, show letter spans
        tl.set(hover, { autoAlpha: 0, pointerEvents: "none" })
            .set(hero, { autoAlpha: 1 });

        // 1. Rotate entire word -90deg (letters go sideways)
        tl.to(hero, {
            rotation: 90,
            scale: finalScale,
            duration: 0.8,
        });

        // 2. Rotate each letter +90deg (letters straighten to horizontal)
        tl.to(letters, {
            rotation: -90,
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.inOut",
        }, "-=0.2");

        // 3. Move to left side + scale to fill full viewport height
        tl.to(hero, {
            x: -(vw / 2) + visualHalfWidth + 24,
            duration: 0.9,
        }, "-=0.2");

        // 4. Fade in right contact panel
        tl.set(panel, { display: "flex" }, "-=0.3")
            .fromTo(
                panel.children,
                { opacity: 0, x: 60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.15,
                }
            );
    };

    return (
        <div className="font-alias relative min-h-screen overflow-hidden bg-black">
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                {/* TextSlideHover — visible before click, has hover effect */}
                <div
                    ref={hoverRef}
                    onClick={handleClick}
                    className="text-white absolute text-[12vw] font-bold uppercase cursor-pointer select-none"
                >
                    <TextSlideHover text="Contact" />
                </div>

                {/* Individual letter spans — invisible, used for GSAP animation */}
                <div
                    ref={heroRef}
                    className="absolute flex flex-row items-center invisible select-none"
                    style={{ willChange: "transform" }}
                >
                    {WORD.split("").map((char, i) => (
                        <span
                            key={i}
                            className="letter text-[12vw] font-bold uppercase leading-none tracking-tighter text-white/90 inline-block"
                            style={{ willChange: "transform" }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right-side contact panel (hidden until animation completes) */}
            <div
                ref={panelRef}
                className="fixed inset-0 z-20 hidden flex-col justify-center items-start pointer-events-none px-8 md:px-0"
                style={{ paddingLeft: "min(20%, max(2rem, 20vw))" }}
            >
                {/* Email */}
                <a
                    href="mailto:faik.hasanov05@gmail.com"
                    className="pointer-events-auto group block opacity-0"
                >
                    <span className="block text-[6vw] font-light leading-[0.95] text-white tracking-tight transition-colors duration-300 group-hover:text-white/60">
                        faik.hasanov05@
                        <br />
                        gmail.com
                    </span>
                </a>

                <div className="mt-12 flex gap-10 opacity-0 pointer-events-auto">
                    <a
                        href="https://github.com/F4IK05"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>

                    <a
                        href="http://www.linkedin.com/in/faiq-hasanov-58b102360"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}