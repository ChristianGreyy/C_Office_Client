"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SwitchProject from "@/components/SwitchProject";
import { IIssueDetail } from "@/interfaces";
import {
  RootState,
  getMembersForProjectAction,
  getProjectByIdAction,
  useAppDispatch,
} from "@/redux";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "@/utils";
import { EAside, ENavbar } from "@/enum";
import { useClientTranslation } from "@/i18n/client";

export default function ProjectDetailPage() {
  const [feature, setFeature] = useState<IIssueDetail[]>([]);
  const { t } = useClientTranslation("Common");

  const params = useParams();
  const projectId = params.id;
  const dispatch = useAppDispatch();
  const { projectStatistic, members, membersLayout, loadings, project } =
    useSelector((state: RootState) => state.projects);

  const getProjectById = () => {
    dispatch(getProjectByIdAction(+projectId));
  };

  const getMembersForProject = () => {
    dispatch(getMembersForProjectAction(+projectId));
  };

  // console.log("loadings", loadings["getProjectByIdAction"]);
  // console.log(members);

  useEffect(() => {
    getProjectById();
    getMembersForProject();
  }, [dispatch]);

  return (
    <main className="flex min-h-max flex-col bg-[rgb(242, 244, 247)]">
      <Navbar />
      <div className="mt-20 flex gap-4 h-max">
        <div className="basis-1/6">
          <Aside title={EAside.overview} />
        </div>
        <div className="basis-4/6 px-3 py-4">
          <SwitchProject />
          <div className="project-information mt-8">
            <h1 className="text-[1.43em] font-medium leading-[1.33] mt-0 mb-5">
              {t("project.overview")}
            </h1>
            <ul className="list-disc pl-4">
              <li>
                {t("project.kickoff_date")}:{" "}
                {project && project.kickOffDate
                  ? moment(project.kickOffDate).format("DD/MM/YYYY")
                  : ""}
              </li>
              <li>
                {t("project.deadline")}:{" "}
                {project && project.kickOffDate
                  ? moment(project.kickOffDate).format("DD/MM/YYYY")
                  : ""}
              </li>
            </ul>
          </div>
          <div className="projectStatistic-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
            <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
              {t("project.issue_tracking")}
            </h1>
            <table className="table-auto w-full">
              <thead className="uppercase">
                <tr className="leading-10 border-b">
                  <th className="text-center"></th>
                  <th className="text-center">{t("project.open")}</th>
                  <th className="text-center">{t("project.closed")}</th>
                  <th className="text-center">{t("project.total")}</th>
                </tr>
              </thead>
              {projectStatistic && (
                <tbody>
                  <tr className="border-b leading-10">
                    <td className="text-left">Feature</td>
                    <td className="text-center">
                      {projectStatistic.feature?.open ?? 0}
                    </td>
                    <td className="text-center">
                      {projectStatistic.feature?.closed ?? 0}
                    </td>
                    <td className="text-center">
                      {(projectStatistic.feature?.open ?? 0) +
                        (projectStatistic.feature?.closed ?? 0)}
                    </td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Bug</td>
                    <td className="text-center">
                      {projectStatistic.bug?.open ?? 0}
                    </td>
                    <td className="text-center">
                      {projectStatistic.bug?.closed ?? 0}
                    </td>
                    <td className="text-center">
                      {(projectStatistic.bug?.open ?? 0) +
                        (projectStatistic.bug?.closed ?? 0)}
                    </td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Test case</td>
                    <td className="text-center">
                      {projectStatistic.test_case?.open ?? 0}
                    </td>
                    <td className="text-center">
                      {projectStatistic.test_case?.closed ?? 0}
                    </td>
                    <td className="text-center">
                      {(projectStatistic.test_case?.open ?? 0) +
                        (projectStatistic.test_case?.closed ?? 0)}
                    </td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Support</td>
                    <td className="text-center">
                      {projectStatistic.support?.open ?? 0}
                    </td>
                    <td className="text-center">
                      {projectStatistic.support?.closed ?? 0}
                    </td>
                    <td className="text-center">
                      {(projectStatistic.support?.open ?? 0) +
                        (projectStatistic.support?.closed ?? 0)}
                    </td>
                  </tr>
                  <tr className="border-b leading-10">
                    <td className="text-left">Meeting</td>
                    <td className="text-center">
                      {projectStatistic.meeting?.open ?? 0}
                    </td>
                    <td className="text-center">
                      {projectStatistic.meeting?.closed ?? 0}
                    </td>
                    <td className="text-center">
                      {(projectStatistic.meeting?.open ?? 0) +
                        (projectStatistic.meeting?.closed ?? 0)}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
            <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
              Time tracking
            </h1>
            <ul className="list-disc pl-4">
              <li>Estimated time: {project?.sp} hours</li>
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
              {membersLayout &&
                Object.keys(membersLayout).map((item) => (
                  <li className="flex mt-2">
                    <div className="project-detail-statistic__title">
                      {capitalizeFirstLetter(item)}:
                    </div>
                    <div className="project-detail-statistic__member">
                      {membersLayout[item].map((item) => (
                        <Link
                          href={`/${item.id}`}
                          className="text-ss font-semibold text-cyan-600 md:text-sm pl-2"
                        >
                          {item.firstName} {item.lastName}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
