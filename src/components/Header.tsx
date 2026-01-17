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
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // ページ読み込み後にヘッダー表示（Heroアニメーション後）
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
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

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`header ${isActive ? "active" : ""} ${isScrolled ? "scrolled" : ""}`}
      >
        <Link href="/" className="header-logo">
          {logo}
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="header-nav-link"
            >
              {item.label}
            </Link>
          ))}
          <Link href="#recruit" className="header-entry">
            <span>ENTRY</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`header-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div
          className="mobile-menu-overlay"
          onClick={handleMobileMenuClose}
        />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-content">
            <nav className="mobile-menu-nav">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-menu-link"
                  onClick={handleMobileMenuClose}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="#recruit"
              className="mobile-menu-entry"
              onClick={handleMobileMenuClose}
            >
              ENTRY
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
