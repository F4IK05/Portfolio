"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSVG = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 1344 768" 
        className="h-[15vh] sm:h-[25vh] lg:h-[35vh] w-auto shrink-0 drop-shadow-2xl"
        style={{ display: "block" }}
    >
        <path fill="white" d="M508.691 82.3171C547.493 81.0811 569.456 101.491 569.937 140.373C570.181 160.029 570.07 179.892 570.118 199.557L570.127 339.828L570.022 488.145L570.008 534.977C569.943 576.846 569.509 610.278 517.802 615.71C501.698 616.081 486.252 614.246 473.35 603.595C452.801 586.632 455.26 558.045 455.141 534.186L455.028 483.665L455.043 332.511L455.002 201.255C454.995 177.841 454.042 153.431 455.882 130.187C458.386 98.5443 479.592 84.4417 508.691 82.3171Z" />
        <path fill="#0a0a0a" d="M508.591 122.847C511.618 122.662 513.463 122.54 516.335 123.123C518.374 123.537 521.884 125.489 522.482 127.346C523.536 130.618 524.247 137.268 524.263 140.669C524.388 167.568 524.328 194.518 524.328 221.41L524.324 376.816L524.315 499.208C524.314 520.138 524.476 541.099 524.133 562.02C524.034 568.033 522.355 571.9 516.734 574.341C507.601 574.949 501.393 574.221 501.113 563.064C500.421 535.455 500.737 507.714 500.753 480.077L500.756 335.427L500.778 205.441C500.782 193.773 499.276 136.682 502.14 128.859C503.346 125.563 505.607 124.297 508.591 122.847Z" />
        <path fill="white" d="M317.736 87.2761C337.546 87.372 357.323 86.6715 377.129 87.7441C433.695 90.8072 432.067 122.684 432.062 167.424L432.039 215.823L432.01 274.498C432.012 292.509 433.152 313.287 428.522 330.853C425.875 340.896 416.676 346.332 407.942 350.795C419.606 356.748 427.099 363.45 429.973 376.728C433.561 393.299 432.015 411.776 431.998 428.692L431.926 521.292C431.904 548.982 430.239 583.847 436.573 610.049L391.173 610.259C385.787 585.926 387.157 554.97 387.173 529.407L387.194 441.751L387.251 406.115C387.255 397.808 387.458 390.193 386.497 381.917C384.829 367.544 375.413 368.824 363.705 368.311L363.678 610.289L317.722 610.392L317.736 87.2761Z" />
        <path fill="#0a0a0a" d="M363.726 126.232C369.107 126.215 384.202 125.556 385.55 133.196C387.907 146.551 387.096 161.603 387.106 175.235L387.112 232.032L387.079 283.831C387.059 294.605 388.515 316.64 383.507 325.402C377.722 329.656 370.755 328.923 363.835 328.858C363.374 305.725 363.707 281.401 363.699 258.175L363.726 126.232Z" />
        <path fill="white" d="M181.199 87.2771L216.648 87.2209C237.516 87.1986 266.04 86.1448 282.388 101.436C294.66 112.914 296.351 131.643 296.391 147.567C296.504 193.368 296.491 239.237 296.5 285.048L296.494 328.254C296.479 350.604 298.768 379.504 276.003 392.364C261.005 400.838 243.893 400.985 227.13 401.103L227.067 541.21L227.002 610.327L181.152 610.315L181.199 87.2771Z" />
        <path fill="#0a0a0a" d="M227.162 126.678C232.173 126.66 248.495 126.301 249.667 133.482C252.133 148.603 251.166 165.573 251.134 180.994L251.093 240.574L251.051 306.207C251.041 317.219 252.433 348.071 248.027 356.56C241.873 361.114 234.531 360.448 227.137 360.445C226.29 283.1 227.013 204.116 227.162 126.678Z" />
        <path fill="white" d="M1102.95 82.3319C1104.29 82.239 1105.62 82.1849 1106.95 82.1697C1144.03 81.7009 1162.82 104.388 1163.01 139.737C1163.09 154.192 1163.12 168.885 1163.1 183.352L1163.12 271.216L1118.75 271.219L1118.76 182.388C1118.76 174.171 1120.47 128.571 1115.22 125.47C1089.68 110.399 1095.74 154.954 1095.74 167.758L1095.63 221.488C1095.57 260.727 1096.5 262.593 1112.42 299.3L1139.73 361.948C1151.79 389.308 1163.53 411.542 1163.07 442.414C1162.7 467.964 1163.53 493.821 1163.11 519.408C1162.19 538.161 1165.02 558.389 1160.96 576.823C1154.22 607.353 1130.06 615.797 1102.86 615.768C1043.11 612.35 1051.2 559.022 1051.17 516.179L1051.26 418.061L1095.46 418.067L1095.46 515.162C1095.48 531.568 1095.28 547.629 1096.01 564.296C1094.56 574.606 1111.27 578.09 1115.62 571.618C1120.87 563.794 1118.75 534.248 1118.75 525.435L1118.74 470.384C1118.73 430.191 1118.86 427.941 1102.33 390.231L1078.33 336.046C1068.32 313.732 1052.79 283.828 1051.68 260.19C1050.69 238.852 1051.03 214.636 1051.02 192.974L1051.05 155.478C1051.16 115.834 1055.27 86.0931 1102.95 82.3319Z" />
        <path fill="white" d="M864.213 82.3302C865.663 82.2531 867.115 82.2067 868.567 82.1911C905.603 81.8637 924.319 105.425 924.214 140.647C924.173 154.385 924.29 168.456 924.263 182.22L924.221 271.169L879.843 271.206L879.908 184.675C879.902 168.848 880.073 152.966 879.709 137.157C879.546 130.065 878.111 123.498 869.93 122.742C860.341 121.856 856.983 127.582 856.862 136.301C856.575 156.959 856.75 177.638 856.779 198.296L856.9 318.325L856.933 476.303C856.936 503.497 856.829 530.729 857.058 557.896C857.542 562.999 856.737 571.16 862.635 573.54C883.904 582.122 879.91 551.655 879.906 541.895L879.887 491.323L879.836 418.002C894.451 418.235 909.581 418.039 924.237 418.043L924.321 510.375C924.338 516.321 924.43 522.329 924.373 528.274C924.076 555.29 928.513 589.512 902.198 606.68C881.168 620.262 846.082 619.253 827.567 601.748C809.147 584.332 811.55 555.956 811.511 532.757L811.468 482.703L811.382 326.33L811.387 198.815L811.361 158.518C811.362 149.264 811.143 140.327 812.002 131.077C814.946 99.3958 833.951 84.6381 864.213 82.3302Z" />
        <path fill="white" d="M700.233 87.2227L796.231 87.1257L796.163 127.439C779.49 127.613 762.816 127.683 746.143 127.649L746.147 320.919L786.215 320.783L786.201 361.15L746.181 361.139C745.484 430.241 746.123 500.574 746.17 569.751L796.006 569.611L796.082 610.164L700.279 610.271L700.233 87.2227Z" />
        <path fill="white" d="M633.161 87.2026L677.862 87.1209L677.849 416.092L677.864 514.978C677.865 533.653 678.378 551.962 676.863 570.588C674.737 596.748 655.938 615.552 629.027 615.764C616.485 615.955 604.4 611.059 595.526 602.192C580.192 586.737 581.835 563.638 581.819 543.498L581.817 457.781C595.779 457.868 609.741 457.866 623.702 457.776L623.6 527.831C623.579 539.297 622.154 560.376 625.437 571.678C625.88 573.201 627.369 573.719 628.788 574.171C629.365 573.97 630.298 573.749 630.696 573.358C634.121 569.99 633.447 562.487 633.383 558.245C633.19 545.483 633.256 532.79 633.263 520.062L633.181 416.908L633.161 87.2026Z" />
        <path fill="white" d="M931.239 87.2211C967.755 86.5296 1006.42 87.1247 1043.09 87.066L1042.98 126.961L1010.3 127.059C1009.77 143.934 1010.17 163.116 1010.16 180.178L1010.13 280.112L1010.12 578.906L1010.07 610.263L965.043 610.264L964.779 126.891L931.258 127.217L931.239 87.2211Z" />
    </svg>
);

const ArrowIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512" 
        preserveAspectRatio="xMidYMid meet"
        className="w-8 h-8 md:w-14 md:h-14 shrink-0 text-[#facc15]"
    >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
            <path d="M212 4268 l3 -213 213 -3 212 -2 0 -210 0 -210 213 -2 212 -3 3 -212 2 -213 210 0 210 0 2 -212 3 -213 213 -3 212 -2 0 -210 0 -210 -212 -2 -213 -3 -3 -213 -2 -212 -210 0 -210 0 -2 -213 -3 -212 -212 -3 -213 -2 0 -210 0 -210 -212 -2 -213 -3 -3 -212 -2 -213 1495 0 1495 0 0 215 0 215 215 0 215 0 0 210 0 210 210 0 210 0 0 215 0 215 215 0 215 0 0 215 0 215 215 0 215 0 0 210 0 210 -215 0 -215 0 0 215 0 215 -215 0 -215 0 0 215 0 215 -210 0 -210 0 0 210 0 210 -215 0 -215 0 0 215 0 215 -1495 0 -1495 0 2 -212z" />
        </g>
    </svg>
);

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeTrackRef = useRef<HTMLDivElement>(null);
    const arrowsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!marqueeTrackRef.current || !sectionRef.current) return;

        // Базовая анимация: постоянно двигаем влево (-50%)
        const baseAnim = gsap.to(marqueeTrackRef.current, {
            xPercent: -50,
            duration: 18,
            ease: "none",
            repeat: -1,
        });

        let lastScrollY = window.scrollY;
        let velocity = 0;
        let direction = 1; // 1 = влево, -1 = вправо
        let raf: number;

        const updateVelocity = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            // Плавное затухание скорости
            velocity += (delta - velocity) * 0.15;

            // Определяем направление только если скролл достаточно сильный
            if (Math.abs(velocity) > 0.5) {
                direction = velocity > 0 ? 1 : -1;
            }

            const baseSpeed = 1;
            const extraSpeed = Math.abs(velocity) * 0.05;
            const clampedSpeed = gsap.utils.clamp(1, 4, baseSpeed + extraSpeed);
            
            // timeScale > 0 едет влево, timeScale < 0 едет вправо
            const targetTimeScale = clampedSpeed * direction;

            gsap.to(baseAnim, {
                timeScale: targetTimeScale,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
            });

            // Анимация поворота стрелок
            const arrows = arrowsRef.current.filter(Boolean);
            if (arrows.length > 0) {
                const targetRotation = direction === 1 ? 180 : 0;
                
                gsap.to(arrows, {
                    rotation: targetRotation,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }

            raf = requestAnimationFrame(updateVelocity);
        };

        raf = requestAnimationFrame(updateVelocity);

        return () => {
            cancelAnimationFrame(raf);
            baseAnim.kill();
        };
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[60vh] md:h-[80vh] bg-black flex items-center justify-center p-4 md:p-8 overflow-hidden select-none"
        >
            <div className="relative w-full h-full border border-white/20 rounded-[2.5rem] md:rounded-[4rem] bg-[#0a0a0a] flex items-center overflow-hidden shadow-2xl">
                
                <div 
                    className="absolute inset-0 z-0 opacity-10" 
                    style={{ 
                        backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)", 
                        backgroundSize: "24px 24px" 
                    }} 
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] md:w-[130vw] aspect-square border border-white/10 rounded-full pointer-events-none z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vw] md:w-[95vw] aspect-square border border-white/10 rounded-full pointer-events-none z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] aspect-square border border-white/10 rounded-full pointer-events-none z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] md:w-[25vw] aspect-square border border-white/10 rounded-full pointer-events-none z-0" />


                <div
                    ref={marqueeTrackRef}
                    className="relative z-10 flex items-center will-change-transform"
                    style={{ width: "max-content", gap: "clamp(2rem, 5vw, 5rem)" }}
                >
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0" style={{ gap: "clamp(2rem, 5vw, 5rem)" }}>
                            
                            <ProjectsSVG />
                            
                            <div 
                                ref={(el) => {
                                    if (el) arrowsRef.current[i] = el;
                                }}
                                className="origin-center rotate-180 will-change-transform flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full"
                            >
                                <ArrowIcon />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}