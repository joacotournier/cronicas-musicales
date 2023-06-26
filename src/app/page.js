"use client";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import Section from "./components/section";
import LoadingScreen from "./components/LoadingScreen";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/sections.json", fetcher);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showLoading = false; // REMEMBER TO CHANGE THIS WHEN DEPLOYING

  if (error) return <div>Failed to load</div>;

  return (
    <div className="relative">
      {showLoading && <LoadingScreen />}
      <div className="bg-main-pattern bg-cover h-screen w-screen fixed"></div>
      <div className="relative isolate pt-14">
        {data &&
          data.map((section) => <Section section={section} key={section.id} />)}
      </div>
    </div>
  );
}
