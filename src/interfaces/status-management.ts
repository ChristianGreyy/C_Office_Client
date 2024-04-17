import { IUserDetail } from '.'
import { IGetParams } from './app'

export interface IFetchStatusesParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchStatusesSuccessData {
  items: IStatusDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateStatusData = {
  dateTime: Date | string
}

export type TDeleteStatusData = Partial<IStatusDetail> & { isSoft: boolean }

export interface IStatusDetail {
  id?: number
  name: string
}


export interface IEditStatusData {
  name?: string
}
