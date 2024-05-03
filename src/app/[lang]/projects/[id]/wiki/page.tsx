"use client";

// This is a client component 👈🏽
import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";

import { Button } from "@/common";
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
import { BaseResponseError, IEditProject } from "@/interfaces";
import {
  RootState,
  getProjectByIdAction,
  updateProjectAction,
  useAppDispatch,
} from "@/redux";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { message } from "antd";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function IssuesPage() {
  const [isUpdateWiki, setIsUpdateWiki] = useState(false);
  const { project } = useSelector((state: RootState) => state.projects);
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectId = params.id;
  const getProjectById = () => {
    dispatch(getProjectByIdAction(+projectId));
  };

  useEffect(() => {
    getProjectById();
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IEditProject>({
    defaultValues: {
      wiki: project?.wiki,
    },
    // resolver: zodResolver(addIssueSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

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

  const onUpdateProject = async (data: IEditProject) => {
    const { ...passData } = data;
    console.log("passData", passData);
    const payload: any = {
      ...passData,
      id: projectId,
    };
    try {
      const response = await dispatch(updateProjectAction(payload)).unwrap();
      message.success({
        content: "Update wiki successfully",
      });
      getProjectById();
      setIsUpdateWiki(false);
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

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
        <Navbar />
        <div className="mt-20 flex gap-4 h-screen text-sm">
          <div className="basis-1/6">
            <Aside title={EAside.issues} />
          </div>
          <div className="basis-5/6 px-3 py-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <SwitchProject />
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="bg-sky-600 flex items-center text-white py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => setIsUpdateWiki(true)}
              >
                Update wiki
              </div>
            </div>
            <div className="project-detail-statistic mt-4 border bg-gray-50 text-[#3e425a] mb-5 p-[15px] rounded-[3px] border-solid border-[#dadce7]">
              <h1 className="text-[1.14em] font-medium leading-[1.33] mt-0 mb-[20px]">
                {project && `${project.name} Wiki:`}
              </h1>
              {!isUpdateWiki && project && (
                <div dangerouslySetInnerHTML={{ __html: project.wiki }}></div>
              )}

              <form onSubmit={handleSubmit(onUpdateProject, onErrorValidate)}>
                {isUpdateWiki && (
                  <>
                    <Controller
                      name={"wiki"}
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
                                      onHtmlChanged={(html) => {
                                        setValue("wiki", html);
                                      }}
                                      initialHtml={value ?? project?.wiki}
                                      isEdit={true}
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
                        onClick={() => setIsUpdateWiki(false)}
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
        <Footer />
      </main>
    </Providers>
  );
}
