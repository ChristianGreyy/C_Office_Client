"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import { Button } from "@/common";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import RequestAside from "@/components/RequestAside";
import { ShareSelectInput } from "@/components/shared/select/SelectInput";
import { ERequestAside } from "@/enum";
import {
  BaseResponseError,
  ICreateAbsenceData,
  IUpdateRequestData,
} from "@/interfaces";
import { useAppDispatch } from "@/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createRequestAction } from "@/redux/actions/request-management";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useClientTranslation } from "@/i18n/client";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

// export const createRequestSchema = z.object({
//   startDate: z
//     .string()
//     .trim()
//     .nonempty({
//       message: t("error.required"),
//     })
//     .transform((e) => (e === "" ? undefined : e)),
//   endDate: z
//     .string()
//     .trim()
//     .nonempty({
//       message: t("error.required"),
//     })
//     .transform((e) => (e === "" ? undefined : e)),
//   type: z
//     .string()
//     .trim()
//     .nonempty({
//       message: t("error.required"),
//     })
//     .transform((e) => (e === "" ? undefined : e)),
//   note: z
//     .string()
//     .trim()
//     .nonempty({
//       message: t("error.required"),
//     })
//     .transform((e) => (e === "" ? undefined : e)),
// });

export default function IssuesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [type, setType] = useState("by-day");
  const { t } = useClientTranslation("Common");
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<ICreateAbsenceData>({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      type: "absence",
      note: "",
    },
    // resolver: zodResolver(createRequestSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {}, [dispatch]);

  const requestsOptions = [
    {
      label: "By day",
      value: "by-day",
    },
    {
      label: "By hour",
      value: "by-hour",
    },
  ];

  const onCreateRequest = async (data: ICreateAbsenceData) => {
    const { ...passData } = data;
    let payload = {};
    if (type === "by-hour") {
      const date = new Date(passData.date);
      const [startHour, startMinute] = passData.startTime.split(":");
      const [endHour, endMinute] = passData.endTime.split(":");
      const startTime = new Date(date);
      startTime.setHours(+startHour);
      startTime.setMinutes(+startMinute);
      const endTime = new Date(date);
      endTime.setHours(+endHour);
      endTime.setMinutes(+endMinute);
      payload = {
        startTime,
        endTime,
        note: passData.note,
        type: passData.type,
      };
    } else {
      payload = {
        startTime: new Date(passData.startDate),
        endTime: new Date(passData.endDate),
        type: passData.type,
      };
    }
    try {
      const response = await dispatch(createRequestAction(payload)).unwrap();
      message.success({
        content: "Create request successfully",
      });
      router.push(`/${language}/requests/absence`);
    } catch (err) {
      const error = err as BaseResponseError;
      if (error) {
        message.error({
          content: error?.message,
        });
      }
    } finally {
    }
  };

  const onErrorValidate = (error: any) => {
    // setGlobalErrors
    console.log("error", error);
  };

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 h-screen">
          <div className="basis-1/6">
            <RequestAside title={ERequestAside.absence} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <form
              onSubmit={handleSubmit(onCreateRequest, onErrorValidate)}
              className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]"
            >
              <h1 className="text-[1.43em] font-medium leading-[1.33] mt-0 mb-5">
                New absence
              </h1>
              <div className="mt-4 flex gap-3">
                <div className="basis-2/5">
                  {type === "by-hour" && (
                    <>
                      <Controller
                        name={"date"}
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="date"
                                name="floating_date"
                                id="floating_date"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={value}
                                onChange={onChange}
                              />
                              <label
                                htmlFor="floating_date"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {t("requests.date")}
                              </label>
                            </div>
                          );
                        }}
                      />
                      <Controller
                        name={"startTime"}
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="time"
                                name="floating_start_time"
                                id="floating_start_time"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={value}
                                onChange={onChange}
                              />
                              <label
                                htmlFor="floating_start_time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {t("requests.start_time")}
                              </label>
                            </div>
                          );
                        }}
                      />
                      <Controller
                        name={"endTime"}
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="time"
                                name="floating_end_time"
                                id="floating_end_time"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={value}
                                onChange={onChange}
                              />
                              <label
                                htmlFor="floating_end_time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {t("requests.end_time")}
                              </label>
                            </div>
                          );
                        }}
                      />
                    </>
                  )}
                  {type === "by-day" && (
                    <>
                      <Controller
                        name={"startDate"}
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="date"
                                name="floating_date"
                                id="floating_date"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={value}
                                onChange={onChange}
                              />
                              <label
                                htmlFor="floating_date"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {t("requests.start_time")}
                              </label>
                            </div>
                          );
                        }}
                      />
                      <Controller
                        name={"endDate"}
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="date"
                                name="floating_date"
                                id="floating_date"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={value}
                                onChange={onChange}
                              />
                              <label
                                htmlFor="floating_date"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {t("requests.end_time")}
                              </label>
                            </div>
                          );
                        }}
                      />
                    </>
                  )}

                  <ShareSelectInput
                    value={type}
                    data={requestsOptions as any}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900"
                    label={t("requests.type")}
                    onChange={(data) => {
                      setType(data);
                    }}
                  />
                </div>

                <div className="basis-3/5">
                  <Controller
                    name={"note"}
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <textarea
                          className="w-[100%] h-[100%] border-2 border-solid border-gray-400 p-2"
                          name=""
                          id=""
                          placeholder={t("requests.note")}
                          value={value}
                          onChange={onChange}
                        ></textarea>
                      );
                    }}
                  />
                </div>
              </div>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                // className="submit__btn login-btn"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-primary-800"
                // loading={isLoading}
              >
                {/* {t("issues.create")} */}
                {t("requests.submit")}
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
