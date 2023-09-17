import React from "react";
import { useRef, useEffect } from "react";

function Navigator({ currentSection, sections }) {
  const navigatorRef = useRef();

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
              if (currentSection !== section.etapa) {
                currentSection = section.etapa;
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
      {sections.map((section, index) => (
        <div
          key={index}
          onClick={() => scrollToSection(section.etapa.toLowerCase())}
          className={`cursor-pointer mb-2 p-2 pr-10 text-right opacity-50 hover:opacity-75 ${
            currentSection === section.etapa ? "text-xl opacity-100" : ""
          }`}
        >
          {section.tituloNavegador}
        </div>
      ))}
    </div>
  );
}

export default Navigator;
