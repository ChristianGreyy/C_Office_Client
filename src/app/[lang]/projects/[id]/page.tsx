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
import Link from "next/link";
import Aside from "@/components/Aside";
import SwitchProject from "@/components/SwitchProject";

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
        <div className="mt-20 flex gap-4 h-screen">
          <div className="basis-1/6">
            <Aside />
          </div>
          <div className="basis-4/6">
            <SwitchProject />
            <div className="project-information mt-8">
              <h1 className="text-[1.43em] font-medium leading-[1.33] mt-0 mb-5">
                Overview
              </h1>
              <ul className="list-disc pl-4">
                <li>Kickoff Date: 11/13/2023</li>
                <li>Deadline: 01/31/2024</li>
              </ul>
            </div>
            <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
                Issue tracking
              </h1>
              <table className="table-auto w-full">
                <thead className="uppercase">
                  <tr className="leading-10 border-b">
                    <th className="text-center"></th>
                    <th className="text-center">Open</th>
                    <th className="text-center">Closed</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b leading-10">
                    <td className="text-left">Feature</td>
                    <td className="text-center">34</td>
                    <td className="text-center">689</td>
                    <td className="text-center">723</td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Bug</td>
                    <td className="text-center">34</td>
                    <td className="text-center">689</td>
                    <td className="text-center">723</td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Test case</td>
                    <td className="text-center">34</td>
                    <td className="text-center">689</td>
                    <td className="text-center">723</td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Support</td>
                    <td className="text-center">34</td>
                    <td className="text-center">689</td>
                    <td className="text-center">723</td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Meeting</td>
                    <td className="text-center">34</td>
                    <td className="text-center">689</td>
                    <td className="text-center">723</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
                Time tracking
              </h1>
              <ul className="list-disc pl-4">
                <li>Estimated time: 2819:02 hours</li>
                <li>Spent time: 3053:07 hours</li>
              </ul>
            </div>
          </div>
          <div className="basis-2/6">
            <div className="project-detail-statistic mt-12 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
                Members
              </h1>
              <ul className="list-disc">
                <li className="flex mt-2">
                  <div className="project-detail-statistic__title">
                    Manager:
                  </div>
                  <div className="project-detail-statistic__member">
                    <Link
                      href={"/"}
                      className="text-ss font-semibold text-cyan-600 md:text-sm pl-2"
                    >
                      Trương Thành Hưng
                    </Link>
                    ,
                    <Link
                      href={"/"}
                      className="text-ss font-semibold text-cyan-600 md:text-sm pl-1"
                    >
                      Trương Thành Hưng
                    </Link>
                  </div>
                </li>
                <li className="flex mt-2">
                  <div className="project-detail-statistic__title">
                    Developer:
                  </div>
                  <div className="project-detail-statistic__member">
                    <Link
                      href={"/"}
                      className="text-ss font-semibold text-cyan-600 md:text-sm pl-2"
                    >
                      Trương Thành Hưng
                    </Link>
                    ,
                    <Link
                      href={"/"}
                      className="text-ss font-semibold text-cyan-600 md:text-sm pl-1"
                    >
                      Trương Thành Hưng
                    </Link>
                  </div>
                </li>
                <li className="flex mt-2">
                  <div className="project-detail-statistic__title">Tester:</div>
                  <div className="project-detail-statistic__member">
                    <Link
                      href={"/"}
                      className="text-ss font-semibold text-cyan-600 md:text-sm pl-2"
                    >
                      Trương Thành Hưng
                    </Link>
                    ,
                    <Link
                      href={"/"}
                      className="text-ss font-semibold text-cyan-600 md:text-sm pl-1"
                    >
                      Trương Thành Hưng
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
