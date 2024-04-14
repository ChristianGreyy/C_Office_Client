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
          <div className="flex basis-3/5 flex-col items-center p-8 bg-white">
            <div>Current time:</div>
            <h1 className="mb-5 mt-5 text-5xl font-bold">
              {moment(value).format("LTS")}
            </h1>
            <Clock value={value} />
            <textarea
              className="mt-10 border-2 border-solid border-gray-400 p-2"
              name=""
              id=""
              cols="40"
              rows="5"
              placeholder="note"
            ></textarea>
            <div className="log-time-button mt-10 flex justify-between">
              <div className="check-in-button">
                <Button className="bg-orange-600 mr-8 border-0 text-white !font-bold hover:bg-orange-700 py-2 px-4 rounded">
                  Check in
                </Button>
                {/* <button>07:59</button> */}
              </div>
              <div className="check-out-button">
                <Button className="bg-orange-600 border-0 text-white !font-bold hover:bg-orange-700 py-2 px-4 rounded">
                  Check out
                </Button>
                {/* <button>07:59</button> */}
              </div>
            </div>
          </div>
          <div className="basis-2/5 p-8 bg-white overflow-y-scroll">
            <table className="table-auto w-full">
              <thead className="uppercase">
                <tr className="leading-10 border-b">
                  <th className="text-left w-3/5">Full name</th>
                  <th className="text-left">Check-in</th>
                  <th className="text-left">Check-out</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b leading-10">
                  <td>Trương Hưnggggggggggg</td>
                  <td>07:00</td>
                  <td>05:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Trương Đạt</td>
                  <td>05:00</td>
                  <td>05:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                   <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
                <tr className="border-b leading-10">
                  <td>Khánh Linh</td>
                  <td>04:00</td>
                  <td>03:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
