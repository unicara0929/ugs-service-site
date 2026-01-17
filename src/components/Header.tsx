"use client";

import { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 初回ロード時のアニメーション
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-6"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        style={{ transitionProperty: "opacity, transform, background-color, padding, box-shadow" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {nav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wider transition-all duration-300 group ${
                    isScrolled
                      ? "text-gray-700 hover:text-black"
                      : "text-white/80 hover:text-white"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-black" : "bg-white"
                    }`}
                  />
                </Link>
              ))}
              <Link
                href="#recruit"
                className={`relative px-7 py-2.5 text-sm font-bold tracking-wider border-2 transition-all duration-300 overflow-hidden group ${
                  isScrolled
                    ? "border-black text-black hover:text-white"
                    : "border-white text-white hover:text-black"
                }`}
              >
                <span className="relative z-10">ENTRY</span>
                <span
                  className={`absolute inset-0 transition-transform duration-300 -translate-x-full group-hover:translate-x-0 ${
                    isScrolled ? "bg-black" : "bg-white"
                  }`}
                />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 ${
                isMobileMenuOpen ? "hamburger-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <span
                className={`hamburger-line block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"
                }`}
              />
              <span
                className={`hamburger-line block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"
                }`}
              />
              <span
                className={`hamburger-line block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-8">
            <nav className="flex flex-col gap-1">
              {nav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-4 text-2xl font-bold text-gray-900 border-b border-gray-100 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : "0ms",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div
              className={`mt-auto transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "600ms" : "0ms" }}
            >
              <Link
                href="#recruit"
                className="block w-full py-4 text-center text-lg font-bold bg-black text-white hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ENTRY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
