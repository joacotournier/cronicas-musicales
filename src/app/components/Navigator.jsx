import React, { useEffect, useState } from "react";

function Navigator({ currentSlide, setCurrentSlide, sections }) {
  console.log("Navigator rendering with slide:", currentSlide);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const currentIndex = sections.findIndex(
      (section) => section.tituloNavegador === currentSlide
    );

    const start = Math.max(0, currentIndex - 2);
    const end = Math.min(sections.length - 1, currentIndex + 2);

    setVisibleSections(sections.slice(start, end));
  }, [currentSlide, sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const tituloNavegador = id.charAt(0).toUpperCase() + id.slice(1);
      setCurrentSlide(tituloNavegador);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-10">
      {visibleSections.map((section) => {
        if (!section.tituloNavegador) return null;

        return (
          <div
            key={section.tituloNavegador}
            onClick={() => scrollToSection(section.tituloNavegador)}
            className={`cursor-pointer mb-2 p-2 pr-10 text-right ${
              currentSlide === section.tituloNavegador
                ? "text-xl opacity-100"
                : "opacity-50 hover:opacity-75"
            }`}
          >
            {section.tituloNavegador}
          </div>
        );
      })}
    </div>
  );
}

export default Navigator;
