"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { RootState, getProfileAction, useAppDispatch } from "@/redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { COFFICE_ACCESS_TOKEN } from "@/configs";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { accountInfo, accessToken } = useSelector((state: RootState) => state.auth);
  const token = Cookies.get(COFFICE_ACCESS_TOKEN);

  useEffect(() => {
    if(!accountInfo && token) {
      dispatch(getProfileAction());
    }
  }, [dispatch]);
  return (
    <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
