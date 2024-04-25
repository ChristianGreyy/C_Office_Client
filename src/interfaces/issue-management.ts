import { IUserDetail } from ".";
import { IGetParams } from "./app";
import { IPriorityDetail } from "./priority-management";
import { IStatusDetail } from "./status-management";
import { ITrackerDetail } from "./tracker-management";

export interface IFetchIssuesParams extends IGetParams {
  sortOption?: string;
  search?: string;
  statusId?: string;
  priorityId?: string;
  trackerId?: string;
}

export interface IFetchIssuesSuccessData {
  items: IIssueDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}

export type TUpdateIssueData = {
  dateTime: Date | string;
};

export type TDeleteIssueData = Partial<IIssueDetail> & { isSoft: boolean };

export interface IIssueDetail {
  id?: number;
  name: string;
  tracker: ITrackerDetail;
  status: IStatusDetail;
  priority: IPriorityDetail;
  assigner: IUserDetail;
  subject: string;
  estimateTime: number;
  spentTime: number;
  startDate: Date;
  dueDate: Date;
  completedPercent: number;
  input: string;
  output: string;
}

export interface IEditIssueData {
  name?: string;
}

export interface IAddIssue {
  subject: string;
  input: string;
  startDate: string;
  dueDate: string;
  estimateTime: number;
  completedPercent: number;
  assignId: number;
  priorityId: number;
  trackerId: number;
  statusId: number;
  categoryId: number;
  projectId: number;
}
