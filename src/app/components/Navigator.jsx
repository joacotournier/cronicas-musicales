import React, { useEffect, useState } from "react";

function Navigator({ currentSlide, setCurrentSlide, sections }) {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const currentIndex = sections.findIndex(
      (section) => section.tituloNavegador === currentSlide
    );

    const start = Math.max(0, currentIndex - 5);
    const end = Math.min(sections.length - 1, currentIndex + 6);

    setVisibleSections(sections.slice(start, end));
  }, [currentSlide, sections]);

  const sanitizeId = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(sanitizeId(id));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const tituloNavegador = id.charAt(0).toUpperCase() + id.slice(1);
      setCurrentSlide(tituloNavegador);
    }
  };

  const getCurrentFontSize = (sectionTitulo) => {
    const currentIndex = visibleSections.findIndex(
      (section) => section.tituloNavegador === currentSlide
    );
    const sectionIndex = visibleSections.findIndex(
      (section) => section.tituloNavegador === sectionTitulo
    );

    const distance = Math.abs(currentIndex - sectionIndex);
    if (distance === 0 || distance === 1) {
      return "text-lg"; // bigger font size for current, previous and next items
    } else {
      return "text-sm"; // slightly smaller font size
    }
  };

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10">
      {visibleSections.map((section) => {
        if (!section.tituloNavegador) return null;

        const fontSizeClass = getCurrentFontSize(section.tituloNavegador);

        return (
          <div
            key={section.tituloNavegador}
            onClick={() => scrollToSection(section.tituloNavegador)}
            className={`cursor-pointer mb-2 p-2 pl-10 text-left ${fontSizeClass} ${
              currentSlide === section.tituloNavegador
                ? "opacity-100"
                : "opacity-30 hover:opacity-75"
            } hidden md:block`}
          >
            {section.tituloNavegador}
          </div>
        );
      })}
    </div>
  );
}

export default Navigator;
