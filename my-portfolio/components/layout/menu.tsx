"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useCallback, useEffect, useTransition } from "react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AsciiIcon3D = dynamic(() => import("@/components/ui/menu-icon-3d"), {
    ssr: false,
    loading: () => <div style={{ width: 40, height: 40 }} />,
});

const menuLinks = [
    { name: "Home", href: "/", page: "home" },
    { name: "About", href: "/about", page: "about" },
    { name: "Projects", href: "/projects", page: "projects" },
    { name: "Contact", href: "/contact", page: "contact" },
];

type Page = "home" | "about" | "projects" | "contact";

const dotStyles = `
  inline-block
  w-0 h-0 bg-black dark:bg-white rounded-full
  transition-all duration-500 ease-out
  mr-0
`;

const lockScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
};

const unlockScroll = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.documentElement.style.overflow = "";
};

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const openMenuRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lineTopRef = useRef<SVGLineElement>(null);
    const lineBotRef = useRef<SVGLineElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAnimatingRef = useRef(false);
    const [isPending, startTransition] = useTransition();
    const isNavigatingRef = useRef(false);
    const logoRef = useRef<HTMLSpanElement>(null);

    const activePage = (menuLinks.find(l => l.href === pathname)?.page ?? "home") as Page;
    const [hoveredPage, setHoveredPage] = useState<Page | null>(null);
    const previewPage = hoveredPage ?? activePage;

    useGSAP(() => {
        containerRef.current = document.querySelector(".page-container") as HTMLDivElement;
    }, []);

    useEffect(() => {
        if (!logoRef.current) return;
        const shouldHide = pathname === "/contact" && !isMenuOpen;
        gsap.to(logoRef.current, {
            opacity: shouldHide ? 0 : 1,
            y: shouldHide ? -8 : 0,
            duration: 0.25,
            ease: shouldHide ? "power2.in" : "power2.out",
            overwrite: "auto",
        });
    }, [pathname, isMenuOpen]);

    useEffect(() => {
        if (isNavigatingRef.current) return;

        const lines = [lineTopRef.current, lineBotRef.current].filter(Boolean);

        gsap.killTweensOf(lines);
        gsap.killTweensOf(".menu-overlay");
        gsap.killTweensOf(menuContentRef.current);
        if (containerRef.current) gsap.killTweensOf(containerRef.current);

        // Жёсткий сброс всего
        gsap.set(lines, { clearProps: "all" });
        gsap.set(".menu-overlay", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
        gsap.set(menuContentRef.current, { clearProps: "all" });
        if (containerRef.current) gsap.set(containerRef.current, { clearProps: "all" });

        unlockScroll();
        setIsMenuOpen(false);
        setHoveredPage(null);
        isAnimatingRef.current = false;
        isNavigatingRef.current = false;
    }, [pathname]);

    // Когда навигация завершена убираем overlay
    useEffect(() => {
        if (isNavigatingRef.current && !isPending) {
            isNavigatingRef.current = false;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    gsap.to(".menu-overlay", {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        duration: 0.7,
                        ease: "power4.inOut",
                        onComplete: () => {
                            isAnimatingRef.current = false;
                            setIsMenuOpen(false);
                        },
                    });
                });
            })
        }
    }, [isPending]);

    // Cleanup при размонтировании
    useEffect(() => {
        return () => {
            unlockScroll();
            const lines = [lineTopRef.current, lineBotRef.current].filter(Boolean);
            if (lines.length) gsap.killTweensOf(lines);
        };
    }, []);

    const handleMouseEnter = () => {
        if (isMenuOpen || isAnimatingRef.current) return;
        gsap.to(lineTopRef.current, { scaleX: 0.85, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: "auto" });
        gsap.to(lineBotRef.current, { scaleX: 0.65, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const handleMouseLeave = () => {
        if (isMenuOpen || isAnimatingRef.current) return;
        gsap.to([lineTopRef.current, lineBotRef.current], { scaleX: 1, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const handleLinkClick = useCallback((e: React.MouseEvent, href: string) => {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        unlockScroll();
        setHoveredPage(null);


        gsap.to(".menu-link-icon", { opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(".menu-preview-3d", { opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(".menu-link-item, .menu-social-item", {
            y: "120%", opacity: 0, duration: 0.4, stagger: 0.05, ease: "power2.in",
        });

        gsap.to(menuContentRef.current, {
            rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25,
            duration: 1.25, ease: "power4.inOut",
        });

        gsap.set([lineTopRef.current, lineBotRef.current], { clearProps: "all" });

        gsap.to(".menu-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.7,
            ease: "power4.inOut",
            onComplete: () => {
                if (containerRef.current) {
                    gsap.set(containerRef.current, { clearProps: "all" });
                }
                gsap.set(menuContentRef.current, { clearProps: "all" });

                isNavigatingRef.current = true;
                startTransition(() => {
                    router.push(href);
                });
            },
        });
    }, [router]);

    const openMenu = useCallback(() => {
        if (isAnimatingRef.current || isMenuOpen) return;
        isAnimatingRef.current = true;

        lockScroll();

        gsap.killTweensOf([lineTopRef.current, lineBotRef.current]);
        gsap.set([lineTopRef.current, lineBotRef.current], { scaleX: 1 });

        if (containerRef.current) {
            gsap.to(containerRef.current, {
                rotation: 10, x: 300, y: 450, scale: 1.5,
                duration: 1.25, ease: "power4.inOut",
            });
        }

        gsap.to(lineTopRef.current, { y: 3, rotation: 45, transformOrigin: "center", duration: 0.5, ease: "power2.inOut" });
        gsap.to(lineBotRef.current, { y: -3, rotation: -45, transformOrigin: "center", duration: 0.5, ease: "power2.inOut" });

        gsap.to(menuContentRef.current, {
            rotation: 0, x: 0, y: 0, scale: 1, opacity: 1,
            duration: 1.25, ease: "power4.inOut",
        });

        gsap.to(".menu-link-item, .menu-social-item", {
            y: "0%", delay: 0.75, opacity: 1,
            duration: 1, stagger: 0.1, ease: "power3.out",
        });

        gsap.to(".menu-link-icon", {
            opacity: 1, delay: 0.75, duration: 0.8,
            stagger: 0.1, ease: "power3.out",
        });

        gsap.to(".menu-preview-3d", {
            opacity: 1, delay: 0.9, duration: 0.9, ease: "power3.out",
        });

        gsap.to(".menu-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
            duration: 1.25, ease: "power4.inOut",
            onComplete: () => {
                isAnimatingRef.current = false;
                setIsMenuOpen(true);
            },
        });
    }, [isMenuOpen]);

    const closeMenu = useCallback(() => {
        if (isAnimatingRef.current || !isMenuOpen) return;
        isAnimatingRef.current = true;

        unlockScroll();
        setHoveredPage(null);

        gsap.to(lineTopRef.current, { y: 0, rotation: 0, scaleX: 1, duration: 0.5, ease: "power2.inOut" });
        gsap.to(lineBotRef.current, { y: 0, rotation: 0, scaleX: 1, duration: 0.5, ease: "power2.inOut" });

        if (containerRef.current) {
            gsap.to(containerRef.current, {
                rotation: 0, x: 0, y: 0, scale: 1,
                duration: 1.25, ease: "power4.inOut",
            });
        }

        gsap.to(menuContentRef.current, {
            rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25,
            duration: 1.25, ease: "power4.inOut",
        });

        gsap.to(".menu-link-icon", {
            opacity: 0, duration: 0.4, ease: "power2.in",
        });

        gsap.to(".menu-preview-3d", {
            opacity: 0, duration: 0.4, ease: "power2.in",
        });

        gsap.to(".menu-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.25, ease: "power4.inOut",
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
            <nav className="fixed top-0 left-0 right-0 bg-transparent text-black dark:text-white w-screen p-4 flex justify-between items-center z-60">
                <div>
                    <a href="#">
                        <span
                            ref={logoRef}
                            className="navbar-logo-h text-lg font-medium"
                            style={{ opacity: pathname === "/contact" ? 0 : 1 }}
                        >
                            hf
                        </span>
                    </a>
                </div>
                <div
                    className="relative w-12 h-6 cursor-pointer group"
                    onClick={toggleMenu}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <p ref={openMenuRef} className="absolute origin-top-left will-change-[transform,opacity]">
                        <svg width={32} height={32} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} strokeLinecap="round">
                            <line ref={lineTopRef} className="line-top" x1="4" y1="6" x2="20" y2="6" />
                            <line ref={lineBotRef} className="line-bot" x1="4" y1="12" x2="20" y2="12" />
                        </svg>
                    </p>
                </div>
            </nav>

            <div className="menu-overlay fixed inset-0 w-screen h-svh overflow-hidden bg-white dark:bg-black z-50 text-black dark:text-white [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]">
                <div
                    ref={menuContentRef}
                    className="relative w-full h-full flex content-center items-center origin-left-bottom will-change-[transform,opacity]"
                    style={{ transform: "translateX(-100px) translateY(-100px) scale(1.5) rotate(-15deg)" }}
                >
                    <div className="w-full h-full p-[2.5em] flex items-center gap-[2.5em]">

                        <div className="flex-1 flex flex-col py-[2.5em] gap-[2.5em]">
                            <div className="flex flex-col gap-[0.5em] items-start select-none">
                                {menuLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="menu-link-item inline-flex items-center will-change-transform transition-colors duration-500 text-[3.5rem] tracking-[-0.02em] group"
                                            style={{ transform: "translateY(120%)", opacity: 0.25 }}
                                            onMouseEnter={() => setHoveredPage(link.page as Page)}
                                            onMouseLeave={() => setHoveredPage(null)}
                                        >
                                            <span className={`${dotStyles} ${isActive
                                                ? "opacity-100 scale-100 w-3 h-3 mr-4"
                                                : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:w-3 group-hover:h-3 group-hover:mr-4"
                                                }`} />

                                            <span className={isActive ? "font-medium" : ""}>
                                                {link.name}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div
                            className="menu-preview-3d hidden md:flex flex-1 items-center justify-center opacity-0"
                        >
                            {menuLinks.map((link) => (
                                <div
                                    key={link.page}
                                    className="absolute transition-opacity duration-300 pointer-events-none"
                                    style={{ opacity: previewPage === link.page ? 1 : 0 }}
                                >
                                    <AsciiIcon3D
                                        page={link.page as Page}
                                        cols={100}
                                        fontSize={12}
                                    />
                                </div>
                            ))}
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