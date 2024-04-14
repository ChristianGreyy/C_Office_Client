"use client";

// This is a client component 👈🏽
import moment from "moment";
import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Button } from "@/common";

export default function LogTime() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-stone-200">
        <Navbar />
        <div className="container mx-auto p-10 mt-20 flex gap-3 h-screen">
          <form className="flex flex-col md:flex-row gap-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Search for the tool you like"
                className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1 h-10"
              >
                Search
              </button>
            </div>
            <select
              id="pricingType"
              name="pricingType"
              className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
              <option value="All" selected>
                All
              </option>
              <option value="Freemium">Freemium</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </form>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
