"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollAnimation";

type NavItem = {
  label: string;
  href: string;
};

type SocialItem = {
  label: string;
  href: string;
  icon: string;
};

type FooterProps = {
  nav: NavItem[];
  social: SocialItem[];
  copyright: string;
};

export default function Footer({ nav, social, copyright }: FooterProps) {
  const { ref: footerRef, className: footerClass } = useScrollReveal<HTMLElement>("reveal");

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case "x":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "line":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer ref={footerRef} className={`bg-black text-white ${footerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Logo & Tagline */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block text-2xl md:text-3xl font-black tracking-tight mb-6">
                UGS
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                テクノロジーで、<br />
                社会の当たり前を変えていく。
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-4">
              <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
                MENU
              </h3>
              <nav className="flex flex-col gap-3">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-white mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
                SHARE
              </h3>
              <div className="flex gap-3">
                {social.map((item) => (
                  <Link
                    key={item.icon}
                    href={item.href}
                    className="w-11 h-11 flex items-center justify-center border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                    aria-label={item.label}
                  >
                    {getSocialIcon(item.icon)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <p className="text-center text-xs text-gray-600">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
