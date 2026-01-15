"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  logo: string;
  nav: NavItem[];
};

export default function Header({ logo, nav }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt={logo}
              width={80}
              height={32}
              className="h-6 md:h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:opacity-60 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#recruit"
              className={`px-6 py-2 text-sm font-medium border transition-all hover:bg-black hover:text-white ${
                isScrolled
                  ? "border-black text-black"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              ENTRY
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 ${
              isMobileMenuOpen ? "hamburger-active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <span
              className={`hamburger-line w-6 h-0.5 ${
                isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"
              }`}
            />
            <span
              className={`hamburger-line w-6 h-0.5 ${
                isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"
              }`}
            />
            <span
              className={`hamburger-line w-6 h-0.5 ${
                isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white mobile-menu-enter">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#recruit"
              className="mt-4 px-8 py-3 text-lg font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ENTRY
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
