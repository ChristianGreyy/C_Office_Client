"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState, getAllProjectsAction, useAppDispatch } from "@/redux";
import { EStatusSLug, IProjectDetail } from "@/interfaces";
import Cookies from 'js-cookie'
import { useClientTranslation } from "@/i18n/client";
import { LANGUAGE } from "@/configs";

export default function LogTime() {
  const [search, setSearch] = useState("");
  const { projects } = useSelector((state: RootState) => state.projects);
  const { t } = useClientTranslation("Common");
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const dispatch = useAppDispatch();

  const getAllProjects = () => {
    dispatch(getAllProjectsAction());
  };

  const onSearchProject = () => {
    dispatch(
      getAllProjectsAction({
        search,
      })
    );
  };

  const handleCalculatePercentDonePartTotal = (
    project: IProjectDetail, status: string
  ): string => {
    if (project.issues && project.issues.length > 0) {
      const issues = project.issues?.filter((item) => {
        return item.status?.slug === status;
      });
      const issuesNumber = issues?.length || 0;
      const num = (issuesNumber / project.issues?.length) * 100;
      return (Math.round(num * 100) / 100).toFixed(2);

    } else {
      return 0;
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [dispatch]);

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="container mx-auto p-10 mt-20">
          <form
            className="flex flex-col md:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              onSearchProject();
            }}
          >
            <div className="flex">
              <input
                value={search}
                type="text"
                placeholder={t("projects.search")}
                className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="text-white rounded-r px-2 md:px-3 py-0 md:py-1 h-10"
                style={{
                  backgroundColor: 'rgb(2 132 199)'
                }}
              >
                {t("projects.search_button")}
              </button>
            </div>
            {/* <select
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
            </select> */}
          </form>
          <div className="container flex gap-3 h-max mt-10">
            {projects &&
              projects.map((item) => (
                <div className="basis-1/4 bg-white p-3">
                  <Link
                    href={`/${language}/projects/${item.id}`}
                    className="text-ss font-semibold uppercase text-cyan-600 md:text-xl"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-blue-700">
                      {t("projects.done")} / {t("projects.total")}
                      </span>
                      <span className="text-sm font-medium text-blue-700">
                        {handleCalculatePercentDonePartTotal(item, EStatusSLug.resolved)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${handleCalculatePercentDonePartTotal(item, EStatusSLug.resolved)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-blue-700">
                      {t("projects.closed")} / {t("projects.total")}
                      </span>
                      <span className="text-sm font-medium text-blue-700">
                        {handleCalculatePercentDonePartTotal(item, EStatusSLug.closed)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${handleCalculatePercentDonePartTotal(item, EStatusSLug.closed)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </Providers>
  );
}
