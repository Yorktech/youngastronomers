import Link from 'next/link';

import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';
import Starfield from "@/components/Starfield";
import Footer from "@/components/Footer";
import { BackgroundProvider } from "@/components/BackgroundContext";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Young Astronomers UK",
  description: "Discover the Universe - Resources and opportunities for young astronomers.",
};

import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased`}>
        <BackgroundProvider>
          <Starfield />
          <Navbar />
          {children}
          <Footer />
        </BackgroundProvider>
      </body>
    </html>
  );
}
