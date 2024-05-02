import { IGetParams } from "./app";

export interface IFetchUniversitiesParams extends IGetParams {
  sortOption?: string;
  search?: string;
  statusId?: string;
  priorityId?: string;
  trackerId?: string;
}

export interface IFetchUniversitiesSuccessData {
  items: IUniversityDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}


export interface IUniversityDetail {
  id: number;
  name: string;
  color: string;
}
