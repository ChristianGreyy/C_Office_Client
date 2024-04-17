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
import { useSelector } from "react-redux";
import { RootState, getAllIssuesAction, getAllProjectsAction, useAppDispatch } from "@/redux";

export default function IssuesPage() {
  
  const { issues } = useSelector((state: RootState) => state.issues);
  console.log('issues', issues);
  const dispatch = useAppDispatch();

  const getAllIssues = () => {
    dispatch(getAllIssuesAction());
  };

  // const onSearchProject = () => {
  //   dispatch(
  //     getAllProjectsAction({
  //       search,
  //     })
  //   );
  // };

  useEffect(() => {
    getAllIssues();
  }, [dispatch]);

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-stone-200">
        <Navbar />
        <div className="mt-20 flex gap-4 h-screen">
          <div className="basis-1/6">
            <Aside />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <SwitchProject />
            <div className="issues mt-8">
              <h1 className="text-[1.43em] font-medium leading-[1.33] mt-0 mb-5">
                Filter
              </h1>
              <ul className="list-disc pl-4">
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    Status:
                  </div>
                  <select
                    id="pricingType"
                    name="pricingType"
                    className="basis-1/3 h-10 border-2 border-slate-400 focus:outline-none focus:border-slate-400 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  >
                    <option value="All" selected>
                      All
                    </option>
                    <option value="Freemium">Freemium</option>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </li>
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    Tracker:
                  </div>
                  <select
                    id="pricingType"
                    name="pricingType"
                    className="basis-1/3 h-10 border-2 border-slate-400 focus:outline-none focus:border-slate-400 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  >
                    <option value="All" selected>
                      All
                    </option>
                    <option value="Freemium">Freemium</option>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </li>
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    Priority:
                  </div>
                  <select
                    id="pricingType"
                    name="pricingType"
                    className="basis-1/3 h-10 border-2 border-slate-400 focus:outline-none focus:border-slate-400 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  >
                    <option value="All" selected>
                      All
                    </option>
                    <option value="Freemium">Freemium</option>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
                Issue 
                <table className="table-auto w-full">
                <thead className="uppercase">
                  <tr className="leading-10 border-b">
                    <th className="text-center">#</th>
                    <th className="text-center">Tracker</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Priority</th>
                    <th className="text-center">Subject</th>
                    <th className="text-center">Assignee</th>
                    <th className="text-center">Estimated time</th>
                    <th className="text-center">Spent time</th>
                    <th className="text-center">Start date</th>
                    <th className="text-center">Due date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    issues && issues.map(issue => (
                      <tr className="border-b leading-10">
                        <td className="text-left">#{issue.id}</td>
                        <td className="text-center">{issue.tracker.name}</td>
                        <td className="text-center">{issue.status.name}</td>
                        <td className="text-center">{issue.priority.name}</td>
                        <td className="text-center">[API] CRUD user</td>
                        <td className="text-center">Trương Thành Hưng</td>
                        <td className="text-center">03:00</td>
                        <td className="text-center">03:00</td>
                        <td className="text-center">23/05/2002</td>
                        <td className="text-center">23/05/2002</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              </h1>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
