"use client";
import { useState, useEffect, useRef } from "react";

function Section({ section }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="h-[150vh] flex items-top justify-center">
      <div
        ref={sectionRef}
        className={`py-24 sm:py-32 lg:pb-40 h-[100vh] flex items-center justify-center sticky top-0 transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {section.titulo && (
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {section.titulo}
          </h2>
        )}
        {section.sobreTitulo && (
          <h3 className="text-3xl font-semibold text-white sm:text-4xl">
            {section.sobreTitulo}
          </h3>
        )}
        {section.periodo && (
          <div className="flex flex-col align-center items-center">
            <p className="text-xl text-white">{section.periodo}</p>
            <h1 className="text-4xl font-sans etapa-title">
              etapa {section.etapa}
            </h1>
          </div>
        )}
        {section.description && (
          <p className="text-lg text-white mt-2">{section.description}</p>
        )}
        {section.imagen && (
          <img
            src={section.imagen}
            alt={section.caption || "Section image"}
            className="drop-shadow-xl"
          />
        )}
        {section.caption && (
          <p className="text-sm text-white mt-2">{section.caption}</p>
        )}
        {section.quote && (
          <blockquote className="text-lg font-medium italic text-white mt-4">
            &quot{section.quote}&quot
          </blockquote>
        )}
        {section.imagenQuote && (
          <figcaption className="text-sm text-white mt-2">
            {section.imagenQuote}
          </figcaption>
        )}
      </div>
    </div>
  );
}

export default Section;
