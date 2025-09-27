import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://goodsie.ca"),
  alternates: {
    canonical: "https://goodsie.ca",
  },
  title: {
    default: 'Goodsie Dot C Eh', template: `%s | Goodsie Dot C Eh`
  },
  description: "Goodsies personal profile site. >Stay tuned for my launchpad integration(hopefully)<",
  openGraph: {
    title: "Goodsie Dot C Eh",
    description: "Goodsies personal profile site. >Stay tuned for my launchpad integration(hopefully)<",
    url: "https://goodsie.ca",
    siteName: "Goodsie Dot C Eh",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Goodsie.ca Logo",
        type: "image/png",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://goodsie.ca",
    creator: "@goodsie",
    title: "Goodsie Dot C Eh",
    description: "Goodsies personal profile site. >Stay tuned for my launchpad integration(hopefully)<",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon-16.png",
    shortcut: "/favicon-32.png",
    apple: "/favicon-180.png",
  }
};

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: "no",
  viewportFit: "cover",
  themeColor: "#ff6509"
}
