"use client";
import { Session } from "@auth/core/types";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  session: Session | null;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen, session }: SidebarProps) {
  const
    pathname = usePathname();
  if (!pathname) return null;
  // console.log("pathname", pathname);
  if (pathname === "/") return null;

  const
    trigger = useRef<any>(null),
    sidebar = useRef<any>(null),
    [expandedGroups, setExpandedGroups] = useState<string[]>([]),
    isGroupExpanded = (groupName: string) => expandedGroups.includes(groupName),

    toggleGroup = (groupName: string) => {
      setExpandedGroups((prev) =>
        prev.includes(groupName)
          ? prev.filter((name) => name !== groupName)
          : [...prev, groupName]
      );
    };

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

          {session && (session.tier?.name === "ai1" || session.tier?.name === "admin")
            ? <>
              <h1 className="mt-8 mb-2 text-center text-lg text-white font-medium border border-transparent border-b-hlPurple border-4">Integrations</h1>

              <div>
                <h2
                  onClick={() => toggleGroup("discordBotIntegrations")}
                  className="my-2 mt-4 ml-8 font-medium text-base text-onsocketPurple underline cursor-pointer">
                  Discord
                </h2>
                {isGroupExpanded("discordBotIntegrations") && (
                  <ul className="flex-col gap-1.5">
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/discord/integrations/manage/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/discord/integrations/manage") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/discord/integrations/manage") && "bg-graydark dark:bg-grey"}`}
                    >
                      Manage
                    </Link>
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/discord/integrations/createcustom/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/discord/integrations/createcustom") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/discord/integrations/createcustom") && "bg-graydark dark:bg-grey"}`}
                    >
                      Create
                    </Link>
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/discord/integrations/createfromtemplate/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/discord/integrations/createfromtemplate") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/discord/integrations/createfromtemplate") && "bg-graydark dark:bg-grey"}`}
                    >
                      Create From Template
                    </Link>
                  </ul>
                )}
              </div>
            </> : null}
          {session && (session.tier?.name === "react1" || session.tier?.name === "admin")
            ? <>
              <div>
                <h2
                  onClick={() => toggleGroup("reactComponents")}
                  className="my-2 mt-4 ml-8 font-medium text-base text-onsocketPurple underline cursor-pointer">
                  React
                </h2>
                {isGroupExpanded("reactComponents") && (
                  <ul className="flex-col gap-1.5">
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/react/components/create/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/react/components/create") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/react/components/create") && "bg-graydark dark:bg-grey"}`}
                    >
                      Create Component
                    </Link>
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/react/components/templates/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/react/components/templates") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/react/components/templates") && "bg-graydark dark:bg-grey"}`}
                    >
                      Create From Template
                    </Link>
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/react/components/manage/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/react/components/manage") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/react/components/manage") && "bg-graydark dark:bg-grey"}`}
                    >
                      Manage Components
                    </Link>
                  </ul>
                )}
              </div>
            </> : null}

          {/* {session && (session.tier?.name === "admin")
            ? <>
              <div>
                <h1
                  onClick={() => toggleGroup("onionModel")}
                  className="my-2 ml-4 text-sm font-medium text-onsocketPurple decoration-orange-500 cursor-pointer">
                  Onion Model (<span className="text-red">beta</span>)
                </h1>
                {isGroupExpanded("onionModel") && (
                  <ul className="flex-col gap-1.5">
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/onion/apikeys/manage/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/react/createcomponent") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/react/createcomponent") && "bg-graydark dark:bg-grey"}`}
                    >
                      Api Keys
                    </Link>
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/ai/onion/layers/manage/"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-sm text-bodydark1 duration-300 ease-in-out ${!pathname.endsWith("ai/react/templatecomponent") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("ai/react/templatecomponent") && "bg-graydark dark:bg-grey"}`}
                    >
                      Manage Layers
                    </Link>
                  </ul>
                )}
              </div>
            </> : null} */}

          {session && (session.tier?.name === "admin")
            ? <>
              <h1 className="mt-8 mb-2 text-center text-lg text-white font-medium border border-transparent border-b-hlPurple border-4">Environments</h1>
              <div className="mb-4">
                <h2
                  onClick={() => toggleGroup("discordEventGateway")}
                  className="my-2 mt-4 ml-8 font-medium text-base text-onsocketPurple underline cursor-pointer">
                  Discord Gateway
                </h2>
                {isGroupExpanded("discordEventGateway") && (
                  <ul className="flex-col gap-1.5">
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/projects/create"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out ${!pathname.includes("projects/create") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("projects/create") && "bg-graydark dark:bg-grey"}`}
                    >
                      Create Project
                    </Link>
                    <Link
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      href="/projects/list"
                      className={`mx-8 relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out ${!pathname.includes("projects/list") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.endsWith("projects/list") && "bg-graydark dark:bg-grey"}`}
                    >
                      List Projects
                    </Link>
                  </ul>
                )}
              </div>
            </>
            : <h1 className="mt-8 mb-2 text-lg text-white font-medium drop-shadow-[0_0_10px_rgba(193,98,222,0.5)]">Tier assignment required</h1>
          }

          <h1 className="mt-8 mb-2 text-center text-lg text-white font-medium border border-transparent border-b-hlPurple border-4">Account</h1>
          <div>
            {/* <h2
              onClick={() => toggleGroup("accountPreferences")}
              className="my-2 ml-4 text-sm font-medium text-onsocketPurple decoration-orange-500 cursor-pointer">
              Account Preferences
            </h2> */}
            {/* {isGroupExpanded("accountPreferences") && ( */}
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
              {/* <Link
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  href="/account/messages"
                  className={`mx-8 flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out ${!pathname.includes("account/messages") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.includes("account/messages") && "bg-graydark dark:bg-grey"}`}
                >
                  Messages
                </Link>
                <Link
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  href="/account/billing"
                  className={`mx-8 flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out ${!pathname.includes("account/billing") && "hover:drop-shadow-[0_0_10px_rgba(193,98,222,1)] outline-black"} ${pathname.includes("account/billing") && "bg-graydark dark:bg-grey"}`}
                >
                  Billing
                </Link> */}
            </ul>
            {/* )} */}
          </div>

        </nav>
      </div>
    </aside >
  );
};
