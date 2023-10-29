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
      className="fixed z-[100] top-0 right-0 h-full bg-slate-200 text-black p-10 pr-20 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-2xl font-bold hover:text-gray-600 transition"
      >
        ×
      </button>
      <h1 className="text-3xl font-semibold mb-4 max-w-sm">
        {annotation.title}
      </h1>
      {Array.isArray(annotation.content) ? (
        annotation.content.map((item, index) => {
          if (typeof item === "string") {
            return (
              <p key={index} className="text-base max-w-sm">
                {item}
              </p>
            );
          }
          if (item.type === "image") {
            return (
              <figure key={index} className="my-4">
                <img src={item.src} alt={item.caption} className="max-w-sm" />
                <figcaption className="text-sm mt-2">{item.caption}</figcaption>
              </figure>
            );
          }
        })
      ) : (
        <p className="text-base">{annotation.content}</p>
      )}
    </div>
  );
}

export default Annotations;
