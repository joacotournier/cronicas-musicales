import React from "react";

function Navigator({ currentSection, sections }) {
  const indexOfCurrent = sections.findIndex((s) => s.etapa === currentSection);
  const displayedSections = sections.slice(
    Math.max(0, indexOfCurrent - 2),
    indexOfCurrent + 3
  );

  return (
    <div className="fixed z-10 right-0 top-1/2 transform -translate-y-1/2 space-y-4">
      {displayedSections.map((section, index) => (
        <div
          key={section.id}
          className={`transition-opacity duration-300 text-center ${
            section.etapa === currentSection
              ? "opacity-100 text-2xl"
              : "opacity-50 text-lg"
          }`}
        >
          {section.etapa}
        </div>
      ))}
    </div>
  );
}

export default Navigator;
