"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import RequestAside from "@/components/RequestAside";
import { ERequestAside } from "@/enum";
import { RootState, getAllIssuesAction, useAppDispatch } from "@/redux";
import { getAllRequestsAction } from "@/redux/actions/request-management";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import moment from "moment";
import { useClientTranslation } from "@/i18n/client";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

export default function IssuesPage() {
  const [search, setSearch] = useState("");
  const { requests } = useSelector((state: RootState) => state.requests);
  const type = "over_time";
  const { t } = useClientTranslation("Common");
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const dispatch = useAppDispatch();

  const getAllRequests = () => {
    dispatch(
      getAllRequestsAction({
        type,
      })
    );
  };

  const onSearchProject = () => {
    dispatch(
      getAllRequestsAction({
        search,
      })
    );
  };

  useEffect(() => {
    getAllRequests();
  }, [dispatch]);

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 h-screen text-sm">
          <div className="basis-1/6">
            <RequestAside title={ERequestAside.over_time} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <div className="issues mt-8">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h1 className="text-[1.43em] font-medium leading-[1.33] mt-0 mb-5">
                    Filter
                  </h1>
                </div>
                <div className="bg-sky-600 flex items-center text-white py-2 px-4 rounded-lg">
                  <Link href={`/${language}/requests/over-time/add-request`}>
                    {/* {t("issues.add_new_issue")} */}
                    {t("requests.add_new_overtime")}
                  </Link>
                </div>
              </div>

              <ul className="list-disc pl-4">
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    {t("requests.name")}:
                  </div>
                  <input className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </li>
                <li className="flex mt-2 align-center">
                  <div className="issues-filter__title h-30 leading-10 w-[200px]">
                    {t("requests.status")}:
                  </div>
                  <select
                    id="status"
                    className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      dispatch(
                        getAllRequestsAction({
                          status: e.target.value,
                          type,
                        })
                      );
                    }}
                  >
                    <option value="" selected>
                      All
                    </option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
                {t("requests.over_time_request")}
                <table className="table-auto w-full">
                  <thead className="uppercase">
                    <tr className="leading-10 border-b">
                      <th className="text-center">#</th>
                      <th className="text-center">{t("requests.user")}</th>
                      <th className="text-center">
                        {t("requests.publish_at")}
                      </th>
                      <th className="text-center">{t("requests.date")}</th>
                      <th className="text-center">
                        {t("requests.start_time")}
                      </th>
                      <th className="text-center">{t("requests.end_time")}</th>
                      <th className="text-center">{t("requests.reason")}</th>
                      <th className="text-center">
                        {t("requests.status_table")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests &&
                      requests.map((item) => (
                        <tr className="border-b leading-10 hover:bg-[rgb(209,211,224,0.4)]">
                          <td className="text-left">
                            <Link
                              className="underline hover:text-[#0051cc]"
                              href={`/${language}/projects`}
                            >
                              #{item.id}
                            </Link>
                          </td>
                          <td className="text-center">{`${item.user?.firstName} ${item.user?.lastName}`}</td>
                          <td className="text-center">
                            {moment(item.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-center">
                            {moment(item.startTime).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-center">
                            {moment(item.startTime).format("h:mm a")}
                          </td>
                          <td className="text-center">
                            {moment(item.endTime).format("h:mm a")}
                          </td>
                          <td className="text-center">{item.note}</td>
                          <td className="text-center">{item.status}</td>
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
