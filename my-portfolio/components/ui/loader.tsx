"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
}

function SplitChars({ text, addFirstChar = false }: { text: string; addFirstChar?: boolean }) {
    const words = text.split(" ");
    return (
        <>
            {words.map((word, wi) => (
                <span key={wi}>
                    {wi > 0 && " "}
                    {word.split("").map((ch, charIndex) => {
                        const isFirst = addFirstChar && charIndex === 0;
                        return (
                            <span
                                key={`${wi}-${charIndex}`}
                                className={`char relative inline-block overflow-hidden${isFirst ? " first-char origin-top-left" : ""}`}
                                style={{ lineHeight: 1 }}
                            >
                                <span className="relative inline-block -translate-y-full will-change-transform" style={{ paddingBottom: "0.15em", paddingTop: "0.1em" }}>
                                    {ch}
                                </span>
                            </span>
                        );
                    })}
                </span>
            ))}
        </>
    );
}

function SplitWords({ text }: { text: string }) {
    return (
        <>
            {text.split(" ").map((word, i) => (
                <span
                    key={i}
                    className="word relative inline-block -translate-y-full will-change-transform"
                >
                    {word}
                </span>
            ))}
        </>
    );
}

/* ── Loader component ── */
export const Loader = () => {
    const [done, setDone] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(CustomEase);
        CustomEase.create("hop", ".8, 0, .3, 1");

        const isMobile = window.innerWidth <= 1000;
        const siteContent = document.querySelector(".site-content") as HTMLElement;

        if (siteContent) {
            gsap.set(siteContent, {
                clipPath: "polygon(0 48%, 0 48%, 0 52%, 0 52%)",
            });
        }

        

        gsap.set(".split-overlay .intro-title .first-char", {
            x: isMobile ? "7.5rem" : "18rem",
            y: isMobile ? "-1rem" : "-2.75rem",
            fontWeight: "900",
            scale: 0.75,
        });

        gsap.set(".split-overlay .char", {
            x: isMobile ? "-3rem" : "-8rem",
            fontSize: isMobile ? "6rem" : "14rem",
            fontWeight: "500",
        });

        const tl = gsap.timeline({ defaults: { ease: "hop" } });
        const tags = gsap.utils.toArray<HTMLElement>(".tag");

        // tags appear
        tags.forEach((tag, index) => {
            tl.to(
                tag.querySelectorAll("p .word"),
                { y: "0%", duration: 0.75 },
                0.5 + index * 0.1
            );
        });

        tl
            // intro title chars slide in
            .to(
                ".preloader .intro-title .char span",
                { y: "0%", duration: 0.75, stagger: 0.05 },
                0.5
            )
            .to(
                ".preloader .intro-title .char:not(.first-char)",
                { marginLeft: 0, marginRight: 0, padding: 0, duration: 0.5, stagger: 0.03 },
                1.4
            )

        // tags disappear
        tags.forEach((tag, index) => {
            tl.to(
                tag.querySelectorAll("p .word"),
                { y: "100%", duration: 0.75 },
                1.5 + index * 0.1
            );
        });

        // preloader halves split away, content reveals
        tl.to(
            [".preloader", ".split-overlay"],
            {
                y: (i: number) => (i === 0 ? "-100%" : "100%"),
                duration: 1,
            },
            2
        )
            .to(
                ".site-content",
                {
                    clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1,
                },
                2
            )
            .call(() => {
                if (siteContent) {
                    gsap.set(siteContent, { clearProps: "clipPath" });
                }
                window.dispatchEvent(new CustomEvent("loader:done"));
                setDone(true);
            });

        return () => {
            tl.kill();
            if (siteContent) {
                gsap.set(siteContent, { clearProps: "clipPath" });
            }
        };
    }, []);

    if (done) return null;

    return (
        <>
            <div className="preloader fixed w-screen h-svh bg-white dark:bg-black text-black dark:text-white z-100">
                <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <h1 className="text-[6rem] font-semibold leading-none max-[1000px]:text-[2.5rem]">
                        <SplitChars text="hasanov faik" addFirstChar />
                    </h1>
                </div>
            </div>

            <div className="tags-overlay fixed w-screen h-svh z-100">
                <div className="tag absolute w-max text-[#5a5a5a] overflow-hidden top-[15%] left-[15%]">
                    <p className="text-[13px] font-medium">
                        <SplitWords text="Portfolio" />
                    </p>
                </div>
            </div>
        </>
    );
}