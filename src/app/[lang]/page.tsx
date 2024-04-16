"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import ReduxProvider from "@/redux/redux-provider";

export default function Home() {
  return (
    <ReduxProvider>
      <Providers>
        <main className="flex min-h-screen flex-col bg-white dark:bg-[#121212]">
          <Navbar />
          <div className="container mx-auto mt-24 px-12 py-4 flex"></div>
          <Footer />
        </main>
      </Providers>
    </ReduxProvider>
  );
}
