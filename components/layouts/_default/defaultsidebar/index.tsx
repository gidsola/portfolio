"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const
    pathname = usePathname();
  if (!pathname) return null;
  // console.log("pathname", pathname);
  if (pathname === "/") return null;

  const
    trigger = useRef<any>(null),
    sidebar = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/reboot.png"}
            alt="Logo"
            priority={true}
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="px-4 py-4">
          <h1 className="mt-8 mb-2 text-center text-lg text-white font-medium border border-transparent border-b-hlPurple border-4">Account</h1>
          <div>
            <ul className="flex-col gap-1.5">
              <Link
                onClick={() => setSidebarOpen(!sidebarOpen)}
                href="/account/overview"
                className={`mx-8 flex gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out ${!pathname.includes("account/overview") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.includes("account/overview") && "bg-graydark dark:bg-grey"}`}
              >
                Account Overview
              </Link>
              <Link
                // onClick={() => setSidebarOpen(!sidebarOpen)}
                href="/account/personal"
                className={`mx-8 flex gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out ${!pathname.includes("account/personal") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.includes("account/personal") && "bg-graydark dark:bg-grey"}`}
              >
                Personal Information
              </Link>

            </ul>
          </div>

        </nav>
      </div>
    </aside >
  );
};
