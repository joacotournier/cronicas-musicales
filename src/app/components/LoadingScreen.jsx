"use client";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { gsap } from "gsap";
import Image from "next/image";

const LoadingScreen = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showPhrase1, setShowPhrase1] = useState(false);
  const [showPhrase2, setShowPhrase2] = useState(false);
  const [hideComponent, setHideComponent] = useState(false);

  const phrase1Props = useSpring({
    opacity: showPhrase1 ? 1 : 0,
    transform: showPhrase1 ? "translate3d(0,0,0)" : "translate3d(0,50px,0)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const phrase2Props = useSpring({
    opacity: showPhrase2 ? 1 : 0,
    transform: showPhrase2 ? "translate3d(0,0,0)" : "translate3d(0,50px,0)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden"; // Disable scrolling
      const timeline = gsap.timeline();
      timeline
        .from(".logo", {
          duration: 0.4,
          scale: 1,
          opacity: 0,
          ease: "power3.out",
        })
        .to(".logo", { duration: 0.4, opacity: 0, ease: "power3.in" }, "+=2")
        .eventCallback("onComplete", () => setLogoLoaded(true));

      if (logoLoaded) {
        setTimeout(() => setShowPhrase1(true), 200);
        setTimeout(() => setShowPhrase1(false), 3000);
        setTimeout(() => setShowPhrase2(true), 3000);
        setTimeout(() => setShowPhrase2(false), 6500);
        setTimeout(() => {
          setHideComponent(true);
          document.body.style.overflow = "auto"; // Enable scrolling
        }, 7000);
      }
    }
  }, [logoLoaded]);

  if (hideComponent) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-main-pattern bg-cover overflow-hidden">
      <div className="logo fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="/logo.svg" alt="Logo" width={260} />
      </div>
      <div className="z-10">
        {showPhrase1 && (
          <animated.div
            style={phrase1Props}
            className="overflow-hidden text-center"
          >
            <div className="px-4 small-title">EXPLORANDO EL LEGADO MUSICAL</div>
          </animated.div>
        )}
        {showPhrase2 && (
          <animated.div
            style={phrase2Props}
            className="overflow-hidden text-center"
          >
            <div className="px-4 small-title">
              CON VIAJES QUE NARRAN HISTORIAS
            </div>
          </animated.div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
