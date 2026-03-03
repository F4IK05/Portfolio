"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Home() {

  useEffect(() => {
    const heroTexts = document.querySelectorAll(".hero");
    const duration = 0.75;

    gsap.set(".hero", { yPercent: 75 });
    const tl = gsap.timeline();

    heroTexts.forEach((_, index) => {
      if (index > 0) {
        tl.to(".hero", {
          yPercent: "-=25",
          duration: duration,
          ease: "power2",
        });
      }
    });
  }, []);

  return (
    <div className="h-500">
      <div className="hero">
        <h2>Faik</h2>
        <h2>Hasanov</h2>
      </div>
    </div>
  );
}
