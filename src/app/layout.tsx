import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/Background";
import Footer from "@/components/Footer";

const poppins = Poppins({weight:'800',subsets:['latin']})

export const metadata: Metadata = {
  title: "Serhii Sliusarsky - Portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <Header/>
        <AnimatedBackground/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}