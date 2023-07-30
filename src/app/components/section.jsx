"use client";
import { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";

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
        {section.imagen && (
          <img
            src={section.imagen}
            alt={section.caption || "Section image"}
            className={`drop-shadow-xl ${
              section.imagenSola ? "max-w-xs mx-auto" : ""
            }`}
          />
        )}
        {(section.imagen2 || section.imagen3 || section.imagen4) && (
          <div className="flex flex-wrap justify-center">
            {section.imagen2 && (
              <img
                src={section.imagen2}
                alt="Image 2"
                className="drop-shadow-xl m-2"
              />
            )}
            {section.imagen3 && (
              <img
                src={section.imagen3}
                alt="Image 3"
                className="drop-shadow-xl m-2"
              />
            )}
            {section.imagen4 && (
              <img
                src={section.imagen4}
                alt="Image 4"
                className="drop-shadow-xl m-2"
              />
            )}
          </div>
        )}
        {section.periodo && (
          <div className="flex flex-col align-center items-center">
            <p className="text-xl text-white">{section.periodo}</p>
            <h1 className="text-4xl font-sans etapa-title">
              etapa {section.etapa}
            </h1>
          </div>
        )}
        {section.titulo && !section.isQuestion && (
          <div className="flex flex-col justify-center items-left pl-20">
            <h2 className="text-3xl tracking-tight text-white sm:text-5xl font-poppins">
              {section.titulo}
            </h2>
            {section.sobreTitulo && (
              <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                {section.sobreTitulo}
              </h3>
            )}

            {section.descripcion && (
              <p className="text-lg text-white mt-2 opacity-70 mt-3 mb-3">
                {section.descripcion}
              </p>
            )}

            {section.caption && (
              <p className="text-sm text-white mt-2 opacity-70 mb-2">
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
