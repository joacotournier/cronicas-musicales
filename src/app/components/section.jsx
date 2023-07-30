"use client";
import { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";

function Section({ section }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        key={section.id}
        ref={sectionRef}
        className={`py-24 sm:py-32 lg:pb-40 h-[100vh] flex items-center justify-center sticky top-0 transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {section.isQuestion && (
          <div className="flex flex-col justify-center items-center">
            <img src="/pregunta.svg" alt="pregunta" className="" />
            <h2 className="text-2xl tracking-tight text-white sm:text-4xl">
              {section.titulo}
            </h2>
          </div>
        )}
        {section.imagen && !isPopupOpen && (
          <img
            src={
              isHovered && section.hover ? section.hoverImage : section.imagen
            }
            alt={section.caption || "Section image"}
            className={`drop-shadow-xl object-cover  ${
              section.imagenSola ? "max-w-4xl mx-auto" : "max-w-xl"
            } ${section.hover ? "cursor-pointer" : ""}`}
            style={section.hover ? { cursor: "pointer" } : {}}
            onMouseEnter={() => section.hover && setIsHovered(true)}
            onMouseLeave={() => section.hover && setIsHovered(false)}
            onClick={() => section.hover && setIsPopupOpen(true)}
          />
        )}
        {isPopupOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75"
            style={section.hover ? { cursor: "pointer" } : {}}
            onClick={() => setIsPopupOpen(false)}
          >
            <img
              src={section.popImage}
              alt="Popup image"
              className="max-w-4xl mx-auto"
            />
          </div>
        )}
        {(section.imagen2 || section.imagen3 || section.imagen4) && (
          <div className="flex justify-center">
            {section.imagen2 && (
              <img
                src={section.imagen2}
                alt="Image 2"
                className="drop-shadow-xl m-2 w-1/4 object-cover"
              />
            )}
            {section.imagen3 && (
              <img
                src={section.imagen3}
                alt="Image 3"
                className="drop-shadow-xl m-2 w-1/4 object-cover"
              />
            )}
            {section.imagen4 && (
              <img
                src={section.imagen4}
                alt="Image 4"
                className="drop-shadow-xl m-2 w-1/4 object-cover"
              />
            )}
          </div>
        )}
        {section.periodo && (
          <div className="flex flex-col align-center items-center">
            <p className="text-xl text-white">{section.periodo}</p>
            {section.etapa !== "legado" ? (
              <h1 className="text-4xl font-sans etapa-title">
                etapa {section.etapa}
              </h1>
            ) : (
              <h1 className="text-4xl font-sans etapa-title">
                {section.etapa}
              </h1>
            )}
          </div>
        )}
        {section.titulo && !section.isQuestion && (
          <div
            className={`flex flex-col justify-center ${
              section.imagen ? "items-left" : "items-center"
            } pl-20`}
          >
            {section.sobreTitulo && (
              <p className="text-l text-white opacity-50 mb-2 sm:text-xl">
                {section.sobreTitulo}
              </p>
            )}
            <h2
              className={`text-3xl text-white sm:text-5xl ${
                section.tituloSolo ? "" : "font-poppins"
              } `}
            >
              {section.titulo}
            </h2>
            {section.descripcion && (
              <p
                className={`text-xl ${
                  section.imagen
                    ? "text-left"
                    : "text-center sm:leading-loose sm:text-2xl"
                }  max-w-2xl text-white opacity-70 mt-3 mb-3`}
              >
                {section.descripcion}
              </p>
            )}

            {section.caption && (
              <p className="text-sm text-white mt-2 opacity-50 mb-2">
                {section.caption}
              </p>
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
            {section.esAudio && (
              <div>
                {section.audioTitulo && (
                  <AudioPlayer url={section.url} name={section.audioTitulo} />
                )}
                {section.audioTitulo2 && (
                  <AudioPlayer url={section.url2} name={section.audioTitulo2} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Section;
