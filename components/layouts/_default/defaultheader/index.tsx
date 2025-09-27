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
          {/* <Link href="/">
            <Image
              className="mobile-logo"
              width={60}
              height={60}
              src="/images/leaf.png"
              alt="Logo"
              priority={true}
            />
          </Link> */}
          <button
            className="leaf-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMenuOpen)}
          >
            <Image
              width={50}
              height={50}
              src="/images/leaf.png"
              alt="Menu"
              priority={true}
            />
          </button>
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

        {isMenuOpen && (
          <div className="mobile-nav-container">
            <ul className="mobile-nav-list">
              {header.navlinks.map(([name, path]) => (
                <li key={name}>
                  <Link href={path} className="mobile-nav-link">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

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
