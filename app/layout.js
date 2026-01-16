import Link from 'next/link';

import { Outfit } from "next/font/google";
import "./globals.css";
import Starfield from "@/components/Starfield";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Young Astronomers UK",
  description: "Discover the Universe - Resources and opportunities for young astronomers.",
};

import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <Starfield />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
