import React from "react";

import { FieldTimeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type AsideProps = {
  //   name: string;
  //   onClick: (name: string) => void;
  //   isSelected: boolean;
};

const Aside = ({}: AsideProps) => {
  const params = useParams();
  const projectId = params.id;
  console.log('ProjectId', projectId);
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
              href={`/projects/${projectId}`}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
            >
              <FieldTimeOutlined />
              <span className="ms-3">Overview</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/projects/${projectId}/activity`}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">Activity</span>
              <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={`/projects/${projectId}/issues`}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">Issues</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">Spent time</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">Wiki</span>
            </Link>
          </li>
        </ul>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
          <li>
            <Link
              href={"/"}
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">Development</span>
              <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
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
