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
  projectId?: string;
}

export interface IFetchIssuesSuccessData {
  items: IIssueDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}

export type TUpdateIssueData = Partial<IIssueDetail>

export type TDeleteIssueData = Partial<IIssueDetail> & { isSoft: boolean };

export interface IIssueDetail {
  id: number;
  name: string;
  tracker: ITrackerDetail;
  trackerId: number;
  status: IStatusDetail;
  statusId: number;
  priority: IPriorityDetail;
  priorityId: number;
  assigner: IUserDetail;
  assignId: number;
  creator: IUserDetail;
  creatorId: number;
  subject: string;
  estimateTime: number;
  spentTime: number;
  startDate: Date;
  dueDate: Date;
  completedPercent: number;
  input: string;
  output: IOutputDetail[];
}

export interface IOutputDetail {
  userId: number; 
  user: IUserDetail;
  issueId: number;
  issue: IIssueDetail;
  comment: string;
  createdAt?: string;
}

export interface IEditIssue {
  subject?: string;
  input?: string;
  startDate?: string;
  dueDate?: string;
  estimateTime?: number;
  completedPercent?: number;
  assignId?: number;
  priorityId?: number;
  trackerId?: number;
  statusId?: number;
  categoryId?: number;
  projectId?: number;
  output?: string;
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
