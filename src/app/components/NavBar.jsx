import { useState } from "react";

const sections = [
  {
    title: "Etapa I",
    href: "#etapa-i",
    date: "1942 - 1950",
    image: "/hover1.jpg",
  },
  {
    title: "Etapa II",
    href: "#etapa-ii",
    date: "1950 - 1958",
    image: "/hover2.jpg",
  },
  {
    title: "Etapa III",
    href: "#etapa-iii",
    date: "1958 - 1966",
    image: "/hover3.jpg",
  },
  {
    title: "Legado",
    href: "#legado",
    date: "1966 - Presente",
    image: "/hover4.jpg",
  },
];

function NavBar({ currentSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent">
      <span className="text-white text-xl">Crónicas Musicales</span>
      {currentSection ? (
        <div
          className="rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all flex items-center p-3 pl-5 pr-6 cursor-pointer font-poppins tracking-widest text-sm"
          onClick={toggleMenu}
        >
          <span className="mr-4">{`${
            currentSection == "LEGADO" ? "" : "ETAPA"
          } ${currentSection}`}</span>
          <img src="/menu.svg" alt="Menu Icon" width={12} height={12} />
        </div>
      ) : null}

      {isMenuOpen && (
        <div
          className="fixed z-50 top-0 left-0 w-screen h-screen bg-center bg-cover text-center text-white flex flex-col md:flex-row items-stretch"
          style={{ backgroundImage: `url(/main-pattern.jpg)` }}
        >
          {sections.map((section, index) => (
            <a
              href={section.href}
              onClick={closeMenu}
              className={`relative w-full md: h-full flex flex-col justify-center items-center ${
                index === sections.length - 1
                  ? ""
                  : "border-b border-gray-500 border-opacity-50 md:border-r "
              }`}
              key={section.title}
            >
              <div
                className="absolute z-10 inset-0 bg-center bg-cover opacity-0 hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundImage: `url(${section.image})` }}
              ></div>
              <div className="font-bold text-3xl text-white w-full h-full flex flex-col justify-center items-center">
                {section.title}
                <span className="text-xs text-white opacity-50">
                  {section.date}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
