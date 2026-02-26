"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useCallback } from "react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { usePathname } from "next/navigation";

const menuLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
]

const menuSocials = [
    { name: "GitHub", href: "" },
    { name: "LinkedIn", href: "" },
]

const underlineStyles = `
    relative 
    after:content-[''] after:absolute after:top-[102.5%] after:left-0 
    after:w-full after:h-[2px] 
    after:bg-black dark:after:bg-white
    after:scale-x-0 after:origin-right 
    after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.6,0,0.4,1)]
    hover:after:scale-x-100 hover:after:origin-left
`;

const dotStyles = `
  inline-block
  w-0 h-0 bg-black dark:bg-white rounded-full
  transition-all duration-500 ease-out
  mr-0
`;

export default function Navbar() {
    const pathname = usePathname();
    const openMenuRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isSelected, setIsSelected] = useState(false);

    const isAnimatingRef = useRef(false);

    // Получаем ref на main-контейнер (контент страницы)
    useGSAP(() => {
        containerRef.current = document.querySelector(".page-container") as HTMLDivElement;
    }, []);

    const handleMouseEnter = () => {
        if (isMenuOpen || isAnimatingRef.current) return;
        gsap.to(".line-top", { scaleX: 0.85, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: "auto" });
        gsap.to(".line-bot", { scaleX: 0.65, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const handleMouseLeave = () => {
        if (isMenuOpen || isAnimatingRef.current) return;
        gsap.to(".line-top, .line-bot", { scaleX: 1, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const openMenu = useCallback(() => {
        if (isAnimatingRef.current || isMenuOpen) return;
        isAnimatingRef.current = true;

        gsap.killTweensOf(".line-top, .line-bot");
        gsap.set(".line-top, .line-bot", { scaleX: 1 });

        // Анимация контейнера (основной контент уезжает)
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                rotation: 10,
                x: 300,
                y: 450,
                scale: 1.5,
                duration: 1.25,
                ease: "power4.inOut",
            });
        };

        gsap.to(".line-top", {
            y: 3,
            rotation: 45,
            transformOrigin: "center",
            duration: 0.5,
            ease: "power2.inOut"
        });

        gsap.to(".line-bot", {
            y: -3,
            rotation: -45,
            transformOrigin: "center",
            duration: 0.5,
            ease: "power2.inOut"
        });

        // Контент меню
        gsap.to(menuContentRef.current, {
            rotation: 0,
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.25,
            ease: "power4.inOut",
        });

        // Ссылки появляются со stagger
        gsap.to(".menu-link-item, .menu-social-item", {
            y: "0%",
            delay: 0.75,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        });

        // Clip-path
        gsap.to(".menu-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
            duration: 1.25,
            ease: "power4.inOut",
            onComplete: () => {
                isAnimatingRef.current = false;
                setIsMenuOpen(true);
            },
        });

    }, [isMenuOpen]);

    const closeMenu = useCallback(() => {
        if (isAnimatingRef.current || !isMenuOpen) return;
        isAnimatingRef.current = true;

        gsap.to(".line-top", {
            y: 0,
            rotation: 0,
            scaleX: 1,
            duration: 0.5,
            ease: "power2.inOut"
        });

        gsap.to(".line-bot", {
            y: 0,
            rotation: 0,
            scaleX: 1,
            duration: 0.5,
            ease: "power2.inOut"
        });

        // Контейнер возвращается
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                rotation: 0,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.25,
                ease: "power4.inOut",
            });
        }

        // Контент меню уходит
        gsap.to(menuContentRef.current, {
            rotation: -15,
            x: -100,
            y: -100,
            scale: 1.5,
            opacity: 0.25,
            duration: 1.25,
            ease: "power4.inOut",
        });

        // Clip-path закрытие
        gsap.to(".menu-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.25,
            ease: "power4.inOut",
            onComplete: () => {
                isAnimatingRef.current = false;
                setIsMenuOpen(false);
            },
        });


    }, [isMenuOpen]);

    const toggleMenu = () => {
        if (!isMenuOpen) openMenu();
        else closeMenu();
    };

    return (
        <>
            <nav className="sticky top-0 bg-white dark:bg-black text-black dark:text-white w-screen p-4 flex justify-between items-center z-2">
                <div>
                    <a href="#">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="400 393 230 240">
                            <path fill="#ffffff" opacity="1.000000" stroke="none" d=" M541.342651,416.013000   C541.336792,424.339539 541.147705,432.173828 541.398315,439.994019   C541.531494,444.150848 540.049133,445.425812 535.943237,445.402802   C510.293427,445.258911 484.642365,445.327789 458.991730,445.343872   C452.355194,445.348022 452.339020,445.377045 452.331787,451.992279   C452.317444,465.150726 452.512146,478.313354 452.218872,491.465332   C452.114166,496.160858 453.315796,497.931732 458.279633,497.769135   C468.761688,497.425751 479.265472,497.801575 489.755249,497.608154   C493.684845,497.535706 495.123260,499.040131 495.072388,502.842316   C494.929901,513.500366 494.860596,524.161621 494.963928,534.819702   C495.002228,538.774414 493.273499,540.097900 489.529938,540.002747   C478.711517,539.727600 467.885071,539.732971 457.070007,539.378052   C453.326599,539.255249 452.224335,540.537170 452.244476,544.245544   C452.373718,568.063171 452.291870,591.881897 452.273102,615.700317   C452.267670,622.582703 452.098694,622.832214 445.434723,622.881775   C435.774719,622.953613 426.112122,622.792725 416.453857,622.940063   C412.481293,623.000671 410.835968,621.694763 410.839630,617.463867   C410.900208,547.674316 410.864136,477.884613 410.741119,408.095123   C410.734009,404.068054 412.326874,402.914856 416.068115,402.921967   C456.042938,402.997894 496.018097,403.021088 535.992859,402.923981   C540.175659,402.913818 541.725769,404.477112 541.371704,408.522430   C541.169189,410.836365 541.339661,413.182983 541.342651,416.013000  z" />
                            <path fill="#ffffff" opacity="1.000000" stroke="none" d=" M577.664429,567.999878   C577.659485,559.834290 577.472900,552.162598 577.727173,544.505615   C577.854126,540.686584 576.537659,539.752075 572.836365,539.804138   C550.862061,540.113220 528.884888,538.974243 506.909027,539.817688   C503.638977,539.943176 502.556885,538.554688 502.597382,535.359741   C502.732574,524.696228 502.835388,514.025574 502.571747,503.367035   C502.464233,499.019623 503.797516,497.557312 508.224915,497.596405   C529.220398,497.781647 550.220215,497.527069 571.214294,497.777039   C576.219482,497.836609 577.813110,496.454590 577.768005,491.328125   C577.530579,464.333893 577.651245,437.336487 577.650024,410.340179   C577.649658,403.038361 577.653564,403.036011 585.180237,403.037109   C593.345764,403.038300 601.511292,403.059753 609.676819,403.044464   C618.921387,403.027191 618.934692,403.013733 618.936768,412.542816   C618.940369,429.040497 618.919922,445.538147 618.919800,462.035828   C618.919556,512.195557 618.924316,562.355225 618.926208,612.514954   C618.926270,613.514771 618.927551,614.514893 618.908325,615.514404   C618.777710,622.304626 618.298401,622.902344 611.428101,622.870483   C601.767578,622.825745 592.107483,622.430908 582.448425,622.474365   C578.713501,622.491211 577.571167,621.122375 577.602295,617.493103   C577.742432,601.163086 577.664307,584.831177 577.664429,567.999878  z" />
                        </svg> */}
                    </a>
                </div>
                <div className="relative w-12 h-6 cursor-pointer group" onClick={toggleMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <p ref={openMenuRef} className="absolute origin-top-left will-change-[transform,opacity] ">
                        <svg
                            width={32}
                            height={32}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                            strokeLinecap="round"
                        >
                            <line className="line-top" x1="4" y1="6" x2="20" y2="6" />
                            <line className="line-bot" x1="4" y1="12" x2="20" y2="12" />
                        </svg>
                    </p>
                </div>
            </nav>

            <div className="menu-overlay fixed w-screen h-svh bg-white dark:bg-black z-1 text-black dark:text-white [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]">
                <div ref={menuContentRef} className="relative w-full h-full flex content-center items-center origin-left-bottom will-change-[transform,opacity]" style={{ transform: 'translateX(-100px) translateY(-100px) scale(1.5) rotate(-15deg)' }}>
                    <div className="w-full p-[2.5em] flex gap-[2.5em]">
                        <div className="flex-2 flex flex-col py-[2.5em] gap-[2.5em]">
                            <div className="flex flex-col gap-[0.5em] items-start">
                                {menuLinks.map((link) => {
                                    const isActive = pathname === link.href;

                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="menu-link-item inline-flex items-center will-change-transform transition-colors duration-500 text-[3.5rem] tracking-[-0.02em] group"
                                            style={{ transform: 'translateY(120%)', opacity: 0.25 }}
                                        >
                                            <span
                                                className={`
                                                    ${dotStyles}
                                                    ${isActive
                                                        ? "opacity-100 scale-100 w-3 h-3 mr-4"
                                                        : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:w-3 group-hover:h-3 group-hover:mr-4"
                                                    }
                                                `}
                                            ></span>

                                            <span className={isActive ? "font-medium" : ""}>
                                                {link.name}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col gap-[0.5em] items-start">
                                {menuSocials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className={`
                                            menu-social-item inline-block will-change-transform 
                                            transition-colors duration-500 text-[#8f8f8f] 
                                            hover:text-black dark:hover:text-white 
                                            ${underlineStyles}`}
                                        style={{ transform: 'translateY(120%)', opacity: 0.25 }}
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 p-4">
                        <AnimatedThemeToggler />
                    </div>
                </div>
            </div>
        </>
    );
}