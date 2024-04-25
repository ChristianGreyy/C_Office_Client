"use client";

// This is a client component 👈🏽
import { useEffect } from "react";
import "react-clock/dist/Clock.css";

import { Button, IssueInput } from "@/common";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SwitchProject from "@/components/SwitchProject";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EAside } from "@/enum";
import { BaseResponseError, IAddIssue } from "@/interfaces";
import {
  RootState,
  createIssueAction,
  getAllIssuesAction,
  getAllPrioritiesAction,
  getAllStatusesAction,
  getAllTrackersAction,
  useAppDispatch,
} from "@/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, DatePicker, message } from "antd";
import { t } from "i18next";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import EditorTheme from "@/components/editors/EditorTheme";
import ToolbarPlugin from "@/components/editors/plugins/ToolbarPlugin";
import TreeViewPlugin from "@/components/editors/plugins/TreeViewPlugin";
import "@/components/editors/style.css";
import moment from "moment";
import { useSelector } from "react-redux";

export const addIssueSchema = z.object({
  subject: z
    .string()
    .trim()
    .max(30, {
      message: t("error:max_length", {
        length: 30,
      }) as string,
    })
    .nonempty({
      message: t("error:required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  input: z
    .string()
    .trim()
    .max(1000, {
      message: t("error:max_length", {
        length: 1000,
      }) as string,
    })
    .nonempty({
      message: t("error:required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  startDate: z
    .string()
    .nonempty({
      message: t("error:required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  dueDate: z
    .string()
    .nonempty({
      message: t("error:required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  estimateTime: z.number(),
  completedPercent: z.number(),
  assignId: z.number(),
  priorityId: z.number(),
  trackerId: z.number(),
  statusId: z.number(),
  projectId: z.number(),
});

export default function AddIssuePage() {
  const params = useParams();
  const projectId = params.id;
  const { trackers } = useSelector((state: RootState) => state.trackers);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { statuses } = useSelector((state: RootState) => state.statuses);

  const dispatch = useAppDispatch();

  const getAllOptions = () => {
    dispatch(getAllTrackersAction());
    dispatch(getAllPrioritiesAction());
    dispatch(getAllStatusesAction());
  };

  useEffect(() => {
    getAllOptions();
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IAddIssue>({
    defaultValues: {
      subject: "",
      input: "",
      startDate: "",
      dueDate: "",
      estimateTime: undefined,
      completedPercent: undefined,
      assignId: undefined,
      priorityId: undefined,
      trackerId: undefined,
      statusId: undefined,
      categoryId: undefined,
      projectId: undefined,
    },
    resolver: zodResolver(addIssueSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onErrorValidate = (error: any) => {
    console.log('error validate', error);
  }

  const onAddIssue = async (data: IAddIssue) => {
    const { ...passData } = data;
    // setIsAddingUser(true)
    const payload: any = {
      ...passData,
    };
    try {
      const response = await dispatch(createIssueAction(payload)).unwrap();
      message.success({
        content: "Create priority succesfully",
      });
    } catch (err) {
      const error = err as BaseResponseError;
      if (error) {
        message.error({
          content: error?.message,
        });
      }
    } finally {
      // setIsAddingPriority(false)
    }
  };

  useEffect(() => {}, [dispatch]);

  function onError(error: any) {
    console.error(error);
  }

  const editorConfig = {
    namespace: "MyEditor",
    nodes: [],
    theme: EditorTheme,
    onError,
  };

  function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
  }

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 h-screen text-sm">
          <div className="basis-1/6">
            <Aside title={EAside.issues} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <SwitchProject />
            <h1 className="text-[1.43em] font-medium leading-[1.33] mt-5">
              {t("issues.create_issue")}
            </h1>
            <form onSubmit={handleSubmit(onAddIssue, onErrorValidate)} className="create-issue-form mt-1 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <Card className="bg-white p-10 min-h-[600px]">
                <div>
                  <Controller
                    name="trackerId"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <div className="w-full">
                          <div className="grid grid-cols-12 gap-3 !mb-5">
                            <label
                              htmlFor={""}
                              className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                            >
                              {t("issues.tracker")}
                              <span className="required text-[#B91C1C] font-bold">
                                {" "}
                                *
                              </span>
                            </label>
                            <select
                              id="statuses"
                              className="w-[300px] col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={onChange}
                              value={value}
                              // selected={value}
                            >
                              <option value="" selected></option>
                              {trackers &&
                                trackers.map((item) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Controller
                    name={"subject"}
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <IssueInput
                          placeholder={t("issues.subject")}
                          required
                          label={t("issues.subject")}
                          onChange={onChange}
                          value={value}
                          errors={error?.message}
                          containerClassName="!mb-5"
                        />
                      );
                    }}
                  />

                  <Controller
                    name={"input"}
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <div className="w-full">
                          <div className="grid grid-cols-12 gap-3 !mb-5">
                            <label
                              htmlFor={""}
                              className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                            >
                              {t("issues.input")}
                              <span className="required text-[#B91C1C] font-bold">
                                {" "}
                                *
                              </span>
                            </label>
                            <LexicalComposer initialConfig={editorConfig}>
                              <div className="editor-container">
                                <ToolbarPlugin />
                                <div className="editor-inner">
                                  <RichTextPlugin
                                    contentEditable={
                                      <ContentEditable className="editor-input" />
                                    }
                                    placeholder={<Placeholder />}
                                    ErrorBoundary={LexicalErrorBoundary}
                                  />
                                  <HistoryPlugin />
                                  <AutoFocusPlugin />
                                  {/* <TreeViewPlugin /> */}
                                </div>
                              </div>
                            </LexicalComposer>
                          </div>
                        </div>
                      );
                    }}
                  />

                  <div className="grid grid-cols-12 gap-3 !mb-5">
                    <div className="issue-form-left col-span-6">
                      <Controller
                        name="statusId"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid  grid-cols-6 gap-3 !mb-5">
                                <label
                                  htmlFor={""}
                                  className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.status")}
                                  <span className="required text-[#B91C1C] font-bold">
                                    {" "}
                                    *
                                  </span>
                                </label>
                                <select
                                  id="statuses"
                                  className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option value="" selected></option>
                                  {statuses &&
                                    statuses.map((item) => (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Controller
                        name="priorityId"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid grid-cols-6 gap-3 !mb-5">
                                <label
                                  htmlFor={""}
                                  className={`IssueInput__label inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.priority")}
                                  <span className="required text-[#B91C1C] font-bold">
                                    {" "}
                                    *
                                  </span>
                                </label>
                                <select
                                  id="priorities"
                                  className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option value="" selected></option>
                                  {priorities &&
                                    priorities.map((item) => (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          );
                        }}
                      />

                      <Controller
                        name="assignId"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid grid-cols-6 gap-3 !mb-5">
                                <label
                                  htmlFor={""}
                                  className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.assignee")}
                                  <span className="required text-[#B91C1C] font-bold">
                                    {" "}
                                    *
                                  </span>
                                </label>
                                <select
                                  id="assignId"
                                  className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option value="" selected>
                                    All
                                  </option>
                                  <option value={1}>name</option>
                                </select>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                    <div className="issue-form-right col-span-6">
                      <Controller
                        name="startDate"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid  grid-cols-6 gap-3 !mb-5">
                                <label
                                  htmlFor={""}
                                  className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.startDate")}
                                  <span className="required text-[#B91C1C] font-bold">
                                    {" "}
                                    *
                                  </span>
                                </label>
                                <DatePicker
                                  className="border-radius-0.5rem"
                                  onChange={(a, b) => {
                                    setValue("startDate", b.toString())
                                  }}
                                    // onChange={(e) => {

                                  value={value}
                                  allowClear={false}
                                  style={{
                                    borderRadius: 5,
                                    height: 38,
                                    paddingTop: 8,
                                    marginTop: 10,
                                    width: 300,
                                    borderColor: errors ? "#B91C1C" : "#D9D9D9",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Controller
                        name="dueDate"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid  grid-cols-6 gap-3 !mb-5">
                                <label
                                  htmlFor={""}
                                  className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.dueDate")}
                                  <span className="required text-[#B91C1C] font-bold">
                                    {" "}
                                    *
                                  </span>
                                </label>
                                <DatePicker
                                  className="border-radius-0.5rem"
                                  onChange={onChange}
                                  value={value ? moment(value as string) : null}
                                  allowClear={false}
                                  style={{
                                    borderRadius: 5,
                                    height: 38,
                                    paddingTop: 8,
                                    marginTop: 10,
                                    width: 300,
                                    borderColor: errors ? "#B91C1C" : "#D9D9D9",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      />

                      <Controller
                        name="completedPercent"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid grid-cols-6 gap-3 !mb-5">
                                <label
                                  htmlFor={""}
                                  className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.completedPercent")}
                                  <span className="required text-[#B91C1C] font-bold">
                                    {" "}
                                    *
                                  </span>
                                </label>
                                <select
                                  id="completedPercent"
                                  className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option value="0" selected>
                                    0%
                                  </option>
                                  <option value="10">10%</option>
                                  <option value="20">20%</option>
                                  <option value="30">30%</option>
                                  <option value="40">40%</option>
                                  <option value="50">50%</option>
                                  <option value="60">60%</option>
                                  <option value="70">70%</option>
                                  <option value="80">80%</option>
                                  <option value="90">90%</option>
                                  <option value="100">100%</option>
                                </select>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>

                  {/* <Controller
                    name="mediaId"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <CustomDragger
                          label={t("emailContent:form_label_upload")}
                          name="mediaId"
                          id="mediaId"
                          containerClassName="mt-5 "
                          onLoadEnd={(data) => {
                            setValue("mediaId", data?.id ?? 0, {
                              shouldDirty: true,
                            });
                            clearErrors("mediaId");
                            setImageSource(data?.url ?? null);
                          }}
                          errors={error?.message}
                          initResource={imageSource as string}
                          changeLoading={(loading) => {
                            //
                          }}
                          allowFileTypes={[
                            "image/png",
                            "image/jpeg",
                            "image/jpg",
                          ]}
                          limitFileSize={5}
                          labelClassName="w-1/2"
                          uploadType={EUploadFileType.IMAGE}
                        />
                      );
                    }}
                  /> */}
                </div>
                <div className="flex mt-10 pb-10 items-center gap-[40px] justify-start">
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    // className="submit__btn login-btn"
                    className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-primary-800"
                    // loading={isLoading}
                  >
                    {t("issues.create")}
                  </Button>

                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    // className="submit__btn login-btn"
                    className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800"
                    // loading={isLoading}
                  >
                    {t("issues.create_and_add_another")}
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
