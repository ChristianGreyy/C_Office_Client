import { BaseSyntheticEvent, FormEventHandler, memo } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ILoginFields } from "@/interfaces";
import { Typography } from "antd";
import { Button, Input } from "@/common";

interface IProps {
  isLoading?: boolean;
  isRemember?: boolean;
  onRemember?: (value: boolean) => void;
  redirectToForgot?: () => void;
  redirectToSignUp?: () => void;
  control: Control<ILoginFields>;
  handleLogin: any 
  // (
  //   e?: BaseSyntheticEvent<ILoginFields, any, any> | undefined
  // ) => Promise<void>;
}

export const LoginForm = memo((props: IProps) => {
  const {
    isLoading,
    isRemember,
    control,
    redirectToForgot,
    handleLogin,
    onRemember,
  } = props;
  const { t } = useTranslation(["common", "login"]);

  return (
    <form onSubmit={handleLogin} className="login-form">
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Input
              label="E-mail Address"
              placeholder={t("common:email")}
              name="email"
              errors={error?.message}
              value={value}
              onChange={onChange}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              containerClassName={"mt-5"}
              haveShowPassIcon
              errors={error?.message}
              value={value}
              onChange={onChange}
            />
          );
        }}
      />

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-500"
        >
          Forgot password?
        </a>
      </div>
      <div className="actions mt-5">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          // className="submit__btn login-btn"
          className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-primary-800"
          loading={isLoading}
        >
          {t("common:log_in")}
        </Button>
      </div>
    </form>
  );
});
