"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import { Button, IssueInput } from "@/common";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SwitchProject from "@/components/SwitchProject";
import EditorTheme from "@/components/editors/EditorTheme";
import HtmlPlugin from "@/components/editors/HtmlPlugin";
import ToolbarPlugin from "@/components/editors/plugins/ToolbarPlugin";
import "@/components/editors/style.css";
import { EAside } from "@/enum";
import {
  BaseResponseError,
  EPrioritySLug,
  EStatusSLug,
  ETrackerSLug,
  IAddIssue,
} from "@/interfaces";
import {
  RootState,
  createIssueAction,
  getAllPrioritiesAction,
  getAllStatusesAction,
  getAllTrackersAction,
  getMembersForProjectAction,
  useAppDispatch
} from "@/redux";
import { validateNumber } from "@/utils/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Card, DatePicker, Input, message } from "antd";
import { t } from "i18next";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

export const addIssueSchema = z.object({
  subject: z
    .string()
    .trim()
    .max(1000, {
      message: t("error.subject_max_length", {
        length: 1000,
      }) as string,
    })
    .nonempty({
      message: t("error.subject_required"),
      // message: 'ga',
    })
    .transform((e) => (e === "" ? undefined : e)),
  input: z
    .string()
    .trim()
    .max(1000, {
      message: t("error.input_max_length", {
        length: 1000,
      }) as string,
    })
    .nonempty({
      message: t("error.input_required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  startDate: z
    .string()
    .nonempty({
      message: t("error.start_date_required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  dueDate: z
    .string()
    .nonempty({
      message: t("error.end_date_required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  estimateTime: z.string().optional(),
  completedPercent: z.number(),
  assignId: z.number().optional(),
  priorityId: z.number().optional(),
  trackerId: z.number().optional(),
  statusId: z.number().optional(),
  projectId: z.number(),
});

export default function AddIssuePage() {
  const params = useParams();
  const projectId = params.id;
  const { trackers } = useSelector((state: RootState) => state.trackers);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { statuses } = useSelector((state: RootState) => state.statuses);
  const { members } = useSelector((state: RootState) => state.projects);
  const [globalErrors, setGlobalErrors] = useState([]);
  const router = useRouter();
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const dispatch = useAppDispatch();

  const getAllOptions = () => {
    dispatch(getAllTrackersAction());
    dispatch(getAllPrioritiesAction());
    dispatch(getAllStatusesAction());
  };

  const getMembersForProject = () => {
    dispatch(getMembersForProjectAction(+projectId));
  };

  useEffect(() => {
    getAllOptions();
    getMembersForProject();
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<IAddIssue>({
    defaultValues: {
      subject: "",
      input: "",
      startDate: "",
      dueDate: "",
      estimateTime: undefined,
      completedPercent: 0,
      assignId: undefined,
      priorityId: undefined,
      trackerId: undefined,
      statusId: undefined,
      projectId: +projectId,
    },
    resolver: zodResolver(addIssueSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onErrorValidate = (error: any) => {
    // setGlobalErrors
    console.log(error);
    const estimateTime = getValues('estimateTime')
    if (!validateNumber(estimateTime?.toString())) {
      error['completed_percent'] = {
          message: t("error.invalid_completed_percent")
        }
      setError('completedPercent', {
        message: "Triple Check This",
      } )
    }
    const validateError = Object.values(error).map((item: any) => item.message);
    setGlobalErrors(validateError);
  };

  if (statuses) {
    const status = statuses.find((item) => item.slug === EStatusSLug.new);
    setValue("statusId", status?.id);
  }

  if (trackers) {
    const tracker = trackers.find((item) => item.slug === ETrackerSLug.feature);
    setValue("trackerId", tracker?.id);
  }

  if (priorities) {
    const priority = priorities.find(
      (item) => item.slug === EPrioritySLug.normal
    );
    setValue("priorityId", priority?.id);
  }

  const onAddIssue = async (data: IAddIssue) => {
    const { ...passData } = data;
    if (!validateNumber(data.estimateTime)) {
      setGlobalErrors([...globalErrors, t("error.invalid_completed_percent")]);
      return;
    }
    setGlobalErrors([]);
    const payload: any = {
      ...passData,
      estimateTime: +data.estimateTime,
    };
    try {
      const response = await dispatch(createIssueAction(payload)).unwrap();
      message.success({
        content: "Create issue successfully",
      });
      router.push(`/${language}/projects/${projectId}/issues`);
      // setTimeout(() => {
      //   router.push(`/en/projects/${projectId}/issues`);
      // }, 2000);
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
      <main className="flex flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 text-sm">
          <div className="basis-1/6">
            <Aside title={EAside.issues} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <SwitchProject />
            <h1 className="text-[1.43em] font-medium leading-[1.33] mt-5">
              {t("issues.create_issue")}
            </h1>
            <form
              onSubmit={handleSubmit(onAddIssue, onErrorValidate)}
              className="create-issue-form mt-1 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]"
            >
              {globalErrors && globalErrors.length > 0 && (
                <>
                  <div className="bg-rose-600 p-5 text-white  mb-4">
                    {globalErrors.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </>
              )}
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
                              id="trackers"
                              className="w-[300px] col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={(e) => {
                                setValue("trackerId", +e.target.value);
                              }}
                              // onChange={onChange}
                              value={value}
                            >
                              {trackers &&
                                trackers.map((item, index) => {
                                  if (item.slug === ETrackerSLug.feature) {
                                    return (
                                      <option selected value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  } else {
                                    return (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                })}
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
                          containerClassName="!mb-5"
                          errors={error?.message}
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
                                  {/* <OnChangePlugin onChange={(editorState) => {
                                        const editorStateJSON = editorState.toJSON();

                                    console.log(JSON.stringify(editorStateJSON))
                                  }} /> */}
                                  <HtmlPlugin
                                    onHtmlChanged={(html) =>
                                      setValue("input", html)
                                    }
                                    // initialHtml="<h1>Test</h1><p>Lorem ipsum dolor sit amet</p>"
                                  />
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
                                  onChange={(e) => {
                                    setValue("statusId", +e.target.value);
                                  }}
                                  value={value}
                                >
                                  <option value="" selected></option>
                                  {statuses &&
                                    statuses.map((item) => {
                                      if (item.slug === EStatusSLug.new) {
                                        return (
                                          <option selected value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      } else {
                                        return (
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      }
                                    })}
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
                                  onChange={(e) => {
                                    setValue("priorityId", +e.target.value);
                                  }}
                                  value={value}
                                >
                                  <option value="" selected></option>
                                  {priorities &&
                                    priorities.map((item) => {
                                      if (item.slug === EPrioritySLug.normal) {
                                        return (
                                          <option selected value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      } else {
                                        return (
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      }
                                    })}
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
                                  onChange={(e) => {
                                    setValue("assignId", +e.target.value);
                                  }}
                                  value={value}
                                >
                                  <option value="" selected></option>
                                  {members &&
                                    members.map((member) => (
                                      <option
                                        value={member.user.id}
                                      >{`${member.user.firstName} ${member.user.lastName}`}</option>
                                    ))}
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
                                  onChange={(date, dateString) => {
                                    onChange && onChange(dateString.toString());
                                  }}
                                  value={value ? moment(value as string) : null}
                                  allowClear={true}
                                  style={{
                                    borderRadius: 5,
                                    height: 38,
                                    paddingTop: 8,
                                    marginTop: 10,
                                    width: 300,
                                    borderColor: error ? "#B91C1C" : "#D9D9D9",
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
                                  onChange={(date, dateString) => {
                                    onChange && onChange(dateString.toString());
                                  }}
                                  value={value ? moment(value as string) : null}
                                  allowClear={true}
                                  style={{
                                    borderRadius: 5,
                                    height: 38,
                                    paddingTop: 8,
                                    marginTop: 10,
                                    width: 300,
                                    borderColor: error ? "#B91C1C" : "#D9D9D9",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      />

                      <Controller
                        name={"estimateTime"}
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => {
                          return (
                            <div className="w-full">
                              <div className="grid  grid-cols-6 gap-3 !mb-5">
                                <label
                                  // htmlFor={name || label}
                                  className={`IssueInput__label  inline-flex items-center text-base sm:w-40 text-dark col-span-1`}
                                >
                                  {t("issues.estimateTime")}
                                  {true && (
                                    <span className="required text-[#B91C1C] font-bold">
                                      {" "}
                                      *
                                    </span>
                                  )}
                                </label>
                                <div
                                  className={`Input__field-container w-full relative`}
                                  // style={{
                                  //   display: type === "date" ? "inline-grid" : "block",
                                  // }}
                                >
                                  <Input
                                    size={"large"}
                                    name={"estimateTime"}
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    className="Input__field w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    style={{
                                      borderColor: error
                                        ? "#B91C1C"
                                        : "#D9D9D9",
                                    }}
                                  />
                                </div>
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
                                  onChange={(e) => {
                                    setValue(
                                      "completedPercent",
                                      +e.target.value
                                    );
                                  }}
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
