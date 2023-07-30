import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function NavBar({ currentSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-transparent">
      <span className="text-white text-xl">Lauro Ayestaran</span>
      <div
        className="rounded-full bg-white bg-opacity-30 flex items-center p-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <span className="mr-2">{`${
          currentSection == "LEGADO" ? "" : "ETAPA"
        } ${currentSection}`}</span>
        <Image src="/menu.svg" alt="Menu Icon" width={24} height={24} />
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black text-center text-white flex flex-col justify-center items-center">
          <Link href="/etapa-i">
            <a className="mb-2">Etapa I</a>
          </Link>
          <Link href="/etapa-ii">
            <a className="mb-2">Etapa II</a>
          </Link>
          <Link href="/etapa-iii">
            <a className="mb-2">Etapa III</a>
          </Link>
          <Link href="/legado">
            <a className="mb-2">Legado</a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
