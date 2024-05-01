"use client";

// This is a client component 👈🏽
import { useEffect } from "react";
import "react-clock/dist/Clock.css";

import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SwitchProject from "@/components/SwitchProject";
import "@/components/editors/style.css";
import { EAside } from "@/enum";
import {
  RootState,
  getAllPrioritiesAction,
  getAllStatusesAction,
  getAllTrackersAction,
  getIssueByIdAction,
  useAppDispatch,
} from "@/redux";
import { t } from "i18next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import moment from "moment";

export default function AddIssuePage() {
  const params = useParams();
  const projectId = params.id;
  const issueId = params.issueId;
  const router = useRouter();
  const { issue } = useSelector((state: RootState) => state.issues);

  const dispatch = useAppDispatch();

  const getIssueById = () => {
    dispatch(getIssueByIdAction(+issueId));
  };

  useEffect(() => {
    getIssueById();
  }, [dispatch]);

  console.log("issue", issue);

  return (
    <Providers>
      <main className="flex flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 text-sm">
          <div className="basis-1/6">
            <Aside title={EAside.issues} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <h1 className="text-[1.43em] font-medium leading-[1.33] my-5">
                  {issue && issue.tracker.name} #{issue && issue.id}
                </h1>
              </div>
              <div className="bg-slate-300 flex items-center text-black py-2 px-4 rounded-lg h-10">
                <Link href={`/en/projects/${projectId}/issues/${issueId}/edit`}>
                  {t("issues.edit_issue")}
                </Link>
              </div>
            </div>

            <div className="issue-info flex items-center">
              <div className="avatar">
                <img
                  className="w-14 h-14"
                  src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY"
                />
              </div>
              <div className="issue-description ml-2">
                <div className="issue-subject text-2xl font-bold">
                  {issue && issue.subject}
                </div>
                <div className="assignee">
                  <Link
                    href={`/profile`}
                    className="text-ss font-semibold text-cyan-600 md:text-sm pl-2"
                  >
                    {issue &&
                      `${issue.assigner?.firstName} ${issue.assigner?.lastName}`}
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-4 text-base flex">
              <ul className="issue-left">
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.status")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.status?.name}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.priority")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.priority?.name}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.assignee")}:{" "}
                  </div>
                  <div className="description">
                    {issue &&
                      `${issue.assigner?.firstName} ${issue.assigner?.lastName}`}
                  </div>
                </li>
              </ul>
              <ul className="issue-right ml-[150px]">
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.startDate")}:{" "}
                  </div>
                  <div className="description">
                    {issue && moment(issue.startDate).format("DD/MM/YYYY")}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.dueDate")}:{" "}
                  </div>
                  <div className="description">
                    {issue && moment(issue.dueDate).format("DD/MM/YYYY")}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.completedPercent")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.completedPercent}%
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.estimateTime")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.estimateTime}hour
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-sm">
              <div className="issue-subject text-xl font-bold">
                {t("issues.input")}:{" "}
              </div>
              {issue && (
                <div dangerouslySetInnerHTML={{ __html: issue.input }}></div>
              )}
              {/* <div className="issue-input">{issue && issue.input}</div> */}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
