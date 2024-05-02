import { IGetParams } from "./app";

export interface IFetchPositionsParams extends IGetParams {
  sortOption?: string;
  search?: string;
  statusId?: string;
  priorityId?: string;
  trackerId?: string;
}

export interface IFetchPositionsSuccessData {
  items: IPositionDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}


export interface IPositionDetail {
  id: number;
  name: string;
  color: string;
}
