import { IGetParams } from './app'

export interface IFetchUsersParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchUsersSuccessData {
  items: IUserDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateUserData = Partial<IUserDetail>

export type TDeleteUserData = Partial<IUserDetail> & { isSoft: boolean }

export interface IUserDetail {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  createdAt?: string
}


export interface IEditUserData {
  dateTime?: string
}
