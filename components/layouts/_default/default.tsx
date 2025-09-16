"use client";

import { useState, useEffect, ReactNode } from "react";
import Loader from "@/loader";
import Sidebar from "@/layouts/_default/defaultsidebar";
import Header from "@/layouts/_default/defaultheader";

export default function Default({ children }: { children: ReactNode }) {
  const
    [sidebarOpen, setSidebarOpen] = useState(false),
    [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {loading ? <Loader /> : children}
          </div>
        </main>
      </div>
    </div>
  );
};
