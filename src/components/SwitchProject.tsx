import React, { useEffect } from "react";

import { FieldTimeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { RootState, getAllProjectsAction, useAppDispatch } from "@/redux";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { LANGUAGE } from "@/configs";

type SwitchProjectProps = {
  //   name: string;
  //   onClick: (name: string) => void;
  //   isSelected: boolean;
};

const SwitchProject = ({}: SwitchProjectProps) => {
  const router = useRouter();
  const { projects } = useSelector((state: RootState) => state.projects);
  const params = useParams();
  const projectId = params.id;
  const language = Cookies.get(LANGUAGE) ?? 'en';

  const dispatch = useAppDispatch();

  const getAllProjects = () => {
    dispatch(getAllProjectsAction());
  };

  useEffect(() => {
    getAllProjects();
  }, [dispatch]);

  const handleSwitchProject = (id: number) => {
    router.push(`/${language}/projects/${id}`);
  };

  return (
    <form className="max-w-sm">
      {/* <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label> */}
      <select
        id="projects"
        value={projectId}
        onChange={(e) => handleSwitchProject(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {projects &&
          projects.map((project) => (
            <option value={project.id}>{project.name}</option>
          ))}
      </select>
    </form>
  );
};

export default SwitchProject;
