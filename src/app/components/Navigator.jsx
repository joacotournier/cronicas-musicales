import React from "react";
import { useRef, useEffect, useState } from "react";

function Navigator({
  currentSection,
  currentSlide,
  setCurrentSlide,
  sections,
}) {
  const navigatorRef = useRef();
  const [startIndex, setStartIndex] = useState(0);
  const displayedSections = sections.slice(startIndex, startIndex + 5);
  const handleItemClick = (index, id) => {
    if (index === 0 && startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
    if (
      index === displayedSections.length - 1 &&
      startIndex + displayedSections.length < sections.length
    ) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
    scrollToSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navigatorRef.current) {
        const offsetTop = navigatorRef.current.getBoundingClientRect().top;
        const halfHeight = navigatorRef.current.clientHeight / 2;

        sections.forEach((section) => {
          const el = document.getElementById(section.etapa.toLowerCase());
          if (el) {
            const elTop = el.getBoundingClientRect().top;
            if (
              elTop <= offsetTop + halfHeight &&
              elTop + el.clientHeight > offsetTop + halfHeight
            ) {
              if (currentSlide !== section.tituloNavegador) {
                setCurrentSlide(section.tituloNavegador);
              }
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={navigatorRef}
      className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50"
    >
      {displayedSections.map((section, index) => (
        <div
          key={index}
          onClick={() =>
            handleItemClick(index, section.tituloNavegador.toLowerCase())
          }
          className={`cursor-pointer mb-2 p-2 pr-10 text-right opacity-50 hover:opacity-75 ${
            currentSlide === section.tituloNavegador
              ? "text-xl opacity-100"
              : ""
          }`}
        >
          {section.tituloNavegador}
        </div>
      ))}
    </div>
  );
}

export default Navigator;
