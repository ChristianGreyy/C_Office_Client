"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useContext, useMemo, useState } from "react";
import Select from "react-select";

import { useClientTranslation } from "@/i18n/client.ts";
import { Language } from "@/i18n/configs.ts";
import { useLanguage } from "@/i18n/hooks.ts";

import { RootState, authActions, useAppDispatch } from "@/redux/index.ts";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ENavbar, EThemeMode } from "../enum/index.ts";
import NavLink from "./NavLink.tsx";
import Notification from "./Notification.tsx";
import { ThemeContext } from "./Providers.tsx";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs/constants.ts";

type Props = {
  title?: ENavbar;
};

const Navbar = ({ title }: Props) => {
  const params = useParams();
  const { accountInfo } = useSelector((state: RootState) => state.auth);
  const lang = params.lang as Language;
  const { t } = useClientTranslation("Common");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const { onChangeLanguage } = useLanguage();
  const { onChange, value } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [url, setUrl] = useState('log-time');
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const navLinks = useMemo(() => {
    return [
      {
        title: t("nav.log_time"),
        path: `/${language}/log-time`,
        url: 'log-time'
      },
      {
        title: t("nav.projects"),
        path: `/${language}/projects`,
        url: 'projects'
      },
      {
        title: t("nav.request"),
        path: `/${language}/requests/over-time`,
        url: 'over-time'
      },
      {
        title: t("nav.people"),
        path: `/${language}/users`,
        url: 'users'
      },
      {
        title: t("nav.meeting"),
        path: `/${language}/meetings`,
        url: 'meetings'
      },
    ];
  }, [t]);

  const options = useMemo(() => {
    return [
      { value: Language.EN, label: "EN" },
      { value: Language.VN, label: "VN" },
    ];
  }, []);

  const handleSignOut = useCallback(() => {
    dispatch(authActions.logout());
    router.push("/login", { scroll: false });
    setProfileMenu(false);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 mx-auto border border-[#33353F] bg-sky-600 bg-opacity-100 dark:bg-[#121212]">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2 lg:py-4">
        <div className="flex">
          <Link
            href={`/${language}/log-time`}
            className="text-ss font-semibold uppercase text-white dark:text-white md:text-3xl"
          >
            {t("Common:COffice")}
          </Link>
          <div className="menu ml-12 hidden md:block md:w-auto" id="navbar">
            <ul className="mt-0 flex p-4 md:flex-row md:space-x-8 md:p-0">
              {navLinks.map((link, index) => (
                <li key={index} className="h-10">
                  <NavLink
                    href={link.path}
                    title={link.title}
                    style={"leading-10 h-full"}
                    url={link.url}
                    currentUrl={url}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <Select
            value={options.find((item) => item.value === lang)}
            onChange={(item) => {
              onChangeLanguage(item?.value ?? Language.EN);
              Cookies.set(LANGUAGE, item?.value ?? Language.EN, {
                expires: 7,
              })
            }}
            options={options}
            styles={{
              control: (base) => {
                return {
                  ...base,
                  backgroundColor: "transparent",
                  minHeight: "unset",
                  color: '#fff'
                };
              },
              singleValue(base, props) {
                return {
                  ...base,
                  color: value === EThemeMode.DARK ? "#fff" : "#000",
                };
              },
              menu(base, props) {
                return {
                  ...base,
                  backgroundColor: "#000",
                };
              },
              option(base, props) {
                return {
                  ...base,
                  backgroundColor: "#000",
                  cursor: "pointer",
                };
              },
            }}
          />
          <div className="ml-8">
            <div className="relative">
              <Notification />
            </div>
          </div>
          <div className="profile-menu ml-6 relative">
            <img
              alt="tania andrew"
              src={accountInfo?.avatar?.url}
              className="relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover object-center"
              data-popover-target="profile-menu"
              style={{
                objectFit: "cover",
              }}
              onClick={() => setProfileMenu(!profileMenu)}
            />
            {profileMenu && (
              <ul
                role="menu"
                data-popover="profile-menu"
                data-popover-placement="bottom"
                className="absolute flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none !right-0	mt-2"
              >
                <Link
                  href={`/${language}/profile`}
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <UserOutlined />
                  <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                    {t("nav.my_profile")}
                  </p>
                </Link>
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                    Help
                  </p>
                </button>
                <hr className="my-2 border-blue-gray-50" role="menuitem" />
                <button
                  onClick={handleSignOut}
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                    Sign Out
                  </p>
                </button>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
