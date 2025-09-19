"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Loader from "@/loader";
import Header, { HeadPages } from "@/layouts/_default/defaultheader";

export default function Default({ children, pages }: { children: ReactNode, pages: HeadPages }) {
  const
    [loading, setLoading] = useState<boolean>(true);

  // console.log("DEFAULT", pages)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div className="container">
      <Header headpages={pages} />
      <main>
        <div className="container">
          {loading ? <Loader /> : children}
        </div>
      </main>
    </div>
  );
};
