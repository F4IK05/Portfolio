"use client";

import { useRef } from "react";
import HeroSection from "@/components/home/hero-section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import AboutSection from "@/components/home/about-section";
import CheckerMarquee from "@/components/ui/checker-marquee";
import { initReveal } from "@/lib/animations";
import ProjectsSection from "@/components/home/projects-section";
import ServicesSection from "@/components/home/services-section";
import ProjectsShowcase from "@/components/home/projects-showcase";

const WireframeSphere = dynamic(
  () => import("@/components/home/wireframe-sphere"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

let loaderDone = false;
if (typeof window !== "undefined") {
  window.addEventListener("loader:done", () => { loaderDone = true; }, { once: true });
}

export default function Home() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const showSphere = () => {
      if (sphereRef.current) {
        gsap.fromTo(sphereRef.current, {
          y: 800,
          autoAlpha: 0,
        }, {
          y: 300,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
        });
      }
    };

    const runAnimations = () => {
      initReveal();
      if (heroWrapperRef.current) {
        gsap.to(heroWrapperRef.current, {
          scale: 1,
          duration: 1,
          ease: "power3.out",
          onComplete: showSphere,
        });
      }

      if (heroSectionRef.current) {
        gsap.to(heroSectionRef.current, {
          yPercent: 120,
          rotate: -10,
          scale: 0.8,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "+=500",
            scrub: 1.5,
          }
        })
      }

      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current,
          {
            y: 200,
            rotate: 8,
            opacity: 0,
            transformOrigin: "left center",
          },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 100%",
              end: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    };

    if (loaderDone) {
      runAnimations();
      return;
    }
    const onLoaderDone = () => { loaderDone = true; runAnimations(); };
    window.addEventListener("loader:done", onLoaderDone, { once: true });
    return () => {
      window.removeEventListener("loader:done", onLoaderDone)
    };
  }, []);

  return (
    <main className="flex flex-col bg-black overflow-hidden">
      <div ref={heroSectionRef} className="relative overflow-hidden sticky top-0 z-0">
        <div ref={heroWrapperRef} style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
          <HeroSection />
        </div>
        <div
          ref={sphereRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-125 h-125 sm:w-150 sm:h-150 md:w-175 md:h-175 z-10 pointer-events-none"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          <WireframeSphere />
        </div>
      </div>
      <div ref={aboutRef} className="relative z-10">
        <AboutSection />
      </div>
      <CheckerMarquee />
      <div>
        <ServicesSection />
      </div>
      <div>
        <ProjectsSection />
        <ProjectsShowcase />
      </div>

    </main >
  );
}
