import { IUserDetail } from '.'
import { IGetParams } from './app'

export interface IFetchEmployeeAttendancesParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchEmployeeAttendancesSuccessData {
  items: IEmployeeAttendanceDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateEmployeeAttendanceData = Partial<IEmployeeAttendanceDetail>

export type TDeleteEmployeeAttendanceData = Partial<IEmployeeAttendanceDetail> & { isSoft: boolean }

export interface IEmployeeAttendanceDetail {
  id?: number
  checkInTime: string
  checkOutTime: string
  createdAt?: string
  user?: IUserDetail
}


export interface IEditEmployeeAttendanceData {
  dateTime?: string
}
