"use client";

// This is a client component 👈🏽
import { useEffect } from "react";
import "react-clock/dist/Clock.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  RootState,
  getAllLevelsAction,
  getAllPositionsAction,
  getAllUniversitiesAction,
  useAppDispatch,
} from "@/redux";
import { t } from "i18next";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function ProjectDetailPage() {
  const { universities } = useSelector(
    (state: RootState) => state.universities
  );
  const { levels } = useSelector((state: RootState) => state.levels);
  const { positions } = useSelector((state: RootState) => state.positions);
  const dispatch = useAppDispatch();

  const getAllOptions = () => {
    dispatch(getAllUniversitiesAction());
    dispatch(getAllLevelsAction());
    dispatch(getAllPositionsAction());
  };

  useEffect(() => {
    getAllOptions();
  }, [dispatch]);

  return (
    <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
      <Navbar />
      <div className="mt-20 flex gap-4 h-screen">
        <div className="basis-1/6 px-3 py-4">
          <div className="university">
            <h1 className="text-[20px] font-medium leading-[1.33] my-4">
              {t("profile.university")}
            </h1>
            <ul className="list-universities flex flex-wrap">
              {universities &&
                universities.map((item) => (
                  <li
                    className="p-1 font-medium rounded-lg	cursor-pointer mb-[5px] ml-[4px]"
                    style={{
                      backgroundColor: item.color,
                      color: "white",
                      width: "max-content",
                    }}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="position">
            <h1 className="text-[20px] font-medium leading-[1.33] my-4">
              {t("profile.position")}
            </h1>
            <ul className="list-positions flex flex-wrap">
              {positions &&
                positions.map((item) => (
                  <li
                    className="p-1 font-medium rounded-lg	cursor-pointer mb-[5px] ml-[4px]"
                    style={{
                      backgroundColor: item.color,
                      color: "white",
                      width: "max-content",
                    }}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="level">
            <h1 className="text-[20px] font-medium leading-[1.33]  my-4">
              {t("profile.level")}
            </h1>
            <ul className="list-levels flex flex-wrap">
              {levels &&
                levels.map((item) => (
                  <li
                    className="p-1 font-medium rounded-lg	cursor-pointer mb-[5px] ml-[4px]"
                    style={{
                      backgroundColor: item.color,
                      color: "white",
                      width: "max-content",
                    }}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="basis-5/6 px-3 py-4 border-[1px] border-gray-400 border-solid">
          <div className="filter-name flex items-center">
            <div className="title text-[20px] font-medium leading-[1.33]">
              People
            </div>
            <input
              // value={search}
              type="text"
              placeholder="Search for the tool you like"
              className="w-full ml-2 md:w-80 px-3 h-10 rounded-l border-2 border-sky-600 focus:outline-none focus:border-sky-500"
              // onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]"> */}

          <ul className="users mt-[40px] bg-gray-50 p-4">
            <li className="user-item flex hover:bg-[#d7d0d0] border-[1px] border-gray-400 border-solid ">
              <div className="avatar">
                <img className="w-16 h-16" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRpLQhiPRckyCj7kKL0PwyAJbsogmG9Tg-FCKoC4-J7EN5V03ULj3GxeCcE0gYGttUdEqv8"/>
              </div>
              <div className="info flex flex-col justify-center ml-4">
                <Link
                  href={`/en/users/id`}
                  className="text-ss hover:underline font-semibold text-[#0051cc] md:text-xl"
                >
                  Truong THanh Hung
                </Link>
                <Link
                  href={`mailto:truonghung@gmail.com`}
                  className="text-[14px] font-semibold hover:underline text-[#0051cc]"
                >
                  mailto:truonghung@gmail.com
                </Link>
              </div>
            </li>
            <li className="user-item flex hover:bg-[#d7d0d0] border-[1px] border-gray-400 border-solid">
              <div className="avatar">
                <img className="w-16 h-16" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRpLQhiPRckyCj7kKL0PwyAJbsogmG9Tg-FCKoC4-J7EN5V03ULj3GxeCcE0gYGttUdEqv8"/>
              </div>
              <div className="info flex flex-col justify-center ml-4">
                <Link
                  href={`/en/users/id`}
                  className="text-ss hover:underline font-semibold text-[#0051cc] md:text-xl"
                >
                  Truong THanh Hung
                </Link>
                <Link
                  href={`mailto:truonghung@gmail.com`}
                  className="text-[14px] font-semibold hover:underline text-[#0051cc]"
                >
                  mailto:truonghung@gmail.com
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}