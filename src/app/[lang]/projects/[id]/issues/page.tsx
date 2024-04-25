"use client";

// This is a client component 👈🏽
import moment from "moment";
import { useEffect } from "react";
import "react-clock/dist/Clock.css";

import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SwitchProject from "@/components/SwitchProject";
import {
  RootState,
  getAllIssuesAction,
  getAllPrioritiesAction,
  getAllStatusesAction,
  getAllTrackersAction,
  useAppDispatch,
} from "@/redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { EAside } from "@/enum";

export default function IssuesPage() {
  const { issues } = useSelector((state: RootState) => state.issues);
  const { trackers } = useSelector((state: RootState) => state.trackers);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { statuses } = useSelector((state: RootState) => state.statuses);

  const params = useParams();
  const projectId = params.id;

  const dispatch = useAppDispatch();

  const getAllIssues = () => {
    dispatch(getAllIssuesAction());
    dispatch(getAllTrackersAction());
    dispatch(getAllPrioritiesAction());
    dispatch(getAllStatusesAction());
  };

  useEffect(() => {
    getAllIssues();
  }, [dispatch]);

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 h-screen text-sm">
          <div className="basis-1/6">
            <Aside title={EAside.issues} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <SwitchProject />
              </div>
              <div className="bg-sky-600 flex items-center text-white py-2 px-4 rounded-lg">
                <Link
                  href={`/en/projects/${projectId}/issues/add-issue`}
                >
                  Add new issue
                </Link>
              </div>
            </div>
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
                    id="statuses"
                    className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      dispatch(
                        getAllIssuesAction({
                          statusId: e.target.value,
                        })
                      );
                    }}
                  >
                    <option value="" selected>
                      All
                    </option>
                    {statuses &&
                      statuses.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                  </select>
                </li>
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    Tracker:
                  </div>
                  <select
                    id="trackers"
                    className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      dispatch(
                        getAllIssuesAction({
                          trackerId: e.target.value,
                        })
                      );
                    }}
                  >
                    <option value="" selected>
                      All
                    </option>
                    {trackers &&
                      trackers.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                  </select>
                </li>
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    Priority:
                  </div>
                  <select
                    id="priorities"
                    className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      dispatch(
                        getAllIssuesAction({
                          priorityId: e.target.value,
                        })
                      );
                    }}
                  >
                    <option value="" selected>
                      All
                    </option>
                    {priorities &&
                      priorities.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
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
                    {issues &&
                      issues.map((issue) => (
                        <tr className="border-b leading-10 hover:bg-[rgb(209,211,224,0.4)]">
                          <td className="text-left">
                            <Link
                              className="underline hover:text-[#0051cc]"
                              href={`/en/projects/${projectId}/issues/${issue.id}`}
                            >
                              #{issue.id}
                            </Link>
                          </td>
                          <td className="text-center">{issue.tracker?.name}</td>
                          <td className="text-center">{issue.status?.name}</td>
                          <td className="text-center">
                            {issue.priority?.name}
                          </td>
                          <td className="text-center">{issue.subject}</td>
                          <td className="text-center">
                            {issue.assigner && (
                              <Link
                                className="underline hover:text-[#0051cc]"
                                href={`/en/user/${issue.assigner.id}}`}
                              >
                                {issue.assigner?.firstName}{" "}
                                {issue.assigner?.lastName}
                              </Link>
                            )}
                          </td>
                          <td className="text-center">{issue.estimateTime}</td>
                          <td className="text-center">{issue.spentTime}</td>
                          <td className="text-center">
                            {moment(issue.startDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-center">
                            {moment(issue.dueDate).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      ))}
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
