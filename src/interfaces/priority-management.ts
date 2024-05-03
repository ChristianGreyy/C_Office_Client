import { IUserDetail } from '.'
import { IGetParams } from './app'

export interface IFetchPrioritiesParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchPrioritiesSuccessData {
  items: IPriorityDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdatePriorityData = {
  dateTime: Date | string
}

export type TDeletePriorityData = Partial<IPriorityDetail> & { isSoft: boolean }

export interface IPriorityDetail {
  id?: number
  name: string
  slug?: string
}


export interface IEditPriorityData {
  name?: string
}

export enum EPrioritySLug {
  normal = 'normal',
  low = 'low',
  high = 'high',
  urgent = 'urgent',
}

