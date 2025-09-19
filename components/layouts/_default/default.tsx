"use client";

import React,{ useState, useEffect, ReactNode } from "react";
import Loader from "@/loader";
import Header, {HeadPages} from "@/layouts/_default/defaultheader";


const pages: HeadPages = [
  ["Home", "/"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Projects", "/projects"],
  ["Services", "/services"],
];

export default function Default({ children }: { children: ReactNode }) {
  const
    [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div className="container">
      <Header headpages={pages}/>
      <main>
        <div className="container">
          {loading ? <Loader /> : children}
        </div>
      </main>
    </div>
  );
};
