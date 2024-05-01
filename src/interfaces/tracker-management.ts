import { IUserDetail } from '.'
import { IGetParams } from './app'

export interface IFetchTrackersParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchTrackersSuccessData {
  items: ITrackerDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateTrackerData = {
  dateTime: Date | string
}

export type TDeleteTrackerData = Partial<ITrackerDetail> & { isSoft: boolean }

export interface ITrackerDetail {
  id: number
  name: string
  slug: string
}


export interface IEditTrackerData {
  name?: string
}

export enum ETrackerSLug {
  feature = 'feature',
  bug = 'bug',
  test_case = 'test_case',
  support = 'support',
  meeting = 'meeting',
}