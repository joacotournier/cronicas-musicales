"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Section from "./components/section";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import Navigator from "./components/Navigator";
import AudioContext from "./components/AudioContext";
import Annotations from "./components/Annotations";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/sections.json", fetcher);
  const [currentSlide, setCurrentSlide] = useState("Intro");
  const [currentSection, setCurrentSection] = useState("Etapa I");
  const [showNavBar, setShowNavBar] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [currentAnnotationId, setCurrentAnnotationId] = useState(null);

  const handleAnnotationClick = (id) => {
    setCurrentAnnotationId(id);
    setIsOpen(true);
  };

  const handleSectionChange = (sectionName) => {
    setCurrentSection(sectionName);
  };

  const sanitizeId = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const [showLoading, setShowLoading] = useState(false); // REMEMBER TO CHANGE THIS WHEN DEPLOYING

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavBar(true);
    }, 10000); // CHANGE TO 10000 WHEN DEPLOYING
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowNavBar(true);
        setShowLoading(false);
      }, 5000); // Adjust time as needed for your loading screen
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      let newCurrentSlide = "";

      data.forEach((section) => {
        if (!section.tituloNavegador) return;

        const el = document.getElementById(sanitizeId(section.tituloNavegador));

        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            newCurrentSlide = section.tituloNavegador;
          }
        }
      });

      if (newCurrentSlide !== currentSlide) {
        setCurrentSlide(newCurrentSlide);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, currentSlide]);

  if (error) return <div>Failed to load</div>;

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center flex gap-2 items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black mb-2"
          />
          <button
            onClick={() =>
              password === "CronicasLauro2023" && setIsAuthenticated(true)
            }
            className="bg-indigo-500 text-white p-2"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <AudioContext.Provider value={{ playingAudio, setPlayingAudio }}>
      <div className="relative">
        {showNavBar && <NavBar currentSection={currentSection} />}
        {showNavBar && (
          <Navigator
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            sections={data}
          />
        )}
        {showLoading && <LoadingScreen />}
        <div className="bg-main-pattern bg-cover h-screen w-screen fixed"></div>
        <div className="relative isolate pt-0 md:pl-20">
          <div className="h-[150vh] flex items-top justify-center">
            <div
              className={`py-24 flex flex-row items-center justify-center sm:py-32 md:flex-row pb-40 h-[100vh]  sticky top-0 max-w-6xl transition-opacity duration-500 ease-in-out`}
            >
              <h2 className="text-2xl text-center max-w-6xl mt-8 tracking-tight text-white sm:text-xl">
                Crónicas musicales
              </h2>
              <p
                className={`text-xl leading-loose text-center sm:leading-loose sm:text-2xl max-w-2xl text-white opacity-70 mt-3 mb-3`}
              >
                «Crónicas musicales» es un espacio virtual -en proceso de
                ampliación- que aspira a registrar algunos hechos en torno a la
                importancia de la música y el sonido, en la vida de los seres
                humanos. \n \n Comenzamos este camino asomándonos al viaje de
                Lauro Ayestarán a través de la vida y la música de su lugar y su
                momento histórico: «El viaje de Lauro». \n \n Nos deslumbramos
                con algunos hallazgos que fueron alimentando la construcción de
                un personaje digno de protagonizar una película, y comenzamos a
                imaginar ese viaje: narrar audiovisual y musicalmente la vida de
                este pionero de la musicología que recorrió y grabó casi todo el
                Uruguay.
              </p>
            </div>
          </div>
          {data &&
            data.map((section) => (
              <Section
                section={section}
                key={section.id}
                onVisible={() => handleSectionChange(section.etapa)}
                handleAnnotationClick={handleAnnotationClick}
              />
            ))}
        </div>
        <div className="fixed bottom-4 right-4 z-100">
          <ArrowDownIcon className="h-8 w-8 text-white mb-4 mr-4" />
        </div>
      </div>
      <Annotations
        isOpen={isOpen}
        annotationId={currentAnnotationId}
        onClose={() => setIsOpen(false)}
      />
    </AudioContext.Provider>
  );
}
