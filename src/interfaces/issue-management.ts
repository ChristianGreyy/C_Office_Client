import { IUserDetail } from '.'
import { IGetParams } from './app'
import { IPriorityDetail } from './priority-management'
import { IStatusDetail } from './status-management'
import { ITrackerDetail } from './tracker-management'

export interface IFetchIssuesParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchIssuesSuccessData {
  items: IIssueDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateIssueData = {
  dateTime: Date | string
}

export type TDeleteIssueData = Partial<IIssueDetail> & { isSoft: boolean }

export interface IIssueDetail {
  id?: number
  name: string
  tracker: ITrackerDetail,
  status: IStatusDetail,
  priority: IPriorityDetail
}


export interface IEditIssueData {
  name?: string
}
