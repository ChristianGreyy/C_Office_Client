"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import i18next from "i18next";
import * as yup from "yup";
import Cookies from 'js-cookie'

import { LoginForm } from "@/components/LoginForm";
import { requestPermission } from "@/firebase";
import { BaseResponseError } from "@/interfaces";
import {
  RootState,
  loginAction,
  selectAuthLoading,
  useAppDispatch,
} from "@/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { isSupported } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useClientTranslation } from "@/i18n/client";
import { LANGUAGE } from "@/configs";

const schema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t("error:email_required"))
    .email(i18next.t("error:pass_format_error")),
  password: yup.string().required(i18next.t("error:pass_required")),
});

export default function Login() {
  const router = useRouter();
  const { t } = useClientTranslation("Common");
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const dispatch = useAppDispatch();

  const [isRemember, setIsRemember] = useState<boolean>(false);

  const loginActionLoading = useSelector((state: RootState) =>
    selectAuthLoading(state, "loginAction")
  );

  const initFirebae = async () => {
    const isSupport = await isSupported();
    if (isSupport) {
      requestPermission();
    }
  };

  const { control, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
  }>({
    // ILoginFields
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleRedirectToForgot = () => {
    // navigate(PATH_FORGOT_PASSWORD)
    router.push("/forgot");
  };

  const handleRedirectToSignUp = () => {
    router.push("/sign-up");
  };

  const handleLogin = handleSubmit(async (data) => {
    try {
      const res = await dispatch(loginAction({ ...data, isRemember })).unwrap();
      res &&
        res.success &&
        message.success({
          content: "Login successfully",
        });
      await initFirebae();
      router.push(`/${language}/log-time`);
    } catch (err) {
      const error = err as BaseResponseError;
      message.error({
        content: error?.message,
      });
    } finally {
      reset({ email: "", password: "" });
      setIsRemember(false);
    }
  });

  return (
    <Providers>
      <main className="flex h-screen overflow-hidden flex-col bg-white bg-stone-200">
        <nav className="fixed left-0 right-0 top-0 z-10 mx-auto border border-[#33353F] bg-sky-600 bg-opacity-100 dark:bg-[#121212]">
          <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2 lg:py-4">
            <div className="flex">
              <h2 className="text-ss font-semibold uppercase text-white dark:text-white md:text-3xl">
                {t("Common:COffice")}
              </h2>
            </div>
          </div>
        </nav>
        <div className="h-[1000px] container mx-auto mt-24 px-12 py-4 flex justify-center items-center">
          <div className="h-max w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <LoginForm
                control={control}
                redirectToForgot={handleRedirectToForgot}
                redirectToSignUp={handleRedirectToSignUp}
                handleLogin={handleLogin}
                isLoading={loginActionLoading}
                isRemember={isRemember}
                onRemember={(e) => setIsRemember(e)}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
