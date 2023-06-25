"use client";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/sections.json", fetcher);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-main-pattern bg-cover h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        {/* Header code here */}
      </header>

      <div className="relative isolate pt-14">
        {data.map((section) => (
          <div className="py-24 sm:py-32 lg:pb-40" key={section.id}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                {section.titulo && (
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {section.titulo}
                  </h2>
                )}
                {section.sobreTitulo && (
                  <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                    {section.sobreTitulo}
                  </h3>
                )}
                {section.periodo && (
                  <p className="text-xl text-white">{section.periodo}</p>
                )}
                {section.description && (
                  <p className="text-lg text-white mt-2">
                    {section.description}
                  </p>
                )}
                {section.imagen && (
                  <img
                    src={section.imagen}
                    alt={section.caption || "Section image"}
                    className="drop-shadow-xl"
                  />
                )}
                {section.caption && (
                  <p className="text-sm text-white mt-2">{section.caption}</p>
                )}
                {section.quote && (
                  <blockquote className="text-lg font-medium italic text-white mt-4">
                    "{section.quote}"
                  </blockquote>
                )}
                {section.imagenQuote && (
                  <figcaption className="text-sm text-white mt-2">
                    {section.imagenQuote}
                  </figcaption>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
