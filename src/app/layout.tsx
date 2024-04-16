import type { Metadata } from "next";
import { Inter } from "next/font/google";

import fav from "@public/images/favicon.png";

import "./globals.css";
import Providers from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COffice",
  description: "COffice - The office",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="icon"
          href={fav.src}
          type="image/<generated>"
          sizes="16x16"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
