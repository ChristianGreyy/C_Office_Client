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
  phone?: string
  gender?: string
  positionId?: number
  universityId?: number
  levelId?: number
  avatarId?: number
  avatar?: IAvatarDetail 
  createdAt?: string
}

export interface IAvatarDetail {
  id?: number
  url?: string
}


export interface IEditUserData {
  firstName?: string
  lastName?: string
  phone?: string
  gender?: string
  positionId?: number
  universityId?: number
  levelId?: number
}
