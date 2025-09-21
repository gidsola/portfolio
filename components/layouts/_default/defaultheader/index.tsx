import Link from "next/link";
import Image from "next/image";


export default function Header({links}:{links: HeaderLinks}) {

  return (
    <header className="header">
      <div className="header-container">

        <div className="mobile-header">
          <Link href="/">
            <Image className="mobile-logo"
              width={80}
              height={80}
              src="/images/leaf.png"
              alt="Logo"
              priority={true}
            />
          </Link>
        </div>

        <Link href="/">
          <Image className="desktop-logo"
            width={150}
            height={50}
            src="/images/logo.png"
            alt="Logo"
            priority={true}
          />
        </Link>

        <div className="nav-container">
          <ul className="nav-list">
            {links.map(([name, path]) => (
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
