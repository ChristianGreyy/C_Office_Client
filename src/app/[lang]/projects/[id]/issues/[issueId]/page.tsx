"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import { Button } from "@/common";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import EditorTheme from "@/components/editors/EditorTheme";
import HtmlPlugin from "@/components/editors/HtmlPlugin";
import ToolbarPlugin from "@/components/editors/plugins/ToolbarPlugin";
import "@/components/editors/style.css";
import { EAside } from "@/enum";
import { BaseResponseError, IEditIssue } from "@/interfaces";
import {
  RootState,
  getIssueByIdAction,
  updateIssueAction,
  useAppDispatch,
} from "@/redux";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { message } from "antd";
import { t } from "i18next";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { LANGUAGE } from "@/configs";

export default function AddIssuePage() {
  const [isOpenOutput, setIsOpenOutput] = useState(false);
  const params = useParams();
  const projectId = params.id;
  const issueId = params.issueId;
  const router = useRouter();
  const { issue } = useSelector((state: RootState) => state.issues);
  const language = Cookies.get(LANGUAGE) ?? "en";

  const dispatch = useAppDispatch();

  const getIssueById = () => {
    dispatch(getIssueByIdAction(+issueId));
  };

  useEffect(() => {
    getIssueById();
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IEditIssue>({
    defaultValues: {
      output: "",
    },
    // resolver: zodResolver(addIssueSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onUpdateIssue = async (data: IEditIssue) => {
    const { ...passData } = data;
    console.log("passData", passData);
    const payload: any = {
      ...passData,
      id: issueId,
    };
    try {
      const response = await dispatch(updateIssueAction(payload)).unwrap();
      message.success({
        content: "Update issue successfully",
      });
      getIssueById();
      setIsOpenOutput(false);
      // router.push(`/en/projects/${projectId}/issues/${issueId}`);
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

  const onErrorValidate = (error: any) => {
    console.log(error);
  };

  const editorConfig = {
    namespace: "MyEditor",
    nodes: [],
    theme: EditorTheme,
    onError: function (error: any) {
      console.error(error);
    },
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
            <div className="flex justify-between">
              <div className="flex-1">
                <h1 className="text-[1.43em] font-medium leading-[1.33] my-5">
                  {issue && issue.tracker?.name} #{issue && issue.id}
                </h1>
              </div>
              <div className="bg-slate-300 flex items-center text-black py-2 px-4 rounded-lg h-10">
                <Link
                  href={`/${language}/projects/${projectId}/issues/${issueId}/edit`}
                >
                  {t("issues.edit_issue")}
                </Link>
              </div>
            </div>

            <div className="issue-info flex items-center">
              <div className="avatar">
                <img
                  className="w-14 h-14"
                  src={issue && issue.creator && issue.creator.avatar?.url}
                />
              </div>
              <div className="issue-description ml-2">
                <div className="issue-subject text-2xl font-bold">
                  {issue && issue.subject}
                </div>
                <div className="assignee">
                  created by
                  <Link
                    href={`/profile`}
                    className="text-ss font-semibold text-cyan-600 md:text-sm pl-1"
                  >
                    {issue &&
                      issue.creator &&
                      `${issue.creator?.firstName} ${issue.creator?.lastName}`}
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-4 text-base flex">
              <ul className="issue-left">
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.status")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.status?.name}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.priority")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.priority?.name}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.assignee")}:{" "}
                  </div>
                  <div className="description">
                    <Link
                      href={`/profile`}
                      className="text-ss font-semibold text-cyan-600 md:text-sm"
                    >
                      {issue &&
                        issue.assigner &&
                        `${issue.assigner?.firstName} ${issue.assigner?.lastName}`}
                    </Link>
                  </div>
                </li>
              </ul>
              <ul className="issue-right ml-[150px]">
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.startDate")}:{" "}
                  </div>
                  <div className="description">
                    {issue && moment(issue.startDate).format("DD/MM/YYYY")}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.dueDate")}:{" "}
                  </div>
                  <div className="description">
                    {issue && moment(issue.dueDate).format("DD/MM/YYYY")}
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.completedPercent")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.completedPercent}%
                  </div>
                </li>
                <li className="flex mb-1">
                  <div className="title w-[200px] font-bold">
                    {t("issues.estimateTime")}:{" "}
                  </div>
                  <div className="description">
                    {issue && issue.estimateTime}hour
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-sm">
              <div className="issue-subject text-xl font-bold">
                {t("issues.input")}:{" "}
              </div>
              {issue && (
                <div dangerouslySetInnerHTML={{ __html: issue.input }}></div>
              )}
              {/* <div className="issue-input">{issue && issue.input}</div> */}
            </div>
            <div className="text-sm my-4">
              <div className="flex justify-between">
                <div className="issue-subject text-xl font-bold">Output:</div>
                <div
                  className="bg-sky-600 flex items-center text-white py-2 px-4 rounded-lg cursor-pointer"
                  onClick={() => setIsOpenOutput(true)}
                >
                  {t("issues.add_output")}:{" "}
                </div>
              </div>
              {issue &&
                issue.output?.map((item) => (
                  // <div dangerouslySetInnerHTML={{ __html: item }}></div>
                  <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <img
                            style={{
                              objectFit: "cover",
                            }}
                            className="mr-2 w-6 h-6 rounded-full"
                            src={item.user.avatar?.url}
                            alt="Bonnie Green"
                          />
                          {`${item.user.firstName} ${item.user.lastName}`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            pubdate
                            datetime="2022-03-12"
                            title="March 12th, 2022"
                          >
                            {moment(item.createdAt).format("DD/MM/YYYY h:mm a")}
                          </time>
                        </p>
                      </div>
                      <button
                        id="dropdownComment3Button"
                        data-dropdown-toggle="dropdownComment3"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 3"
                        >
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>
                      <div
                        id="dropdownComment3"
                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownMenuIconHorizontalButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Remove
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.comment }}
                      ></div>
                      {/* {item.comment} */}
                    </p>
                    {/* <div className="flex items-center mt-4 space-x-4">
                      <button
                        type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                      >
                        <svg
                          className="mr-1.5 w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div> */}
                  </article>
                ))}
              <form onSubmit={handleSubmit(onUpdateIssue, onErrorValidate)}>
                {isOpenOutput && (
                  <>
                    <Controller
                      name={"output"}
                      control={control}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => {
                        return (
                          <div className="w-full">
                            <div className="!mb-5">
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
                                    <HtmlPlugin
                                      onHtmlChanged={(html) =>
                                        setValue("output", html)
                                      }
                                    />
                                  </div>
                                </div>
                              </LexicalComposer>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <div className="flex mt-10 pb-10 items-center gap-[40px] justify-start">
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        // className="submit__btn login-btn"
                        className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-primary-800"
                        // loading={isLoading}
                      >
                        Submit
                      </Button>

                      <Button
                        onClick={() => setIsOpenOutput(false)}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        // className="submit__btn login-btn"
                        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800"
                        // loading={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </Providers>
  );
}
