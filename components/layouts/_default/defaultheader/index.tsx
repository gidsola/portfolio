import { Session } from "@auth/core/types";
import Link from "next/link";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

export default function Header(props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  session: Session | null;
}) {
  const pages = [
    ["Home", "/"],
    ["Register", "/register"]
  ];

  return (
    <header className="duration-300 ease-linear sticky top-0 z-999 flex w-full bg-black drop-shadow-6">
      <div className="flex flex-grow rounded-lg items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex rounded-lg items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-lg bg-black p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                ></span>
              </span>
            </span>
            
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={50}
              height={50}
              src={"/reboot.png"}
              alt="Logo"
              priority={true}
            />
          </Link>
        </div>

     
        <Link className="block 2xsm:hidden" href="/">
          <Image
            width={150}
            height={50}
            src={"/reboot.png"}
            alt="Logo"
            priority={true}
          />
        </Link>

        <div className="relative rounded-lg right-0 gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">

            {pages.map((page) => (
              <li key={page[0]} >
                <Link
                  href={page[1]}
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  {page[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownUser session={props.session} />
          </ul>
        </div>
      </div>
    </header>
  );
};

