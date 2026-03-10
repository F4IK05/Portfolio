"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AsciiIcon3D from "../ui/menu-icon-3d";
import PixelReveal, { PIXEL_COLS, PIXEL_ROWS } from "../ui/pixel-reveal";
import PixelConnectors from "../ui/pixel-connections";
import ArrowLinkButton from "../ui/arrow-link-button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursor = useRef(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const mobileLinkRef = useRef<HTMLAnchorElement>(null);

  const pixelRef = useRef<HTMLDivElement>(null);
  const connectorsRef = useRef<HTMLDivElement>(null);
  const asciiWrapRef = useRef<HTMLDivElement>(null);

  // Курсор
  useGSAP(() => {
    if (!linkRef.current || !cursor.current) return;
    const area = linkRef.current;
    const c = cursor.current;

    const move = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();

      gsap.to(c, {
        x: e.clientX - rect.left - 20,
        y: e.clientY - rect.top - 20,
        duration: 0.2
      });
    };

    const enter = () => gsap.to(c, { opacity: 1 });
    const leave = () => gsap.to(c, { opacity: 0 });

    area.addEventListener("mousemove", move);
    area.addEventListener("mouseenter", enter);
    area.addEventListener("mouseleave", leave);

    return () => {
      area.removeEventListener("mousemove", move);
      area.removeEventListener("mouseenter", enter);
      area.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Анимация текста и изображения при скролле
  useGSAP(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  useGSAP(() => {
    if (!svgRef.current || !linkRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");
    const link = linkRef.current;

    paths.forEach((path) => {
      const originalFill = path.getAttribute("fill") || "black";
      const length = path.getTotalLength();

      path.setAttribute("data-fill", originalFill);
      path.style.fill = "none";
      path.style.stroke = originalFill;
      path.style.strokeWidth = "2";
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    gsap.set(link, { backgroundColor: "transparent" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Обводка
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    // Заливка
    tl.to(
      paths,
      {
        fill: (i: number, el: SVGPathElement) => el.getAttribute("data-fill") || "black",
        strokeWidth: 0,
        duration: 0.6,
        ease: "power1.in",
        stagger: 0.05,
      },
      ">-0.3"
    );

    // Скрытие SVG
    tl.to(
      svgRef.current,
      { opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.in" },
      ">0.5"
    );

    // Раскрытие Link
    tl.to(
      aboutRef.current,
      { backgroundColor: "transparent", duration: 0.5, ease: "power2.out" },
      ">-0.3"
    );

    tl.to(
      link,
      { padding: "40px", duration: 0.8, ease: "power2.inOut" },
      "<"
    );

    // Pixel-эффект появления
    if (pixelRef.current && connectorsRef.current && asciiWrapRef.current) {
      const pixelEls = Array.from(pixelRef.current.children);

      const connectorEls = Array.from(connectorsRef.current.querySelectorAll('.connector-pixel'));

      // Появление основных пикселей
      tl.to(pixelEls, {
        opacity: 1,
        duration: 0.02,
        ease: "none",
        stagger: {
          grid: [PIXEL_ROWS, PIXEL_COLS],
          from: "random",
          amount: 0.5,
        },
      }, ">");

      tl.to(connectorEls, {
        opacity: 1,
        duration: 0.05,
        stagger: {
          from: "random", 
          amount: 0.6,
        }
      }, "<");

      tl.set(link, { backgroundColor: "#000000" });

      // Блоки выключаются мгновенно в случайном порядке
      tl.to(pixelEls, {
        opacity: 0,
        duration: 0.02,
        ease: "none",
        stagger: {
          grid: [PIXEL_ROWS, PIXEL_COLS],
          from: "random",
          amount: 0.8,
        },
      }, ">0.1");

      // AsciiIcon3D появляется
      tl.to(
        asciiWrapRef.current,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "<0.2"
      );

    }

    // Мобильная кнопка
    if (mobileLinkRef.current) {
      tl.fromTo(
        mobileLinkRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "<"
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white rounded-t-[50px] relative overflow-hidden p-5 sm:p-15 flex flex-row"
    >
      <div ref={textBlockRef} className="relative sm:border border-black rounded-[50px] w-full flex flex-col md:flex-row items-stretch overflow-hidden lg:aspect-18/7">

        <div ref={aboutRef} className="lg:rounded-[50px] absolute inset-0 z-10 flex items-center justify-center bg-white">
          <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 1344 768">
            <path fill="black" d="M674.994 78.3717C695.106 75.9745 719.882 80.9658 736.052 93.7609C760.704 113.268 759.355 139.174 759.363 167.652L759.346 217.17L759.375 378.864L759.405 548.575L759.429 600.545C759.433 611.145 759.858 622.209 758.817 632.747C755.197 669.377 728.274 687.796 693.812 691.725C670.954 692.992 649.436 690.147 631.181 675.171C606.236 654.706 608.909 623.818 608.914 594.802L608.938 540.353L608.93 364.277L608.935 213.308L608.952 167.311C608.96 156.853 608.607 146.025 609.802 135.645C613.909 99.9731 641.271 81.4015 674.994 78.3717Z" />
            <path fill="white" d="M679.876 128.792C683.186 128.559 686.907 128.339 690.087 129.418C697.756 132.019 699.395 142.193 699.424 149.058C699.537 175.659 699.467 202.242 699.461 228.834L699.433 385.785L699.475 523.001C699.491 539.516 701.389 621.527 697.418 632.307C695.793 636.718 693.327 638.571 689.177 640.532C671.718 642.549 669.695 631.922 669.459 616.855C669.091 593.437 669.289 569.968 669.284 546.542L669.279 411.98L669.282 240.54C669.287 210.633 669.219 180.662 669.413 150.754C669.444 146.131 669.705 140.887 671.364 136.579C673.172 131.883 675.562 130.699 679.876 128.792Z" />
            <path fill="black" d="M430.646 82.1153C459.398 82.0232 515.57 79.3177 540.519 88.0052C554.674 92.9342 565.862 102.414 572.353 115.999C576.221 124.095 577.898 132.196 578.707 141.081C579.745 152.469 579.355 164.052 579.341 175.484L579.345 224.741L579.352 287.626C579.351 307.286 580.638 330.694 574.968 349.768C571.131 362.674 559.835 369.071 548.316 374.44C585.613 389.721 579.476 425.751 579.479 459.082L579.492 524.988L579.506 588.677C579.506 610.184 581.181 629.449 573.788 650.011C556.256 689.669 515.641 686.538 479.011 686.542L430.657 686.51L430.646 82.1153Z" />
            <path fill="white" d="M490.84 399.659C521.18 399.193 520.113 403.826 520.229 432.93C520.255 439.404 520.245 446.455 520.244 452.971L520.238 524.01L520.239 585.892C520.244 597.948 520.406 610.332 519.809 622.371C519.611 626.365 518.293 628.807 516.2 632.122C508.816 637.5 499.763 636.516 490.917 636.407L490.84 399.659Z" />
            <path fill="white" d="M490.921 132.591C501.004 132.502 517.579 131.001 519.006 144.195C520.198 155.225 519.875 166.103 519.879 177.178L519.889 231.407L519.875 298.31C519.869 310.119 520.075 322.427 519.487 334.219C519.292 338.105 517.772 341.327 515.528 344.445C507.641 349.52 500.13 348.579 490.976 348.533L490.921 132.591Z" />
            <path fill="black" d="M879.307 82.0539L939.162 82.0997L939.111 132.796L939.166 481.611L939.177 581.769C939.183 599.294 939.834 618.185 938.261 635.492C931.363 711.383 796.671 711.337 789.857 635.255C788.045 615.019 788.762 594.724 788.758 574.421L788.702 463.574L788.765 82.1147L848.631 82.1159L848.678 474.136L848.666 575.025C848.654 592.753 847.718 611.628 850.024 629.115C851.56 640.767 861.317 641.882 870.796 640.047C871.833 639.304 872.812 638.483 873.724 637.591C878.039 633.35 878.853 626.605 879.019 620.792C879.584 600.917 879.291 580.567 879.29 560.671L879.292 444.351L879.307 82.0539Z" />
            <path fill="black" d="M284.287 82.0373L361.909 82.0623C364.876 125.45 369.032 169.822 372.539 213.292L399.386 537.593C403.435 586.339 408.575 637.874 411.678 686.533L349.735 686.541C348.33 647.753 345.397 606.465 343.159 567.632L342.258 548.759L303.97 548.763C302.436 592.783 299.158 642.472 295.897 686.563L235.992 686.573C236.992 665.509 239.553 641.3 241.281 620.084L251.336 495.652L284.287 82.0373Z" />
            <path fill="white" d="M322.474 215.125C324.32 217.014 325.686 255.973 326.016 261.931L330.419 339.809C333.222 391.471 336.795 444.686 338.812 496.243L323.859 496.236L307.109 496.235C307.468 485.167 308.198 473.726 308.889 462.664C314.039 380.254 317.066 297.502 322.474 215.125Z" />
            <path fill="black" d="M954.261 82.0912L1104.55 82.0715L1104.49 134.37L1059.81 134.411L1059.9 642.297L1059.83 686.507L998.958 686.523L998.956 134.405L954.257 134.463L954.261 82.0912Z" />
          </svg>
        </div>

        <div
          ref={textRef}
          className="flex flex-3 flex-col gap-4 text-left text-black font-normal tracking-tighter"
        >
          <div className="p-2 sm:py-10 sm:pl-10 sm:w-[80%]">

            <h2 className="text-[24px] lg:text-[3.2vw]">
              Hi! I am Faik,
            </h2>
            <p className="text-[24px] lg:text-[3.2vw]">
              a developer who enjoys creating modern digital experiences and exploring new technologies.
            </p>
          </div>
        </div>
        <ArrowLinkButton
          ref={mobileLinkRef}
          href="/about"
          text="about"
          className="sm:hidden mt-4 opacity-0"
        />
        <Link href="/about" ref={linkRef} className="hidden lg:flex flex-1 min-w-0 flex-col items-center justify-center relative overflow-visible cursor-none group z-10">

          <PixelReveal ref={pixelRef} />
          <PixelConnectors ref={connectorsRef} />

          <div
            ref={cursor}
            className="custom-cursor pointer-events-none absolute top-0 left-0 p-3 bg-white rounded-full opacity-0 flex items-center justify-center z-20"
          >
            <ArrowRight className="w-7 h-7 text-black" />
          </div>

          <div ref={asciiWrapRef} className="opacity-0">
            <AsciiIcon3D page="about" color="white" cols={80} fontSize={12} />
          </div>
        </Link>
      </div>

    </section>
  );
}