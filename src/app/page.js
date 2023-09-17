"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Section from "./components/section";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import Navigator from "./components/Navigator";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/sections.json", fetcher);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("Intro");
  const [currentSection, setCurrentSection] = useState("Etapa I");
  const [showNavBar, setShowNavBar] = useState(false);

  const handleSectionChange = (sectionName) => {
    setCurrentSection(sectionName);
  };

  const showLoading = false; // REMEMBER TO CHANGE THIS WHEN DEPLOYING

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavBar(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (error) return <div>Failed to load</div>;

  return (
    <div className="relative">
      {showNavBar && <NavBar currentSection={currentSection} />}
      {showNavBar && (
        <Navigator
          currentSection={currentSection}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          sections={data}
        />
      )}
      {showLoading && <LoadingScreen />}
      <div className="bg-main-pattern bg-cover h-screen w-screen fixed"></div>
      <div className="relative isolate pt-14">
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
  );
}
