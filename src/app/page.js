"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Section from "./components/section";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import Navigator from "./components/Navigator";
import AudioContext from "./components/AudioContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/sections.json", fetcher);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("Intro");
  const [currentSection, setCurrentSection] = useState("Etapa I");
  const [showNavBar, setShowNavBar] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);

  const handleSectionChange = (sectionName) => {
    setCurrentSection(sectionName);
  };

  const sanitizeId = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const showLoading = false; // REMEMBER TO CHANGE THIS WHEN DEPLOYING

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavBar(true);
    }, 100); // CHANGE TO 10000 WHEN DEPLOYING
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolling detected");
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
        console.log("Updating current slide to", newCurrentSlide);
        setCurrentSlide(newCurrentSlide);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, currentSlide]);

  if (error) return <div>Failed to load</div>;

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
        <div className="relative isolate pt-14 md:pl-20">
          {data &&
            data.map((section) => (
              <Section
                section={section}
                key={section.id}
                onVisible={() => handleSectionChange(section.etapa)}
              />
            ))}
        </div>
      </div>
    </AudioContext.Provider>
  );
}
