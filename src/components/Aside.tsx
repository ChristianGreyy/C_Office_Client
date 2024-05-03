import React from "react";

import { FieldTimeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { EAside } from "@/enum";
import { useClientTranslation } from "@/i18n/client";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

type AsideProps = {
  title?: EAside;
};

const Aside = ({ title }: AsideProps) => {
  const params = useParams();
  const projectId = params.id;
  const { t } = useClientTranslation("Common");
  const language = Cookies.get(LANGUAGE) ?? 'en';
  return (
    <aside
      id="separator-sidebar"
      className="left-0 z-40 h-screen transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href={`/${language}/projects/${projectId}`}
              className={`group flex items-center rounded-lg p-2 ${title === EAside.overview ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3">{t("project.overview")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/${language}/projects/${projectId}/activity`}
              className={`group flex items-center rounded-lg p-2 ${title === EAside.activity ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">{t("project.activity")}</span>
              <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={`/${language}/projects/${projectId}/issues`}
              className={`group flex items-center rounded-lg p-2 ${title === EAside.issues ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">{t("project.issues")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className={`group flex items-center rounded-lg p-2 ${title === EAside.spent_time ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">{t("project.spent_time")}</span>
              <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </Link>
            
          </li>
          <li>
            <Link
              href={`/${language}/projects/${projectId}/wiki`}
              className={`group flex items-center rounded-lg p-2 ${title === EAside.wiki ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">{t("project.wiki")}</span>
            </Link>
          </li>
        </ul>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
          <li>
            <Link
              href={"/"}
              className={`group flex items-center rounded-lg p-2 ${title === EAside.development ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">{t("project.development")}</span>
              <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
