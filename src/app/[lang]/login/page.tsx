"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import i18next from "i18next";
import * as yup from "yup";

import { BaseResponseError } from "@/interfaces";
import {
  RootState,
  loginAction,
  selectAuthLoading,
  useAppDispatch,
} from "@/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReduxProvider from "@/redux/redux-provider";
import { LoginForm } from "@/components/LoginForm";

const schema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t("error:email_required"))
    .email(i18next.t("error:pass_format_error")),
  password: yup.string().required(i18next.t("error:pass_required")),
});

export default function Login() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isRemember, setIsRemember] = useState<boolean>(false);

  const loginActionLoading = useSelector((state: RootState) =>
    selectAuthLoading(state, "loginAction")
  );

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
    alert('ok')
    try {
      const res = await dispatch(loginAction({ ...data, isRemember })).unwrap();
      res &&
        res.success &&
        message.success({
          content: "Login successfully",
        });

      router.push("/");
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
        <Navbar />
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
