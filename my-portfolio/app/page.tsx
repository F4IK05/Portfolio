"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let loaderDone = false;
if (typeof window !== "undefined") {
  window.addEventListener("loader:done", () => { loaderDone = true; }, { once: true });
}

function initReveal() {
  const revealContainers =
    document.querySelectorAll<HTMLElement>(".reveal-text");

  revealContainers.forEach((container) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
      },
    });

    tl.set(container, { autoAlpha: 1 });
    tl.from(container, {
      duration: 1.8,
      delay: 0.05,
      y: 200,
      skewY: 5,
      stagger: { amount: 0.05 },
      ease: "power4.out",
    });
  });

  ScrollTrigger.refresh();
}

export default function Home() {
  useGSAP(() => {
    if (loaderDone) {
      initReveal();
      return;
    }
    const onLoaderDone = () => { loaderDone = true; initReveal(); };
    window.addEventListener("loader:done", onLoaderDone, { once: true });
    return () => window.removeEventListener("loader:done", onLoaderDone);
  }, []);

  return (
    <main className="selection:bg-white selection:text-black">
      {/* HERO */}
      <section className="hero-section">
        <div>
          <h1 className="hero-title" id="hero-name">
            faik hasanov
          </h1>
        </div>
        <div className="overflow-hidden">
          <p className="reveal-text hero-subtitle">
            Frontend Developer &amp; UI Designer
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="content-section">
        <div className="overflow-hidden">
          <h2 className="reveal-text section-title">About Me</h2>
        </div>
        <div className="overflow-hidden">
          <p className="reveal-text section-text">
            I build fast, accessible and visually rich web experiences.
          </p>
        </div>
        <div className="overflow-hidden">
          <p className="reveal-text section-text">
            Passionate about clean code, motion design and pushing the limits of
            the browser.
          </p>
        </div>
      </section>

      {/* SKILLS
      <section className="content-section">
        <div className="overflow-hidden">
          <h2 className="reveal-text section-title">Skills</h2>
        </div>
        {[
          "React / Next.js",
          "TypeScript",
          "GSAP & Motion",
          "Three.js / R3F",
          "Tailwind CSS",
        ].map((skill) => (
          <div key={skill} className="overflow-hidden">
            <p className="reveal-text skill-item">{skill}</p>
          </div>
        ))}
      </section> */}

      {/* PROJECTS */}
      <section className="content-section">
        <div className="overflow-hidden">
          <h2 className="reveal-text section-title">Projects</h2>
        </div>
        {["Portfolio Website", "E-Commerce Store", "3D Landing Page"].map(
          (project) => (
            <div key={project} className="overflow-hidden">
              <p className="reveal-text project-item">{project}</p>
            </div>
          )
        )}
      </section>


    </main >
  );
}
