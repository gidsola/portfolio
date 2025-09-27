"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header({ header }: { header: HeaderPageData }) {
  const [isMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">

        <div className="mobile-header">
          <button
            className="leaf-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Image
              width={80}
              height={80}
              src="/images/leaf.png"
              alt="Menu"
              priority={true}
              className={isMenuOpen ? "leaf-icon open" : "leaf-icon"}
            />
          </button>

          <div className={`mobile-nav-container ${isMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="mobile-nav-content">
              <ul className="mobile-nav-list">
                {header.navlinks.map(([name, path]) => (
                  <li key={name} className="mobile-nav-item">
                    <Link
                      href={path}
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link href="/">
          <Image
            className="desktop-logo"
            width={150}
            height={50}
            src="/images/logo.png"
            alt="Logo"
            priority={true}
          />
        </Link>
        <div className="nav-container">
          <ul className="nav-list">
            {header.navlinks.map(([name, path]) => (
              <li key={name}>
                <Link href={path} className="nav-link">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </header>
  );
};
