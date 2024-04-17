import { IGetParams } from './app'

export interface IFetchProjectsParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchProjectsSuccessData {
  items: IProjectDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateProjectData = {
  dateTime: Date | string
}

export type TDeleteProjectData = Partial<IProjectDetail> & { isSoft: boolean }

export interface IProjectDetail {
  id?: number
  name: string
}


export interface IEditProjectData {
  name?: string
}
