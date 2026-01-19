import Link from 'next/link';

import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Starfield from "@/components/Starfield";
import Footer from "@/components/Footer";
import { BackgroundProvider } from "@/components/BackgroundContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
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
      <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased`}>
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
