"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type AllowedTag =
  | "span" | "div" | "p"
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "a" | "button" | "li";

interface TextSlideHoverProps {
  text: string;
  hoverText?: string;
  direction?: "up" | "down";
  duration?: number;
  ease?: string;
  stagger?: number;
  className?: string;
  textClassName?: string;
  as?: AllowedTag;
}

export function TextSlideHover({
  text,
  hoverText,
  direction = "up",
  duration = 0.35,
  ease = "power2.inOut",
  stagger = 0.02,
  className,
  textClassName,
  as: Tag = "span",
}: TextSlideHoverProps) {
  const containerRef = useRef<HTMLElement>(null);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  const resolvedHoverText = hoverText ?? text;

  const primaryChars = text.split("");
  const secondaryChars = resolvedHoverText.split("");
  const maxLen = Math.max(primaryChars.length, secondaryChars.length);
  while (primaryChars.length < maxLen) primaryChars.push("\u00A0");
  while (secondaryChars.length < maxLen) secondaryChars.push("\u00A0");

  const handleMouseEnter = useCallback(() => {
    if (!containerRef.current) return;
    tweenRef.current?.kill();

    const tracks = containerRef.current.querySelectorAll<HTMLElement>(".slide-track");

    const tl = gsap.timeline();
    tl.to(tracks, {
      yPercent: direction === "up" ? -50 : 50,
      duration,
      ease,
      stagger,
    });

    tweenRef.current = tl;
  }, [direction, duration, ease, stagger]);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    tweenRef.current?.kill();

    const tracks = containerRef.current.querySelectorAll<HTMLElement>(".slide-track");

    const tl = gsap.timeline();
    tl.to(tracks, {
      yPercent: 0,
      duration,
      ease,
      stagger,
    });

    tweenRef.current = tl;
  }, [duration, ease, stagger]);

  const topChar = (i: number) =>
    direction === "up" ? primaryChars[i] : secondaryChars[i];
  const bottomChar = (i: number) =>
    direction === "up" ? secondaryChars[i] : primaryChars[i];

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={cn("relative inline-flex cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {primaryChars.map((_, i) => {
        const top = topChar(i);
        const bottom = bottomChar(i);
        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1.2em", lineHeight: "1.2" }}
          >
            <span
              className="slide-track block will-change-transform"
              style={{
                transform: direction === "down" ? "translateY(-50%)" : undefined,
              }}
            >
              <span
                className={cn("block", textClassName)}
                style={{ height: "1.2em", lineHeight: "1.2" }}
              >
                {top === " " ? "\u00A0" : top}
              </span>
              <span
                className={cn("block", textClassName)}
                style={{ height: "1.2em", lineHeight: "1.2" }}
              >
                {bottom === " " ? "\u00A0" : bottom}
              </span>
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
