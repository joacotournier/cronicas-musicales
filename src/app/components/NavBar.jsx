import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function NavBar({ currentSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent">
      <span className="text-white text-xl">Lauro Ayestaran</span>
      <div
        className="rounded-full bg-white bg-opacity-10 flex items-center p-2 pl-4 pr-5 cursor-pointer font-poppins tracking-widest text-sm"
        onClick={toggleMenu}
      >
        <span className="mr-4">{`${
          currentSection == "LEGADO" ? "" : "ETAPA"
        } ${currentSection}`}</span>
        <img src="/menu.svg" alt="Menu Icon" width={12} height={12} />
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black text-center text-white flex flex-col justify-center items-center">
          <a href="#i" onClick={closeMenu}>
            Etapa I
          </a>
          <a href="#ii" onClick={closeMenu}>
            Etapa II
          </a>
          <a href="#iii" onClick={closeMenu}>
            Etapa III
          </a>
          <a href="#legado" onClick={closeMenu}>
            Legado
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
