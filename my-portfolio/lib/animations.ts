import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initReveal() {
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
