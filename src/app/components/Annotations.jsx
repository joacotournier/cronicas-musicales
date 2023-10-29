"use client";
// components/Annotations.jsx
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Annotations({ isOpen, annotationId, onClose }) {
  const [annotationsData, setAnnotationsData] = useState([]);
  const annotationRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch the annotations data from the public folder
      fetch("/notes.json")
        .then((response) => response.json())
        .then((data) => setAnnotationsData(data));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!annotationRef.current) return;

    // Animation
    if (isOpen) {
      gsap.to(annotationRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(annotationRef.current, {
        opacity: 0,
        y: 50,
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
      className="fixed top-0 left-0 w-full h-full bg-white p-10 overflow-y-auto transform translate-y-10 opacity-0"
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
