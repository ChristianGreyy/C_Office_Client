
import { ERequestAside } from "@/enum";
import { useClientTranslation } from "@/i18n/client";
import { FieldTimeOutlined } from "@ant-design/icons";
import Link from "next/link";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

type RequestAsideProps = {
  title?: ERequestAside;
};

const RequestAside = ({ title }: RequestAsideProps) => {
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
              href={`/${language}/requests/over-time`}
              className={`group flex items-center rounded-lg p-2 ${title === ERequestAside.over_time ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3">{t("requests.over_time")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/${language}/requests/absence`}
              className={`group flex items-center rounded-lg p-2 ${title === ERequestAside.absence ? "bg-gray-200" : "text-gray-900"} hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700`}
            >
              <FieldTimeOutlined />
              <span className="ms-3 flex-1 whitespace-nowrap">{t("requests.absence")}</span>
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

export default RequestAside;
