"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Loader from "@/loader";
import Header from "@/layouts/_default/defaultheader";

export default function Default({ children, links }: { children: ReactNode, links: HeaderLinks }) {
  const
    [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div className="container">
      <Header links={links} />
      <main>
        <div className="container">
          {loading ? <Loader /> : children}
        </div>
      </main>
    </div>
  );
};
