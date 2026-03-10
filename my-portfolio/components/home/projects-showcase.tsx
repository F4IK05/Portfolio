"use client";

import { useRef, useState } from "react";
import ArrowLinkButton from "../ui/arrow-link-button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        category: "MOBILE DEVELOPMENT",
        title: "MILK UP",
        description: "Built a user-friendly mobile application that allows customers to quickly browse, order, and purchase milk products from local suppliers with a simple and intuitive interface.",
        href: "https://github.com/F4IK05/React-Native/tree/main/Milk"
    },
    {
        id: 2,
        category: "WEB DEVELOPMENT",
        title: "ECLIPSE",
        description: "Created a modern music streaming platform inspired by Spotify, featuring a clean interface, music browsing, playlists, and a smooth listening experience.",
        href: "https://github.com/F4IK05/React-Native/tree/main/Coffee/coffee-mobile"
    }
];

export default function ProjectsShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleTrackRef = useRef<HTMLDivElement>(null);
    
    const catsRef = useRef<(HTMLDivElement | null)[]>([]);
    const countersRef = useRef<(HTMLDivElement | null)[]>([]);
    const descsRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!sectionRef.current || !titleTrackRef.current) return;

        // Создаем отдельную анимацию, которая привязана к прогрессу ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${projects.length * 1000}`,
                pin: true,
                scrub: 0.1,
                snap: {
                    snapTo: 1 / (projects.length - 1),
                    duration: 0.5,
                    delay: 0,
                    ease: "power2.inOut"
                }

            }
        });

        projects.forEach((_, i) => {
            if (i === projects.length - 1) return;

            const stepTl = gsap.timeline();

            // Переключение заголовка
            stepTl.to(titleTrackRef.current, {
                yPercent: -(100 / projects.length) * (i + 1),
                ease: "expo.inOut",
                duration: 0.6
            }, 0);

            // Исчезновение старого
            const elementsOut = [
                catsRef.current[i], countersRef.current[i], 
                descsRef.current[i], imagesRef.current[i],
                buttonsRef.current[i]
            ];
            stepTl.to(elementsOut, { 
                opacity: 0, 
                y: -30, 
                pointerEvents: "none",
                duration: 0.3,
                ease: "power2.in"
            }, 0);

            // Появление нового
            const elementsIn = [
                catsRef.current[i+1], countersRef.current[i+1], 
                descsRef.current[i+1], imagesRef.current[i+1],
                buttonsRef.current[i+1]
            ];
            stepTl.fromTo(elementsIn, 
                { opacity: 0, y: 30, pointerEvents: "none" },
                { 
                    opacity: 1, 
                    y: 0, 
                    pointerEvents: "auto",
                    duration: 0.4,
                    ease: "power2.out"
                }, 0.3);

            tl.add(stepTl, i + 0.1);
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-black flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <div className="relative w-full max-w-7xl h-[85vh] md:h-[80vh] bg-[#0a0a0a] border border-white/20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl flex flex-col md:flex-row overflow-hidden">
                
                <div className="flex-1 p-6 md:p-12 flex flex-col justify-between h-1/2 md:h-full relative text-white">
                    <div className="w-full">
                        <div className="grid grid-cols-1 grid-rows-1">
                            {projects.map((project, i) => (
                                <div 
                                    key={project.id} 
                                    ref={el => { catsRef.current[i] = el; }}
                                    className="col-start-1 row-start-1 inline-flex items-center gap-3 w-fit px-4 md:px-5 py-2 rounded-full border border-white/30 text-[10px] md:text-sm"
                                    style={{ opacity: i === 0 ? 1 : 0 }}
                                >
                                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white" />
                                    {project.category}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 grid-rows-1 mt-6 md:mt-10 font-mono text-lg md:text-2xl opacity-60">
                            {projects.map((project, i) => (
                                <div 
                                    key={project.id} 
                                    ref={el => { countersRef.current[i] = el; }}
                                    className="col-start-1 row-start-1"
                                    style={{ opacity: i === 0 ? 1 : 0 }}
                                >
                                    {i + 1} -- {projects.length}
                                </div>
                            ))}
                        </div>

                        <div className="font-alias mt-2 md:mt-4 overflow-hidden relative text-[15vw] md:text-[7vw] font-black uppercase tracking-tighter transform scale-y-[1.4] origin-left h-[1.1em]">
                            <div ref={titleTrackRef} className="flex flex-col will-change-transform">
                                {projects.map((project) => (
                                    <h2 key={project.id} className="h-[1.1em] leading-none flex items-center">
                                        {project.title}
                                    </h2>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 grid-rows-1 mt-8 md:mt-12 text-sm md:text-base text-white/70 max-w-md leading-relaxed">
                            {projects.map((project, i) => (
                                <p 
                                    key={project.id} 
                                    ref={el => { descsRef.current[i] = el; }}
                                    className="col-start-1 row-start-1 m-0"
                                    style={{ opacity: i === 0 ? 1 : 0 }}
                                >
                                    {project.description}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 grid-rows-1 relative z-10 w-fit">
                        {projects.map((project, i) => (
                            <div 
                                key={project.id}
                                ref={el => { buttonsRef.current[i] = el; }}
                                className="col-start-1 row-start-1"
                                style={{ 
                                    opacity: i === 0 ? 1 : 0,
                                    pointerEvents: i === 0 ? "auto" : "none" 
                                }}
                            >
                                <ArrowLinkButton href={project.href} text="VIEW" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative h-1/2 md:h-full bg-[#111] md:rounded-l-3xl border-t md:border-t-0 md:border-l border-white/10 overflow-hidden">
                    <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
                        {projects.map((project, i) => (
                            <div 
                                key={project.id} 
                                ref={el => { imagesRef.current[i] = el; }}
                                className={`col-start-1 row-start-1 w-full h-full p-4 md:p-8 flex items-center justify-center ${project.imageBg}`}
                                style={{ opacity: i === 0 ? 1 : 0 }}
                            >
                                <div className="w-full h-full rounded-[1.5rem] md:rounded-[2rem] border border-white/20 overflow-hidden relative shadow-2xl flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-30 from-white to-transparent" />
                                    <span className="relative z-10 text-2xl md:text-5xl font-black opacity-50 uppercase text-center px-4 leading-tight">
                                        {project.title} <br/>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}