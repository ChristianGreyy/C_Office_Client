import { IGetParams } from "./app";

export interface IFetchLevelsParams extends IGetParams {
  sortOption?: string;
  search?: string;
  statusId?: string;
  priorityId?: string;
  trackerId?: string;
}

export interface IFetchLevelsSuccessData {
  items: ILevelDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}


export interface ILevelDetail {
  id: number;
  name: string;
  color: string;
}
