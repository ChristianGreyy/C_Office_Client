"use client";

// This is a client component 👈🏽
import "react-clock/dist/Clock.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { LANGUAGE } from "@/configs";
import { t } from "i18next";

export default function JoinMeeting() {
  const router = useRouter();
  const [meetingName, setMeetingName] = useState("");
  const language = Cookies.get(LANGUAGE) ?? "en";

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    // You might want to save this meeting info to some state or backend
    router.push(
      `/${language}/meetings/${encodeURIComponent(meetingName)}?host=true`
    );
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    // You might want to save this meeting info to some state or backend
    router.push(
      `/${language}/meetings/${encodeURIComponent(meetingName)}?host=false`
    );
  };
  return (
    <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
      <div className="container mx-auto p-10 mt-20 flex justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">
            {t("meetings.create_a_meeting")}
          </h2>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="meetingName">
                {t("meetings.create_a_meeting")}
              </label>
              <input
                type="text"
                id="meetingName"
                className="w-full p-2 border border-gray-300 rounded"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              onClick={handleCreateMeeting}
            >
              {t("meetings.create_meeting")}
            </button>
            <button
              type="button"
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              onClick={handleJoinMeeting}
            >
              {t("meetings.join_meeting")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
