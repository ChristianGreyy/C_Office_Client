"use client";

// This is a client component 👈🏽
import moment from "moment";
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SwitchProject from "@/components/SwitchProject";
import { EAside } from "@/enum";
import {
  RootState,
  getAllIssuesAction,
  getAllPrioritiesAction,
  getAllStatusesAction,
  getAllTrackersAction,
  useAppDispatch,
} from "@/redux";
import { t } from "i18next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

export default function IssuesPage() {
  const { issues } = useSelector((state: RootState) => state.issues);
  const { trackers } = useSelector((state: RootState) => state.trackers);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { statuses } = useSelector((state: RootState) => state.statuses);
  const [page, setPage] = useState(1);
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const params = useParams();
  const projectId = params.id;

  const dispatch = useAppDispatch();

  const getAllIssues = () => {
    dispatch(
      getAllIssuesAction({
        page,
        projectId
      })
    );
    dispatch(getAllTrackersAction());
    dispatch(getAllPrioritiesAction());
    dispatch(getAllStatusesAction());
  };

  useEffect(() => {
    getAllIssues();
  }, [dispatch, page]);

  return (
    <Providers>
      <main className="flex h-max flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 text-sm">
          <div className="basis-1/6">
            <Aside title={EAside.issues} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <SwitchProject />
              </div>
              <div className="bg-sky-600 flex items-center text-white py-2 px-4 rounded-lg">
                <Link href={`/${language}/projects/${projectId}/issues/add-issue`}>
                  {t("issues.add_new_issue")}
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
                      <th className="text-center">{t("issues.tracker")}</th>
                      <th className="text-center">{t("issues.status")}</th>
                      <th className="text-center">{t("issues.priority")}</th>
                      <th className="text-center">{t("issues.subject")}</th>
                      <th className="text-center">{t("issues.assignee")}</th>
                      <th className="text-center">{t("issues.estimateTime")}</th>
                      <th className="text-center">{t("issues.startDate")}</th>
                      <th className="text-center">{t("issues.dueDate")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues &&
                      issues.map((issue) => (
                        <tr className="border-b leading-10 hover:bg-[rgb(209,211,224,0.4)]">
                          <td className="text-left">
                            <Link
                              className="underline hover:text-[#0051cc]"
                              href={`/${language}/projects/${projectId}/issues/${issue.id}`}
                            >
                              #{issue.id}
                            </Link>
                          </td>
                          <td className="text-center">{issue.tracker?.name}</td>
                          <td className="text-center">{issue.status?.name}</td>
                          <td className="text-center">
                            {issue.priority?.name}
                          </td>
                          <td className="text-center">{issue.subject.length > 30 ? `${issue.subject.slice(0, 27)}...` : issue.subject}</td>
                          <td className="text-center">
                            {issue.assigner && (
                              <Link
                                className="underline hover:text-[#0051cc]"
                                href={`/${language}/user/${issue.assigner.id}}`}
                              >
                                {issue.assigner?.firstName}{" "}
                                {issue.assigner?.lastName}
                              </Link>
                            )}
                          </td>
                          <td className="text-center">{issue.estimateTime}</td>
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
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-sm">
                <li
                  onClick={() => {
                    setPage(page - 1 <= 0 ? 1 : page - 1);
                  }}
                >
                  <div className="flex items-center cursor-pointer justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                  </div>
                </li>
                <li>
                  <div className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {page}
                  </div>
                </li>
                <li
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  <div className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </Providers>
  );
}
