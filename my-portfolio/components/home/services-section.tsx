"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "../ui/service-card";
import ThreeIllustration from "../ui/three-illustration";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Bringing", "creativity", "and", "logic", "together", "to", "solve", "complex", "challenges."];

const SERVICES = [
    {
        category: "MOBILE DEVELOPMENT",
        title: "MOBILE APPS",
        description: "Building high-performance mobile apps with React Native, focusing on smooth user experience and scalable cross-platform solutions.",
        href: "/projects/product-design",
        innerClass: "-rotate-3",
        illustration: <ThreeIllustration type="gem" />,
    },
    {
        category: "WEB DEVELOPMENT",
        title: "FRONTEND",
        description: "Creating fast and responsive web applications using React and modern technologies with a strong focus on performance and usability.",
        href: "/projects/product-design",
        innerClass: "-rotate-1",
        illustration: <ThreeIllustration type="torus" />,
    },
    {
        category: "FULL STACK DEVELOPMENT",
        title: "FULL STACK",
        description: "Developing complete web applications from frontend interfaces to backend systems, ensuring scalability, performance, and reliability.",
        href: "/projects/product-design",
        innerClass: "rotate-2",
        illustration: <ThreeIllustration type="crystal" />,
    },
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lettersRef = useRef<(SVGGElement | null)[]>([null, null, null, null, null]);
    const wordsRef = useRef<(HTMLSpanElement | null)[]>(WORDS.map(() => null));
    const cardsSectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);
    const floatRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

    useGSAP(() => {
        const letters = lettersRef.current.filter(Boolean) as SVGGElement[];
        const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
        if (!sectionRef.current || letters.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=2800",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(letters, { opacity: 1, stagger: 0.15, duration: 0.25, ease: "none" });
        tl.to({}, { duration: 0.025 });
        tl.to(letters, { opacity: 0, stagger: 0.15, duration: 0.25, ease: "none" });
        tl.to({}, { duration: 0.025 });
        tl.to(words, { opacity: 1, stagger: 0.12, duration: 0.2, ease: "none" });
        tl.to({}, { duration: 0.025 });
        tl.to(words, { opacity: 0, stagger: 0.12, duration: 0.2, ease: "none" });
    }, []);

    useGSAP(() => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (!cardsSectionRef.current || cards.length < 3) return;

        if (window.matchMedia("(max-width: 1023px)").matches) return;

        gsap.set(cards, { y: "110vh" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardsSectionRef.current,
                start: "top top",
                end: "+=2400",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(cards[0], { y: 0, duration: 0.5, ease: "power3.out" })
            .to(cards[1], { y: 0, duration: 0.5, ease: "power3.out" }, "-=0.25")
            .to(cards[2], { y: 0, duration: 0.5, ease: "power3.out" }, "-=0.25")
            .to({}, { duration: 0.5 })
            .to(cards[0], { y: "-110vh", duration: 0.45, ease: "power3.in" })
            .to(cards[1], { y: "-110vh", duration: 0.45, ease: "power3.in" }, "-=0.2")
            .to(cards[2], { y: "-110vh", duration: 0.45, ease: "power3.in" }, "-=0.2");

        const floats = floatRefs.current.filter(Boolean) as HTMLDivElement[];
        const floatParams = [
            { y: -14, duration: 2.4, delay: 0 },
            { y: -18, duration: 2.8, delay: 0.5 },
            { y: -12, duration: 2.1, delay: 1.1 },
        ];
        floats.forEach((el, i) => {
            gsap.to(el, {
                y: floatParams[i].y,
                duration: floatParams[i].duration,
                delay: floatParams[i].delay,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
        });
    }, []);

    return (
        <>
            <section ref={sectionRef} className="h-screen w-full flex items-center justify-center bg-black overflow-hidden p-5 sm:p-15">
                <div className="w-full flex items-center justify-center">
                    <svg

                        xmlns="http://www.w3.org/2000/svg"

                        viewBox="0 0 1344 768"

                        className="w-full max-w-4xl absolute"

                    >

                        {/* M */}

                        <g ref={(el) => { lettersRef.current[0] = el; }} style={{ opacity: 0 }}>

                            <path fill="white" d="M211.292 81.5262L290.593 81.6138C292.393 116.211 295.417 152.195 297.956 186.777L307.87 324.905L313.873 409.936C314.853 424.035 315.629 443.455 317.605 457.032C323.807 389.434 327.653 318.427 332.733 250.427L340.68 141.358C342.018 122.755 344.211 99.9385 344.773 81.6005L423.964 81.6127L423.944 686.571L368.506 686.573L368.604 508.369L368.659 447.143C368.671 438.727 369.154 424.298 368.651 416.557C367.477 413.135 367.875 396.192 367.877 391.584L368.001 331.61C368.018 326.88 368.788 301.347 367.023 298.787C363.844 326.911 362.239 360.079 360.119 388.847L345.672 585.278C343.283 617.517 341.391 654.625 337.948 686.562C324.071 686.416 309.951 686.553 296.053 686.552L266.886 298.118C264.728 302.35 266.723 324.977 265.678 332.368C264.832 361.943 265.718 394.953 265.761 424.944L265.855 595.081C265.879 625.151 266.385 656.632 265.906 686.6L211.346 686.568L211.292 81.5262Z" />

                            <path fill="white" d="M367.488 290.782L368.866 289.511L368.735 373.152C368.733 386.816 369.142 403.127 368.651 416.557C367.477 413.135 367.875 396.192 367.877 391.584L368.001 331.61C368.018 326.88 368.788 301.347 367.023 298.787C367.137 296.116 367.292 293.448 367.488 290.782Z" />

                            <path fill="white" d="M265.678 332.368C264.456 322.027 264.54 291.356 265.583 281.224C266.315 286.41 266.556 292.803 266.886 298.118C264.728 302.35 266.723 324.977 265.678 332.368Z" />

                            <path fill="white" d="M367.488 290.782C367.541 287.254 367.831 281.815 368.704 278.493L368.521 278.956C369.5 281.161 368.963 286.789 368.866 289.511L367.488 290.782Z" />

                        </g>



                        {/* A */}

                        <g ref={(el) => { lettersRef.current[1] = el; }} style={{ opacity: 0 }}>

                            <path fill="white" d="M493.685 81.6731L567.548 81.7884L618.635 686.533L558.507 686.566C555.507 649.291 553.952 609.119 551.727 571.573C551.095 565.483 550.873 558.191 550.535 551.994L512.688 551.997C512.33 571.365 510.248 594.616 509.001 614.214C507.503 637.766 506.347 663.297 504.047 686.584L445.4 686.62L493.685 81.6731Z" />

                            <path d="M530.548 222.427C533.287 226.406 545.409 476.713 547.149 499.759L533.099 499.852L515.835 499.786L530.548 222.427Z" />

                        </g>



                        {/* K */}

                        <g ref={(el) => { lettersRef.current[2] = el; }} style={{ opacity: 0 }}>

                            <path fill="white" d="M738.567 81.5009L796.658 81.5794L764.288 269.559L755.317 321.297C754.262 327.299 750.966 344.028 750.833 349.269C750.655 356.248 753.767 373.727 754.97 381.653L763.645 439.725L800.588 686.581L787.552 686.542L740.682 686.569C738.2 664.63 734.454 640.755 731.47 618.73L713.467 484.73L703.943 412.988C702.233 400.014 700.03 379.324 696.799 367.075C695.734 374.877 696.159 393.437 696.164 402.045L696.226 467.255L696.21 686.545L637.282 686.598L637.324 81.567L696.27 81.7191L696.222 253.036L696.174 306.74C696.169 316.294 695.802 330.451 696.775 339.643C711.876 254.695 725.013 166.886 738.567 81.5009Z" />

                        </g>



                        {/* E */}

                        <g ref={(el) => { lettersRef.current[3] = el; }} style={{ opacity: 0 }}>

                            <path fill="white" d="M819.676 81.5646L945.214 81.5812L945.13 134.33L878.658 134.38L878.579 348.535L930.639 348.542L930.63 399.755L878.626 399.74L878.616 634.785L945.139 634.692L945.087 686.546L819.784 686.547L819.676 81.5646Z" />

                        </g>



                        {/* R */}

                        <g ref={(el) => { lettersRef.current[4] = el; }} style={{ opacity: 0 }}>

                            <path fill="white" d="M967.655 81.525C999.456 81.8608 1043.26 78.8289 1073.55 87.2026C1116.32 99.0276 1114.1 140.234 1114.14 176.455L1114.17 227.426L1114.22 288.784C1114.23 309.492 1115.39 333.156 1109.56 353.25C1106.04 365.375 1093.61 372.464 1083.02 377.928C1085.47 378.977 1087.87 380.131 1090.21 381.388C1120.2 397.664 1114.18 441.478 1114.14 470.534L1114.14 582.7C1114.15 612.22 1111.87 659.747 1119.68 686.527L1061.49 686.542C1054.41 665.186 1056.49 615.122 1056.48 590.362L1056.43 492.965L1056.4 446.345C1056.39 437.284 1057.78 413.677 1051.53 406.132C1047.63 401.43 1033.38 401.899 1027.16 401.875L1027.04 686.58L967.848 686.551L967.655 81.525Z" />

                            <path d="M1027.16 131.434C1034.99 131.458 1053.08 130.662 1054.79 141.422C1056.9 154.771 1056.29 170.009 1056.32 183.601L1056.28 253.782L1056.24 305.832C1056.22 316.702 1057.87 337.465 1052.24 346.343C1045.26 352.251 1035.97 351.343 1027.25 351.325C1026.79 323.845 1027.11 295.562 1027.1 268.005L1027.16 131.434Z" />

                        </g>

                    </svg>



                    <p className="relative text-white text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-center max-w-4xl leading-tight">
                        {WORDS.map((word, i) => (
                            <span key={i} ref={(el) => { wordsRef.current[i] = el; }} style={{ opacity: 0 }} className="inline-block mr-[0.3em]">
                                {word}
                            </span>
                        ))}
                    </p>
                </div>
            </section>

            <section ref={cardsSectionRef} className="hidden lg:flex h-screen w-full items-center justify-center overflow-hidden">
                <div className="flex items-center justify-center gap-6 px-10">
                    {SERVICES.map((service, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardsRef.current[i] = el; }}
                            className="will-change-transform w-[30vw] h-[75vh] min-w-[380px] max-w-[500px]"
                        >
                            <div
                                ref={(el) => { floatRefs.current[i] = el; }}
                                className={`h-full w-full ${service.innerClass}`}
                            >
                                <ServiceCard
                                    category={service.category}
                                    title={service.title}
                                    description={service.description}
                                    href={service.href}
                                    illustration={service.illustration}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="lg:hidden w-full flex flex-col items-center gap-6 bg-[#111] py-12 px-5">
                {SERVICES.map((service, i) => (
                    <ServiceCard
                        key={i}
                        category={service.category}
                        title={service.title}
                        description={service.description}
                        href={service.href}
                        illustration={service.illustration}
                        className="w-full h-[600px] max-w-md"
                    />
                ))}
            </section>
        </>
    );
}