import "./globals.css";
import { EB_Garamond } from "next/font/google";

import { Poppins } from "next/font/google";

const garamond = EB_Garamond({ subsets: ["latin"] });

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export const metadata = {
  title: "Lauro Ayestarán",
  description: "Sitio web interactivo de Lauro Ayestarán",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={garamond.className}>{children}</body>
    </html>
  );
}
