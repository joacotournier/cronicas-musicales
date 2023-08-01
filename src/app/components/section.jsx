"use client";
import { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";

function Section({ section, onVisible }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isMagnified, setIsMagnified] = useState(false);

  function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);

    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - w / zoom) {
        x = img.width - w / zoom;
      }
      if (x < w / zoom) {
        x = w / zoom;
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom;
      }
      if (y < h / zoom) {
        y = h / zoom;
      }
      /* Set the position of the magnifier glass: */
      glass.style.left = x - w + "px";
      glass.style.top = y - h + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition =
        "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
    }

    function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          onVisible();
        }
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
    <div
      id={section.etapa.toLowerCase()}
      className="h-[150vh] flex items-top justify-center"
    >
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
        {section.isCDM && (
          <div className="flex flex-col justify-center items-center">
            <img src="/cdm.png" alt="cdm" className="w-40" />
            <h2 className="text-2xl text-center max-w-6xl mt-8 tracking-tight text-white sm:text-4xl">
              {section.titulo}
            </h2>
            <a
              href="http://cdm.gub.uy"
              target="_blank"
              className="mt-12 border-2 p-4 px-8 text-xl"
            >
              Sitio web del CDM
            </a>
          </div>
        )}
        {section.isEnd && (
          <div className="flex justify-center items-center">
            <img src="/logo.svg" alt="logo" className="w-120" />
            <div className="flex flex-col items-left ml-20 pl-20 border-l-2 border-gray-600">
              <h2 className="text-2xl max-w-6xl mt-8 tracking-tight text-white sm:text-4xl">
                Contacto
              </h2>
              <h4 className="text-xl max-w-6xl text-poppins mt-8 tracking-tight text-white sm:text-2xl">
                PROYECTO
              </h4>
              <a
                href="mailto:contacto@cronicasmusicales.com"
                className="opacity-50"
              >
                contacto@cronicasmusicales.com
              </a>
              <h4 className="text-xl max-w-6xl text-poppins mt-8 tracking-tight text-white sm:text-2xl">
                CDM | CENTRO DE DOCUMENTACIÓN MUSICAL
              </h4>
              <a href="mailto:consulta@cdm.gub.uy" className="opacity-50">
                consulta@cdm.gub.uy
              </a>
              <img src="/mec.png" alt="logo" className="w-80 mt-10 mb-10" />
            </div>
          </div>
        )}
        {section.imagen && !isPopupOpen && (
          <div class="img-magnifier-container">
            <img
              src={
                isHovered && section.hover ? section.hoverImage : section.imagen
              }
              alt={section.caption || "Section image"}
              className={`drop-shadow-xl object-cover  ${
                section.imagenSola ? "max-w-4xl mx-auto" : "max-w-xl"
              } ${section.hover ? "cursor-pointer" : ""}`}
              style={section.hover ? { cursor: "pointer" } : {}}
              onClick={() => section.hover && setIsPopupOpen(true)}
              id={section.id}
              onMouseEnter={() => {
                if (section.hover) setIsHovered(true);
                if (section.esZoom && !isMagnified) {
                  magnify(section.id, 2.5);
                  setIsMagnified(true);
                  // Set opacity to 100% for all .img-magnifier-glass elements
                  const glasses = document.querySelectorAll(
                    ".img-magnifier-glass"
                  );
                  glasses.forEach((glass) => {
                    glass.style.opacity = "1";
                  });
                }
              }}
              onMouseLeave={() => {
                if (section.hover) setIsHovered(false);
                if (section.esZoom && isMagnified) {
                  // Set opacity to 0% for all .img-magnifier-glass elements
                  const glasses = document.querySelectorAll(
                    ".img-magnifier-glass"
                  );
                  glasses.forEach((glass) => {
                    glass.style.opacity = "0";
                    setTimeout(() => {
                      glass.parentNode.removeChild(glass);
                      setIsMagnified(false);
                    }, 100); // adjust delay as needed
                  });
                }
              }}
            />
          </div>
        )}

        {isPopupOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75"
            style={section.hover ? { cursor: "pointer" } : {}}
            onClick={() => setIsPopupOpen(false)}
          >
            <img
              src={section.popImage}
              alt="Popup image"
              className="max-w-4xl mx-auto"
            />
          </div>
        )}
        {(section.imagen2 || section.imagen3 || section.imagen4) && (
          <div className="flex-column justify-center items-center">
            <div className="flex justify-center">
              {section.imagen2 && (
                <img
                  src={section.imagen2}
                  alt="Image 2"
                  className="drop-shadow-xl m-2 w-1/4 object-cover"
                />
              )}
              {section.imagen3 && (
                <img
                  src={section.imagen3}
                  alt="Image 3"
                  className="drop-shadow-xl m-2 w-1/4 object-cover"
                />
              )}
              {section.imagen4 && (
                <img
                  src={section.imagen4}
                  alt="Image 4"
                  className="drop-shadow-xl m-2 w-1/4 object-cover"
                />
              )}
            </div>
            {section.imagenesCaption && (
              <div className="flex justify-center items-center mt-4">
                {section.imagenesCaption}
              </div>
            )}
          </div>
        )}
        {section.periodo && (
          <div className="flex flex-col align-center items-center">
            <p className="text-xl text-white">{section.periodo}</p>
            {section.etapa !== "LEGADO" ? (
              <h1 className="text-4xl font-sans etapa-title">
                etapa {section.etapa.toLowerCase()}
              </h1>
            ) : (
              <h1 className="text-4xl font-sans etapa-title">
                {section.etapa.toLowerCase()}
              </h1>
            )}
          </div>
        )}
        {section.titulo && !section.isQuestion && !section.isCDM && (
          <div
            className={`flex flex-col justify-center ${
              section.imagen ? "items-left" : "items-center"
            } pl-20`}
          >
            {section.sobreTitulo && (
              <p className="text-l text-white opacity-50 mb-2 sm:text-xl">
                {section.sobreTitulo}
              </p>
            )}
            <h2
              className={`text-3xl text-white ${
                section.sinTitulo ? "hidden" : ""
              } sm:text-5xl ${section.tituloSolo ? "" : "font-poppins"} `}
            >
              {section.titulo}
            </h2>
            {section.descripcion && (
              <p
                className={`text-xl ${
                  section.imagen
                    ? "text-left"
                    : "text-center sm:leading-loose sm:text-2xl"
                }  max-w-2xl text-white opacity-70 mt-3 mb-3`}
                dangerouslySetInnerHTML={{
                  __html: section.descripcion.replace(/\n/g, "<br />"),
                }}
              ></p>
            )}

            {section.caption && (
              <p className="text-sm text-white mt-2 opacity-50 mb-2">
                {section.caption}
              </p>
            )}

            {section.quote && (
              <blockquote className="text-lg font-medium italic text-white mt-4">
                {section.quote}
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
