"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Annotations({ isOpen, annotationId, onClose }) {
  const [annotationsData, setAnnotationsData] = useState([]);
  const annotationRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetch("/notes.json")
        .then((response) => response.json())
        .then((data) => setAnnotationsData(data));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!annotationRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        annotationRef.current,
        {
          x: "100%",
        },
        {
          x: "0%",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(annotationRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const annotation = annotationsData.find((ann) => ann.id === annotationId);

  if (!annotation) return null;

  return (
    <div
      ref={annotationRef}
      className="fixed z-[100] top-0 right-0 h-full bg-slate-200 text-black p-10 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-xl font-bold hover:text-gray-600 transition"
      >
        ×
      </button>
      <h1 className="text-3xl font-semibold mb-4">{annotation.title}</h1>
      <p className="text-base">{annotation.content}</p>
    </div>
  );
}

export default Annotations;
