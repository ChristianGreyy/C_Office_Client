import { IIssueDetail, IUserDetail } from ".";
import { IGetParams } from "./app";

export interface IFetchProjectsParams extends IGetParams {
  sortOption?: string;
  search?: string;
}

export interface IFetchProjectsSuccessData {
  items: IProjectDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}

export type TUpdateProjectData = {
  dateTime: Date | string;
};

export type TDeleteProjectData = Partial<IProjectDetail> & { isSoft: boolean };

export interface IProjectDetail {
  id?: number;
  name: string;
  issues?: IIssueDetail[];
  kickOffDate: string;
  deadline: string;
  feature?: {
    open?: number;
    closed?: number;
  };
  bug?: {
    open?: number;
    closed?: number;
  };
  test_case?: {
    open?: number;
    closed?: number;
  };
  support?: {
    open?: number;
    closed?: number;
  };
  meeting?: {
    open?: number;
    closed?: number;
  };
}

export interface IProjectMember {
  role: EProjectMemberRole;
  user: IUserDetail;
}

export interface IProjectMemberLayout {
  [key: string]:  IUserDetail[];
}


export interface IEditProjectData {
  name?: string;
}

export enum EProjectMemberRole {
  manager = "manager",
  qc = "qc",
  developer = "developer",
  tester = "tester",
  leader = "leader",
  sale = "sale",
}
