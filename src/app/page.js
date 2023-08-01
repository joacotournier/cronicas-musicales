"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Section from "./components/section";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/sections.json", fetcher);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("Etapa I"); // or fetch this data if it changes
  const [showNavBar, setShowNavBar] = useState(false); // State to control the NavBar appearance

  const handleSectionChange = (sectionName) => {
    setCurrentSection(sectionName);
  };

  const showLoading = true; // REMEMBER TO CHANGE THIS WHEN DEPLOYING

  useEffect(() => {
    // Delay for 2 seconds before setting showNavBar to true
    const timer = setTimeout(() => {
      setShowNavBar(true);
    }, 10000);
    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty dependency array means this effect will run once after the initial render

  if (error) return <div>Failed to load</div>;

  return (
    <div className="relative">
      {showNavBar && <NavBar currentSection={currentSection} />}
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
